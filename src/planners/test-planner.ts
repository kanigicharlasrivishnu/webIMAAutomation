import fs from 'fs';
import path from 'path';
import {
  TestCase,
  TestPlan,
  TestPlanItem,
  TestCaseParseResult
} from '../types/test-case.types';
import { defaultLogger } from '../utils/logger';

export class TestPlanner {
  private parsedPath: string;
  private planOutputPath: string;

  constructor(
    parsedPath = path.resolve(process.cwd(), 'test-cases', 'parsed', 'test-cases.json'),
    planOutputPath = path.resolve(process.cwd(), 'src', 'planners', 'test-plan.json')
  ) {
    this.parsedPath = parsedPath;
    this.planOutputPath = planOutputPath;
  }

  /**
   * Plan test cases by determining POMs, fixtures, priority, and automation feasibility
   */
  public generatePlan(): TestPlan {
    defaultLogger.info(`Reading parsed test cases from ${this.parsedPath}`);
    if (!fs.existsSync(this.parsedPath)) {
      throw new Error(`Parsed test cases file not found at ${this.parsedPath}. Please run TestCaseParser first.`);
    }

    const parseResult: TestCaseParseResult = JSON.parse(fs.readFileSync(this.parsedPath, 'utf-8'));
    const testCases: TestCase[] = parseResult.testCases;

    const planItems: TestPlanItem[] = [];
    const reusableWorkflows = new Set<string>();
    const missingRequirements = new Set<string>();

    let automatableCount = 0;
    let skippedCount = 0;
    let clarificationCount = 0;
    let blockedCount = 0;

    for (const tc of testCases) {
      const requiredPageObjects: string[] = ['LoginPage'];
      const requiredFixtures: string[] = ['page', 'logger'];
      const requiredTestData: Record<string, any> = {};
      const blockers: string[] = [];

      // Determine Page Objects needed
      switch (tc.module) {
        case 'Recurring Payment Plan':
          requiredPageObjects.push('RecurringPaymentPlanPage');
          requiredFixtures.push('recurringPaymentPlanPage');
          reusableWorkflows.add('Patient Master > Payment Plan navigation');
          reusableWorkflows.add('Installment schedule preview generation');
          break;
        case 'Payment Plan Setup':
          requiredPageObjects.push('PaymentPlanSetupPage');
          requiredFixtures.push('paymentPlanSetupPage');
          reusableWorkflows.add('Setup > Recurring Payment Plan master-detail');
          break;
        case 'Plan Level Tracking':
          requiredPageObjects.push('PlanLevelTrackingPage');
          requiredFixtures.push('planLevelTrackingPage');
          reusableWorkflows.add('Plan-Level Tracking worklist filter and drawer');
          break;
        case 'Transaction Tracking':
          requiredPageObjects.push('PaymentTransactionTrackingPage');
          requiredFixtures.push('paymentTransactionTrackingPage');
          reusableWorkflows.add('Transaction tracking and refund workflow');
          break;
        case 'Notification Reminder':
          requiredPageObjects.push('NotificationReminderPage');
          requiredFixtures.push('notificationReminderPage');
          reusableWorkflows.add('Notification and Reminder preference configuration');
          break;
        case 'Templates & Letters':
          requiredPageObjects.push('RecurringPaymentPlanPage');
          requiredFixtures.push('recurringPaymentPlanPage');
          reusableWorkflows.add('Agreement 5-section preview and execution');
          break;
        case 'Reconciliation & Statements':
          requiredPageObjects.push('RecurringPaymentPlanPage');
          requiredFixtures.push('recurringPaymentPlanPage');
          reusableWorkflows.add('Open Credit auto-reconciliation scheduler');
          break;
      }

      // Check priority
      const isSanity = tc.executionLevel.toLowerCase() === 'sanity';
      const priority: TestPlanItem['priority'] = isSanity ? 'smoke' : 'regression';

      // Evaluate automation feasibility
      let canAutomate = true;

      if (tc.automationStatus === 'skipped') {
        canAutomate = false;
        skippedCount++;
        blockers.push(tc.automationReason || 'Marked Inactive or Superseded');
      } else if (tc.automationStatus === 'clarification_required') {
        canAutomate = false;
        clarificationCount++;
        blockers.push(tc.automationReason || 'Clarification required on requirements');
        missingRequirements.add(`Clarification needed for ${tc.id}: ${tc.title}`);
      } else if (tc.automationStatus === 'blocked') {
        canAutomate = false;
        blockedCount++;
        blockers.push('Verification steps or test data incomplete');
      } else {
        automatableCount++;
      }

      const specFile = `tests/generated/${tc.module.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.spec.ts`;

      planItems.push({
        testCaseId: tc.id,
        testCaseTitle: tc.title,
        module: tc.module,
        requiredPageObjects,
        requiredFixtures,
        requiredTestData,
        targetSpecFile: specFile,
        automationStatus: tc.automationStatus,
        reason: tc.automationReason,
        priority,
        canAutomate,
        blockers,
        estimatedSteps: tc.verificationSteps.length || 1
      });
    }

    const plan: TestPlan = {
      generatedAt: new Date().toISOString(),
      frameworkVersion: '1.0.0-enterprise',
      totalTestCases: testCases.length,
      automatableCount,
      skippedCount,
      clarificationCount,
      blockedCount,
      planItems,
      reusableWorkflowsIdentified: Array.from(reusableWorkflows),
      missingRequirements: Array.from(missingRequirements)
    };

    // Save test plan to disk
    fs.mkdirSync(path.dirname(this.planOutputPath), { recursive: true });
    fs.writeFileSync(this.planOutputPath, JSON.stringify(plan, null, 2), 'utf-8');

    defaultLogger.info(
      `Generated Test Plan: ${plan.automatableCount} automatable, ${plan.skippedCount} skipped, ${plan.clarificationCount} clarification required, ${plan.blockedCount} blocked.`
    );

    return plan;
  }
}

// CLI entry point
if (require.main === module) {
  const planner = new TestPlanner();
  const plan = planner.generatePlan();
  console.log(`Plan generated successfully with ${plan.planItems.length} planned items.`);
}
