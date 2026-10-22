import fs from 'fs';
import path from 'path';
import { env } from '../config/environment';
import { frameworkConfig } from '../config/framework.config';
import { HealingProposal, FailureSummary } from '../types/test-case.types';
import { defaultLogger } from '../utils/logger';

export class SelfHealingEngine {
  private mode: 'off' | 'suggest' | 'approved';
  private proposalsFile: string;
  private failureSummariesDir: string;
  private healingReportPath: string;

  constructor(
    mode = env.HEALING_MODE,
    proposalsFile = frameworkConfig.healing.storeProposalsPath,
    failureSummariesDir = path.resolve(process.cwd(), 'logs', 'failure-summaries'),
    healingReportPath = path.resolve(process.cwd(), 'logs', 'healing-report.md')
  ) {
    this.mode = mode;
    this.proposalsFile = proposalsFile;
    this.failureSummariesDir = failureSummariesDir;
    this.healingReportPath = healingReportPath;
  }

  /**
   * Load existing healing proposals
   */
  public loadProposals(): HealingProposal[] {
    if (!fs.existsSync(this.proposalsFile)) return [];
    try {
      return JSON.parse(fs.readFileSync(this.proposalsFile, 'utf-8'));
    } catch {
      return [];
    }
  }

  /**
   * Save proposals to disk
   */
  public saveProposals(proposals: HealingProposal[]): void {
    fs.mkdirSync(path.dirname(this.proposalsFile), { recursive: true });
    fs.writeFileSync(this.proposalsFile, JSON.stringify(proposals, null, 2), 'utf-8');
    this.generateMarkdownReport(proposals);
  }

  /**
   * Analyze an error to produce an intelligent healing proposal without modifying source code
   */
  public analyzeAndPropose(summary: FailureSummary): HealingProposal | null {
    if (this.mode === 'off') {
      defaultLogger.info('Self-healing is disabled (mode=off). Skipping proposal generation.');
      return null;
    }

    // Safety rule: Never heal application assertion failures or business logic deviations
    if (summary.classification === 'APPLICATION_ASSERTION_FAILURE') {
      defaultLogger.warn(`Safety Policy: Test [${summary.testCaseId}] is an application assertion defect. Self-healing blocked to prevent weakening business validation.`);
      return null;
    }

    if (summary.classification !== 'LOCATOR_NOT_FOUND_OR_AMBIGUOUS' && summary.classification !== 'TIMEOUT_OR_SYNCHRONIZATION_ISSUE') {
      defaultLogger.info(`Failure classification [${summary.classification}] is not an automation locator issue. Skipping proposal.`);
      return null;
    }

    const proposalId = `HEAL-${summary.testCaseId}-${Date.now()}`;
    defaultLogger.info(`Generating self-healing proposal [${proposalId}] in [${this.mode}] mode...`);

    // Extract locator from error message if present
    const locatorMatch = summary.errorMessage.match(/locator\('([^']+)'\)|getByRole\('([^']+)'\)|getByLabel\('([^']+)'\)/i);
    const failedLocator = locatorMatch ? (locatorMatch[1] || locatorMatch[2] || locatorMatch[3]) : 'element';

    // Formulate a more resilient accessible proposal
    let proposedLocator = failedLocator;
    let targetFile = `src/pages/RecurringPaymentPlanPage.ts`;
    let reason = 'Selector replaced with resilient accessible role/label strategy';

    if (failedLocator.includes('#') || failedLocator.includes('.')) {
      proposedLocator = `page.getByRole('button', { name: /${failedLocator.replace(/[#.]/g, '')}/i })`;
      reason = 'Replaced fragile CSS selector with accessible Playwright getByRole selector';
    } else {
      proposedLocator = `page.getByLabel(/${failedLocator}/i).or(page.getByPlaceholder(/${failedLocator}/i))`;
      reason = 'Broadened locator to match accessible label or placeholder with regex flexibility';
    }

    const proposal: HealingProposal = {
      id: proposalId,
      timestamp: new Date().toISOString(),
      testCaseId: summary.testCaseId,
      failedLocator,
      proposedLocator,
      targetFile,
      reason,
      confidence: 0.88,
      originalCodeSnippet: `page.locator('${failedLocator}')`,
      proposedDiff: `- page.locator('${failedLocator}')\n+ ${proposedLocator}`,
      validationStatus: 'APPLICATION_UNAVAILABLE',
      approvalStatus: 'PENDING'
    };

    const existing = this.loadProposals();
    existing.unshift(proposal);
    this.saveProposals(existing);

    defaultLogger.info(`Recorded healing proposal [${proposalId}] with reason: ${proposal.reason}`);
    return proposal;
  }

  /**
   * Scan all failure summaries and analyze unhealed failures
   */
  public analyzeAllFailures(): HealingProposal[] {
    if (!fs.existsSync(this.failureSummariesDir)) {
      defaultLogger.info('No failure summaries found to analyze.');
      return [];
    }

    const files = fs.readdirSync(this.failureSummariesDir).filter(f => f.endsWith('.json'));
    const proposals: HealingProposal[] = [];

    for (const f of files) {
      try {
        const summary: FailureSummary = JSON.parse(
          fs.readFileSync(path.join(this.failureSummariesDir, f), 'utf-8')
        );
        const proposal = this.analyzeAndPropose(summary);
        if (proposal) proposals.push(proposal);
      } catch (err: any) {
        defaultLogger.error(`Error parsing failure summary ${f}: ${err.message}`);
      }
    }

    return proposals;
  }

  /**
   * Generate human-readable Markdown Healing Report
   */
  public generateMarkdownReport(proposals: HealingProposal[]): void {
    let md = `# AI-Powered Controlled Self-Healing Report\n\n`;
    md += `**Execution Mode**: \`${this.mode.toUpperCase()}\` (Default: \`SUGGEST\`)\n`;
    md += `**Generated At**: ${new Date().toISOString()}\n\n`;

    md += `> [!IMPORTANT]\n`;
    md += `> **Safety Policy Guaranteed**:\n`;
    md += `> - Business assertions and expected outcomes are NEVER altered.\n`;
    md += `> - Source files are NEVER modified in \`suggest\` mode.\n`;
    md += `> - Proposals require explicit human review via \`npm run test:heal:review\` before application.\n\n`;

    md += `## 1. Summary of Proposals\n\n`;
    md += `| Proposal ID | Test Case | Target File | Status | Approval |\n`;
    md += `| :--- | :--- | :--- | :---: | :---: |\n`;

    if (proposals.length === 0) {
      md += `| *None* | *No active healing proposals* | - | - | - |\n`;
    } else {
      for (const p of proposals) {
        md += `| \`${p.id}\` | \`${p.testCaseId}\` | \`${path.basename(p.targetFile)}\` | \`${p.validationStatus}\` | \`${p.approvalStatus}\` |\n`;
      }
    }

    md += `\n## 2. Proposal Details & Proposed Diffs\n\n`;
    for (const p of proposals) {
      md += `### ${p.id} (${p.testCaseId})\n\n`;
      md += `- **Reason**: ${p.reason}\n`;
      md += `- **Confidence**: ${(p.confidence * 100).toFixed(0)}%\n`;
      md += `- **Failed Locator**: \`${p.failedLocator}\`\n`;
      md += `- **Proposed Locator**: \`${p.proposedLocator}\`\n\n`;
      md += `\`\`\`diff\n${p.proposedDiff}\n\`\`\`\n\n`;
    }

    fs.writeFileSync(this.healingReportPath, md, 'utf-8');
  }
}

// CLI entry point
if (require.main === module) {
  const engine = new SelfHealingEngine();
  const proposals = engine.analyzeAllFailures();
  console.log(`Analyzed failures: generated ${proposals.length} healing proposals.`);
}
