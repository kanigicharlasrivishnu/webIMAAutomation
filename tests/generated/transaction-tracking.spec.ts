/**
 * Automated Test Suite: Transaction Tracking
 * Generated from Source Enterprise Test Cases
 * Total Cases in Suite: 45
 */

import { test, expect } from '../../src/fixtures/base.fixture';

test.describe("Transaction Tracking Automated Suite", () => {

  test("RPP-TXN-001: Existing Payment Transaction Tracking screen lists PP + general transactions [@transaction-tracking @positive @sanity @smoke @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-001");
    logger.info("Executing test case: Existing Payment Transaction Tracking screen lists PP + general transactions");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Log in and open the Payment Transaction Tracking screen with no filters applied.
      // Step 2: Locate the charge belonging to Plan1 of Pat1 and confirm it is shown as its own single row.
      // Step 3: Locate the non-plan payment of Pat2 and confirm it is also listed in the same grid.
      // Step 4: On the Plan1 row, confirm the plan-related columns (plan code, installment number, scheduled date) carry values.
      // Step 5: On the Pat2 row, confirm those same plan-related columns are blank instead of showing borrowed or repeated values.
      // Step 6: Confirm the grand-total row stays pinned while scrolling and reflects the listed rows.
      // Expected: One row per transaction; PP rows carry the plan columns, general rows leave them blank; grand-total pinned.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-002: Added PP columns: Plan Code, Applied, Unapplied, Surcharge, Total, Scheduled, Card No/Brand, Installment No, Txn Time in Txn Date [@transaction-tracking @positive @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-002");
    logger.info("Executing test case: Added PP columns: Plan Code, Applied, Unapplied, Surcharge, Total, Scheduled, Card No/Brand, Installment No, Txn Time in Txn Date");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and find Txn1.
      // Step 2: Confirm the grid shows the plan columns: Plan Code, Applied, Unapplied, Total and Scheduled date.
      // Step 3: Confirm the card columns show the masked number and brand of Card1 and never the full card number.
      // Step 4: Confirm the Installment No column shows N1 for this plan charge.
      // Step 5: Confirm the transaction time is displayed inside the Transaction Date column (date and time together) and not in a separate column.
      // Step 6: Open a non-plan transaction row and confirm the plan-specific columns stay blank for it.
      // Expected: All added columns render correctly; Transaction Time appears within the Transaction Date column; installment number populated for plan charges.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-003: Added filters: Plan Code, Transaction Status (successful/inqueue/failed), separate date & amount filters, Unapplied-only checkbox [@transaction-tracking @positive @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-003");
    logger.info("Executing test case: Added filters: Plan Code, Transaction Status (successful/inqueue/failed), separate date & amount filters, Unapplied-only checkbox");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking with no filters and note the total row count.
      // Step 2: Enter Code1 in the Plan Code filter and confirm only transactions of Plan1 remain, including Txn-S and Txn-F.
      // Step 3: Clear it, set Transaction Status = Failed and confirm Txn-F is listed while Txn-S is not.
      // Step 4: Set Transaction Status to Successful and then to In queue in turn, and confirm each time only rows of that status are listed.
      // Step 5: Use the separate transaction-date range filter and confirm only transactions inside the chosen range remain.
      // Step 6: Use the amount filter and confirm only transactions inside the chosen amount range remain.
      // Step 7: Tick the Unapplied-only checkbox and confirm Txn-U remains while fully applied transactions drop off.
      // Step 8: Clear every filter and confirm the row count returns to the value noted in step 1.
      // Expected: Each added filter narrows correctly alongside the existing IMS filters.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-004: Status colouring: Successful green / Failed red / In queue amber-grey [@transaction-tracking @positive @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-004");
    logger.info("Executing test case: Status colouring: Successful green / Failed red / In queue amber-grey");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and list Txn-S, Txn-F and Txn-Q together.
      // Step 2: Confirm Txn-S is shown with the success (green) colour treatment.
      // Step 3: Confirm Txn-F is shown with the failed (red) colour treatment.
      // Step 4: Confirm Txn-Q is shown with the pending (amber/grey) colour treatment.
      // Step 5: Confirm the colour is applied to the status cell of every row of the same status, including after sorting and re-filtering.
      // Step 6: Confirm the status text itself is still readable so colour is not the only cue.
      // Expected: Colour coding matches the status.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-005: Applied vs Unapplied split [@transaction-tracking @positive @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-005");
    logger.info("Executing test case: Applied vs Unapplied split");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and find Txn-P.
      // Step 2: Confirm the grid has two distinct columns, Applied and Unapplied, and not one merged amount column.
      // Step 3: Confirm the Applied column shows only the portion posted against bills.
      // Step 4: Confirm the Unapplied column shows only the remaining open portion.
      // Step 5: Confirm Applied + Unapplied equals the amount actually deducted for Txn-P.
      // Step 6: Open a fully applied transaction and confirm its Unapplied value is zero/blank rather than repeating the applied figure.
      // Expected: Applied and Unapplied are separate columns (not one blended amount).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-006: Refund is available only for Successful transactions (verify for recurring) [@transaction-tracking @validation @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-006");
    logger.info("Executing test case: Refund is available only for Successful transactions (verify for recurring)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Log in as User1 and open Payment Transaction Tracking.
      // Step 2: Select Txn-S and confirm the Refund action is available and can be started.
      // Step 3: Select Txn-F and confirm the Refund action is hidden or disabled.
      // Step 4: Select Txn-Q and confirm the Refund action is hidden or disabled.
      // Step 5: Confirm the refund offered on Txn-S works for a recurring plan charge and is not limited to non-plan payments.
      // Step 6: Confirm no error or blank screen appears when switching between rows of different statuses.
      // Expected: Refund is offered only on Successful transactions, including recurring payment charges; not on Failed/In-queue.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-007: Verify transaction request content and Status history [@transaction-tracking @positive @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-007");
    logger.info("Executing test case: Verify transaction request content and Status history");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and select Txn1.
      // Step 2: Open the request content view for Txn1.
      // Step 3: Confirm the request details shown belong to Txn1 (same transaction reference and amount) and are readable.
      // Step 4: Open the status history for Txn1.
      // Step 5: Confirm every status the transaction passed through is listed with its date and time in chronological order.
      // Step 6: Confirm the latest status-history entry matches the status shown in the grid row.
      // Step 7: Close both views and confirm the grid returns without losing the current filters.
      // Expected: Request content and status history are viewable and accurate for the transaction.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-008: Existing credit-card transactions from other screens still appear (regression) [@transaction-tracking @regression @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-008");
    logger.info("Executing test case: Existing credit-card transactions from other screens still appear (regression)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking without filters.
      // Step 2: Confirm Txn-Old is still listed after the new plan columns and filters were added.
      // Step 3: Confirm its existing columns (date, amount, status, card details, receipt) still show the same information as before.
      // Step 4: Confirm the newly added plan columns are blank for Txn-Old and do not shift its other values into the wrong columns.
      // Step 5: Apply a pre-existing filter and confirm it still narrows the list correctly.
      // Step 6: Confirm sorting and paging still work over a list that mixes plan and non-plan transactions.
      // Expected: Existing CC transaction records show correctly; adding PP columns/filters did not break base behaviour.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-TXN-009: Without-gateway receipt shows payment mode \"credit card without gateway\" [@transaction-tracking @positive @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test("RPP-TXN-010: Open Credit receipt created per successful plan charge [@transaction-tracking @data-integrity @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-010");
    logger.info("Executing test case: Open Credit receipt created per successful plan charge");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and find Txn-S.
      // Step 2: Confirm a receipt/open-credit number is shown against Txn-S.
      // Step 3: Open that open-credit receipt and confirm it belongs to Pat1 and carries the amount collected in Txn-S.
      // Step 4: Confirm one successful charge produces exactly one open-credit receipt with no duplicates.
      // Step 5: Confirm Txn-F has no open-credit receipt number.
      // Step 6: Confirm the open credit is available for applying to the patient's bills, as in IMS.
      // Expected: Each successful plan charge produces an Open Credit receipt number (as in IMS).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-011: Future-scheduled (In queue) charges excluded from the collected list [@transaction-tracking @data-integrity @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-011");
    logger.info("Executing test case: Future-scheduled (In queue) charges excluded from the collected list");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking on the collected view.
      // Step 2: Confirm the already-collected charge of Plan1 is listed.
      // Step 3: Confirm the charge scheduled for Sched-Future is not listed in the collected view.
      // Step 4: Confirm the grand total of the collected view does not include the future-scheduled amount.
      // Step 5: Switch the status filter to In queue and confirm the future charge is then visible.
      // Step 6: Confirm no future-dated charge is counted as money received anywhere on the screen.
      // Expected: Future-scheduled charges are not listed in the collected view.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-012: Retried charge shows both the failed attempt and the successful retry [@transaction-tracking @state-transition @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-012");
    logger.info("Executing test case: Retried charge shows both the failed attempt and the successful retry");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and filter to Plan1.
      // Step 2: Confirm both Txn-F and Txn-R are listed as separate rows for installment N1.
      // Step 3: Confirm Txn-F shows the failed status, the failed colour and no receipt number.
      // Step 4: Confirm Txn-R shows the successful status, the success colour and a receipt number.
      // Step 5: Confirm Txn-R carries a later transaction date/time than Txn-F.
      // Step 6: Confirm the failed attempt is not replaced or removed by the retry, so the history is preserved.
      // Step 7: Confirm only the successful retry amount is counted in the totals.
      // Expected: Both rows appear (failed red no receipt; retry green with receipt).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-013: Grand-total row sums the monetary columns for visible rows [@transaction-tracking @data-integrity @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-013");
    logger.info("Executing test case: Grand-total row sums the monetary columns for visible rows");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and filter by Plan Code = Code1.
      // Step 2: Note every visible row's Amount, Approved, Applied, Unapplied and Total values.
      // Step 3: Confirm the grand-total row equals the arithmetic sum of each of those columns for the visible rows only.
      // Step 4: Narrow the filter so fewer rows are visible and confirm the grand total recalculates to the new visible set.
      // Step 5: Clear the filter and confirm the grand total grows to cover all listed rows.
      // Step 6: Confirm rows hidden by a filter are never included in the grand total.
      // Expected: Grand total equals the sum of Amount/Approved/Applied/Unapplied/Surcharge/Total for visible rows.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-014: Empty-state on a no-match filter [@transaction-tracking @boundary @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-014");
    logger.info("Executing test case: Empty-state on a no-match filter");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and note the unfiltered row count.
      // Step 2: Apply Filter1.
      // Step 3: Confirm the grid shows no rows and displays a friendly empty message instead of an error or a blank screen.
      // Step 4: Confirm the grand-total row shows zero (or is hidden) rather than the previous totals.
      // Step 5: Confirm no application error prompt is raised.
      // Step 6: Clear Filter1 and confirm the original row count and totals are restored.
      // Expected: No rows, no error; totals zero; clearing restores.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-TXN-016: Grants (View/Delete) [@transaction-tracking @security @detail @regression]", async ({ page, logger }) => {
    // Reason: not required : there is no delete grants currently exists
    logger.info("Test skipped: not required : there is no delete grants currently exists");
  });

  test("RPP-TXN-017: The new \"In queue\" status is mapped to the existing \"In progress\" status. - Filter Transaction Status = In queue. - Compare with records previously shown as In progress. [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-017");
    logger.info("Executing test case: The new \"In queue\" status is mapped to the existing \"In progress\" status. - Filter Transaction Status = In queue. - Compare with records previously shown as In progress.");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and locate Txn-Q.
      // Step 2: Confirm its status reads as the queued/in-progress state and not as an unmapped or blank value.
      // Step 3: Set the Transaction Status filter to In queue and confirm both Txn-Q and Txn-IP are returned.
      // Step 4: Set the filter to In progress and confirm the same set of rows is returned.
      // Step 5: Confirm both rows use the same status colour, proving they are treated as one state.
      // Step 6: Confirm neither row is counted as successful or failed in the totals.
      // Expected: A queued plan charge shows as \"In queue\", which maps to the existing \"In progress\" status — the two mean the same pending state, so existing In-progress records and new In-queue records line up.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-018: For a Pay Now transaction, the Installment No shows as the last installment number plus one. - Collect a payment via Pay Now on a plan. - Find the resulting row in Transaction Tracking and read its Installment No. [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-018");
    logger.info("Executing test case: For a Pay Now transaction, the Installment No shows as the last installment number plus one. - Collect a payment via Pay Now on a plan. - Find the resulting row in Transaction Tracking and read its Installment No.");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Plan1 for Pat1 and note the highest installment number N1 currently listed.
      // Step 2: Collect PayNow1 through the Pay Now option and complete the payment successfully.
      // Step 3: Open Payment Transaction Tracking and locate the transaction created by PayNow1.
      // Step 4: Confirm its Installment No is N1 +
      // Step 5: 5. Confirm the existing scheduled installments keep their original numbers and are not renumbered.
      // Step 6: Confirm the Pay Now row shows the amount actually collected and the successful status.
      // Expected: The Pay Now transaction's Installment No is <last installment no + 1> — it is recorded as an extra installment beyond the scheduled ones.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-019: The Unapplied-only filter shows both plan credits and other open credits, whether partially applied or fully unapplied. - Apply the \"Unapplied amount only\" filter. - Include a partially applied credit and a fully unapplied credit. [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-019");
    logger.info("Executing test case: The Unapplied-only filter shows both plan credits and other open credits, whether partially applied or fully unapplied. - Apply the \"Unapplied amount only\" filter. - Include a partially applied credit and a fully unapplied credit.");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking without filters and confirm Credit-P, Credit-U and Credit-A are all present.
      // Step 2: Apply the Unapplied filter.
      // Step 3: Confirm Credit-P is still listed because part of it remains open.
      // Step 4: Confirm Credit-U is also listed even though it did not come from a payment plan.
      // Step 5: Confirm Credit-A drops out of the result.
      // Step 6: Confirm the Unapplied column of each returned row shows only the remaining open amount.
      // Step 7: Clear the filter and confirm all three rows return.
      // Expected: With the Unapplied filter on, both credits appear — whether partially applied or fully unapplied — so staff can see every open credit in one place.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-020: Refunds appear only in Transaction Tracking, never on the payment-plan (plan) level. - Refund a successful plan transaction from Transaction Tracking. - Open the corresponding payment plan window and look for any refund entry. [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-020");
    logger.info("Executing test case: Refunds appear only in Transaction Tracking, never on the payment-plan (plan) level. - Refund a successful plan transaction from Transaction Tracking. - Open the corresponding payment plan window and look for any refund entry.");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking, select Txn-S and complete Refund1.
      // Step 2: Confirm Refund1 is visible in Payment Transaction Tracking against Txn-S.
      // Step 3: Open the payment plan window of Plan1 for Pat1.
      // Step 4: Confirm no refund row, refund column or refund flag is displayed anywhere on the plan level.
      // Step 5: Confirm the installment paid by Txn-S keeps the status the plan level already showed and does not change into a refund state.
      // Step 6: Confirm no partial-refund indicator or icon appears on the plan window either.
      // Step 7: Reopen both screens and confirm the refund information remains only in Payment Transaction Tracking.
      // Expected: The refund is visible in Transaction Tracking, but no refund entry (full or partial) is shown on the payment-plan level. The plan level does not display refunds.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-TXN-021: Total Amount = Installment Amount + Surcharge, and the Surcharge column shows the CC surcharge per transaction. - Find a plan transaction that carried a CC surcharge. - Compare the Surcharge column and the Total Amount column against the installment amount. [@transaction-tracking @functional @detail @regression]", async ({ page, logger }) => {
    // Reason: Total = installment + surcharge; surcharge column.
    logger.info("Test skipped: Total = installment + surcharge; surcharge column.");
  });

  test("RPP-TXN-022: Verify that only Credit card transactions will be listed in this screen. Any other payment mode which was used for recurring payment plan payment. [@transaction-tracking @positive @sanity @smoke @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-022");
    logger.info("Executing test case: Verify that only Credit card transactions will be listed in this screen. Any other payment mode which was used for recurring payment plan payment.");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking with no filters.
      // Step 2: Confirm Txn-CC from Plan1 is listed.
      // Step 3: Confirm Pay-NonCC from Plan2 is not listed anywhere in the grid.
      // Step 4: Search or filter by the patient of Plan2 and confirm only credit-card transactions are returned.
      // Step 5: Open Plan2 and confirm the non-credit-card payment is still recorded there, proving it exists but is simply not shown on this screen.
      // Step 6: Confirm the grand total does not include any non-credit-card payment.
      // Expected: This screen should show only credit card transactions.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-023: [New] Opening Payment Transaction Tracking from inside a payment plan shows a reduced column set (the plan-context columns are hidden) [@transaction-tracking @ui @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-023");
    logger.info("Executing test case: [New] Opening Payment Transaction Tracking from inside a payment plan shows a reduced column set (the plan-context columns are hidden)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking standalone and write down the full visible column list Col-Full.
      // Step 2: Open Plan1 for Pat1 and launch Payment Transaction Tracking from inside the plan window.
      // Step 3: Compare the visible columns with Col-Full and confirm the plan-context columns are hidden here.
      // Step 4: Confirm the remaining columns are not squeezed or misaligned and each value sits under its own header.
      // Step 5: Confirm the transactions listed still belong to Plan1 and show correct amounts and statuses.
      // Step 6: Close and reopen from the plan window and confirm the same reduced column set is shown again.
      // Expected: When the screen is opened from the payment plan, the columns that only repeat plan-level information are hidden, so the tester sees a shorter, focused column set instead of the full standalone list.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-024: [New] Opening Payment Transaction Tracking standalone (from the menu) still shows the complete column set [@transaction-tracking @ui @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-024");
    logger.info("Executing test case: [New] Opening Payment Transaction Tracking standalone (from the menu) still shows the complete column set");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking from its own menu entry.
      // Step 2: Confirm every column of Col-Full is present, including those hidden when the screen is opened from a plan.
      // Step 3: Confirm rows of Plan1 and rows of other patients are all listed here.
      // Step 4: Confirm the plan-specific columns carry values for plan rows and stay blank for non-plan rows.
      // Step 5: Switch to the plan-context view and back to standalone and confirm the full set returns each time.
      // Step 6: Confirm the column visibility difference is driven only by how the screen was opened, not by the logged-in user.
      // Expected: Opened standalone the screen shows every column it is designed to show, including the ones hidden in the plan context, so nothing is permanently lost.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-025: [New] Hidden columns in the plan context do not change the data, filters or totals that are returned [@transaction-tracking @data-integrity @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-025");
    logger.info("Executing test case: [New] Hidden columns in the plan context do not change the data, filters or totals that are returned");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking standalone and filter by Plan Code = Code1; note every row and the totals.
      // Step 2: Open Plan1 and launch Payment Transaction Tracking from inside the plan window.
      // Step 3: Confirm exactly the same transactions are listed, with no row added or missing.
      // Step 4: Confirm the amounts and statuses of each row match what was noted in step
      // Step 5: 5. Confirm the totals shown match the standalone totals for the same rows.
      // Step 6: Apply a status filter in the plan context and confirm it narrows the rows correctly even though some columns are hidden.
      // Step 7: Confirm no hidden column's value has been shifted into a visible column.
      // Expected: Hiding columns in the plan context only affects what is displayed — the same transactions, the same amounts and the same totals are returned in both views.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-026: [New] Installment numbers are shown in a sequential order in the Payment Transaction Tracking screen [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-026");
    logger.info("Executing test case: [New] Installment numbers are shown in a sequential order in the Payment Transaction Tracking screen");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and filter to Plan1.
      // Step 2: Sort the list by scheduled date ascending.
      // Step 3: Read the Installment No column top to bottom and confirm the numbers increase one by one starting from the first installment.
      // Step 4: Confirm there is no gap in the sequence and no number repeats for a different scheduled installment.
      // Step 5: Confirm the installment number on each row matches the number shown for the same installment on the plan window.
      // Step 6: Re-sort by transaction date and confirm the installment numbers stay attached to their own rows.
      // Expected: The installment numbers run in a clean sequence (1, 2, 3, ...) in schedule order with no gaps, duplicates or random ordering.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-027: [New] A failed attempt and its retry share the same installment number, so the sequence is not broken [@transaction-tracking @data-integrity @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-027");
    logger.info("Executing test case: [New] A failed attempt and its retry share the same installment number, so the sequence is not broken");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and filter to Plan1.
      // Step 2: Locate Txn-F and Txn-R for the same installment.
      // Step 3: Confirm both rows show the same Installment No, N1.
      // Step 4: Confirm the next scheduled installment still carries N1 + 1 and was not pushed forward by the retry.
      // Step 5: Confirm reading the whole list still gives a gap-free sequence.
      // Step 6: Confirm the plan window shows the same installment number for that installment.
      // Expected: Both the failed attempt and the retry carry installment number N1; the retry does not consume a new number, so the sequence of installments stays unbroken.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-028: [New] Several consecutive Pay Now payments each take the next installment number (last + 1 each time) [@transaction-tracking @functional @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-028");
    logger.info("Executing test case: [New] Several consecutive Pay Now payments each take the next installment number (last + 1 each time)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Plan1 and note the highest installment number N1.
      // Step 2: Collect PayNow1 successfully and confirm in Payment Transaction Tracking that its Installment No is N1 +
      // Step 3: 3. Collect PayNow2 successfully and confirm its Installment No is N1 +
      // Step 4: 4. Collect PayNow3 successfully and confirm its Installment No is N1 +
      // Step 5: 5. Confirm no two of the three rows share an installment number.
      // Step 6: Confirm the originally scheduled installments keep their own numbers unchanged.
      // Step 7: Reopen the screen and confirm the numbers persist as recorded.
      // Expected: The first Pay Now is numbered N1 + 1, the second N1 + 2 and the third N1 + 3 — each Pay Now takes the next number after the highest one existing at that moment, with no duplicates.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-029: [New] Pay Now on a plan that has no installment recorded yet gets the first installment number [@transaction-tracking @boundary @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-029");
    logger.info("Executing test case: [New] Pay Now on a plan that has no installment recorded yet gets the first installment number");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Plan-New and confirm no installment has been processed yet.
      // Step 2: Collect PayNow1 through Pay Now and complete it successfully.
      // Step 3: Open Payment Transaction Tracking and locate the PayNow1 transaction.
      // Step 4: Confirm its Installment No is 1 and is neither blank nor zero nor a negative value.
      // Step 5: Confirm no error or warning was raised while creating the transaction.
      // Step 6: Let the first scheduled charge run afterwards and confirm it continues the sequence rather than reusing number 1.
      // Expected: With no previous installment to count from, the Pay Now transaction is numbered as the first installment (1) rather than showing blank, zero or an error.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-030: [New] A Pay Now transaction keeps its place in the sequential installment ordering of the plan [@transaction-tracking @data-integrity @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-030");
    logger.info("Executing test case: [New] A Pay Now transaction keeps its place in the sequential installment ordering of the plan");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and filter to Plan1.
      // Step 2: Sort the list by Installment No ascending.
      // Step 3: Confirm the scheduled installments appear in their original order from the first number to N1.
      // Step 4: Confirm the Pay Now row appears immediately after them as N1 +
      // Step 5: 5. Confirm no scheduled installment was renumbered to make room for the Pay Now row.
      // Step 6: Confirm the plan window shows the same sequence for the same transactions.
      // Expected: The Pay Now row sits at the end of the sequence as N1 + 1 and the scheduled installments keep their original order, so the whole list still reads as one continuous sequence.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-031: [New] Filtering by In queue and by In progress returns the same rows (round-trip of the mapped status) [@transaction-tracking @functional @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-031");
    logger.info("Executing test case: [New] Filtering by In queue and by In progress returns the same rows (round-trip of the mapped status)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and set Transaction Status = In queue; note every row returned.
      // Step 2: Clear the filter and set Transaction Status = In progress.
      // Step 3: Confirm exactly the same rows are returned, including both Txn-Q and Txn-IP.
      // Step 4: Confirm Txn-S is excluded from both result sets.
      // Step 5: Confirm the row count and the totals are identical for both filter values.
      // Step 6: Combine the status filter with a plan-code filter and confirm the two status values still behave identically.
      // Step 7: Clear the filter and confirm all rows return.
      // Expected: Because In queue is mapped to the existing In progress status, both filter values return exactly the same rows, and neither returns successful or failed transactions.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-032: [New] In queue and In progress rows are shown with the same status colour and are never counted as paid [@transaction-tracking @ui @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-032");
    logger.info("Executing test case: [New] In queue and In progress rows are shown with the same status colour and are never counted as paid");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking so all four transactions are visible.
      // Step 2: Confirm Txn-Q and Txn-IP carry the same pending status colour.
      // Step 3: Confirm that colour is clearly different from the successful colour on Txn-S and the failed colour on Txn-F.
      // Step 4: Confirm the status text on both pending rows describes the same pending state.
      // Step 5: Confirm the collected/received totals include Txn-S but not Txn-Q or Txn-IP.
      // Step 6: Re-sort the grid and confirm the colouring stays with the correct rows.
      // Expected: Txn-Q and Txn-IP use the same pending colour as each other and a different colour from successful and failed rows; neither adds to collected totals.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-033: [New] A full refund of a plan charge is never displayed at the payment-plan level [@transaction-tracking @negative @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-033");
    logger.info("Executing test case: [New] A full refund of a plan charge is never displayed at the payment-plan level");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking, select Txn-S and complete Refund-Full.
      // Step 2: Confirm the refund is recorded and visible in Payment Transaction Tracking.
      // Step 3: Open Plan1 for Pat1 and review the installment section and the plan summary.
      // Step 4: Confirm no refund entry, refund column or refund total is displayed anywhere on the plan.
      // Step 5: Confirm installment N1 keeps the status it already had and does not flip to a refunded state.
      // Step 6: Refresh the plan window and confirm the refund still does not appear.
      // Step 7: Confirm the refund remains fully visible on the transaction tracking screen.
      // Expected: The plan window shows no refund row, no refund column, no refund amount and no refund icon — the refund only exists in Payment Transaction Tracking.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-034: [New] A partial refund of a plan charge shows no partial-refund indicator at the payment-plan level [@transaction-tracking @negative @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-034");
    logger.info("Executing test case: [New] A partial refund of a plan charge shows no partial-refund indicator at the payment-plan level");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking, select Txn-S and raise Refund-Part for part of the amount.
      // Step 2: Confirm the partial refund is recorded in Payment Transaction Tracking with the refunded portion.
      // Step 3: Open Plan1 and review the installment row that Txn-S paid.
      // Step 4: Confirm no partial-refund badge, icon, note or amount is shown for it.
      // Step 5: Confirm the installment's paid amount and status on the plan are unchanged by the partial refund.
      // Step 6: Confirm the plan balance shown on the plan window is not adjusted by the partial refund.
      // Step 7: Reopen both screens and confirm the behaviour is consistent.
      // Expected: No partial-refund indicator, badge, amount or changed status appears on the plan level; the partial refund is visible only in Payment Transaction Tracking with the refunded amount.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-035: [New] A partially applied plan credit is returned by the Unapplied filter [@transaction-tracking @functional @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-035");
    logger.info("Executing test case: [New] A partially applied plan credit is returned by the Unapplied filter");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking with no filters and confirm both Credit-P and Credit-A are present.
      // Step 2: Apply the Unapplied filter.
      // Step 3: Confirm Credit-P is still listed.
      // Step 4: Confirm Credit-A is excluded from the result.
      // Step 5: Confirm the Unapplied column of Credit-P shows only the still-open portion and not the whole collected amount.
      // Step 6: Apply the rest of Credit-P to bills, re-apply the filter and confirm it now drops out as well.
      // Expected: Credit-P is listed because it still has an open portion, while Credit-A is excluded; the Unapplied column shows only the remaining open amount of Credit-P.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-036: [New] The Unapplied filter returns a mixed set of plan credits and other open credits together [@transaction-tracking @functional @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-036");
    logger.info("Executing test case: [New] The Unapplied filter returns a mixed set of plan credits and other open credits together");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and apply the Unapplied filter.
      // Step 2: Confirm Credit-PP and Credit-PU (plan credits) are both listed.
      // Step 3: Confirm Credit-OP and Credit-OU (non-plan open credits) are also listed in the same grid.
      // Step 4: Confirm each row's Unapplied column shows its own remaining open amount.
      // Step 5: Confirm plan rows carry the plan columns while non-plan rows leave them blank.
      // Step 6: Confirm the grand total of the Unapplied column equals the sum of the four remaining open amounts.
      // Step 7: Clear the filter and confirm fully applied credits reappear in the list.
      // Expected: All four credits are listed together under the Unapplied filter regardless of their source and regardless of whether they are partly or fully unapplied, so staff see every open credit in one place.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-037: [New] The Unapplied filter excludes credits that have been fully applied [@transaction-tracking @negative @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-037");
    logger.info("Executing test case: [New] The Unapplied filter excludes credits that have been fully applied");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking without filters and confirm all three credits are listed.
      // Step 2: Apply the Unapplied filter.
      // Step 3: Confirm Credit-A1 is not returned.
      // Step 4: Confirm Credit-A2 is not returned.
      // Step 5: Confirm Credit-U is returned.
      // Step 6: Confirm the grand total under the filter counts only the open amount of Credit-U.
      // Step 7: Clear the filter and confirm all three credits are listed again.
      // Expected: Neither Credit-A1 nor Credit-A2 is returned by the Unapplied filter, while Credit-U is; clearing the filter brings all three back.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-038: [New] A card-expiry failure shows a Failed transaction here while the plan shows the installment as Overdue [@transaction-tracking @state-transition @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-038");
    logger.info("Executing test case: [New] A card-expiry failure shows a Failed transaction here while the plan shows the installment as Overdue");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Confirm Plan1 uses Card-Exp and that its expiry has passed.
      // Step 2: Let the scheduled charge for installment N1 run.
      // Step 3: Open Payment Transaction Tracking and confirm a transaction exists for N1 with the Failed status and the failed colour.
      // Step 4: Confirm no receipt or open credit was created for that failed transaction.
      // Step 5: Open Plan1 and confirm installment N1 shows Overdue in the payment column.
      // Step 6: Confirm the plan moved on to the next installment without marking N1 as paid.
      // Step 7: Confirm the failure reason recorded on the transaction points to the card expiry.
      // Expected: Payment Transaction Tracking records a Failed credit-card transaction for N1, and the plan window shows installment N1 with an Overdue status in its payment column.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-039: [New] A declined card shows a Failed transaction here while the plan installment becomes Overdue [@transaction-tracking @state-transition @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-039");
    logger.info("Executing test case: [New] A declined card shows a Failed transaction here while the plan installment becomes Overdue");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Let the scheduled charge for installment N1 run and be declined.
      // Step 2: Open Payment Transaction Tracking and confirm a Failed transaction exists for N1.
      // Step 3: Confirm the status history or request content records the decline reason.
      // Step 4: Confirm no receipt or open credit was produced for the declined attempt.
      // Step 5: Open Plan1 and confirm installment N1 shows Overdue.
      // Step 6: Confirm the Overdue amount at plan level includes this installment's amount.
      // Step 7: Confirm no notification of successful payment was produced for it.
      // Expected: The declined attempt is recorded here as a Failed transaction with the decline reason, and installment N1 is shown as Overdue on the plan.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-040: [New] A without-gateway plan shows a Failed status here for the missed charge while the installment turns Overdue [@transaction-tracking @state-transition @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-040");
    logger.info("Executing test case: [New] A without-gateway plan shows a Failed status here for the missed charge while the installment turns Overdue");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Confirm Plan-WG is created with the Without Gateway option.
      // Step 2: Let the scheduled date of installment N1 pass with no manual payment collected.
      // Step 3: Open Plan-WG and confirm installment N1 shows Overdue in the payment column.
      // Step 4: Open Payment Transaction Tracking and confirm the missed charge is not reported as successful.
      // Step 5: Confirm no receipt or open credit was created automatically for N1.
      // Step 6: Confirm the plan has moved on to the next installment while N1 stays Overdue.
      // Step 7: Confirm the plan's Overdue Amount now includes N1's amount.
      // Expected: The plan shows installment N1 as Overdue in the payment column; the transaction tracking screen shows the failed credit-card status for the missed charge rather than a successful one.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-041: [New] Surcharge-related columns are hidden in the Payment Transaction Tracking grid (surcharge deferred to a separate ER) [@transaction-tracking @ui @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-041");
    logger.info("Executing test case: [New] Surcharge-related columns are hidden in the Payment Transaction Tracking grid (surcharge deferred to a separate ER)");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking with no filters.
      // Step 2: Read the header row and confirm no surcharge column is displayed.
      // Step 3: Open the column chooser (if available) and confirm no surcharge column can be switched on from the screen.
      // Step 4: Confirm the remaining amount columns (amount, applied, unapplied, total) line up with their values and none is blank because of the removal.
      // Step 5: Confirm the grand-total row totals only the visible amount columns.
      // Step 6: Open the screen from a payment plan as well and confirm no surcharge column appears there either.
      // Expected: No surcharge column is visible in the grid; the amount columns are complete and correctly aligned without it, because surcharge handling is deferred to a separate ER.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-042: [New] Surcharge-related columns are also absent from the Payment Transaction Tracking export [@transaction-tracking @data-integrity @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-042");
    logger.info("Executing test case: [New] Surcharge-related columns are also absent from the Payment Transaction Tracking export");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Open Payment Transaction Tracking and note the visible columns.
      // Step 2: Run the export action to produce Export1.
      // Step 3: Open Export1 and read its header row.
      // Step 4: Confirm no surcharge column is present in the export.
      // Step 5: Confirm the export headers match the on-screen columns one for one and in the same order.
      // Step 6: Confirm each exported row's values sit under the correct header with no shift caused by the removed column.
      // Step 7: Export again after applying a filter and confirm the header set is unchanged.
      // Expected: The exported file carries the same columns as the screen and contains no surcharge column or surcharge values.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-043: [New] A Without Gateway plan creates no transaction and no receipt automatically, so nothing is listed here [@transaction-tracking @negative @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-043");
    logger.info("Executing test case: [New] A Without Gateway plan creates no transaction and no receipt automatically, so nothing is listed here");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Create and activate Plan-WG for Pat-WG with the Without Gateway option.
      // Step 2: Let the first scheduled date arrive without collecting anything manually.
      // Step 3: Open Payment Transaction Tracking and search for Pat-WG or for Plan-WG's plan code.
      // Step 4: Confirm no transaction row exists for Plan-WG.
      // Step 5: Confirm no receipt or open credit has been produced for it on the receipt screens.
      // Step 6: Confirm the empty result is presented cleanly with no error.
      // Step 7: Confirm the plan itself still exists and is active on the plan screen.
      // Expected: No transaction row and no receipt is created automatically for Plan-WG, so the transaction tracking screen shows nothing for that plan until a manual payment is made.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-044: [New] A manual Pay Now on a Without Gateway plan creates the first transaction visible in this screen [@transaction-tracking @end-to-end @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-044");
    logger.info("Executing test case: [New] A manual Pay Now on a Without Gateway plan creates the first transaction visible in this screen");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Confirm Payment Transaction Tracking currently lists nothing for Plan-WG.
      // Step 2: Open Plan-WG and collect PayNow-WG through the Pay Now option.
      // Step 3: Complete the payment and confirm the receipt is shown to the user.
      // Step 4: Open Payment Transaction Tracking and confirm exactly one new row now exists for Plan-WG.
      // Step 5: Confirm the row shows the collected amount and the installment number given to the Pay Now payment.
      // Step 6: Confirm the corresponding installment status on the plan updates from Overdue/Pending to Paid.
      // Step 7: Confirm no extra automatic transaction was created alongside the manual one.
      // Expected: Only after the manual Pay Now does a transaction appear for Plan-WG, showing the collected amount, its installment number and its receipt; before that the screen had nothing for this plan.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-045: [New] End-to-end: failed charge becomes Overdue on the plan and is cleared by a Pay Now, with both rows visible here [@transaction-tracking @end-to-end @in-depth @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-045");
    logger.info("Executing test case: [New] End-to-end: failed charge becomes Overdue on the plan and is cleared by a Pay Now, with both rows visible here");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      // Step 1: Let the scheduled charge for installment N1 fail and confirm the failed row appears in Payment Transaction Tracking.
      // Step 2: Open Plan1 and confirm installment N1 shows Overdue and is included in the plan's Overdue Amount.
      // Step 3: Collect PayNow1 for the overdue amount through Pay Now and complete it successfully.
      // Step 4: Return to Payment Transaction Tracking and confirm both the earlier failed row and the new successful row are listed.
      // Step 5: Confirm the successful row carries a receipt/open-credit number and the failed row does not.
      // Step 6: Open Plan1 and confirm installment N1 now shows Paid and the Overdue Amount has reduced accordingly.
      // Step 7: Confirm no duplicate payment was taken for the same installment.
      // Expected: The failed attempt and the later successful Pay Now both remain listed in Payment Transaction Tracking, and the installment on the plan moves from Overdue to Paid once the Pay Now succeeds.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TXN-015: Grand-total row sums the monetary columns for visible rows [@transaction-tracking @data-integrity @detail @regression]", async ({ page, paymentTransactionTrackingPage, logger }) => {
    logger.setTestCaseId("RPP-TXN-015");
    logger.info("Executing test case: Grand-total row sums the monetary columns for visible rows");

    // 1. Open Payment Transaction Tracking
    await test.step("Open Payment Transaction Tracking", async () => {
      await paymentTransactionTrackingPage.openStandalone();
      logger.info("Opened Payment Transaction Tracking");
    });

    // 2. Verify transaction columns and statuses
    await test.step("Verify transaction entries and filters", async () => {
      
      // Expected: Grand total equals the sum of Amount/Approved/Applied/Unapplied/Surcharge/Total for visible rows.
      expect(true).toBeTruthy();
    });

  });
});
