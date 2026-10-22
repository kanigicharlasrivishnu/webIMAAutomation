# Enterprise Self-Healing UI Automation Framework

[![Playwright](https://img.shields.io/badge/Playwright-v1.64.1-green.svg)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.8.2-blue.svg)](https://www.typescriptlang.org/)
[![Allure](https://img.shields.io/badge/Allure-v2.32.0-orange.svg)](https://allurereport.org/)
[![License](https://img.shields.io/badge/License-ISC-purple.svg)](LICENSE)

An enterprise-grade UI automation framework built with **TypeScript**, **Playwright Test**, **Page Object Model (POM)**, **AI-Powered Test Planner**, **Automated Test Script Generator**, and a **Controlled Self-Healing System**.

The framework parses real business test scenarios directly from Excel (`.xlsx`) and CSV files, builds structured execution plans, generates maintainable POM-based Playwright test specs, executes with 5 retries, captures attempt-specific diagnostic evidence, renders Allure & Playwright HTML reports, and proposes safe, validated healing diffs.

---

## 1. Enterprise Project Structure

```text
enterprise-playwright-framework/
├── test-cases/
│   ├── original/                     # Raw business test case files (Excel & CSV)
│   ├── parsed/                       # Normalized test case catalog (test-cases.json)
│   └── test-case-mapping/            # Traceability matrix (mapping-report.json & .md)
├── src/
│   ├── config/
│   │   ├── environment.ts            # Strongly typed environment configuration
│   │   └── framework.config.ts       # Framework paths, retries, and healing options
│   ├── fixtures/
│   │   ├── base.fixture.ts           # Master fixture (POMs, attempt tracking, logger)
│   │   ├── auth.fixture.ts           # Isolated session & storage state reuse
│   │   └── test-data.fixture.ts      # Patient, card, and plan template payloads
│   ├── pages/
│   │   ├── BasePage.ts               # Core page base class
│   │   ├── LoginPage.ts              # Authentication & clinic login
│   │   ├── RecurringPaymentPlanPage.ts # Patient Master > Payment Plan
│   │   ├── PaymentPlanSetupPage.ts   # Master-detail plan code template setup
│   │   ├── PlanLevelTrackingPage.ts  # Worklist grid, filters, and drawer
│   │   ├── PaymentTransactionTrackingPage.ts # Transaction tracking & refunds
│   │   └── NotificationReminderPage.ts # Preferences & reminder configurations
│   ├── components/
│   │   ├── AgreementModal.ts         # 5-section agreement preview & execution
│   │   ├── PayNowModal.ts            # Four Pay Now options & validation
│   │   └── ReceiptModal.ts           # Post-payment receipt & deletion
│   ├── utils/
│   │   ├── logger.ts                 # Redacted structured JSON & console logging
│   │   ├── locator-helper.ts         # Resilient accessible locator resolution
│   │   ├── test-case-parser.ts       # Multi-format Excel & CSV parser
│   │   ├── test-data-loader.ts       # Test dataset provider
│   │   └── failure-analyzer.ts       # Failure classification & diagnostic summaries
│   ├── planners/
│   │   └── test-planner.ts           # Test feasibility, POM & fixture mapping
│   ├── generators/
│   │   ├── test-generator.ts         # Generates POM-based TypeScript Playwright tests
│   │   └── pom-generator.ts          # Generates Page Object Model classes
│   ├── healing/
│   │   ├── healer.ts                 # Self-healing engine (modes: off, suggest, approved)
│   │   └── healing-review.ts         # Interactive/CLI healing proposal review
│   └── types/
│       └── test-case.types.ts        # Core TypeScript interfaces
├── tests/
│   ├── setup/
│   │   └── auth.setup.ts             # Session authentication & storage state generator
│   └── generated/                    # 380 Generated Playwright test specs
│       ├── recurring-payment-plan.spec.ts
│       ├── payment-plan-setup.spec.ts
│       ├── plan-level-tracking.spec.ts
│       ├── transaction-tracking.spec.ts
│       ├── notification-reminder.spec.ts
│       ├── templates-letters.spec.ts
│       └── reconciliation-statements.spec.ts
├── test-data/                        # Sample fixtures and external test datasets
├── auth/                             # Storage state (user-state.json - gitignored)
├── logs/                             # Execution logs & failure summaries
├── test-results/                     # Screenshots, traces, and attempt videos
├── playwright-report/                # Playwright HTML report
├── allure-results/                   # Allure raw JSON results & environment metrics
├── allure-report/                    # Generated Allure static HTML report
├── scripts/
│   ├── run-tests.ts                  # Execution engine CLI
│   ├── generate-allure.ts            # Allure report generation
│   ├── launch-codegen.ts             # Playwright Codegen launcher
│   ├── lint-check.ts                 # TypeScript typecheck
│   └── format-check.ts               # Formatting validator
├── docs/                             # Complete architecture & operational guides
├── .env.example                      # Configuration template
├── .env                              # Active environment configuration
├── .gitignore                        # Git exclusion rules
├── package.json                      # NPM dependencies & scripts
├── tsconfig.json                     # TypeScript compiler configuration
└── playwright.config.ts              # Playwright test runner configuration
```

---

## 2. Test Case Traceability Summary

The framework parsed the entire enterprise test repository (**380 unique test cases**):

| Module | Total Test Cases | Automated / Planned | Skipped (Inactive) | Clarification | Blocked |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Recurring Payment Plan** | 125 | 104 | 18 | 3 | 0 |
| **Payment Plan Setup** | 44 | 38 | 3 | 0 | 3 |
| **Plan Level Tracking** | 43 | 35 | 6 | 1 | 1 |
| **Transaction Tracking** | 45 | 41 | 3 | 0 | 1 |
| **Notification Reminder** | 48 | 44 | 3 | 1 | 0 |
| **Templates & Letters** | 37 | 32 | 4 | 1 | 0 |
| **Reconciliation & Statements** | 38 | 38 | 0 | 0 | 0 |
| **TOTAL** | **380** | **332 (87.4%)** | **37 (9.7%)** | **6 (1.6%)** | **5 (1.3%)** |

---

## 3. NPM Command Quick Reference

| Command | Description |
| :--- | :--- |
| `npm run test:parse` | Discovers and parses test cases from Excel (`.xlsx`) and CSV into `test-cases.json` |
| `npm run test:plan` | Executes the AI Test Planner to generate `test-plan.json` |
| `npm run test:generate` | Generates 380 POM-based TypeScript Playwright tests into `tests/generated/` |
| `npm run test:smoke` | Executes smoke/sanity tests (`@smoke` tag) |
| `npm run test:regression` | Executes full regression test suite (`@regression` tag) |
| `npm run test:all` | Executes all test suites across the project |
| `npm run test:headed` | Runs tests in headed mode with visible browser window |
| `npm run test:debug` | Launches Playwright Inspector for interactive step-by-step debugging |
| `npm run test:report` | Opens the local Playwright HTML report |
| `npm run test:allure` | Generates Allure HTML report from `allure-results/` |
| `npm run test:allure:open`| Serves and opens the generated Allure report in browser |
| `npm run test:heal:analyze`| Analyzes test failure summaries and generates self-healing proposals |
| `npm run test:heal:review` | Interactively reviews and approves/rejects proposed healing diffs |
| `npm run codegen` | Launches Playwright Codegen with optional storage state and base URL |
| `npm run lint` | Runs static type check (`npx tsc --noEmit`) |
| `npm run format` | Checks file formatting and character encodings |

---

## 4. Key Architectural Features

### 4.1 Five-Retry Policy
In accordance with framework requirements, `playwright.config.ts` enforces:
```typescript
retries: 5
```
This represents **1 initial attempt + 5 retries = 6 maximum attempts**. Every attempt captures its own screenshot, video, trace, and structured failure summary to identify whether tests are flaky or consistently failing.

### 4.2 Reusable Authentication State
Tests do not execute repetitive UI login forms. The `auth.setup.ts` setup project generates session cookies and storage state once into `auth/user-state.json`. Independent parallel workers load this storage state, saving hundreds of seconds across test suites.

### 4.3 Controlled Self-Healing
Operates in three modes (`suggest` by default, `approved`, and `off`). The healer suggests minimal selector fixes (e.g. migrating fragile CSS to accessible `getByRole` or `getByLabel`), stores diffs in `logs/healing-proposals.json`, generates `logs/healing-report.md`, and **strictly forbids altering business logic or weakening assertions**.

### 4.4 Secret Redaction & PCI Compliance
Full credit card PANs (13–16 digits), passwords, session tokens, and sensitive auth data are automatically masked (`****-****-****-XXXX`) by the logging utility (`src/utils/logger.ts`) before being written to disk or console.
