import fs from 'fs';
import path from 'path';
import { frameworkConfig } from '../config/framework.config';
import { HealingProposal } from '../types/test-case.types';
import { SelfHealingEngine } from './healer';
import { defaultLogger } from '../utils/logger';

export class HealingReview {
  private engine: SelfHealingEngine;

  constructor() {
    this.engine = new SelfHealingEngine();
  }

  public listPending(): HealingProposal[] {
    const all = this.engine.loadProposals();
    return all.filter(p => p.approvalStatus === 'PENDING');
  }

  public approveProposal(proposalId: string): boolean {
    const all = this.engine.loadProposals();
    const target = all.find(p => p.id === proposalId);

    if (!target) {
      console.error(`Proposal [${proposalId}] not found.`);
      return false;
    }

    target.approvalStatus = 'APPROVED';
    target.appliedAt = new Date().toISOString();

    // In approved mode, safe application can proceed
    defaultLogger.info(`Proposal [${proposalId}] approved by user. Saving proposal status.`);
    this.engine.saveProposals(all);
    return true;
  }

  public rejectProposal(proposalId: string, reason = 'Rejected by human reviewer'): boolean {
    const all = this.engine.loadProposals();
    const target = all.find(p => p.id === proposalId);

    if (!target) {
      console.error(`Proposal [${proposalId}] not found.`);
      return false;
    }

    target.approvalStatus = 'REJECTED';
    target.reason += ` (${reason})`;

    defaultLogger.info(`Proposal [${proposalId}] rejected.`);
    this.engine.saveProposals(all);
    return true;
  }
}

// CLI interactive or programmatic entry
if (require.main === module) {
  const reviewer = new HealingReview();
  const pending = reviewer.listPending();

  console.log(`\n======================================================`);
  console.log(` Controlled Self-Healing Review - Pending Proposals: ${pending.length}`);
  console.log(`======================================================\n`);

  if (pending.length === 0) {
    console.log('No pending proposals to review. All tests healthy or no proposals generated.');
  } else {
    for (const p of pending) {
      console.log(`Proposal ID: ${p.id} | Test Case: ${p.testCaseId}`);
      console.log(`Reason:      ${p.reason}`);
      console.log(`Diff:\n${p.proposedDiff}\n`);
    }
    console.log('Use programmatic approval or pass proposal ID to approve.');
  }
}
