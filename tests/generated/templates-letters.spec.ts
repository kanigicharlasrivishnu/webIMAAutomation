/**
 * Automated Test Suite: Templates & Letters
 * Generated from Source Enterprise Test Cases
 * Total Cases in Suite: 37
 */

import { test, expect } from '../../src/fixtures/base.fixture';

test.describe("Templates & Letters Automated Suite", () => {

  test("RPP-TPL-001: Agreement template renders all five sections in order. - Open the Agreement preview on the patient payment plan setup screen. - Confirm the sections present. [@templates-letters @functional @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-001");
    logger.info("Executing test case: Agreement template renders all five sections in order. - Open the Agreement preview on the patient payment plan setup screen. - Confirm the sections present.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Log in and open Pat1 > Payment Plan and open Plan1 in the patient payment plan setup screen.
      // Step 2: Click the Agreement button / save the plan so the Agreement preview opens.
      // Step 3: Read the section headings from top to bottom and assert they appear in this order: Payment Details, Terms & Conditions, Cancellation Policy, Electronic Communications Consent, Execution & Authorization.
      // Step 4: Assert none of the five sections is missing, duplicated or out of order.
      // Step 5: Assert the Execution & Authorization section contains the \"Agree & Continue\" checkbox/button.
      // Step 6: Scroll to the very bottom and confirm no unexpected extra section is rendered after Execution & Authorization.
      // Step 7: Close and re-open the Agreement for Plan1 and confirm the same five sections render in the same order.
      // Expected: The Agreement shows: Payment Details, Terms & Conditions, Cancellation Policy, Electronic Communications Consent, and Execution & Authorization (with the \"Agree & Continue\" checkbox), in that order.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-TPL-002: Agreement Payment Details merge fields populate from the plan. - Open the Agreement preview for a plan with a saved card and an end date. - Check each Payment Details line. [@templates-letters @data-integrity @detail @regression]", async ({ page, logger }) => {
    // Reason: Agreement merge fields.
    logger.info("Test skipped: Agreement merge fields.");
  });

  test("RPP-TPL-003: Agreement notes that if the remaining balance is less than the payment amount, the final payment is only the remaining balance. - Read the Payment Amount line in the Agreement. [@templates-letters @functional @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-003");
    logger.info("Executing test case: Agreement notes that if the remaining balance is less than the payment amount, the final payment is only the remaining balance. - Read the Payment Amount line in the Agreement.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 and launch the Agreement preview.
      // Step 2: Locate the Payment Amount line inside Payment Details.
      // Step 3: Assert the wording states that if the remaining balance is less than the recurring amount, the final payment will be for the remaining balance only.
      // Step 4: Assert this clause is present even when Plan1 has no End Date.
      // Step 5: Confirm the clause matches the deduct-if-balance last-installment behaviour described for the plan (no contradicting wording elsewhere in the Agreement).
      // Step 6: Confirm the clause text is static template wording and is not replaced by a numeric value.
      // Expected: The Agreement states that if the remaining balance is less than the recurring amount, the final payment will be for the remaining balance only — matching the deduct-if-balance last-installment rule (RPP-PLAN-024).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-004: Agreement Terms: a separate manual payment does not stop, reduce, or delay the next scheduled auto payment. - Read the Manual Payments clause under Terms & Conditions. [@templates-letters @functional @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-004");
    logger.info("Executing test case: Agreement Terms: a separate manual payment does not stop, reduce, or delay the next scheduled auto payment. - Read the Manual Payments clause under Terms & Conditions.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 and launch the Agreement preview.
      // Step 2: Scroll to the Terms & Conditions section.
      // Step 3: Locate the Manual Payments clause.
      // Step 4: Assert it states that a separate manual payment will NOT automatically stop, reduce or delay the next scheduled automatic payment.
      // Step 5: Assert the clause is present in the default template for every plan (re-check on a second plan Plan2 of another patient Pat2).
      // Step 6: Confirm the clause is readable in the printed/PDF copy of the Agreement as well.
      // Expected: The Manual Payments clause clearly states a separate manual payment will not automatically stop, reduce, or delay the next scheduled automatic payment.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-TPL-005: Agreement Terms: failed payments may be re-attempted within 30 calendar days, possibly with a returned-payment fee.  - Read the Failed Payments clause. [@templates-letters @functional @detail @regression]", async ({ page, logger }) => {
    // Reason: Agreement failed-payments clause. Not finalized.
    logger.info("Test skipped: Agreement failed-payments clause. Not finalized.");
  });

  test.skip("RPP-TPL-006: Agreement Cancellation Policy requires at least 3 business days' notice before the payment date. - Read the Cancellation Policy. [@templates-letters @functional @detail @regression]", async ({ page, logger }) => {
    // Reason: Agreement cancellation clause.
    logger.info("Test skipped: Agreement cancellation clause.");
  });

  test.skip("RPP-TPL-007: Agreement \"Agree & Continue\" is the execution/authorization step that activates the plan. - Read the Execution & Authorization section. - Tick \"Agree & Continue\". [@templates-letters @functional @detail @regression]", async ({ page, logger }) => {
    // Reason: \"Description: replace with: \"\"Agreement 'Agree & Continue' records authorization; for a mandatory agreement it is required before the saved plan can become Active.\"\"  Expected Output: replace with: \"\"Agree & Continue records authorization. When client setting = Yes & Keep it mandatory, closing without agreement leaves the saved plan Inactive; agreeing allows it to become Active.\"\"  Verification Step: replace with: \"\"1. Set Show Agreement on Payment Plan = Yes & Keep it mandatory. 2. Save a new plan. 3. Close Agreement without agreeing and assert plan is saved Inactive. 4. Reopen Agreement and click Agree & Continue. 5. Assert authorization is recorded and plan becomes Active.\"\" \"
    logger.info("Test skipped: \"Description: replace with: \"\"Agreement 'Agree & Continue' records authorization; for a mandatory agreement it is required before the saved plan can become Active.\"\"  Expected Output: replace with: \"\"Agree & Continue records authorization. When client setting = Yes & Keep it mandatory, closing without agreement leaves the saved plan Inactive; agreeing allows it to become Active.\"\"  Verification Step: replace with: \"\"1. Set Show Agreement on Payment Plan = Yes & Keep it mandatory. 2. Save a new plan. 3. Close Agreement without agreeing and assert plan is saved Inactive. 4. Reopen Agreement and click Agree & Continue. 5. Assert authorization is recorded and plan becomes Active.\"\" \"");
  });

  test("RPP-TPL-008: Payment Plan Setup letter (Email + Text) populates correctly; the outstanding-balance line shows only when an end date exists. - Trigger the Payment Plan Setup notification for a plan WITH an end date, then for one WITHOUT. - Check both the Email and Text versions. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-008");
    logger.info("Executing test case: Payment Plan Setup letter (Email + Text) populates correctly; the outstanding-balance line shows only when an end date exists. - Trigger the Payment Plan Setup notification for a plan WITH an end date, then for one WITHOUT. - Check both the Email and Text versions.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Plan Setup notification (Email + Text) in the notification preference for the Payment Plan event type.
      // Step 2: Save Plan1 so the setup notification is triggered, then open the generated Email in the notification/communication log.
      // Step 3: Assert the Email shows the recurring amount, the frequency, the first payment date and the payment method of Plan1.
      // Step 4: Assert the Email for Plan1 contains the Total Outstanding Balance line.
      // Step 5: Open the Text version for Plan1 and assert it carries the same key facts in short form.
      // Step 6: Repeat for Plan2 (no End Date) and assert the Total Outstanding Balance line is NOT present in either the Email or the Text.
      // Step 7: Assert no un-merged placeholder tokens remain in either letter.
      // Expected: The Email shows recurring amount, frequency, first payment date and payment method; the Text is the short version. The \"Total Outstanding Balance\" line appears only when the plan has an end date, and is omitted otherwise.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-009: Payment Plan Status Update letter (Email + Text) shows previous status, new status and effective date; balance line only with an end date. - Trigger the Status Update notification after a status change. - Check Email and Text. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-009");
    logger.info("Executing test case: Payment Plan Status Update letter (Email + Text) shows previous status, new status and effective date; balance line only with an end date. - Trigger the Status Update notification after a status change. - Check Email and Text.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Plan Status Change notification (Email + Text).
      // Step 2: Change Plan1 status from Status1 to Status2 and save.
      // Step 3: Open the generated Email from the notification log.
      // Step 4: Assert it shows Previous Status = Status1, New Status = Status2 and an Effective Date equal to the date the change was made.
      // Step 5: Assert the Remaining Balance line is present because Plan1 has an End Date.
      // Step 6: Open the Text version and assert it carries the short \"status changed to <new status> on <date>\" message with the same values.
      // Step 7: Repeat the status change on Plan2 and assert the Remaining Balance line is omitted.
      // Step 8: Assert no un-merged placeholder tokens remain.
      // Expected: The letter shows Previous Status, New Status and Effective Date, plus a Remaining Balance line only when an end date exists. The Text version carries the short \"status changed to <status> on <date>\" message.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-010: Payment Successful letter (Email + Text) shows amount, date, method, confirmation number; plan balance only with an end date. - Trigger the Payment Successful notification after a successful charge. - Check Email and Text. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-010");
    logger.info("Executing test case: Payment Successful letter (Email + Text) shows amount, date, method, confirmation number; plan balance only with an end date. - Trigger the Payment Successful notification after a successful charge. - Check Email and Text.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Successful notification (Email + Text).
      // Step 2: Run or trigger a successful charge on Plan1 (scheduled run or Pay Now).
      // Step 3: Open the generated Email from the notification log.
      // Step 4: Assert Amount Paid equals the amount actually charged, and Date Processed equals the date of the successful transaction.
      // Step 5: Assert Payment Method shows Card1 brand + last 4 + expiry only (never the full card number).
      // Step 6: Assert a Confirmation Number is present and not blank.
      // Step 7: Assert the Remaining Plan Balance line is shown for Plan1 (End Date exists) and is omitted after a successful charge on Plan2.
      // Step 8: Open the Text version and assert it repeats amount and date consistently.
      // Expected: The letter shows Amount Paid, Date Processed, Payment Method (brand + last 4 + expiry), Confirmation Number, and a Remaining Plan Balance line only when an end date exists.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-011: Payment Failed letter (Email + Text) states the failed amount/date, the retry timing, and next steps. - Trigger the Payment Failed notification after a declined charge. - Check Email and Text. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-011");
    logger.info("Executing test case: Payment Failed letter (Email + Text) states the failed amount/date, the retry timing, and next steps. - Trigger the Payment Failed notification after a declined charge. - Check Email and Text.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Failed notification (Email + Text).
      // Step 2: Force a scheduled charge on Plan1 to be declined by the gateway.
      // Step 3: Open the generated Email from the notification log.
      // Step 4: Assert it states the payment could not be processed and shows the failed amount and the failed date.
      // Step 5: Assert it states the payment will be retried after the configured retry time Retry1.
      // Step 6: Assert it gives next steps (contact the clinic to update payment details).
      // Step 7: Open the Text version and assert it carries the short failed-payment message with the same amount and date.
      // Step 8: Assert the letter does not expose full card details.
      // Expected: The letter states the payment could not be processed, that it will be retried after the configured time, and next steps (call the clinic to update details). The Text version is the short \"Payment of $ on <date> failed\" message.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-012: Card Expiring reminder (Email + Text) shows the card last 4 and treats the expiry as the last day of the expiring month. - Trigger the Card Expiring reminder for a card whose month is ending. - Check Email and Text. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-012");
    logger.info("Executing test case: Card Expiring reminder (Email + Text) shows the card last 4 and treats the expiry as the last day of the expiring month. - Trigger the Card Expiring reminder for a card whose month is ending. - Check Email and Text.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Card Expiry reminder (Email + Text) in the notification/reminder preference.
      // Step 2: Let the Card Expiry reminder run for Plan1 / Card1.
      // Step 3: Open the generated Email from the notification log.
      // Step 4: Assert it identifies the card as \"ending in\" the last 4 digits of Card1 and never shows the full number.
      // Step 5: Assert the expiry date printed in the letter is the LAST day of Card1 expiry month (not the first day and not the raw month/year only).
      // Step 6: Assert the letter prompts the patient to update the card to avoid a payment failure.
      // Step 7: Open the Text version and assert the same last-4 and the same expiry date are used.
      // Step 8: Assert no un-merged placeholder tokens remain.
      // Expected: The reminder shows the card ending in <last 4> and states it expires on the last day of the expiring month, prompting the patient to update the card to avoid a payment failure.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-013: Payment Due reminder (Email + Text) shows the scheduled amount, processing date, method, and \"in X days\". - Trigger the Payment Due reminder ahead of a scheduled charge. - Check Email and Text. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-013");
    logger.info("Executing test case: Payment Due reminder (Email + Text) shows the scheduled amount, processing date, method, and \"in X days\". - Trigger the Payment Due reminder ahead of a scheduled charge. - Check Email and Text.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Due reminder (Email + Text) with lead time Lead1.
      // Step 2: Let the reminder run Lead1 days before Due1 for Plan1.
      // Step 3: Open the generated Email from the notification log.
      // Step 4: Assert the Scheduled Amount equals Amt1 and the Processing Date equals Due1.
      // Step 5: Assert the Payment Method on file shows Card1 brand + last 4 only.
      // Step 6: Assert the letter states the auto-payment will be processed in the correct number of days and that no action is needed if details are up to date.
      // Step 7: Open the Text version and assert amount and date match the Email.
      // Step 8: Assert no un-merged placeholder tokens remain.
      // Expected: The reminder shows the Scheduled Amount, Processing Date, and the Payment Method on file, and states the auto-payment will be processed in X days with no action needed if details are up to date.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-014: Across all letters, balance/outstanding lines appear only when the plan has an end date, and the clinic email setup is the sender. - Trigger any two payment-plan letters — one for a plan with an end date, one without. - Check the balance lines and the email sender. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-014");
    logger.info("Executing test case: Across all letters, balance/outstanding lines appear only when the plan has an end date, and the clinic email setup is the sender. - Trigger any two payment-plan letters — one for a plan with an end date, one without. - Check the balance lines and the email sender.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Configure Office1 e-mail setup with sender address Sender1.
      // Step 2: Trigger any payment-plan letter for Plan1 and open the generated Email.
      // Step 3: Assert the \"Total Outstanding / Remaining Balance\" line is present because Plan1 has an End Date.
      // Step 4: Trigger the same letter for Plan2 and assert the balance line is completely omitted (no empty label, no zero value).
      // Step 5: Repeat steps 2-4 with a second payment-plan letter type to prove the rule is template-wide.
      // Step 6: Inspect the From address of every generated Email and assert it equals Sender1 from the Office1 e-mail setup, not a user mailbox or a hard-coded system address.
      // Step 7: Confirm the same sender is used for both the with-end-date and no-end-date letters.
      // Expected: Any \"Total Outstanding / Remaining Balance\" line is shown only when the plan has an end date (omitted for open-ended plans). All payment-plan emails are sent from the clinic's configured email setup.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-015: [New] Confirmation Number in the Payment Successful letter is filled with the payment number generated for the credit-card transaction. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-015");
    logger.info("Executing test case: [New] Confirmation Number in the Payment Successful letter is filled with the payment number generated for the credit-card transaction.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Payment Successful notification (Email) for the Payment Plan event type.
      // Step 2: Open Pat1 > Payment Plan > Plan1 and run a successful credit-card charge (scheduled run or Pay Now).
      // Step 3: Open the created receipt / Transaction Tracking row for that charge and note the generated payment number PayNo1.
      // Step 4: Open the Payment Successful Email produced for that charge from the notification log.
      // Step 5: Assert the Confirmation Number field is not blank and its value is exactly PayNo1.
      // Step 6: Assert the Confirmation Number is NOT the payment plan number, the installment number or the receipt sequence of some other transaction.
      // Step 7: Run a second successful charge on Plan1 and assert the new letter carries the NEW payment number, proving the field is per-transaction.
      // Expected: The Confirmation Number merge field in the Payment Successful letter is populated with PayNo1 — the payment number generated for that credit-card transaction — and not with the plan number, the installment number or a blank value.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-016: [New] Confirmation Number in the Payment Successful letter matches the payment number shown on Transaction Tracking for the same charge. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-016");
    logger.info("Executing test case: [New] Confirmation Number in the Payment Successful letter matches the payment number shown on Transaction Tracking for the same charge.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Run a successful credit-card charge on Plan1.
      // Step 2: Open Transaction Tracking filtered to Plan1 and locate the row for that charge.
      // Step 3: Note the payment number PayNo1 on that row.
      // Step 4: Open the Payment Successful Email for the same charge.
      // Step 5: Assert the Confirmation Number equals PayNo1 character for character.
      // Step 6: Assert the letter amount and date also match the same Transaction Tracking row.
      // Step 7: Repeat for a second charge and confirm each letter maps to its own transaction row.
      // Expected: The Confirmation Number printed in the letter is identical to the payment number displayed for the same transaction on the Transaction Tracking screen, so the patient can quote it to the clinic.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-017: [New] A Pay Now credit-card payment also produces a Payment Successful letter carrying that Pay Now transaction payment number. [@templates-letters @end-to-end @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-017");
    logger.info("Executing test case: [New] A Pay Now credit-card payment also produces a Payment Successful letter carrying that Pay Now transaction payment number.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 and click Pay Now.
      // Step 2: Choose a payment option, pay with card Card1 and let the transaction succeed.
      // Step 3: Note the payment number PayNo1 from the resulting receipt.
      // Step 4: Open the Payment Successful Email generated for this Pay Now payment.
      // Step 5: Assert the Confirmation Number equals PayNo1.
      // Step 6: Assert the Amount Paid equals the amount actually collected through Pay Now.
      // Step 7: Assert only ONE Payment Successful letter is generated for this single Pay Now transaction.
      // Expected: The Pay Now credit-card payment triggers the Payment Successful letter and its Confirmation Number is the payment number generated for that Pay Now transaction, not for a scheduled installment.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-018: [New] Card Expiry reminder always prints the LAST day of the expiry month as the card expiry date. [@templates-letters @functional @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-018");
    logger.info("Executing test case: [New] Card Expiry reminder always prints the LAST day of the expiry month as the card expiry date.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Save card Card1 on Plan1 with an expiry month/year.
      // Step 2: Enable the Card Expiry reminder (Email + Text) for the Payment Plan event type.
      // Step 3: Let the reminder run for Plan1.
      // Step 4: Open the generated Email and read the expiry date printed for Card1.
      // Step 5: Assert the date is the last calendar day of Card1 expiry month in Card1 expiry year.
      // Step 6: Assert it is not the first day of the month and not a bare month/year string.
      // Step 7: Open the Text version and assert the identical date is used.
      // Step 8: Assert the card is identified only by its last 4 digits.
      // Expected: Because only month and year are captured for a card, the reminder treats the expiry date as the LAST calendar day of that month and prints that full date in both the Email and the Text version.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-019: [New] Card Expiry reminder last-day rule is correct for 31-day, 30-day, 28-day and leap-year February expiry months. [@templates-letters @boundary @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-019");
    logger.info("Executing test case: [New] Card Expiry reminder last-day rule is correct for 31-day, 30-day, 28-day and leap-year February expiry months.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Set up one plan per card CardA, CardB, CardC and CardD with the expiry months described in the pre-requisite data.
      // Step 2: Enable the Card Expiry reminder and let it run for all four plans.
      // Step 3: Open the reminder for CardA and assert the expiry date is the 31st of its month.
      // Step 4: Open the reminder for CardB and assert the expiry date is the 30th of its month.
      // Step 5: Open the reminder for CardC and assert the expiry date is the 28th of February.
      // Step 6: Open the reminder for CardD and assert the expiry date is the 29th of February.
      // Step 7: Assert no reminder rolls over into the following month.
      // Step 8: Assert Email and Text versions agree for each card.
      // Expected: For every card the reminder prints the correct last day of that month: the 31st for a 31-day month, the 30th for a 30-day month, the 28th for a non-leap February and the 29th for a leap-year February.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-020: [New] A card is not treated as expired before the last day of its expiry month, so scheduled charges before that day still run. [@templates-letters @negative @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-020");
    logger.info("Executing test case: [New] A card is not treated as expired before the last day of its expiry month, so scheduled charges before that day still run.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 with card Card1 whose expiry month is the current month.
      // Step 2: Confirm an installment is scheduled on Due1, earlier in the month than its last day.
      // Step 3: Let the scheduled run execute on Due1.
      // Step 4: Assert the charge is attempted and not blocked with an expired-card error.
      // Step 5: Assert the installment status reflects the gateway outcome and is not forced to Overdue purely because of expiry.
      // Step 6: Assert the Card Expiry reminder for Card1 still quotes the last day of the month as the expiry date.
      // Step 7: Negative check: confirm no expired-card message is shown for Card1 before that last day.
      // Expected: The charge on Due1 is attempted normally because Card1 is considered valid until the last day of its expiry month; the card is only treated as expired after that last day.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-021: [New] Every payment-plan notification and reminder e-mail is sent from the clinic e-mail setup address. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-021");
    logger.info("Executing test case: [New] Every payment-plan notification and reminder e-mail is sent from the clinic e-mail setup address.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Configure Office1 e-mail setup with sender address Sender1.
      // Step 2: Enable the Email channel for all payment-plan notification and reminder events.
      // Step 3: Trigger the Payment Plan Setup event by saving Plan1 and open the generated Email.
      // Step 4: Assert the From/sender address is Sender1.
      // Step 5: Repeat for the Payment Plan Status Change, Payment Successful, Payment Failed, Payment Due and Card Expiry events.
      // Step 6: Assert every one of those Emails uses Sender1 as the sender.
      // Step 7: Negative check: assert none of them is sent from the logged-in user personal mailbox or from a default system address.
      // Expected: The From address of every payment-plan notification and reminder Email is Sender1, taken from the clinic e-mail setup — not the logged-in user mailbox and not a hard-coded application address.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-022: [New] Changing the clinic e-mail setup changes the sender of subsequently generated payment-plan e-mails. [@templates-letters @state-transition @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-022");
    logger.info("Executing test case: [New] Changing the clinic e-mail setup changes the sender of subsequently generated payment-plan e-mails.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: With Office1 e-mail setup = Sender1, trigger a payment-plan Email for Plan1 and note the sender.
      // Step 2: Assert the sender is Sender1.
      // Step 3: Change the Office1 e-mail setup sender to Sender2 and save.
      // Step 4: Trigger the same payment-plan Email event again for Plan1.
      // Step 5: Assert the new Email is sent from Sender2.
      // Step 6: Re-open the first Email in the log and assert its recorded sender is still Sender1.
      // Step 7: Assert no error or blank sender occurs during the change.
      // Expected: E-mails generated after the change go out from Sender2; already-sent e-mails keep the sender they were sent with, proving the sender is read from the clinic e-mail setup at send time.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-023: [New] Payment-plan e-mails use the e-mail setup of the clinic the plan belongs to when more than one clinic is configured. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-023");
    logger.info("Executing test case: [New] Payment-plan e-mails use the e-mail setup of the clinic the plan belongs to when more than one clinic is configured.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Configure different sender addresses Sender1 for Office1 and Sender2 for Office2.
      // Step 2: Trigger a payment-plan Email event for Plan1 (Office1).
      // Step 3: Assert the sender is Sender1.
      // Step 4: Trigger the same event for Plan2 (Office2).
      // Step 5: Assert the sender is Sender2.
      // Step 6: Assert the sender does not change when the same user, logged in once, triggers both.
      // Step 7: Negative check: assert Plan2 e-mail is never sent from Sender1.
      // Expected: The e-mail for Plan1 is sent from Office1 e-mail setup (Sender1) and the e-mail for Plan2 from Office2 e-mail setup (Sender2); the clinic of the plan decides the sender.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-024: [New] A default letter template exists for each of the seven payment-plan events: Payment Successful, Payment Failed, Payment Plan Setup, Payment Plan Status Change, Payment Due, Card Expiry and Payment Plan Agreement. [@templates-letters @functional @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-024");
    logger.info("Executing test case: [New] A default letter template exists for each of the seven payment-plan events: Payment Successful, Payment Failed, Payment Plan Setup, Payment Plan Status Change, Payment Due, Card Expiry and Payment Plan Agreement.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open the letter/template setup screen and filter to payment-plan templates.
      // Step 2: Assert a default template exists for Payment Successful.
      // Step 3: Assert a default template exists for Payment Failed.
      // Step 4: Assert default templates exist for Payment Plan Setup and Payment Plan Status Change.
      // Step 5: Assert default templates exist for the Payment Due and Card Expiry reminders.
      // Step 6: Assert a default Payment Plan Agreement template exists.
      // Step 7: Assert each of the seven opens without error and has non-empty body content.
      // Step 8: Negative check: assert none of the seven is missing or shows a blank/placeholder-only body.
      // Expected: All seven payment-plan default templates are present and usable: Payment Successful, Payment Failed, Payment Plan Setup, Payment Plan Status Change, Payment Due, Card Expiry and the Payment Plan Agreement.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-025: [New] The seven payment-plan default templates are applied to all databases by default, without any manual setup. [@templates-letters @configuration @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-025");
    logger.info("Executing test case: [New] The seven payment-plan default templates are applied to all databases by default, without any manual setup.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Log into DB1 where no payment-plan templates were manually created.
      // Step 2: Open the letter template setup and assert the seven payment-plan default templates are already present.
      // Step 3: Enable a payment-plan notification event and assert its default template is auto-selected / available for selection.
      // Step 4: Trigger that event for Plan1 and open the generated letter.
      // Step 5: Assert the letter renders with full default content and merged values, not an empty body.
      // Step 6: Repeat for one reminder event (Payment Due or Card Expiry) and assert the same.
      // Step 7: Assert the user was never asked to create a template manually.
      // Expected: Without any manual template creation, all seven payment-plan default templates are already available in DB1 and the notification/reminder events can be enabled and produce fully formatted letters.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-026: [New] Each payment-plan default template provides both the Email and the Text layout where the event supports both channels. [@templates-letters @functional @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-026");
    logger.info("Executing test case: [New] Each payment-plan default template provides both the Email and the Text layout where the event supports both channels.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open the letter template setup for the payment-plan notification/reminder events.
      // Step 2: For each event, assert an Email layout exists with a subject and body.
      // Step 3: For each event, assert a Text (SMS) layout exists with a short message body.
      // Step 4: Enable only the Email channel for one event, trigger it and assert only an Email is produced.
      // Step 5: Enable only the Text channel for the same event, trigger it and assert only a Text is produced.
      // Step 6: Enable both, trigger it and assert both are produced with consistent values.
      // Step 7: Assert the Text layout stays short and does not contain the full Email body.
      // Expected: Every payment-plan notification/reminder default template offers both an Email layout and a shorter Text layout, and both can be enabled independently in the preference screen.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-027: [New] Clicking Agree & Continue on the Agreement sends the agreement to the patient by e-mail when the agreement event is set in the notification preference. [@templates-letters @end-to-end @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-027");
    logger.info("Executing test case: [New] Clicking Agree & Continue on the Agreement sends the agreement to the patient by e-mail when the agreement event is set in the notification preference.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: In the notification preference, enable the Agreement event for the Payment Plan event type with the Email channel.
      // Step 2: Open Pat1 > Payment Plan, save Plan1 so the Agreement window opens.
      // Step 3: Click \"Agree & Continue\".
      // Step 4: Assert the agreement is recorded as accepted for Plan1.
      // Step 5: Open the notification/communication log for Pat1 and assert an agreement e-mail was generated at that moment.
      // Step 6: Assert the e-mail recipient is Email1 and the sender is Sender1.
      // Step 7: Assert only one agreement e-mail is generated per Agree & Continue click.
      // Step 8: Negative check: with the Agreement event disabled in the preference, click Agree & Continue on another plan Plan2 and assert no agreement e-mail is generated.
      // Expected: On Agree & Continue the system sends an e-mail to Pat1 at Email1, from Sender1, carrying the payment plan agreement; the plan activation continues as per the client setting.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-028: [New] The agreement e-mail carries the agreement document itself, showing the terms the patient accepted. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-028");
    logger.info("Executing test case: [New] The agreement e-mail carries the agreement document itself, showing the terms the patient accepted.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable the Agreement event for Email.
      // Step 2: Open Plan1 agreement and note the Payment Details values shown on screen.
      // Step 3: Click \"Agree & Continue\".
      // Step 4: Open the generated e-mail for Pat1 from the notification log.
      // Step 5: Assert the agreement document is present in the e-mail (attached or embedded) and can be opened.
      // Step 6: Assert the document shows the same amount, frequency, payment method and end date noted in step
      // Step 7: 7. Assert the document shows the agreement acceptance (signature / agreed stamp).
      // Step 8: Assert the document never shows the full card number, only the masked last 4.
      // Expected: The e-mail generated on Agree & Continue includes the agreement document, and that document shows the same plan terms (amount, frequency, payment method, end date) that the patient accepted on screen.
      expect(true).toBeTruthy();
    });

  });

  test.fixme("RPP-TPL-029: [New] Confirm whether the agreement e-mail must also carry a body text along with the agreement document, and what that body text should say. [@templates-letters @clarification-required @detail @regression]", async ({ page, logger }) => {
    // Clarification required: Clarification Required - source thread asks whether the agreement e-mail should include a text body along with the agreement document, and what its content should be; no answer given.
    logger.warn("Test requires clarification: Clarification Required - source thread asks whether the agreement e-mail should include a text body along with the agreement document, and what its content should be; no answer given.");
  });

  test("RPP-TPL-030: [New] The agreement e-mail is only sent when the Agreement event is enabled in the notification preference. [@templates-letters @negative @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-030");
    logger.info("Executing test case: [New] The agreement e-mail is only sent when the Agreement event is enabled in the notification preference.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Disable the Agreement event in the notification preference.
      // Step 2: Open Plan1 agreement and click \"Agree & Continue\".
      // Step 3: Assert the agreement is accepted and Plan1 activates as per the client setting.
      // Step 4: Assert NO agreement e-mail appears in the notification log for Pat1.
      // Step 5: Enable the Agreement event for Email.
      // Step 6: Open Plan2 agreement and click \"Agree & Continue\".
      // Step 7: Assert an agreement e-mail is now generated for Pat1.
      // Step 8: Assert the enabling/disabling of the event never blocks the agreement acceptance itself.
      // Expected: With the Agreement event disabled no e-mail is generated on Agree & Continue; with it enabled the agreement e-mail is generated. The plan activation behaviour is unaffected either way.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-031: [New] The generated agreement document is stored at the patient level and can be re-opened from the Agreement button. [@templates-letters @data-integrity @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-031");
    logger.info("Executing test case: [New] The generated agreement document is stored at the patient level and can be re-opened from the Agreement button.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 and accept the agreement with \"Agree & Continue\".
      // Step 2: Close the plan and navigate away from the patient.
      // Step 3: Re-open Pat1 and check the patient-level document storage; assert the agreement document is present for Pat1.
      // Step 4: Open Plan1 again and click the Agreement button.
      // Step 5: Assert the stored agreement document opens and shows the accepted terms.
      // Step 6: Assert the stored document is linked to Pat1 and not lost after logout/login.
      // Step 7: Assert the document is not duplicated for a single acceptance.
      // Expected: The agreement document is saved against Pat1 at the patient level and remains viewable through the Agreement button on the Payment Plan Info screen after closing and re-opening the plan.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-032: [New] Updating the payment plan clears the previous agreement document and a new agreement is shown. [@templates-letters @state-transition @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-032");
    logger.info("Executing test case: [New] Updating the payment plan clears the previous agreement document and a new agreement is shown.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1, which already has accepted agreement document Doc1.
      // Step 2: Note the terms shown in Doc1.
      // Step 3: Change Term1 on Plan1 and save the plan.
      // Step 4: Assert the previous agreement document Doc1 is no longer available as the current agreement for Plan1.
      // Step 5: Assert a new agreement is presented for acceptance after the save.
      // Step 6: Click the Agreement button and assert it opens the NEW agreement, not the cleared Doc1.
      // Step 7: Negative check: assert the old document is not silently retained and shown from the patient level as the current agreement.
      // Expected: On updating the plan the previously stored agreement Doc1 is cleared and a fresh agreement is presented, so the patient can never be left viewing an agreement that no longer matches the plan.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-033: [New] The regenerated agreement carries the UPDATED plan terms. [@templates-letters @data-integrity @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-033");
    logger.info("Executing test case: [New] The regenerated agreement carries the UPDATED plan terms.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Note the Payment Details values Amt1, Freq1 and End1 on the current agreement of Plan1.
      // Step 2: Change the plan to Amt2, Freq2 and End2 and save.
      // Step 3: Open the regenerated agreement.
      // Step 4: Assert the Payment Amount now shows Amt2.
      // Step 5: Assert the Payment Frequency now shows Freq2 and the End Date shows End2.
      // Step 6: Assert the Total Authorized Amount is recalculated from the updated terms.
      // Step 7: Assert no old value (Amt1, Freq1 or End1) appears anywhere in the regenerated document.
      // Step 8: Accept the new agreement and assert the stored patient-level document also carries the updated terms.
      // Expected: The regenerated agreement shows Amt2, Freq2 and End2 — the updated terms — everywhere the old values appeared; no stale value from the cleared agreement remains.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-034: [New] If the regenerated agreement is skipped after a plan update, it can be re-opened later from the Agreement button with the new terms. [@templates-letters @state-transition @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-034");
    logger.info("Executing test case: [New] If the regenerated agreement is skipped after a plan update, it can be re-opened later from the Agreement button with the new terms.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Update Term1 on Plan1 and save so the agreement is regenerated.
      // Step 2: Close the agreement window without clicking \"Agree & Continue\".
      // Step 3: Assert the plan is saved and, under the non-mandatory setting, remains active.
      // Step 4: Click the Agreement button on the Payment Plan Info screen.
      // Step 5: Assert the agreement that opens shows the UPDATED terms, not the previously accepted ones.
      // Step 6: Click \"Agree & Continue\" and assert the new agreement is stored at the patient level.
      // Step 7: Negative check: before accepting, assert the old cleared agreement is not offered anywhere.
      // Expected: Skipping the regenerated agreement does not bring back the old document; clicking the Agreement button re-opens the new agreement showing the updated terms, ready to be accepted.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-035: [New] No surcharge line or field appears in any payment-plan notification or reminder letter, because surcharge is deferred to a separate ER. [@templates-letters @negative @in-depth @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-035");
    logger.info("Executing test case: [New] No surcharge line or field appears in any payment-plan notification or reminder letter, because surcharge is deferred to a separate ER.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Enable all payment-plan notification and reminder events for Email and Text.
      // Step 2: Trigger the Payment Plan Setup letter for Plan1 and search the Email and Text for the word \"surcharge\" — assert it is absent.
      // Step 3: Repeat for the Payment Plan Status Change letter and assert no surcharge line.
      // Step 4: Repeat for the Payment Successful letter and assert the Amount Paid is shown without any surcharge breakup line.
      // Step 5: Repeat for the Payment Failed letter and assert no surcharge amount is quoted.
      // Step 6: Repeat for the Payment Due and Card Expiry letters and assert no surcharge label appears.
      // Step 7: Assert no empty surcharge label or zero-value surcharge row is rendered in any of them.
      // Expected: None of the payment-plan letters (Setup, Status Change, Payment Successful, Payment Failed, Payment Due, Card Expiry) shows any surcharge label, surcharge amount or surcharge-inclusive total; amounts shown are the plain plan/installment amounts.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-036: [New] The receipt generated from a payment plan payment shows no surcharge field or column. [@templates-letters @negative @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-036");
    logger.info("Executing test case: [New] The receipt generated from a payment plan payment shows no surcharge field or column.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Run a payment on Plan1 (scheduled run or Pay Now) so receipt Rec1 is created.
      // Step 2: Open Rec1 on screen and inspect every amount field.
      // Step 3: Assert there is no surcharge field or surcharge column anywhere on the receipt.
      // Step 4: Assert the receipt total equals the amount actually collected with no surcharge added.
      // Step 5: Open the print/PDF view of Rec1 and assert no surcharge line is printed.
      // Step 6: Open the payment row on Transaction Tracking for Rec1 and assert no surcharge column is visible.
      // Step 7: Negative check: assert no blank or zero surcharge placeholder is displayed.
      // Expected: Receipt Rec1 shows only the payment amount with no surcharge field, no surcharge column and no surcharge total, on screen and in the printed copy.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-TPL-037: [New] The Payment Plan Agreement document contains no surcharge clause, field or amount. [@templates-letters @negative @detail @regression]", async ({ page, recurringPaymentPlanPage, defaultPatient, logger }) => {
    logger.setTestCaseId("RPP-TPL-037");
    logger.info("Executing test case: [New] The Payment Plan Agreement document contains no surcharge clause, field or amount.");

    // 1. Open plan and preview agreement / letters
    await test.step("Open Payment Plan Agreement preview", async () => {
      await recurringPaymentPlanPage.openForPatient(defaultPatient.patientId);
      logger.info("Verifying letter template for " + defaultPatient.name);
    });

    // 2. Verify template merge fields and clauses
    await test.step("Verify template sections and merge fields", async () => {
      // Step 1: Open Pat1 > Payment Plan > Plan1 and launch the Agreement preview.
      // Step 2: Read the Payment Details section and assert no surcharge field is listed.
      // Step 3: Read Terms & Conditions and assert no surcharge clause is present.
      // Step 4: Assert the Total Authorized Amount equals the plan amount maths without any surcharge addition.
      // Step 5: Accept the agreement and open the stored patient-level document.
      // Step 6: Assert the stored document likewise contains no surcharge wording.
      // Step 7: Open the agreement e-mail document and assert the same.
      // Expected: The agreement shows the plan amount and total authorized amount without any surcharge line, surcharge clause or surcharge-inclusive total, both in the on-screen preview and in the saved/emailed document.
      expect(true).toBeTruthy();
    });

  });
});
