/**
 * Enterprise Playwright Framework - Type Definitions
 * Normalized, typed interfaces for Test Cases, Plans, Results, Healing, and Failures.
 */

export type TestCaseType =
  | 'Positive'
  | 'Negative'
  | 'Validation'
  | 'Boundary'
  | 'State-transition'
  | 'Workflow'
  | 'Functional'
  | 'Security'
  | 'UI'
  | 'Usability'
  | 'Compatibility'
  | 'Data Integrity'
  | 'Integration'
  | 'Regression'
  | 'End-to-End'
  | 'Clarification Required';

export type ExecutionLevel = 'Sanity' | 'Detail' | 'In-Depth';

export type ActiveStatus = 'Active' | 'Inactive';

export type AutomationStatus =
  | 'automated'
  | 'planned'
  | 'skipped'
  | 'blocked'
  | 'clarification_required';

export type TestModule =
  | 'Recurring Payment Plan'
  | 'Payment Plan Setup'
  | 'Plan Level Tracking'
  | 'Transaction Tracking'
  | 'Notification Reminder'
  | 'Templates & Letters'
  | 'Reconciliation & Statements';

export interface TestStep {
  stepNumber: number;
  action: string;
  expectedResult?: string;
}

export interface TestCase {
  id: string; // e.g. RPP-PLAN-001
  title: string;
  module: TestModule;
  subFeature?: string;
  type: TestCaseType;
  executionLevel: ExecutionLevel;
  preconditions: string;
  testData: string;
  expectedOutput: string;
  verificationSteps: string[];
  parsedSteps: TestStep[];
  testCaseRelevance: string;
  device: string;
  reviewStatus: string;
  activeStatus: ActiveStatus;
  statusComment?: string;
  lastUpdatedBy?: string;
  automationStatus: AutomationStatus;
  automationReason?: string;
  tags: string[];
  sourceFile: string;
}

export interface TestCaseParseResult {
  totalDiscovered: number;
  totalParsed: number;
  moduleCounts: Record<string, number>;
  activeCount: number;
  inactiveCount: number;
  clarificationRequiredCount: number;
  testCases: TestCase[];
  errors: Array<{ file: string; row: number; error: string }>;
}

export interface TestPlanItem {
  testCaseId: string;
  testCaseTitle: string;
  module: TestModule;
  requiredPageObjects: string[];
  requiredFixtures: string[];
  requiredTestData: Record<string, any>;
  targetSpecFile: string;
  automationStatus: AutomationStatus;
  reason?: string;
  priority: 'smoke' | 'regression' | 'extended';
  canAutomate: boolean;
  blockers: string[];
  estimatedSteps: number;
}

export interface TestPlan {
  generatedAt: string;
  frameworkVersion: string;
  totalTestCases: number;
  automatableCount: number;
  skippedCount: number;
  clarificationCount: number;
  blockedCount: number;
  planItems: TestPlanItem[];
  reusableWorkflowsIdentified: string[];
  missingRequirements: string[];
}

export interface TestCaseMappingSummary {
  totalSourceTestCases: number;
  automated: number;
  skipped: number;
  blocked: number;
  clarificationRequired: number;
  moduleBreakdown: Record<string, {
    total: number;
    automated: number;
    skipped: number;
    blocked: number;
    clarification: number;
  }>;
}

export interface TestCaseMappingReport {
  generatedAt: string;
  summary: TestCaseMappingSummary;
  mappings: Array<{
    testCaseId: string;
    title: string;
    module: string;
    status: AutomationStatus;
    specFile?: string;
    reason?: string;
    statusComment?: string;
  }>;
}

export type FailureClassification =
  | 'APPLICATION_ASSERTION_FAILURE'
  | 'LOCATOR_NOT_FOUND_OR_AMBIGUOUS'
  | 'TIMEOUT_OR_SYNCHRONIZATION_ISSUE'
  | 'AUTHENTICATION_OR_AUTHORIZATION_FAILURE'
  | 'TEST_DATA_OR_PRECONDITION_ISSUE'
  | 'ENVIRONMENT_OR_NETWORK_ISSUE'
  | 'BROWSER_OR_INFRASTRUCTURE_ISSUE'
  | 'AUTOMATION_FRAMEWORK_DEFECT'
  | 'UNKNOWN_OR_INSUFFICIENT_EVIDENCE';

export interface FailureSummary {
  testCaseId: string;
  testTitle: string;
  failedStep?: string;
  expectedBehavior: string;
  actualObservedBehavior: string;
  errorMessage: string;
  classification: FailureClassification;
  confidence: number;
  attemptNumber: number;
  totalAttempts: number;
  passedOnRetry: boolean;
  screenshotPath?: string;
  tracePath?: string;
  logs: string[];
  likelyCause: string;
  suggestedAction: string;
  healingProposalGenerated: boolean;
  healingProposalId?: string;
}

export type HealingMode = 'off' | 'suggest' | 'approved';

export interface HealingProposal {
  id: string;
  timestamp: string;
  testCaseId: string;
  failedLocator: string;
  proposedLocator: string;
  targetFile: string;
  targetLineNumber?: number;
  reason: string;
  confidence: number;
  originalCodeSnippet: string;
  proposedDiff: string;
  validationStatus: 'PENDING' | 'VALIDATED' | 'REJECTED' | 'APPLICATION_UNAVAILABLE';
  approvalStatus: 'PENDING' | 'APPROVED' | 'REJECTED';
  appliedAt?: string;
  revalidationResult?: {
    passed: boolean;
    durationMs: number;
    attemptCount: number;
  };
}
