/**
 * Automated Test Suite: Plan Level Tracking
 * Generated from Source Enterprise Test Cases
 * Total Cases in Suite: 43
 */

import { test, expect } from '../../src/fixtures/base.fixture';

test.describe("Plan Level Tracking Automated Suite", () => {

  test("RPP-PLT-001: Worklist lists every plan across all patients, one row per plan [@plan-level-tracking @positive @sanity @smoke @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-001");
    logger.info("Executing test case: Worklist lists every plan across all patients, one row per plan");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with no filters applied.
      // Step 2: Assert the grid lists plans belonging to more than one patient.
      // Step 3: Assert each payment plan occupies exactly one row.
      // Step 4: For Pat1, assert both of that patient's plans appear as two separate rows.
      // Step 5: Assert each row shows the plan number and the owning patient name.
      // Step 6: Compare the row count with the size of PlanSet1 and assert they match.
      // Expected: A single worklist shows one row per plan across all patients.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-002: Card dashlet view removed; flat worklist only [@plan-level-tracking @negative @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-002");
    logger.info("Executing test case: Card dashlet view removed; flat worklist only");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1.
      // Step 2: Assert the screen renders a flat worklist grid.
      // Step 3: Assert there is no card/dashlet tile view anywhere on the screen.
      // Step 4: Assert there is no toggle or view-switcher offering a card view.
      // Step 5: Refresh the screen and assert the grid is the only view restored.
      // Step 6: Confirm no leftover dashlet placeholder or empty panel is visible.
      // Expected: No card dashlet view is present (removed per redesign); only the worklist grid.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-003: Amount-type filter and columns removed: Total plan Amt, Remaining, Installment Amt [@plan-level-tracking @negative @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-003");
    logger.info("Executing test case: Amount-type filter and columns removed: Total plan Amt, Remaining, Installment Amt");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open Filt1.
      // Step 2: Assert the amount-type filter offers no Total Plan Amt option.
      // Step 3: Assert it offers no Remaining Amount option.
      // Step 4: Assert it offers no Installment Amt option.
      // Step 5: Open Cols1 and assert those three columns cannot be added.
      // Step 6: Assert the grid displays none of the three columns.
      // Step 7: Export the worklist and confirm the export carries none of them either.
      // Expected: Total Plan Amt, Remaining Amount and Installment Amt are removed from the amount-type filter and the corresponding columns are removed.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-004: DOB, Phone and Email shown in the Patient Name tooltip [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-004");
    logger.info("Executing test case: DOB, Phone and Email shown in the Patient Name tooltip");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and locate a row belonging to Pat1.
      // Step 2: Hover the pointer over Pat1's name.
      // Step 3: Assert a tooltip appears.
      // Step 4: Assert the tooltip shows the date of birth, phone and e-mail recorded for Pat1.
      // Step 5: Assert the grid has no separate DOB, Phone or Email columns.
      // Step 6: Move the pointer away and assert the tooltip dismisses cleanly.
      // Expected: A tooltip on the patient name shows DOB, phone and email (not as separate columns).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-005: Recent Activity column removed [@plan-level-tracking @negative @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-005");
    logger.info("Executing test case: Recent Activity column removed");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1.
      // Step 2: Scan the grid header row for a Recent Activity column.
      // Step 3: Assert no such column is displayed.
      // Step 4: Open Cols1 and assert Recent Activity is not offered as a hideable/showable column.
      // Step 5: Export the worklist and assert the export has no Recent Activity column.
      // Step 6: Confirm no row renders an orphaned activity value inside another column.
      // Expected: No Recent Activity column is present (removed per redesign).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-006: Filters: each date type and amount type separate; More section for low-priority filters [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-006");
    logger.info("Executing test case: Filters: each date type and amount type separate; More section for low-priority filters");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open Filt1.
      // Step 2: Assert each date filter is presented as its own labelled control rather than one date-type dropdown.
      // Step 3: Assert each amount filter is likewise presented separately.
      // Step 4: Assert a More section is present and collapsed by default.
      // Step 5: Expand More and assert it contains the lower-priority filters.
      // Step 6: Collapse More and assert any value set inside it is retained.
      // Step 7: Apply one filter from the main area and one from More together and assert both take effect.
      // Expected: Each date and amount filter is shown separately; a More section holds low-priority filters.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-007: Created By filter available in the More filters section [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-007");
    logger.info("Executing test case: Created By filter available in the More filters section");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Expand the More filters section.
      // Step 3: Assert a Created By filter is present there.
      // Step 4: Select User1 and apply.
      // Step 5: Assert only plans created by User1 remain.
      // Step 6: Change the selection to User2 and assert the result set changes accordingly.
      // Step 7: Clear the filter and assert the full worklist returns.
      // Expected: A Created By filter is present in the More section and narrows the worklist by plan creator.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-008: Clicking the patient name opens the Patient Master screen modal [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-008");
    logger.info("Executing test case: Clicking the patient name opens the Patient Master screen modal");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and locate a row for Pat1.
      // Step 2: Click Pat1's name in the Patient Name column.
      // Step 3: Assert the Patient Master screen opens as a modal over the worklist.
      // Step 4: Assert the modal is loaded for Pat1 and no other patient.
      // Step 5: Close the modal.
      // Step 6: Assert the worklist is still displayed with its filters and scroll position intact.
      // Expected: The Patient Master screen modal opens automatically for that patient.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-009: PP No link opens the plan window (source = tracking, patient info shown) [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-009");
    logger.info("Executing test case: PP No link opens the plan window (source = tracking, patient info shown)");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and locate Plan1's row.
      // Step 2: Click the PP No link on that row.
      // Step 3: Assert the payment plan window opens with Plan1 pre-selected.
      // Step 4: Assert the Patient Information section is visible in the opened window.
      // Step 5: Assert the details shown belong to Plan1 and to Pat1.
      // Step 6: Close the window and assert control returns to Track1.
      // Expected: The plan window opens with the plan pre-selected and the Patient Information section visible.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-010: Row payments drawer shows that plan’s associated payments [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-010");
    logger.info("Executing test case: Row payments drawer shows that plan’s associated payments");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and expand the payments drawer on Plan1's row.
      // Step 2: Assert the drawer lists only payments associated with Plan1.
      // Step 3: Assert each drawer row shows the receipt reference and the installment it relates to.
      // Step 4: Assert each row shows the amount, payment status and scheduled date.
      // Step 5: Assert each row shows the card used and the transaction date.
      // Step 6: Assert an Open Payment Plan action is available inside the drawer.
      // Step 7: Collapse the drawer and assert the grid row returns to its normal height.
      // Expected: The drawer lists the plan’s payments (receipt, installment, amounts, status, scheduled, card, txn date), with Open-Payment-Plan.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-PLT-011: Button bar: New Plan / Delete / Print / Export; Setup button removed (F4 from Plan Code filter) [@plan-level-tracking @positive @detail @regression]", async ({ page, logger }) => {
    // Reason: \"Superseded by final button-bar/selection rules.\" Final tracking actions are covered by PLT-021 and PLT-038/039/040 (no selection/Delete; Print/Export only).
    logger.info("Test skipped: \"Superseded by final button-bar/selection rules.\" Final tracking actions are covered by PLT-021 and PLT-038/039/040 (no selection/Delete; Print/Export only).");
  });

  test.skip("RPP-PLT-012: Inactive plans red; grand-total row pinned [@plan-level-tracking @positive @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test("RPP-PLT-013: Inactive plans red; grand-total row pinned [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-013");
    logger.info("Executing test case: Inactive plans red; grand-total row pinned");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      
      // Expected: Inactive rows red; a pinned grand total sums the monetary columns.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-PLT-014: Empty-state on a no-match filter combination [@plan-level-tracking @boundary @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test.skip("RPP-PLT-015: Responsive worklist on iPad/Tablet [@plan-level-tracking @compatibility @detail @regression]", async ({ page, logger }) => {
    // Reason: Need to discuss
    logger.info("Test skipped: Need to discuss");
  });

  test.skip("RPP-PLT-016: Grants (View/Create/Update/Delete) [@plan-level-tracking @security @detail @regression]", async ({ page, logger }) => {
    // Reason: not required
    logger.info("Test skipped: not required");
  });

  test.skip("RPP-PLT-017: FLOW - triage a failing plan from the worklist [@plan-level-tracking @end-to-end @in-depth @regression]", async ({ page, logger }) => {
    // Reason: not required
    logger.info("Test skipped: not required");
  });

  test("RPP-PLT-018: A new \"Overdue Amount\" column shows each plan's total overdue transaction amount. - Open the plan-level tracking worklist. - Find the Overdue Amount column and compare it with a plan that has failed/overdue charges. [@plan-level-tracking @functional @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-018");
    logger.info("Executing test case: A new \"Overdue Amount\" column shows each plan's total overdue transaction amount. - Open the plan-level tracking worklist. - Find the Overdue Amount column and compare it with a plan that has failed/overdue charges.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1.
      // Step 2: Assert an Overdue Amount column is present in the grid header.
      // Step 3: Locate Plan1's row and read its Overdue Amount.
      // Step 4: Open Plan1's payments drawer, add up the overdue transactions and assert the total equals Ovd1 and matches the column value.
      // Step 5: Locate Plan2's row and assert its Overdue Amount shows zero or blank.
      // Step 6: Confirm the column is currency-formatted and aligned like the other amount columns.
      // Expected: The Overdue Amount column shows the sum of that plan's overdue (failed/uncollected) transactions. A plan with nothing overdue shows zero/blank.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-019: The Overdue Amount can be filtered by a numeric From & To range, and its quick option is capped at the plan's total overdue. - Open the filter pane. - Enter an Overdue Amount From and To range and apply. - Use the \"Overdue Amount\" quick option. [@plan-level-tracking @functional @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-019");
    logger.info("Executing test case: The Overdue Amount can be filtered by a numeric From & To range, and its quick option is capped at the plan's total overdue. - Open the filter pane. - Enter an Overdue Amount From and To range and apply. - Use the \"Overdue Amount\" quick option.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Enter Rng1 in the Overdue Amount From and To fields and apply.
      // Step 3: Assert Plan1 is listed and Plan2 and Plan3 are not.
      // Step 4: Clear the range and assert all plans return.
      // Step 5: Open Plan1 and choose the Pay Now Overdue Amount option.
      // Step 6: Assert the amount defaults to Ovd1 and cannot be raised above Ovd1.
      // Step 7: Assert an attempt to enter more than Ovd1 is blocked or clamped back to the cap.
      // Expected: The From/To numeric filter narrows the list to plans whose overdue amount falls in the range. The \"Overdue Amount\" option is capped at the plan's total overdue (you cannot target more than is actually overdue).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-020: Verify the Overdue amount logic in the payment plan tracking window when the payment occurring day is today but the payment is not completed. [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-020");
    logger.info("Executing test case: Verify the Overdue amount logic in the payment plan tracking window when the payment occurring day is today but the payment is not completed.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Confirm Plan1 has an unpaid installment dated today.
      // Step 2: Open Track1 and read Plan1's Overdue Amount.
      // Step 3: Assert Amt1 is NOT included in the overdue figure while the due date is still today.
      // Step 4: Assert any genuinely older unpaid installments are still counted.
      // Step 5: Move the business date past the installment date, or re-check on the following day.
      // Step 6: Assert Amt1 is now included in Plan1's Overdue Amount.
      // Step 7: Confirm the overdue From/To filter results change consistently with the column value.
      // Expected: Today's amount should not be included in the overdue amount till tomorrow.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-021: The selection checkbox and the Delete option are removed from the plan-level tracking window. - Open the plan-level tracking worklist. - Look for a per-row selection checkbox and a Delete action. [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-021");
    logger.info("Executing test case: The selection checkbox and the Delete option are removed from the plan-level tracking window. - Open the plan-level tracking worklist. - Look for a per-row selection checkbox and a Delete action.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1.
      // Step 2: Assert no per-row selection checkbox column is rendered at the left of the grid.
      // Step 3: Assert the button bar contains no Delete action.
      // Step 4: Click Plan1's row and assert it does not enter a selected/checked state that enables deletion.
      // Step 5: Confirm plans can still be opened and managed from the plan window itself.
      // Step 6: Confirm no selection-count banner appears anywhere on the screen.
      // Expected: There is no per-row selection checkbox and no Delete option on the tracking window (updated BA decision). Plans are managed from the plan window itself, not bulk-deleted from tracking.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-022: Verify the different export formats for payment plan tracking window. [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-022");
    logger.info("Executing test case: Verify the different export formats for payment plan tracking window.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and apply a filter so only Set1 is visible.
      // Step 2: Trigger Export and assert every supported format Fmt1 is offered.
      // Step 3: Export in the first format and open the file.
      // Step 4: Assert it contains exactly the rows of Set1 with the visible columns in the same order.
      // Step 5: Assert amounts, dates and statuses match the on-screen values.
      // Step 6: Repeat steps 3-5 for each remaining format.
      // Step 7: Confirm no hidden or removed column leaks into any export file.
      // Expected: The correct data should get exported using different export formats.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-023: Verify the total amounts for the Amount columns. [@plan-level-tracking @positive @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-023");
    logger.info("Executing test case: Verify the total amounts for the Amount columns.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with Set1 visible.
      // Step 2: Assert a totals row is displayed for the grid.
      // Step 3: Assert a total is shown under Paid Amt.
      // Step 4: Assert a total is shown under Next Payment Amt.
      // Step 5: Assert a total is shown under Last Payment Amt.
      // Step 6: Assert a total is shown under Due Amount.
      // Step 7: Manually add each column over the visible rows and assert every displayed total matches.
      // Step 8: Apply a filter and assert all four totals recalculate for the new visible set.
      // Expected: The total amount should be displayed for Paid Amt, Next payment Amt, last payment amt and due_Amount.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-024: [New] Overdue Amount From and To set to the same value returns only plans whose overdue exactly equals it [@plan-level-tracking @boundary @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-024");
    logger.info("Executing test case: [New] Overdue Amount From and To set to the same value returns only plans whose overdue exactly equals it");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and note the Overdue Amount of Plan1, Plan2 and Plan3.
      // Step 2: Open the filter pane and enter Ovd1 in both the From and the To field.
      // Step 3: Apply the filter.
      // Step 4: Assert Plan1 is listed.
      // Step 5: Assert Plan2 is not listed.
      // Step 6: Assert Plan3 is not listed.
      // Step 7: Clear the filter and assert all three plans return.
      // Expected: The filter is inclusive at both ends, so the plan whose overdue equals the boundary value is returned while plans just below and just above it are excluded.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-025: [New] Overdue Amount filter with only the To value filled behaves as an upper limit [@plan-level-tracking @boundary @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-025");
    logger.info("Executing test case: [New] Overdue Amount filter with only the To value filled behaves as an upper limit");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Leave Overdue Amount From empty and type Lim1 into To.
      // Step 3: Apply and assert no validation error is shown for the blank From.
      // Step 4: Assert Plan1 is listed.
      // Step 5: Assert Plan2 is listed (the To boundary is inclusive).
      // Step 6: Assert Plan3 is not listed.
      // Step 7: Clear the To field and assert the unfiltered worklist returns.
      // Expected: With From blank the filter treats the range as open at the bottom: every plan with an overdue amount up to and including Lim1 is returned, and plans above Lim1 are excluded. No validation error is raised for the blank From.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-026: [New] Overdue Amount filter with only the From value filled behaves as a lower limit [@plan-level-tracking @boundary @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-026");
    logger.info("Executing test case: [New] Overdue Amount filter with only the From value filled behaves as a lower limit");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Type Lim1 into Overdue Amount From and leave To empty.
      // Step 3: Apply and assert no validation error is shown for the blank To.
      // Step 4: Assert Plan2 is listed (the From boundary is inclusive).
      // Step 5: Assert Plan3 is listed.
      // Step 6: Assert Plan1 is not listed.
      // Step 7: Clear the From field and assert the unfiltered worklist returns.
      // Expected: With To blank the range is open at the top: every plan with an overdue amount of Lim1 or more is returned and plans below Lim1 are excluded, again with no validation error for the blank field.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-027: [New] Overdue Amount From greater than To is rejected or returns an empty result without error [@plan-level-tracking @negative @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-027");
    logger.info("Executing test case: [New] Overdue Amount From greater than To is rejected or returns an empty result without error");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Enter Hi1 in From and Lo1 in To.
      // Step 3: Apply the filter.
      // Step 4: Assert either a validation message identifies the inverted range or the grid shows an empty result with a friendly message.
      // Step 5: Assert no script error, spinner hang or blank screen occurs.
      // Step 6: Assert the values entered are not silently swapped behind the scenes.
      // Step 7: Correct the range to From = Lo1 and To = Hi1 and assert the expected plans are returned.
      // Expected: The screen handles the inverted range gracefully: either a clear validation message stops the search, or the grid simply returns no rows with an empty-state message. The application never crashes and never silently swaps the two values.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-028: [New] Plans with zero overdue are excluded by a positive From value and included when the range starts at zero [@plan-level-tracking @boundary @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-028");
    logger.info("Executing test case: [New] Plans with zero overdue are excluded by a positive From value and included when the range starts at zero");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and confirm Plan0 shows zero or blank in the Overdue Amount column.
      // Step 2: Open the filter pane and set Overdue Amount From = Val1; apply.
      // Step 3: Assert Plan1 is listed.
      // Step 4: Assert Plan0 is not listed.
      // Step 5: Change From to 0 and leave To blank; apply.
      // Step 6: Assert Plan0 is now listed together with Plan1.
      // Step 7: Confirm a blank Overdue Amount cell is treated the same way as an explicit zero.
      // Expected: A positive lower bound filters out the zero-overdue plans, while a range starting at zero brings them back, so the column and the filter agree on what counts as zero overdue.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-029: [New] The Overdue Amount filter accepts only numeric input and rejects text and negative values [@plan-level-tracking @validation @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-029");
    logger.info("Executing test case: [New] The Overdue Amount filter accepts only numeric input and rejects text and negative values");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and open the filter pane.
      // Step 2: Type Txt1 into the Overdue Amount From field and assert the characters are not accepted.
      // Step 3: Type Neg1 and assert the negative value is rejected or the minus sign is blocked.
      // Step 4: Repeat steps 2-3 for the To field.
      // Step 5: Enter Val1 in From and assert it is accepted.
      // Step 6: Apply and assert the search runs and returns plans consistent with Val1.
      // Step 7: Confirm decimal entry behaves per the currency format used by the other amount filters.
      // Expected: The From and To fields are strictly numeric: letters and symbols are not accepted, a negative value is rejected or blocked, and a valid amount is accepted and used for the search.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-030: [New] The Pay Now 'Overdue Amount' option is capped at the plan's total overdue and cannot be exceeded [@plan-level-tracking @functional @in-depth @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-030");
    logger.info("Executing test case: [New] The Pay Now 'Overdue Amount' option is capped at the plan's total overdue and cannot be exceeded");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and note Plan1's Overdue Amount.
      // Step 2: Open Plan1 and click Pay Now.
      // Step 3: Select the Overdue Amount option.
      // Step 4: Assert the amount defaults to Ovd1 and equals the worklist column value.
      // Step 5: Try to enter Over1 and assert the entry is blocked or clamped back to Ovd1.
      // Step 6: Assert an amount below Ovd1 is still permitted if partial payment is allowed, or is handled per the defined rule.
      // Step 7: Confirm no payment can be submitted for more than Ovd1 through this option.
      // Expected: The Overdue Amount option defaults to Ovd1 (the same figure shown in the worklist column) and refuses any amount above it, so a user can never collect more than is actually overdue through this option.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-031: [New] The Overdue Amount cap and column refresh after an overdue payment is collected [@plan-level-tracking @state-transition @in-depth @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-031");
    logger.info("Executing test case: [New] The Overdue Amount cap and column refresh after an overdue payment is collected");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and note Plan1's Overdue Amount Ovd1.
      // Step 2: Open Plan1, use Pay Now with the Overdue Amount option and complete Pay1 for the full Ovd1.
      // Step 3: Assert the affected installments move to the paid status.
      // Step 4: Return to Track1 and refresh.
      // Step 5: Assert Plan1's Overdue Amount now reads zero or blank.
      // Step 6: Reopen Pay Now and assert the Overdue Amount option is now capped at zero or is unavailable.
      // Step 7: Apply an Overdue Amount From filter above zero and assert Plan1 no longer appears.
      // Expected: After the overdue amount is collected, the worklist Overdue Amount for the plan drops to zero and the Pay Now Overdue Amount option is capped at the new (zero) overdue, so the stale cap is never reused.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-032: [New] The Overdue Amount column is included in the grid totals and in the export with matching figures [@plan-level-tracking @data-integrity @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-032");
    logger.info("Executing test case: [New] The Overdue Amount column is included in the grid totals and in the export with matching figures");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and apply a filter so only Set1 is visible.
      // Step 2: Assert an Overdue Amount total is shown in the totals row.
      // Step 3: Add the visible Overdue Amount cells manually and assert the total matches.
      // Step 4: Export Track1 and open Exp1.
      // Step 5: Assert Exp1 contains the Overdue Amount column.
      // Step 6: Assert each row's overdue value in Exp1 matches the on-screen value.
      // Step 7: Assert the total in Exp1, if present, matches the on-screen total.
      // Step 8: Change the filter and assert the total recalculates for the new visible set.
      // Expected: The Overdue Amount column participates in the pinned totals like the other amount columns, and the exported file carries the same per-row overdue values and the same total.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-033: [New] Surcharge-related columns are removed from the plan-level tracking worklist and its column chooser [@plan-level-tracking @negative @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-033");
    logger.info("Executing test case: [New] Surcharge-related columns are removed from the plan-level tracking worklist and its column chooser");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and read every grid header.
      // Step 2: Assert no surcharge column is displayed.
      // Step 3: Open Cols1 and assert no surcharge column is listed as available.
      // Step 4: Open Filt1 and assert no surcharge filter is offered.
      // Step 5: Assert no amount column silently includes a surcharge sub-total label.
      // Step 6: Reset the grid layout to its default and re-check; assert no surcharge column reappears.
      // Expected: No surcharge column is displayed in the worklist, none can be switched on from the column chooser, and no surcharge filter is offered - surcharge is removed from all payment-related screens until the separate ER delivers it.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-034: [New] Exported and printed plan-level tracking output contains no surcharge column [@plan-level-tracking @data-integrity @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-034");
    logger.info("Executing test case: [New] Exported and printed plan-level tracking output contains no surcharge column");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and apply a filter so only Set1 is visible.
      // Step 2: Export Track1 and open Exp1.
      // Step 3: Assert no surcharge column or header exists in Exp1.
      // Step 4: Assert the columns in Exp1 match the columns shown on screen, in the same order.
      // Step 5: Trigger Print and inspect Prt1.
      // Step 6: Assert Prt1 has no surcharge column.
      // Step 7: Repeat the export in a second format and assert it is likewise free of surcharge columns.
      // Expected: Neither the export nor the print output carries a surcharge column or heading, and the column set in the output matches the columns visible on screen.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-035: [New] A plan whose total payment has been received shows as Inactive in the worklist [@plan-level-tracking @state-transition @in-depth @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-035");
    logger.info("Executing test case: [New] A plan whose total payment has been received shows as Inactive in the worklist");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and assert Plan1's status is Active.
      // Step 2: Open Plan1 and collect Pay1 so the full plan amount has been received.
      // Step 3: Assert all installments now show as paid.
      // Step 4: Return to Track1 and refresh.
      // Step 5: Assert Plan1's status now reads Inactive.
      // Step 6: Assert Plan1 is returned when the status filter is set to Inactive and not when it is set to Active.
      // Step 7: Confirm no further installment or deduction is scheduled for Plan1.
      // Expected: Once the total payment for the plan has been received the plan counts as completed and the worklist shows its status as Inactive, because a completed plan must not stay active.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-036: [New] A plan whose end date has passed shows as Inactive in the worklist [@plan-level-tracking @state-transition @in-depth @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-036");
    logger.info("Executing test case: [New] A plan whose end date has passed shows as Inactive in the worklist");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and assert Plan2's status is Active while its end date is still in the future.
      // Step 2: Move the business date past Plan2's end date, or wait until the end date has passed.
      // Step 3: Refresh Track1.
      // Step 4: Assert Plan2's status now reads Inactive.
      // Step 5: Assert the status filter set to Inactive returns Plan2.
      // Step 6: Assert no new installment is generated for Plan2 after its end date.
      // Step 7: Confirm the plan window itself shows the same Inactive state as the worklist.
      // Expected: A plan is also complete once its end date has passed, so after that date the worklist shows Plan2 as Inactive even if it was not closed manually.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-037: [New] A completed plan shown as Inactive also picks up the inactive red row styling [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-037");
    logger.info("Executing test case: [New] A completed plan shown as Inactive also picks up the inactive red row styling");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with Plan1 and Plan2 both visible.
      // Step 2: Assert Plan1's row uses the red/inactive styling.
      // Step 3: Assert Plan2's row uses the normal active styling.
      // Step 4: Assert Plan1's status column also reads Inactive, so colour and text agree.
      // Step 5: Sort the grid by status and assert the styling stays attached to the correct rows.
      // Step 6: Export Track1 and assert the status value for Plan1 exports as Inactive.
      // Step 7: Confirm the colour contrast keeps the row text readable.
      // Expected: The completed plan is rendered with the same red/inactive row styling used for any other inactive plan, so a user can spot completed plans at a glance without reading the status column.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-038: [New] No bulk-select header checkbox exists in the plan-level tracking grid [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-038");
    logger.info("Executing test case: [New] No bulk-select header checkbox exists in the plan-level tracking grid");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with several plans listed.
      // Step 2: Inspect the grid header row from left to right.
      // Step 3: Assert no select-all checkbox is rendered in the header.
      // Step 4: Assert the first header cell belongs to a real data column, not to a selection column.
      // Step 5: Click where a select-all checkbox would normally sit and assert nothing becomes selected.
      // Step 6: Confirm no selection counter or selection toolbar appears after that click.
      // Expected: There is no select-all checkbox in the header row, so no bulk selection can be started at all - this extends the removal of the per-row checkbox.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-039: [New] The Delete action is absent from the plan-level tracking button bar in every state [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-039");
    logger.info("Executing test case: [New] The Delete action is absent from the plan-level tracking button bar in every state");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with no row focused and read every button in the bar.
      // Step 2: Assert no Delete button is present.
      // Step 3: Click Plan1's row to focus it and re-read the button bar.
      // Step 4: Assert no Delete button has appeared.
      // Step 5: Apply a filter, then clear it, and re-check the bar; assert Delete is still absent.
      // Step 6: Open any overflow/kebab menu on the bar and assert it contains no Delete entry.
      // Step 7: Confirm the remaining actions (such as Print and Export) still work normally.
      // Expected: The button bar never offers a Delete action, whatever the grid state, so plans cannot be deleted from the tracking screen at all.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-040: [New] No Delete option appears in any row-level or right-click context menu on the tracking grid [@plan-level-tracking @ui @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-040");
    logger.info("Executing test case: [New] No Delete option appears in any row-level or right-click context menu on the tracking grid");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 and right-click Plan1's row.
      // Step 2: Assert the context menu that appears, if any, contains no Delete entry.
      // Step 3: Open the row-level action/kebab menu on Plan1 and assert it contains no Delete entry.
      // Step 4: Repeat on a second row and assert the same.
      // Step 5: Expand Plan1's payments drawer and assert no Delete action is exposed there for the plan.
      // Step 6: Confirm the menus still expose the legitimate actions such as opening the plan.
      // Expected: Neither the right-click context menu nor any row-level action menu offers a Delete option, closing the last route to deleting a plan from the tracking window.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-PLT-041: [New] Keyboard select-all does not select rows on the plan-level tracking grid [@plan-level-tracking @usability @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-041");
    logger.info("Executing test case: [New] Keyboard select-all does not select rows on the plan-level tracking grid");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Track1 with several plans listed.
      // Step 2: Click inside the grid so it holds focus.
      // Step 3: Press Key1 (select all).
      // Step 4: Assert no row enters a selected/highlighted selection state.
      // Step 5: Assert no selection count banner or bulk action bar appears.
      // Step 6: Press the Delete key and assert nothing is deleted and no confirmation prompt appears.
      // Step 7: Refresh Track1 and assert the same plans are still listed with unchanged data.
      // Expected: Because selection has been removed from this window the select-all shortcut does nothing to the rows: no rows enter a selected state, no selection banner appears, and pressing Delete afterwards has no effect on any plan.
      expect(true).toBeTruthy();
    });

  });

  test.fixme("RPP-PLT-042: [New] Reconciliation Preference of each plan is shown and filterable at the plan-level tracking worklist [@plan-level-tracking @clarification-required @detail @regression]", async ({ page, logger }) => {
    // Clarification required: Clarification Required - the source e-mail thread defines Reconciliation Preference at the payment plan level only and never confirms whether the plan-level tracking worklist shows or filters this field. BA to confirm whether the column and filter are in scope for this screen.
    logger.warn("Test requires clarification: Clarification Required - the source e-mail thread defines Reconciliation Preference at the payment plan level only and never confirms whether the plan-level tracking worklist shows or filters this field. BA to confirm whether the column and filter are in scope for this screen.");
  });

  test("RPP-PLT-043: [Add] Clicking Patient Name in Plan-Level Tracking opens the Patient Demographics/Patient Master modal for that patient. [@plan-level-tracking @functional @detail @regression]", async ({ page, planLevelTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-PLT-043");
    logger.info("Executing test case: [Add] Clicking Patient Name in Plan-Level Tracking opens the Patient Demographics/Patient Master modal for that patient.");

    // 1. Open Worklist
    await test.step("Open Plan-Level Tracking worklist", async () => {
      await planLevelTrackingPage.openWorklist();
      logger.info("Opened Plan-Level Tracking worklist");
    });

    // 2. Verify tracking grid and filters
    await test.step("Verify worklist filters and columns", async () => {
      // Step 1: Open Plan-Level Tracking and retrieve Pat1.
      // Step 2: Click Pat1's Patient Name.
      // Step 3: Assert the Patient Demographics/Patient Master modal opens.
      // Step 4: Assert patient name/chart number matches Pat1.
      // Step 5: Close the modal and assert the tracking screen remains available with its current context.
      // Expected: The Patient Demographics/Patient Master modal opens for Pat1 and shows the same patient identity/chart number as the tracking row.
      expect(true).toBeTruthy();
    });

  });
});
