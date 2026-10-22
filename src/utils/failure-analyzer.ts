import fs from 'fs';
import path from 'path';
import { FailureClassification, FailureSummary } from '../types/test-case.types';
import { defaultLogger } from './logger';

export class FailureAnalyzer {
  private static summariesDir = path.resolve(process.cwd(), 'logs', 'failure-summaries');

  public static classifyError(errorMessage: string, stackTrace?: string): {
    classification: FailureClassification;
    confidence: number;
    likelyCause: string;
    suggestedAction: string;
    isHealingCandidate: boolean;
  } {
    const combined = `${errorMessage} ${stackTrace || ''}`.toLowerCase();

    // 1. Locator not found or ambiguous
    if (
      combined.includes('waiting for locator') ||
      combined.includes('strict mode violation') ||
      combined.includes('resolved to') ||
      combined.includes('element is not visible') ||
      combined.includes('element is not attached')
    ) {
      const isAmbiguous = combined.includes('strict mode violation') || combined.includes('resolved to');
      return {
        classification: 'LOCATOR_NOT_FOUND_OR_AMBIGUOUS',
        confidence: 0.90,
        likelyCause: isAmbiguous
          ? 'Multiple elements match selector (ambiguous strict mode violation).'
          : 'Target DOM element not found within configured timeout or DOM altered by application update.',
        suggestedAction: isAmbiguous
          ? 'Narrow selector using unique accessible attributes (role, label, name, or parent container).'
          : 'Trigger AI self-healing proposal to locate updated element attributes or inspect DOM snapshot.',
        isHealingCandidate: true
      };
    }

    // 2. Timeout or synchronization issue
    if (
      combined.includes('timeout') &&
      (combined.includes('exceeded') || combined.includes('waiting for'))
    ) {
      return {
        classification: 'TIMEOUT_OR_SYNCHRONIZATION_ISSUE',
        confidence: 0.85,
        likelyCause: 'Asynchronous UI action took longer than expected or network delay occurred.',
        suggestedAction: 'Add smart waiting (e.g. waitForLoadState or locator.waitFor) instead of fixed timeouts.',
        isHealingCandidate: true
      };
    }

    // 3. Application or assertion failure
    if (
      combined.includes('expect(') ||
      combined.includes('tobetruthy') ||
      combined.includes('tohavevalue') ||
      combined.includes('tobevisible') ||
      combined.includes('assertion')
    ) {
      return {
        classification: 'APPLICATION_ASSERTION_FAILURE',
        confidence: 0.95,
        likelyCause: 'Application behavior deviated from expected business requirements. Legitimate application defect.',
        suggestedAction: 'Log application bug in Jira/ALM with attached screenshot, trace, and reproduction steps. Do NOT weaken assertion.',
        isHealingCandidate: false
      };
    }

    // 4. Authentication or authorization failure
    if (
      combined.includes('login') ||
      combined.includes('401') ||
      combined.includes('403') ||
      combined.includes('unauthorized') ||
      combined.includes('session expired') ||
      combined.includes('invalid credentials')
    ) {
      return {
        classification: 'AUTHENTICATION_OR_AUTHORIZATION_FAILURE',
        confidence: 0.88,
        likelyCause: 'Session expired or credentials rejected by authentication endpoint.',
        suggestedAction: 'Regenerate storage-state using auth setup workflow and verify test credentials.',
        isHealingCandidate: false
      };
    }

    // 5. Test data or precondition issue
    if (
      combined.includes('patient not found') ||
      combined.includes('already exists') ||
      combined.includes('duplicate') ||
      combined.includes('precondition')
    ) {
      return {
        classification: 'TEST_DATA_OR_PRECONDITION_ISSUE',
        confidence: 0.80,
        likelyCause: 'Test prerequisite data missing or already consumed by prior execution.',
        suggestedAction: 'Verify test database state or ensure unique data seeding per test iteration.',
        isHealingCandidate: false
      };
    }

    // 6. Environment or network issue
    if (
      combined.includes('net::') ||
      combined.includes('econnrefused') ||
      combined.includes('etimedout') ||
      combined.includes('502') ||
      combined.includes('503') ||
      combined.includes('self_signed_cert')
    ) {
      return {
        classification: 'ENVIRONMENT_OR_NETWORK_ISSUE',
        confidence: 0.85,
        likelyCause: 'Target environment unreachable, gateway error, or proxy certificate rejection.',
        suggestedAction: 'Verify server health, gateway connectivity, and corporate proxy TLS certificate settings.',
        isHealingCandidate: false
      };
    }

    // 7. Browser or infrastructure issue
    if (
      combined.includes('browser closed') ||
      combined.includes('target closed') ||
      combined.includes('crash')
    ) {
      return {
        classification: 'BROWSER_OR_INFRASTRUCTURE_ISSUE',
        confidence: 0.82,
        likelyCause: 'Browser process crashed or host runner ran out of memory.',
        suggestedAction: 'Check host resource allocation and ensure browser dependencies are installed.',
        isHealingCandidate: false
      };
    }

    // Default unknown
    return {
      classification: 'UNKNOWN_OR_INSUFFICIENT_EVIDENCE',
      confidence: 0.50,
      likelyCause: 'Error cause could not be conclusively determined from available stack trace.',
      suggestedAction: 'Review Playwright trace artifact and console logs for in-depth diagnostics.',
      isHealingCandidate: false
    };
  }

  public static generateSummary(params: {
    testCaseId: string;
    testTitle: string;
    failedStep?: string;
    expectedBehavior: string;
    actualObservedBehavior: string;
    errorMessage: string;
    attemptNumber: number;
    totalAttempts: number;
    passedOnRetry: boolean;
    screenshotPath?: string;
    tracePath?: string;
    logs: string[];
    healingProposalGenerated?: boolean;
    healingProposalId?: string;
  }): FailureSummary {
    const analysis = this.classifyError(params.errorMessage);

    const summary: FailureSummary = {
      testCaseId: params.testCaseId,
      testTitle: params.testTitle,
      failedStep: params.failedStep,
      expectedBehavior: params.expectedBehavior,
      actualObservedBehavior: params.actualObservedBehavior,
      errorMessage: params.errorMessage,
      classification: analysis.classification,
      confidence: analysis.confidence,
      attemptNumber: params.attemptNumber,
      totalAttempts: params.totalAttempts,
      passedOnRetry: params.passedOnRetry,
      screenshotPath: params.screenshotPath,
      tracePath: params.tracePath,
      logs: params.logs,
      likelyCause: analysis.likelyCause,
      suggestedAction: analysis.suggestedAction,
      healingProposalGenerated: !!params.healingProposalGenerated,
      healingProposalId: params.healingProposalId
    };

    // Save summary to disk
    try {
      fs.mkdirSync(this.summariesDir, { recursive: true });
      const fileName = `${params.testCaseId}_attempt_${params.attemptNumber}_summary.json`;
      fs.writeFileSync(path.join(this.summariesDir, fileName), JSON.stringify(summary, null, 2), 'utf-8');
      defaultLogger.info(`Generated Failure Summary for ${params.testCaseId} [Classification: ${summary.classification}]`);
    } catch (err: any) {
      defaultLogger.error(`Failed to write failure summary: ${err.message}`);
    }

    return summary;
  }
}
