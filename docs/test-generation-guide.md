# Test Generation & Discovery Guide

## 1. Test Case Workflow

The framework automates the lifecycle from business spreadsheet to executable TypeScript tests in 3 commands:

```bash
# Step 1: Discover & Parse Test Cases (Excel / CSV)
npm run test:parse

# Step 2: Build Structured Test Plan
npm run test:plan

# Step 3: Generate Executable TypeScript Playwright Specs
npm run test:generate
```

## 2. Adding New Test Cases

Place new test case files into `test-cases/original/`:
- **Excel format**: `.xlsx` files with sheets or standard 14-column layout
- **CSV format**: `.csv` files with UTF-8 encoding

### Required Column Headers:
1. `Test Case No`: e.g. `RPP-PLAN-126`
2. `Description`: Human-readable title
3. `Test Case Type`: Positive, Negative, Validation, Boundary, State-transition, Workflow, Functional
4. `Execution Level`: Sanity, Detail, In-Depth
5. `Pre-requisite Data`: Patient info, setup requirements
6. `Test Data`: Specific amounts, dates, frequencies
7. `Expected Output`: Expected business outcome
8. `Verification Step`: Numbered steps (e.g. `1. Open... 2. Enter... 3. Assert...`)
9. `Test Case Relevance`: Feature / story tracking
10. `Device`: Desktop, Tablet, iPad
11. `Review Status`: Reviewed, Draft
12. `Active/Inactive`: Active or Inactive
13. `Status Comment`: Reason for skipping or clarification
14. `Last Updated By`: Author name

## 3. Incremental Processing

When you re-run `npm run test:parse`, the parser:
- Automatically scans new files without overwriting existing test results.
- Preserves updated status comments or enhanced steps.
- Updates the Source-to-Automation Traceability Matrix at `test-cases/test-case-mapping/mapping-report.md`.
