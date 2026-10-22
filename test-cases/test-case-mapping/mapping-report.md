# Source-to-Automation Test Case Mapping Report

**Generated At**: 2026-10-22T06:43:05.795Z

## 1. Executive Summary

| Metric | Count | Percentage |
| :--- | :--- | :--- |
| **Total Source Test Cases** | **380** | 100% |
| **Automated / Planned** | **332** | 87.4% |
| **Skipped (Inactive/Superseded)** | **37** | 9.7% |
| **Requires Clarification** | **6** | 1.6% |
| **Blocked** | **5** | 1.3% |

## 2. Module Breakdown

| Module | Total | Automated/Planned | Skipped | Clarification | Blocked |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Recurring Payment Plan** | 125 | 104 | 18 | 3 | 0 |
| **Payment Plan Setup** | 44 | 38 | 3 | 0 | 3 |
| **Plan Level Tracking** | 43 | 35 | 6 | 1 | 1 |
| **Transaction Tracking** | 45 | 41 | 3 | 0 | 1 |
| **Notification Reminder** | 48 | 44 | 3 | 1 | 0 |
| **Templates & Letters** | 37 | 32 | 4 | 1 | 0 |
| **Reconciliation & Statements** | 38 | 38 | 0 | 0 | 0 |

## 3. Detailed Traceability Matrix (Sample First 30 Rows)

| ID | Module | Title | Status | Reason / Comment |
| :--- | :--- | :--- | :--- | :--- |
| `RPP-PLAN-001` | Recurring Payment Plan | Open the Recurring Payment Plan window from Patien... | `PLANNED` | Ready for automation |
| `RPP-PLAN-002` | Recurring Payment Plan | Confirm the list view columns are complete, includ... | `PLANNED` | Ready for automation |
| `RPP-PLAN-003` | Recurring Payment Plan | Confirm the per-row Select checkbox has been remov... | `PLANNED` | Ready for automation |
| `RPP-PLAN-004` | Recurring Payment Plan | Confirm an inactive / completed plan renders with ... | `PLANNED` | We do not have any way to show the completed plan. |
| `RPP-PLAN-005` | Recurring Payment Plan | Plan Code is NOT mandatory on the payment plan and... | `PLANNED` | Ready for automation |
| `RPP-PLAN-006` | Recurring Payment Plan | Selecting a plan code populates Amount and other d... | `PLANNED` | Ready for automation |
| `RPP-PLAN-007` | Recurring Payment Plan | Setup amount overrides a manually entered amount w... | `PLANNED` | Ready for automation |
| `RPP-PLAN-008` | Recurring Payment Plan | Inactive plan code is shown red in the dropdown wi... | `PLANNED` | Ready for automation |
| `RPP-PLAN-009` | Recurring Payment Plan | Current patient balance is NOT displayed anywhere ... | `SKIPPED` | not required to show the patient balance |
| `RPP-PLAN-010` | Recurring Payment Plan | CC Surcharge shows at the patient payment-plan lev... | `SKIPPED` | "Active/Inactive: change to Inactive.
Status Comment: ""Superseded - surcharge functionality is deferred to a separate ER.""
No A:H rewrite required. Do not send this case to automation; current no-surcharge behavior is covered by RPP-PLAN-118/119/120." |
| `RPP-PLAN-011` | Recurring Payment Plan | The CC surcharge field should be removed when the ... | `SKIPPED` | "Active/Inactive: change to Inactive.
Status Comment: ""Superseded - surcharge functionality is deferred to a separate ER.""
Do not automate this case." |
| `RPP-PLAN-012` | Recurring Payment Plan | Due On shows Start Date / End Date / Term (Event S... | `PLANNED` | "NO TEST-CASE CONTENT CHANGE.
The requirement source says Yearly, Time and Occurrence must NOT be available. Mark this case Reviewed.
Execution note: if the current build shows Yearly/Time/Occurrence, log an implementation defect; do not change Expected Output to match the defect." |
| `RPP-PLAN-013` | Recurring Payment Plan | Start Date defaults to today on a new plan... | `PLANNED` | Ready for automation |
| `RPP-PLAN-014` | Recurring Payment Plan | Start/End date cannot be the same or a past date... | `PLANNED` | "Expected Output: replace with:
""The plan cannot be saved when Start Date and End Date are the same, when a new plan uses a past Start Date, or when End Date is earlier than Start Date. A date-validation indication is shown. After correcting to a valid date range, Save succeeds.""

Verification Step: replace with:
""1. Create a new plan. 2. Set Start Date and End Date to the same valid date and click Save; assert Save is blocked and date validation is shown. 3. Set Start Date to a past date and click Save; assert Save is blocked. 4. Set Start Date to a valid date and End Date earlier than Start Date; assert Save is blocked. 5. Correct the dates to a valid range and assert Save succeeds.""
Mark Reviewed after update." |
| `RPP-PLAN-015` | Recurring Payment Plan | Daily frequency removes the weekday selector on th... | `PLANNED` | "NO TEST-CASE CONTENT CHANGE.
Requirement says Daily must not show a weekday selector. Mark Reviewed.
Execution note: if weekday controls are visible for Daily in the build, log a defect against this requirement." |
| `RPP-PLAN-016` | Recurring Payment Plan | Every N accepts up to a 2-digit number for Days/We... | `PLANNED` | "Expected Output: replace with:
""Every N stores and displays at most two digits for Day(s), Week(s) and Month(s). Values 01-99 are accepted; a 3-digit value cannot be retained or saved.""

Verification Step: replace with:
""1. Create a new plan. 2. Set unit to Day(s), enter 99 and assert 99 is retained. 3. Attempt to enter 100 and assert the field never retains/saves more than two digits. 4. Repeat for Week(s). 5. Repeat for Month(s). 6. Save/reopen a valid 2-digit value and assert it persists exactly.""
Mark Reviewed after update." |
| `RPP-PLAN-017` | Recurring Payment Plan | Installments are derived from Start-End date + fre... | `PLANNED` | "Test Data: replace the hard-coded past dates with:
""Start1 = a valid future date (for example, the first day of next month); End1 = 11 monthly intervals after Start1; Every 1 Month on Start1's day; Amt1 = known installment amount.""
No other column change required." |
| `RPP-PLAN-018` | Recurring Payment Plan | Installment date math verified across frequency co... | `PLANNED` | Ready for automation |
| `RPP-PLAN-019` | Recurring Payment Plan | No End Date -> 12 installments shown by default wi... | `PLANNED` | Ready for automation |
| `RPP-PLAN-020` | Recurring Payment Plan | Installments preview: paid vs upcoming rows, next ... | `PLANNED` | Ready for automation |
| `RPP-PLAN-021` | Recurring Payment Plan | "Deduct amount only if patient has balance" defaul... | `PLANNED` | Ready for automation |
| `RPP-PLAN-022` | Recurring Payment Plan | When the patient has balance amount less than the ... | `PLANNED` | Ready for automation |
| `RPP-PLAN-023` | Recurring Payment Plan | Deduct-if-balance deducts only up to the patient b... | `PLANNED` | expected result updated |
| `RPP-PLAN-024` | Recurring Payment Plan | Deduct-if-balance + balance = 0 -> no transaction ... | `PLANNED` | Ready for automation |
| `RPP-PLAN-025` | Recurring Payment Plan | Deduct-if-balance + balance < installment -> last ... | `SKIPPED` | "Active/Inactive: change to Inactive.
Status Comment: ""Superseded - surcharge is not part of this ER; reduced-balance behavior is covered by RPP-PLAN-022/023.""
Do not automate." |
| `RPP-PLAN-026` | Recurring Payment Plan | Payment Method / card availability with and withou... | `PLANNED` | Ready for automation |
| `RPP-PLAN-027` | Recurring Payment Plan | "Use this card only for this payment plan" auto-ch... | `PLANNED` | Ready for automation |
| `RPP-PLAN-028` | Recurring Payment Plan | Without-gateway checkbox grays out Payment Method ... | `SKIPPED` | not required |
| `RPP-PLAN-029` | Recurring Payment Plan | Without-gateway prompt -> NO creates no receipt an... | `SKIPPED` | "Active/Inactive: change to Inactive.
Status Comment: ""Superseded old Without-Gateway prompt branch; use RPP-PLAN-112.""
Do not automate." |
| `RPP-PLAN-030` | Recurring Payment Plan | Agreement template preview with signature / agree-... | `PLANNED` | Ready for automation |

*(Full matrix with all 380 test cases stored in `mapping-report.json`)*
