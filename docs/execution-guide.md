# Test Execution & Reporting Guide

## 1. Running Tests

### Smoke Tests (Sanity Tier)
Runs high-priority sanity tests:
```bash
npm run test:smoke
```

### Full Regression Suite
Runs the comprehensive regression test suite:
```bash
npm run test:regression
```

### Run Tests in Headed Mode
Opens the visible browser window for visual debugging:
```bash
npm run test:headed
```

### Run by Specific Test Case ID
Executes an individual test case by its business ID:
```bash
npx playwright test --grep="RPP-PLAN-001"
```

### Run by Specific Module
Executes an entire functional module:
```bash
npx playwright test tests/generated/recurring-payment-plan.spec.ts
npx playwright test tests/generated/payment-plan-setup.spec.ts
npx playwright test tests/generated/plan-level-tracking.spec.ts
npx playwright test tests/generated/transaction-tracking.spec.ts
npx playwright test tests/generated/notification-reminder.spec.ts
npx playwright test tests/generated/templates-letters.spec.ts
npx playwright test tests/generated/reconciliation-statements.spec.ts
```

### Debug Mode (Playwright Inspector)
Step through tests interactively with the Playwright Debugger:
```bash
npm run test:debug
```

## 2. Viewing Reports & Artifacts

### Playwright HTML Report
Opens the local Playwright HTML report with step timeline, trace files, and screenshots:
```bash
npm run test:report
```

### Allure Enterprise Report
Generates the Allure HTML report and serves it:
```bash
npm run test:allure
npm run test:allure:open
```

### Inspecting Traces
To view a trace zip file recorded for a failed attempt:
```bash
npx playwright show-trace test-results/trace_RPP-PLAN-001.zip
```

### Failure Summaries & Structured Logs
- Structured logs: `logs/automation.log`
- JSON logs: `logs/automation.json`
- Failure summaries: `logs/failure-summaries/`
