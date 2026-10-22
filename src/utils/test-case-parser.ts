import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';
import {
  TestCase,
  TestCaseParseResult,
  TestStep,
  TestModule,
  AutomationStatus,
  TestCaseMappingReport,
  TestCaseMappingSummary
} from '../types/test-case.types';
import { defaultLogger } from './logger';

export class TestCaseParser {
  private originalDir: string;
  private parsedDir: string;
  private mappingDir: string;

  constructor(
    originalDir = path.resolve(process.cwd(), 'test-cases', 'original'),
    parsedDir = path.resolve(process.cwd(), 'test-cases', 'parsed'),
    mappingDir = path.resolve(process.cwd(), 'test-cases', 'test-case-mapping')
  ) {
    this.originalDir = originalDir;
    this.parsedDir = parsedDir;
    this.mappingDir = mappingDir;
  }

  /**
   * Split verification steps text like "1. Step one. 2. Step two. 3. Assert..." into structured TestStep items
   */
  public parseVerificationSteps(rawSteps: string, expectedOutput: string): { steps: string[]; parsedSteps: TestStep[] } {
    if (!rawSteps || rawSteps.trim().length === 0) {
      return { steps: [], parsedSteps: [] };
    }

    // Split on numbered steps pattern: "1. ", "2. ", etc.
    const stepRegex = /(?:^|\s+)(\d+)\.\s+/g;
    const matches = Array.from(rawSteps.matchAll(stepRegex));

    if (matches.length === 0) {
      const singleStep = rawSteps.trim();
      return {
        steps: [singleStep],
        parsedSteps: [
          {
            stepNumber: 1,
            action: singleStep,
            expectedResult: expectedOutput
          }
        ]
      };
    }

    const steps: string[] = [];
    const parsedSteps: TestStep[] = [];

    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const stepNum = parseInt(match[1], 10);
      const startIndex = (match.index || 0) + match[0].length;
      const endIndex = i + 1 < matches.length ? (matches[i + 1].index || rawSteps.length) : rawSteps.length;
      const stepText = rawSteps.substring(startIndex, endIndex).trim();

      steps.push(stepText);
      parsedSteps.push({
        stepNumber: stepNum,
        action: stepText,
        expectedResult: stepText.toLowerCase().includes('assert') || stepText.toLowerCase().includes('confirm')
          ? stepText
          : (i === matches.length - 1 ? expectedOutput : undefined)
      });
    }

    return { steps, parsedSteps };
  }

  /**
   * Infer the module category from file name or test case ID
   */
  public inferModule(testCaseId: string, sheetOrFileName: string): TestModule {
    const id = testCaseId.toUpperCase();
    if (id.startsWith('RPP-PLAN')) return 'Recurring Payment Plan';
    if (id.startsWith('RPP-SET')) return 'Payment Plan Setup';
    if (id.startsWith('RPP-PLT')) return 'Plan Level Tracking';
    if (id.startsWith('RPP-TXN')) return 'Transaction Tracking';
    if (id.startsWith('RPP-NRP')) return 'Notification Reminder';
    if (id.startsWith('RPP-TPL')) return 'Templates & Letters';
    if (id.startsWith('RPP-REC')) return 'Reconciliation & Statements';

    const lower = sheetOrFileName.toLowerCase();
    if (lower.includes('plan-level') || lower.includes('plt')) return 'Plan Level Tracking';
    if (lower.includes('setup') || lower.includes('set')) return 'Payment Plan Setup';
    if (lower.includes('transaction') || lower.includes('txn')) return 'Transaction Tracking';
    if (lower.includes('notification') || lower.includes('reminder') || lower.includes('nrp')) return 'Notification Reminder';
    if (lower.includes('template') || lower.includes('tpl') || lower.includes('letter')) return 'Templates & Letters';
    if (lower.includes('reconcil') || lower.includes('rec') || lower.includes('statement')) return 'Reconciliation & Statements';

    return 'Recurring Payment Plan';
  }

  /**
   * Determine automation status and reason based on review status, comments, and flags
   */
  public evaluateAutomationStatus(
    activeInactive: string,
    type: string,
    statusComment: string,
    verificationSteps: string[]
  ): { status: AutomationStatus; reason?: string } {
    const activeClean = (activeInactive || '').trim().toLowerCase();
    const commentClean = (statusComment || '').trim().toLowerCase();
    const typeClean = (type || '').trim().toLowerCase();

    // Check for explicit Inactive or superseded
    if (activeClean === 'inactive' || commentClean.includes('inactive') || commentClean.includes('superseded') || commentClean.includes('duplicate') || commentClean.includes('do not automate')) {
      return {
        status: 'skipped',
        reason: statusComment || 'Test case marked Inactive / Superseded by business requirements'
      };
    }

    // Check for Clarification Required
    if (typeClean.includes('clarification') || commentClean.includes('clarification') || commentClean.includes('need to discuss') || commentClean.includes('need to be discussed') || commentClean.includes('not finalized') || commentClean.includes('pending confirmation')) {
      return {
        status: 'clarification_required',
        reason: statusComment || 'Requires clarification on expected behavior or requirements'
      };
    }

    // Check if verification steps are missing
    if (!verificationSteps || verificationSteps.length === 0) {
      return {
        status: 'blocked',
        reason: 'Verification steps are missing from source test case'
      };
    }

    return {
      status: 'planned'
    };
  }

  /**
   * Parse a row into normalized TestCase format
   */
  private parseRow(row: Record<string, any>, sourceFile: string): TestCase | null {
    const id = (row['Test Case No'] || row['testCaseNo'] || row['ID'] || '').trim();
    if (!id || id.toLowerCase().includes('test case no')) return null;

    const title = (row['Description'] || row['description'] || row['Title'] || '').trim();
    const type = (row['Test Case Type'] || row['testCaseType'] || 'Functional').trim();
    const executionLevel = (row['Execution Level'] || row['executionLevel'] || 'Detail').trim();
    const preconditions = (row['Pre-requisite Data'] || row['preRequisiteData'] || '').trim();
    const testData = (row['Test Data'] || row['testData'] || '').trim();
    const expectedOutput = (row['Expected Output'] || row['expectedOutput'] || '').trim();
    const rawVerification = (row['Verification Step'] || row['verificationStep'] || '').trim();
    const relevance = (row['Test Case Relevance'] || '').trim();
    const device = (row['Device'] || 'Desktop').trim();
    const reviewStatus = (row['Review Status'] || 'Reviewed').trim();
    const activeInactive = (row['Active/Inactive'] || 'Active').trim();
    const statusComment = (row['Status Comment'] || '').trim();
    const lastUpdatedBy = (row['Last Updated By'] || '').trim();

    const { steps, parsedSteps } = this.parseVerificationSteps(rawVerification, expectedOutput);
    const { status: automationStatus, reason } = this.evaluateAutomationStatus(
      activeInactive,
      type,
      statusComment,
      steps
    );

    const moduleName = this.inferModule(id, sourceFile);

    const tags = [
      moduleName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      type.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      executionLevel.toLowerCase()
    ];
    if (executionLevel.toLowerCase() === 'sanity') tags.push('smoke');
    tags.push('regression');

    return {
      id,
      title,
      module: moduleName,
      type: type as any,
      executionLevel: executionLevel as any,
      preconditions,
      testData,
      expectedOutput,
      verificationSteps: steps,
      parsedSteps,
      testCaseRelevance: relevance,
      device,
      reviewStatus,
      activeStatus: (activeInactive.toLowerCase() === 'inactive' ? 'Inactive' : 'Active'),
      statusComment,
      lastUpdatedBy,
      automationStatus,
      automationReason: reason,
      tags,
      sourceFile
    };
  }

  /**
   * Parse an Excel Workbook (.xlsx)
   */
  public parseExcel(filePath: string): TestCase[] {
    defaultLogger.info(`Parsing Excel test cases from ${filePath}`);
    const workbook = XLSX.readFile(filePath, { cellFormula: false, cellHTML: false });
    const testCases: TestCase[] = [];

    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: '' });

      for (const row of rows) {
        const tc = this.parseRow(row, `${path.basename(filePath)}#${sheetName}`);
        if (tc) {
          testCases.push(tc);
        }
      }
    }

    return testCases;
  }

  /**
   * Parse a CSV File
   */
  public parseCSV(filePath: string): TestCase[] {
    defaultLogger.info(`Parsing CSV test cases from ${filePath}`);
    const content = fs.readFileSync(filePath, 'utf-8');
    const workbook = XLSX.read(content, { type: 'string' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows: any[] = XLSX.utils.sheet_to_json(firstSheet, { defval: '' });
    const testCases: TestCase[] = [];

    for (const row of rows) {
      const tc = this.parseRow(row, path.basename(filePath));
      if (tc) {
        testCases.push(tc);
      }
    }

    return testCases;
  }

  /**
   * Discover and parse all test cases from original folder
   */
  public discoverAndParse(): TestCaseParseResult {
    const files = fs.readdirSync(this.originalDir);
    const testCaseMap = new Map<string, TestCase>();
    const errors: Array<{ file: string; row: number; error: string }> = [];

    // Prioritize master consolidated files first, then individual files
    const sortedFiles = files.sort((a, b) => {
      if (a.toLowerCase().includes('master') || a.toLowerCase().includes('all-test')) return -1;
      if (b.toLowerCase().includes('master') || b.toLowerCase().includes('all-test')) return 1;
      return 0;
    });

    for (const file of sortedFiles) {
      const ext = path.extname(file).toLowerCase();
      const fullPath = path.join(this.originalDir, file);

      try {
        let parsed: TestCase[] = [];
        if (ext === '.xlsx') {
          parsed = this.parseExcel(fullPath);
        } else if (ext === '.csv') {
          parsed = this.parseCSV(fullPath);
        }

        for (const tc of parsed) {
          // If we already have the test case from a master file, preserve the most detailed comment
          if (!testCaseMap.has(tc.id)) {
            testCaseMap.set(tc.id, tc);
          } else {
            const existing = testCaseMap.get(tc.id)!;
            if ((tc.statusComment && !existing.statusComment) || tc.verificationSteps.length > existing.verificationSteps.length) {
              testCaseMap.set(tc.id, tc);
            }
          }
        }
      } catch (err: any) {
        defaultLogger.error(`Error reading ${file}: ${err.message}`);
        errors.push({ file, row: 0, error: err.message });
      }
    }

    const testCases = Array.from(testCaseMap.values());
    const moduleCounts: Record<string, number> = {};
    let activeCount = 0;
    let inactiveCount = 0;
    let clarificationRequiredCount = 0;

    for (const tc of testCases) {
      moduleCounts[tc.module] = (moduleCounts[tc.module] || 0) + 1;
      if (tc.automationStatus === 'skipped') inactiveCount++;
      else if (tc.automationStatus === 'clarification_required') clarificationRequiredCount++;
      else activeCount++;
    }

    const result: TestCaseParseResult = {
      totalDiscovered: testCases.length,
      totalParsed: testCases.length,
      moduleCounts,
      activeCount,
      inactiveCount,
      clarificationRequiredCount,
      testCases,
      errors
    };

    // Save parsed output
    fs.mkdirSync(this.parsedDir, { recursive: true });
    fs.writeFileSync(
      path.join(this.parsedDir, 'test-cases.json'),
      JSON.stringify(result, null, 2),
      'utf-8'
    );

    // Generate mapping report
    this.generateMappingReport(testCases);

    defaultLogger.info(
      `Successfully parsed ${result.totalParsed} unique test cases (${result.activeCount} active, ${result.inactiveCount} skipped, ${result.clarificationRequiredCount} clarification required).`
    );

    return result;
  }

  /**
   * Generate source-to-automation mapping report
   */
  public generateMappingReport(testCases: TestCase[]): TestCaseMappingReport {
    fs.mkdirSync(this.mappingDir, { recursive: true });

    const summary: TestCaseMappingSummary = {
      totalSourceTestCases: testCases.length,
      automated: 0,
      skipped: 0,
      blocked: 0,
      clarificationRequired: 0,
      moduleBreakdown: {}
    };

    const mappings = testCases.map(tc => {
      const mod = tc.module;
      if (!summary.moduleBreakdown[mod]) {
        summary.moduleBreakdown[mod] = {
          total: 0,
          automated: 0,
          skipped: 0,
          blocked: 0,
          clarification: 0
        };
      }

      summary.moduleBreakdown[mod].total++;

      if (tc.automationStatus === 'skipped') {
        summary.skipped++;
        summary.moduleBreakdown[mod].skipped++;
      } else if (tc.automationStatus === 'clarification_required') {
        summary.clarificationRequired++;
        summary.moduleBreakdown[mod].clarification++;
      } else if (tc.automationStatus === 'blocked') {
        summary.blocked++;
        summary.moduleBreakdown[mod].blocked++;
      } else {
        summary.automated++;
        summary.moduleBreakdown[mod].automated++;
      }

      return {
        testCaseId: tc.id,
        title: tc.title,
        module: tc.module,
        status: tc.automationStatus,
        specFile: `tests/generated/${tc.module.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.spec.ts`,
        reason: tc.automationReason,
        statusComment: tc.statusComment
      };
    });

    const report: TestCaseMappingReport = {
      generatedAt: new Date().toISOString(),
      summary,
      mappings
    };

    // Save JSON report
    fs.writeFileSync(
      path.join(this.mappingDir, 'mapping-report.json'),
      JSON.stringify(report, null, 2),
      'utf-8'
    );

    // Save Markdown report
    let md = `# Source-to-Automation Test Case Mapping Report\n\n`;
    md += `**Generated At**: ${report.generatedAt}\n\n`;
    md += `## 1. Executive Summary\n\n`;
    md += `| Metric | Count | Percentage |\n`;
    md += `| :--- | :--- | :--- |\n`;
    md += `| **Total Source Test Cases** | **${summary.totalSourceTestCases}** | 100% |\n`;
    md += `| **Automated / Planned** | **${summary.automated}** | ${((summary.automated / summary.totalSourceTestCases) * 100).toFixed(1)}% |\n`;
    md += `| **Skipped (Inactive/Superseded)** | **${summary.skipped}** | ${((summary.skipped / summary.totalSourceTestCases) * 100).toFixed(1)}% |\n`;
    md += `| **Requires Clarification** | **${summary.clarificationRequired}** | ${((summary.clarificationRequired / summary.totalSourceTestCases) * 100).toFixed(1)}% |\n`;
    md += `| **Blocked** | **${summary.blocked}** | ${((summary.blocked / summary.totalSourceTestCases) * 100).toFixed(1)}% |\n\n`;

    md += `## 2. Module Breakdown\n\n`;
    md += `| Module | Total | Automated/Planned | Skipped | Clarification | Blocked |\n`;
    md += `| :--- | :---: | :---: | :---: | :---: | :---: |\n`;
    for (const [mod, stat] of Object.entries(summary.moduleBreakdown)) {
      md += `| **${mod}** | ${stat.total} | ${stat.automated} | ${stat.skipped} | ${stat.clarification} | ${stat.blocked} |\n`;
    }
    md += `\n## 3. Detailed Traceability Matrix (Sample First 30 Rows)\n\n`;
    md += `| ID | Module | Title | Status | Reason / Comment |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;

    for (const m of mappings.slice(0, 30)) {
      md += `| \`${m.testCaseId}\` | ${m.module} | ${m.title.substring(0, 50)}... | \`${m.status.toUpperCase()}\` | ${m.reason || m.statusComment || 'Ready for automation'} |\n`;
    }
    md += `\n*(Full matrix with all ${mappings.length} test cases stored in \`mapping-report.json\`)*\n`;

    fs.writeFileSync(path.join(this.mappingDir, 'mapping-report.md'), md, 'utf-8');

    return report;
  }
}

// CLI entry point
if (require.main === module) {
  const parser = new TestCaseParser();
  const res = parser.discoverAndParse();
  console.log(`Discovered & Parsed ${res.totalParsed} test cases.`);
}
