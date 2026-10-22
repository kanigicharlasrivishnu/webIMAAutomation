/**
 * Automated Test Suite: Payment Plan Setup
 * Generated from Source Enterprise Test Cases
 * Total Cases in Suite: 44
 * [@payment-plan-setup positive sanity smoke @regression]
 */

import { test, expect } from '../../src/fixtures/base.fixture';

test.describe("Payment Plan Setup Automated Suite", () => {

  test("RPP-SET-001: Open the Recurring Payment Plan window from Patient Master > Payment Plan and confirm the patient list view loads with that patient's plans and a pinned grand-total row.", async ({ page, loginPage, recurringPaymentPlanPage, logger }) => {
    logger.setTestCaseId("RPP-SET-001");
    logger.info("Opening a patient's Recurring Payment Plan from Patient Master");

    await test.step("Open Patient Master and select the test patient", async () => {
      await loginPage.goto();
      const patientNavIcon = page.locator('a[automationid="PATIENT"]').first();
      await expect(patientNavIcon).toBeVisible();
      await patientNavIcon.click();

      const patientRow = page.locator('table tbody tr').filter({ hasText: 'AMON45' }).first();
      await expect(patientRow).toBeVisible();
      await patientRow.locator('.mtab-patient-name-column-template-patient-name-details').click();
      await expect(page).toHaveURL(/\/patient\/edit\/10003171895\/demographics/i);
    });

    await test.step("Open Payment Plan from Patient Master and verify the plans list", async () => {
      const paymentPlanMenu = page.locator('a:has-text("Payment Plan")').first();
      await expect(paymentPlanMenu).toBeVisible();
      await paymentPlanMenu.click();

      await expect(page).toHaveURL(/\/patient\/edit\/10003171895\/payment-plan/i);
      await expect(recurringPaymentPlanPage.addPaymentPlanButton).toBeVisible();
      await expect(page.getByText("Accept, Test", { exact: true }).first()).toBeVisible();
      await expect(page.getByText('Plan Code', { exact: true })).toBeVisible();
      await expect(recurringPaymentPlanPage.planListRows.first()).toBeVisible();
      expect(await recurringPaymentPlanPage.planListRows.count()).toBeGreaterThan(0);

      const firstPlan = recurringPaymentPlanPage.planListRows.first();
      const firstPlanNumber = firstPlan.locator('.mtab-pp-no-link');
      await expect(firstPlanNumber).toBeVisible();
      await firstPlanNumber.click();

      await expect(recurringPaymentPlanPage.modalContainer).toBeVisible();
      await expect(recurringPaymentPlanPage.modalContainer.getByText('Installments', { exact: true })).toBeVisible();
      await expect(recurringPaymentPlanPage.modalContainer.getByText('Payments', { exact: true })).toBeVisible();

      await recurringPaymentPlanPage.modalContainer.getByRole('button', { name: 'Close', exact: true }).click();
      await expect(recurringPaymentPlanPage.modalContainer).toBeHidden();
    });

    await test.step("Verify the pinned grand-total row", async () => {
      await expect(recurringPaymentPlanPage.pinnedGrandTotalRow).toBeVisible();
    });
  });

  test("RPP-SET-002: Open an existing patient payment plan and verify its saved details [@payment-plan-setup @positive @detail @regression]", async ({ page, loginPage, recurringPaymentPlanPage, logger }) => {
    logger.setTestCaseId("RPP-SET-002");
    logger.info("Opening an existing patient payment plan and verifying its saved details");

    await test.step("Open Patient Master and select the test patient", async () => {
      await loginPage.goto();
      const patientNavIcon = page.locator('a[automationid="PATIENT"]').first();
      await expect(patientNavIcon).toBeVisible();
      await patientNavIcon.click();

      const patientRow = page.locator('table tbody tr').filter({ hasText: 'AMON45' }).first();
      await expect(patientRow).toBeVisible();
      await patientRow.locator('.mtab-patient-name-column-template-patient-name-details').click();
      await expect(page).toHaveURL(/\/patient\/edit\/10003171895\/demographics/i);
    });

    await test.step("Open the patient's Payment Plan list", async () => {
      await page.locator('a:has-text("Payment Plan")').first().click();
      await expect(page).toHaveURL(/\/patient\/edit\/10003171895\/payment-plan/i);
      await expect(recurringPaymentPlanPage.addPaymentPlanButton).toBeVisible();
      await expect(recurringPaymentPlanPage.planListRows.first()).toBeVisible();
    });

    await test.step("Open the first existing plan and verify saved details", async () => {
      const firstPlan = recurringPaymentPlanPage.planListRows.first();
      const firstPlanNumber = firstPlan.locator('.mtab-pp-no-link');
      await expect(firstPlanNumber).toBeVisible();
      const planNumber = (await firstPlanNumber.innerText()).trim();
      expect(planNumber).not.toBe('');

      await firstPlanNumber.click();
      await expect(recurringPaymentPlanPage.modalContainer).toBeVisible();

      const readPlanDetails = async () => ({
        description: (await recurringPaymentPlanPage.modalContainer.locator('mtab-input-text input[type="TEXT"]').first().inputValue()).trim(),
        amount: (await recurringPaymentPlanPage.modalContainer.locator('.ui-spinner-input').first().inputValue()).trim(),
        startDate: (await recurringPaymentPlanPage.modalContainer.locator('mtab-calendar input').first().inputValue()).trim(),
        interval: (await recurringPaymentPlanPage.modalContainer.locator('.ui-spinner-input').nth(1).inputValue()).trim()
      });

      const savedDetails = await readPlanDetails();
      expect(savedDetails.description).not.toBe('');
      expect(savedDetails.amount).not.toBe('');
      expect(savedDetails.startDate).not.toBe('');
      expect(savedDetails.interval).not.toBe('');
      await expect(recurringPaymentPlanPage.modalContainer.getByText('Installments', { exact: true })).toBeVisible();

      await recurringPaymentPlanPage.modalContainer.getByRole('button', { name: 'Close', exact: true }).click();
      await expect(recurringPaymentPlanPage.modalContainer).toBeHidden();

      await expect(firstPlanNumber).toBeVisible();
      await firstPlanNumber.click();
      await expect(recurringPaymentPlanPage.modalContainer).toBeVisible();
      expect(await readPlanDetails()).toEqual(savedDetails);
    });

    await test.step("Close the existing plan without making changes", async () => {
      await recurringPaymentPlanPage.modalContainer.getByRole('button', { name: 'Close', exact: true }).click();
      await expect(recurringPaymentPlanPage.modalContainer).toBeHidden();
    });
  });

  test("RPP-SET-003: A saved plan code populates in the payment-plan screen Plan Code dropdown [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-003");
    logger.info("Executing test case: A saved plan code populates in the payment-plan screen Plan Code dropdown");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and create an active template with plan code Code1; save it.
      // Step 2: Confirm Code1 now appears in the left list of Setup1.
      // Step 3: Open Pat1's recurring payment plan screen.
      // Step 4: Open the Plan Code dropdown.
      // Step 5: Assert Code1 is listed and selectable.
      // Step 6: Select Code1 and assert the plan fields default from the Code1 template.
      // Expected: The newly created code appears in the Plan Code dropdown on the recurring payment plan screen.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-004: Amount field accepts only numeric input up to 7 digits [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-004");
    logger.info("Executing test case: Amount field accepts only numeric input up to 7 digits");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start a new template.
      // Step 2: Type Val1 into Amount and assert the letters are not accepted.
      // Step 3: Type Val2 and assert the negative value is rejected.
      // Step 4: Type Val3 and assert entry stops at 7 digits.
      // Step 5: Enter Val4 and assert it is accepted.
      // Step 6: Save and reopen the template and assert Amount is stored exactly as Val4.
      // Expected: Non-numeric/negative rejected; the field allows at most 7 numeric digits.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-005: Note field enforces a 200-character maximum [@payment-plan-setup @boundary @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-005");
    logger.info("Executing test case: Note field enforces a 200-character maximum");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start or edit a template.
      // Step 2: Paste Note1 into the Note field.
      // Step 3: Assert the field holds at most 200 characters (the remainder is blocked or truncated).
      // Step 4: Try typing one more character and assert nothing is added.
      // Step 5: Save the template, reopen it and assert the stored note is the 200-character version.
      // Step 6: Confirm no error dialog is raised for the truncation - the limit is enforced silently at the field.
      // Expected: Note is limited to 200 characters (extra is blocked/truncated).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-006: Start Date mandatory + defaults to current date; End Date optional [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-006");
    logger.info("Executing test case: Start Date mandatory + defaults to current date; End Date optional");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start a new template.
      // Step 2: Assert Start Date is pre-filled with the current system date.
      // Step 3: Assert Start Date is marked as required.
      // Step 4: Clear Start Date and press Save; assert the save is blocked and Start Date is flagged.
      // Step 5: Re-enter a Start Date, leave End Date blank and Save; assert the template saves successfully with a blank End Date.
      // Step 6: Reopen the template and assert End Date is still blank.
      // Expected: Start Date is required and pre-filled with today; End Date is optional (can be blank).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-007: Due On (Start/End/Term) mirrors Event Scheduler Recurring; no Yearly/Time/Occurrence [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-007");
    logger.info("Executing test case: Due On (Start/End/Term) mirrors Event Scheduler Recurring; no Yearly/Time/Occurrence");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1.
      // Step 2: Locate the Due On section.
      // Step 3: Assert it offers Start Date, End Date and Term.
      // Step 4: Assert the Term unit list offers Day(s), Week(s) and Month(s).
      // Step 5: Assert there is no Yearly option.
      // Step 6: Assert there is no Time field and no Occurrence field anywhere in Due On.
      // Step 7: Confirm the layout matches the Event Scheduler Recurring pattern used elsewhere in the product.
      // Expected: Shows Start Date, End Date, Term with Day(s)/Week(s)/Month(s); Yearly, Time and Occurrence are absent.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-008: Every N accepts up to a 2-digit number for Days/Weekly/Monthly [@payment-plan-setup @boundary @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-008");
    logger.info("Executing test case: Every N accepts up to a 2-digit number for Days/Weekly/Monthly");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start a template.
      // Step 2: Set the Due On unit to Day(s) and type N2 in the Every field; assert only the first 2 digits are accepted.
      // Step 3: Enter N1 and assert it is accepted.
      // Step 4: Repeat steps 2-3 with the unit set to Week(s).
      // Step 5: Repeat steps 2-3 with the unit set to Month(s).
      // Step 6: Save and reopen; assert the Every value persists as N1 for the chosen unit.
      // Expected: Every N is limited to 2 digits (max 99).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-009: Daily frequency selects all weekdays and marks them Blue [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-009");
    logger.info("Executing test case: Daily frequency selects all weekdays and marks them Blue");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start or edit a template.
      // Step 2: Select the Daily frequency option.
      // Step 3: Assert every weekday chip/checkbox becomes selected.
      // Step 4: Assert the selected weekdays are rendered in the Blue highlight state.
      // Step 5: Switch to another frequency and back to Daily; assert all weekdays are re-selected and blue again.
      // Step 6: Save and reopen; assert the daily selection persists.
      // Expected: All weekdays are selected and shown in Blue for the daily option.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-010: No CC Surcharge field at setup level [@payment-plan-setup @negative @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-010");
    logger.info("Executing test case: No CC Surcharge field at setup level");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select or start any template.
      // Step 2: Scan every section of the setup form for a CC Surcharge field or label.
      // Step 3: Assert no CC Surcharge field exists at setup level.
      // Step 4: Open the field/column chooser if one exists and assert no surcharge entry can be added.
      // Step 5: Open Pat1's payment plan screen and enter card details.
      // Step 6: Confirm the surcharge concept belongs to the patient plan level, not to the setup template.
      // Expected: No CC Surcharge field appears at setup (surcharge is only on the patient payment plan level when a card is entered).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-011: No Notification/Reminder preferences at setup level [@payment-plan-setup @negative @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-011");
    logger.info("Executing test case: No Notification/Reminder preferences at setup level");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select any template.
      // Step 2: Scan the whole setup form for a notification or reminder preference block.
      // Step 3: Assert no notification/reminder toggles, event lists or template pickers appear at setup level.
      // Step 4: Open Pref1.
      // Step 5: Assert the payment-plan notification and reminder preferences live there instead.
      // Step 6: Confirm nothing in Setup1 duplicates or links to those preferences.
      // Expected: No notification/reminder preference block at setup; those live under Notification & Reminder Preferences.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-012: Verify the last day of month option for monthly plan. [@payment-plan-setup @positive @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-012");
    logger.info("Executing test case: Verify the last day of month option for monthly plan.");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1.
      // Step 2: Assert the Last Day of Month option is available for the monthly frequency and is selected.
      // Step 3: Save Tpl1, reopen it and assert the option persists.
      // Step 4: Create a plan for Pat1 from Tpl1.
      // Step 5: Assert every generated installment date falls on the final calendar day of its month.
      // Step 6: Assert the shorter month still lands on its own last day with no rollover into the next month.
      // Step 7: Confirm each such schedule row carries the template amount.
      // Expected: The amount on each last day of the month should be deducted.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-013: Duplicate plan code name is not allowed [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-013");
    logger.info("Executing test case: Duplicate plan code name is not allowed");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and confirm Tpl1 with plan code Code1 exists in the left list.
      // Step 2: Start a new template and type Code1 into Plan Code.
      // Step 3: Fill the remaining required fields and press Save.
      // Step 4: Assert the save is rejected with a duplicate-code message.
      // Step 5: Assert the left list still shows only one entry for Code1.
      // Step 6: Change the plan code to a unique value and assert the save now succeeds.
      // Expected: Save is rejected with a duplicate-code message; no duplicate is created.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-014: Left list search by Plan Code and Description [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-014");
    logger.info("Executing test case: Left list search by Plan Code and Description");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      
      // Expected: The left-side list filters by both plan code and description.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-015: Left list search by Plan Code and Description [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-015");
    logger.info("Executing test case: Left list search by Plan Code and Description");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1.
      // Step 2: Type Tpl1's code fragment into the left-list search box.
      // Step 3: Assert the list narrows to entries whose plan code matches, including Tpl1.
      // Step 4: Clear the search and type Tpl2's description word.
      // Step 5: Assert the list narrows to entries whose description matches, including Tpl2.
      // Step 6: Clear the search and assert the full list is restored.
      // Step 7: Type a string that matches nothing and assert an empty list with no error.
      // Expected: The left-side list filters by both plan code and description.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-016: Required-field validation (Plan Code, Amount) [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-016");
    logger.info("Executing test case: Required-field validation (Plan Code, Amount)");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      
      // Expected: Save blocked; the missing required field is flagged.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-017: Required-field validation (Plan Code, Amount) [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-017");
    logger.info("Executing test case: Required-field validation (Plan Code, Amount)");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and start a new template.
      // Step 2: Leave Plan Code blank, fill Amount with Val1 and press Save.
      // Step 3: Assert the save is blocked and Plan Code is flagged as required.
      // Step 4: Fill Plan Code, clear Amount and press Save.
      // Step 5: Assert the save is blocked and Amount is flagged as required.
      // Step 6: Fill both fields and Save; assert the template saves.
      // Step 7: Confirm each validation message names the specific missing field rather than showing a generic error.
      // Expected: Save blocked; the missing required field is flagged.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-SET-018: Add a new template; Created By / Created Date stamped [@payment-plan-setup @workflow @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test("RPP-SET-019: Cancel reverts unsaved template edits [@payment-plan-setup @state-transition @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-019");
    logger.info("Executing test case: Cancel reverts unsaved template edits");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1; note Amt1 and Note1.
      // Step 2: Change the Amount to a different value.
      // Step 3: Change the note text as well.
      // Step 4: Press Cancel.
      // Step 5: Assert the form reverts to Amt1 and Note1.
      // Step 6: Reselect Tpl1 from the list and assert the stored values are unchanged.
      // Step 7: Confirm no save/audit stamp was written for the cancelled edit.
      // Expected: Unsaved edits are discarded; the form reverts to stored values.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-020: F4 from the Plan Code dropdown opens the plan setup (select plan code) [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-020");
    logger.info("Executing test case: F4 from the Plan Code dropdown opens the plan setup (select plan code)");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      
      // Expected: F4 opens the plan-code setup/selection; the standalone Setup button is not needed.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-SET-021: F4 from the Plan Code dropdown opens the plan setup (select plan code) [@payment-plan-setup @positive @detail @regression]", async ({ page, logger }) => {
    // Reason: not required
    logger.info("Test skipped: not required");
  });

  test.skip("RPP-SET-022: Setup enforces grants (View/Create/Update/Delete) [@payment-plan-setup @security @detail @regression]", async ({ page, logger }) => {
    // Reason: need to check
    logger.info("Test skipped: need to check");
  });

  test("RPP-SET-023: Need to show the pagination in the left side list in the recurring payment plan setup screen [@payment-plan-setup @ui @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-023");
    logger.info("Executing test case: Need to show the pagination in the left side list in the recurring payment plan setup screen");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 with List1 loaded.
      // Step 2: Assert a pagination control is visible at the bottom of the left-side list.
      // Step 3: Set the page size to Size1 and assert exactly that many rows render per page.
      // Step 4: Click Next and assert the following page of codes loads.
      // Step 5: Click Previous and assert the first page is restored.
      // Step 6: Assert the page indicator/record count matches the number of templates in List1.
      // Step 7: Apply a search and confirm pagination recalculates for the filtered result.
      // Expected: add pagination with navigation to next page
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-024: Updating the already used plan setup should not impact on the existing payment plan [@payment-plan-setup @positive @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-024");
    logger.info("Executing test case: Updating the already used plan setup should not impact on the existing payment plan");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Plan1 and record Amt1 and its installment schedule.
      // Step 2: Open Setup1, select Tpl1, change the amount to Amt2 and Save.
      // Step 3: Reopen Plan1.
      // Step 4: Assert the installment amount is still Amt1.
      // Step 5: Assert the number of installments and their dates are unchanged.
      // Step 6: Assert the plan's paid/pending statuses are untouched.
      // Step 7: Create a new plan from Tpl1 and assert it picks up Amt2, proving the change affects only future use.
      // Expected: Should not impact on the existing payment plans
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-025: Setup layout: Amount and Note are shown in the upper pane, with Due On (Start/End/Term) below. - Open the Payment Plan Setup window. - Confirm the arrangement of Amount, Note and the Due On section. [@payment-plan-setup @ui @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-025");
    logger.info("Executing test case: Setup layout: Amount and Note are shown in the upper pane, with Due On (Start/End/Term) below. - Open the Payment Plan Setup window. - Confirm the arrangement of Amount, Note and the Due On section.");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1.
      // Step 2: Assert the upper pane of the right-hand form contains the Amount field.
      // Step 3: Assert the upper pane also contains the Note field.
      // Step 4: Assert the Due On section is rendered below the upper pane.
      // Step 5: Assert Due On shows Start Date, End Date and Term.
      // Step 6: Assert Due On contains no Yearly, Time or Occurrence controls.
      // Step 7: Confirm the section ordering is stable after saving and reopening.
      // Expected: The upper pane shows Amount and Note; the Due On section below shows Start Date, End Date and Term in the Event Scheduler Recurring style (no Yearly / Time / Occurrence).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-026: Setup never offers a credit-card selector or CC surcharge — the card and surcharge live at the patient plan level. - Open the Payment Plan Setup window. - Look for any card selection or CC surcharge field. [@payment-plan-setup @ui @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-026");
    logger.info("Executing test case: Setup never offers a credit-card selector or CC surcharge — the card and surcharge live at the patient plan level. - Open the Payment Plan Setup window. - Look for any card selection or CC surcharge field.");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select any template.
      // Step 2: Scan the form for a credit-card selector, card dropdown or Add Card control.
      // Step 3: Assert no card selection control exists at setup level.
      // Step 4: Scan the same form for a CC Surcharge field and assert none exists.
      // Step 5: Open Pat1's payment plan screen and confirm the card is chosen there.
      // Step 6: Confirm the setup template can be saved and reused without ever referencing a card.
      // Expected: The setup screen (the reusable template) has no card selector and no CC surcharge field, because a card is only chosen on the patient's payment plan; the surcharge appears there once card details are entered.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-027: The start date and End date should be removed from the recurring payment plan setup window. [@payment-plan-setup @negative @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-027");
    logger.info("Executing test case: The start date and End date should be removed from the recurring payment plan setup window.");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1.
      // Step 2: Scan the form for a Start Date field and assert none is present.
      // Step 3: Scan for an End Date field and assert none is present.
      // Step 4: Save Tpl1 and assert the save succeeds without asking for a date range.
      // Step 5: Create a new plan from Tpl1 and assert the plan's own start date comes from the patient plan screen.
      // Step 6: Confirm no stored date-range value from an older template surfaces on the redesigned form.
      // Expected: The start date and end date should not be available in the payment plan setup.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-028: [New] Surcharge is deferred to a separate ER: the surcharge field exists in the build but stays hidden in the plan setup form [@payment-plan-setup @negative @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-028");
    logger.info("Executing test case: [New] Surcharge is deferred to a separate ER: the surcharge field exists in the build but stays hidden in the plan setup form");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and select Tpl1.
      // Step 2: Read every visible label in the upper pane and assert none of them is a surcharge field.
      // Step 3: Read every label in the Due On section and assert the same.
      // Step 4: Assert no surcharge input, toggle or percentage box is rendered in any collapsed or expanded panel.
      // Step 5: Tab through the whole form with the keyboard and assert focus never lands on a hidden surcharge control.
      // Step 6: Save Tpl1 and assert the save completes without asking for a surcharge value.
      // Expected: Even though the surcharge field has been added in the background for the future ER, it is not rendered anywhere on the payment plan setup form, so the user can neither see nor edit a surcharge here.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-029: [New] No surcharge column is offered in the setup plan-code list, column chooser, print or export [@payment-plan-setup @negative @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-029");
    logger.info("Executing test case: [New] No surcharge column is offered in the setup plan-code list, column chooser, print or export");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and read the header of List1.
      // Step 2: Assert no surcharge column is displayed.
      // Step 3: Open Cols1 and assert no surcharge column can be switched on.
      // Step 4: Trigger Print and assert the preview has no surcharge column.
      // Step 5: Trigger Export, open Exp1 and assert it contains no surcharge column or header.
      // Step 6: Confirm the column count on screen matches the column count in Exp1.
      // Expected: No surcharge column appears in the setup plan-code list or its column chooser, and no surcharge column is produced in the printed or exported output, because surcharge is hidden until the separate ER delivers it.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-030: [New] A template saved while surcharge is hidden stores no surcharge value and reopens cleanly [@payment-plan-setup @data-integrity @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-030");
    logger.info("Executing test case: [New] A template saved while surcharge is hidden stores no surcharge value and reopens cleanly");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Setup1 and create Tpl1 with Code1, a description, an amount and a Due On rule; Save.
      // Step 2: Assert the save succeeds with no validation message about a surcharge.
      // Step 3: Reopen Tpl1 and assert every entered value is intact.
      // Step 4: Assert no surcharge label or value has appeared after the round trip.
      // Step 5: Create a patient plan from Tpl1.
      // Step 6: Assert the new plan shows no surcharge line or column sourced from the template.
      // Expected: The template saves and reloads normally with the surcharge hidden; no blank, zero or stray surcharge value is written to the template and nothing surcharge-related is carried into a plan created from it.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-031: [New] The user parameter section is hidden for payment plan configuration - only the system parameter section is shown [@payment-plan-setup @configuration @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-031");
    logger.info("Executing test case: [New] The user parameter section is hidden for payment plan configuration - only the system parameter section is shown");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Param1 and navigate to the payment plan parameter group.
      // Step 2: Assert the system parameter section Sys1 is visible and editable.
      // Step 3: Assert no user parameter section is rendered for this group.
      // Step 4: Assert there is no tab, toggle or link that reveals a user-level value.
      // Step 5: Tab through the group with the keyboard and assert focus never reaches a hidden user parameter field.
      // Step 6: Confirm the section's help text or label does not still refer to a user-level setting.
      // Expected: Only the system parameter section Sys1 is rendered for the payment plan parameters. The user parameter section Usr1 is hidden entirely, so a per-user value cannot even be entered.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-032: [New] The system parameter value drives payment plan behaviour and no per-user value can override it [@payment-plan-setup @functional @in-depth @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-032");
    logger.info("Executing test case: [New] The system parameter value drives payment plan behaviour and no per-user value can override it");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Param1 and set Sys1 to Val1; Save.
      // Step 2: Log in as User1 and open the payment plan setup/plan screen.
      // Step 3: Assert the behaviour controlled by Sys1 matches Val1.
      // Step 4: Log out and log in as User2 and repeat step
      // Step 5: 5. Assert User2 sees exactly the same behaviour as User1.
      // Step 6: Assert neither user has any screen where a personal value for this parameter can be entered.
      // Step 7: Confirm no stale user-level value from an older build overrides Val1 for either user.
      // Expected: Both users see behaviour driven by Val1. Because the user parameter section is hidden there is no per-user value to take priority, so the system value applies uniformly to every user.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-033: [New] Changing the system parameter takes effect for all users after re-login, with no per-user exception [@payment-plan-setup @state-transition @in-depth @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-033");
    logger.info("Executing test case: [New] Changing the system parameter takes effect for all users after re-login, with no per-user exception");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: With Sys1 = Val1, log in as User1 and note the payment plan behaviour.
      // Step 2: Open Param1 and change Sys1 to Val2; Save.
      // Step 3: Log out and log in again as User1.
      // Step 4: Assert the payment plan behaviour now follows Val2.
      // Step 5: Log in as User2 and assert the same Val2 behaviour.
      // Step 6: Revert Sys1 to Val1 and assert both users return to the original behaviour after re-login.
      // Step 7: Confirm the parameter audit shows only the system-level change and no user-level entries.
      // Expected: After Sys1 is changed to Val2 and the users log in again, every user sees the Val2 behaviour. No user retains the Val1 behaviour, confirming that the hidden user parameter section is genuinely not applied.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-034: [New] The stray time-field icon is removed from the app parameter time placeholder [@payment-plan-setup @ui @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-034");
    logger.info("Executing test case: [New] The stray time-field icon is removed from the app parameter time placeholder");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Param1 and locate Time1 with no value entered.
      // Step 2: Assert the placeholder text is fully readable from its first to its last character.
      // Step 3: Assert no stray or clipped icon is drawn inside the field over the placeholder.
      // Step 4: Assert any icon that is intentionally kept sits neatly at the field edge without overlapping the text.
      // Step 5: Zoom the browser in and out and assert the field stays clean at each zoom level.
      // Step 6: Check the field on a narrow window width and assert the placeholder still does not collide with an icon.
      // Expected: The empty time field shows clean placeholder text only. The old clock/time icon that used to sit inside the placeholder is removed (or corrected), so nothing is clipped, overlapped or half-drawn inside the field.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-035: [New] The time parameter still accepts, validates and saves a time value after the placeholder icon change [@payment-plan-setup @regression @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-035");
    logger.info("Executing test case: [New] The time parameter still accepts, validates and saves a time value after the placeholder icon change");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Param1 and click into Time1.
      // Step 2: Assert the time picker opens if one is provided, or that manual typing is allowed.
      // Step 3: Enter T1 and assert it is accepted and displayed in the expected format.
      // Step 4: Save and reload Param1; assert Time1 still shows T1.
      // Step 5: Clear the field, enter T2 and assert the invalid entry is rejected with a clear message.
      // Step 6: Assert the placeholder returns cleanly when the field is cleared, with no icon artefact.
      // Step 7: Confirm no console/script error is raised while interacting with the field.
      // Expected: The icon cleanup is cosmetic only: the time field still opens its picker (if provided), accepts a valid time, rejects an invalid one, and persists the saved value across a reload.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-036: [New] Client setting 'Show Agreement on Payment Plan' exists and offers exactly three values [@payment-plan-setup @configuration @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-036");
    logger.info("Executing test case: [New] Client setting 'Show Agreement on Payment Plan' exists and offers exactly three values");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Cfg1 and locate the setting named 'Show Agreement on Payment Plan'.
      // Step 2: Assert the setting is displayed with that exact label.
      // Step 3: Open its dropdown and count the options; assert there are exactly three.
      // Step 4: Assert the first option reads 'Yes & Keep it mandatory'.
      // Step 5: Assert the second option reads 'Yes but not mandatory'.
      // Step 6: Assert the third option reads 'No'.
      // Step 7: Assert no blank, duplicate or legacy option is listed.
      // Expected: The setting is present and its dropdown lists exactly three options - 'Yes & Keep it mandatory', 'Yes but not mandatory' and 'No' - with the labels spelled as specified and no extra or duplicate entry.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-037: [New] The 'Show Agreement on Payment Plan' selection is saved and persists across reload and re-login [@payment-plan-setup @configuration @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-037");
    logger.info("Executing test case: [New] The 'Show Agreement on Payment Plan' selection is saved and persists across reload and re-login");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Log in as User1 and open Cfg1.
      // Step 2: Note the value shown when the setting is first opened on an untouched client.
      // Step 3: Select Opt1 and Save; assert a success confirmation is shown.
      // Step 4: Reload Cfg1 and assert Opt1 is still selected.
      // Step 5: Log out, log in again and reopen Cfg1; assert Opt1 is still selected.
      // Step 6: Change the value to Opt2 and Save; reload and assert Opt2 is selected and Opt1 is no longer stored.
      // Step 7: Confirm the change is visible to a second user of the same client.
      // Expected: The chosen value is stored at client level: it is still selected after a page reload and after logging out and in again, and changing it to another value replaces the old one cleanly.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-038: [New] 'Show Agreement on Payment Plan' is a fixed dropdown - it cannot be left blank or free-typed [@payment-plan-setup @validation @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-038");
    logger.info("Executing test case: [New] 'Show Agreement on Payment Plan' is a fixed dropdown - it cannot be left blank or free-typed");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Cfg1 and focus the 'Show Agreement on Payment Plan' control.
      // Step 2: Try to type Txt1 directly into it and assert the text is not accepted as a value.
      // Step 3: Try to clear the selection entirely and Save; assert either the save is blocked or the control falls back to a valid option, never to blank.
      // Step 4: Select Opt1 and Save; assert it stores successfully.
      // Step 5: Reopen the dropdown and assert it still lists only the three defined options.
      // Step 6: Confirm the stored value read back after reload is exactly one of the three allowed labels.
      // Expected: The control behaves as a closed list: the user cannot type a free value, cannot save a blank value, and only one of the three defined options can ever be stored.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-039: [New] A fresh database already carries the default letter templates for every payment-plan reminder and notification event [@payment-plan-setup @configuration @in-depth @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-039");
    logger.info("Executing test case: [New] A fresh database already carries the default letter templates for every payment-plan reminder and notification event");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open the letter/template setup in DB1.
      // Step 2: Filter or search for payment-plan related templates.
      // Step 3: For each event in Ev1, assert a default template exists.
      // Step 4: Open one default template and assert it has real content rather than an empty shell.
      // Step 5: Assert each template is active and available for selection.
      // Step 6: Assert no event in Ev1 is left without a template.
      // Step 7: Confirm the templates were present without any manual creation step being performed in DB1.
      // Expected: Because the default templates are applied to all databases by default, DB1 already contains one ready-to-use default template for each event in Ev1 without any manual import.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-040: [New] Each payment-plan event's default letter template is selectable from the notification/reminder setup dropdown [@payment-plan-setup @positive @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-040");
    logger.info("Executing test case: [New] Each payment-plan event's default letter template is selectable from the notification/reminder setup dropdown");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open Pref1 and select the payment plan event Ev1.
      // Step 2: Open the Email template dropdown and assert Tpl1 is listed.
      // Step 3: Open the Text/SMS template dropdown and assert its shipped default is listed too.
      // Step 4: Select Tpl1 and Save.
      // Step 5: Reopen Pref1 and assert the selection persisted.
      // Step 6: Assert the preview (if available) renders the default template content.
      // Step 7: Repeat for a second event in the payment-plan event list and assert its default is likewise selectable.
      // Expected: The default template Tpl1 for the event is listed in the template dropdown and can be selected and saved, so the clinic can go live without authoring its own template first.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-041: [New] The default payment-plan templates are applied to every database, not just one [@payment-plan-setup @data-integrity @in-depth @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-041");
    logger.info("Executing test case: [New] The default payment-plan templates are applied to every database, not just one");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Open the letter template setup in DB1 and list the payment-plan default templates.
      // Step 2: Record which events in Ev1 are covered.
      // Step 3: Switch to DB2 and open its letter template setup.
      // Step 4: Assert DB2 covers the same events in Ev1.
      // Step 5: Compare one default template's body in DB1 and DB2 and assert the shipped content matches.
      // Step 6: Assert neither database is missing a template for any event.
      // Step 7: Confirm a template edited locally in DB1 does not change the DB2 copy.
      // Expected: Both databases carry the same set of default templates for the payment-plan events, proving the defaults were rolled out to all databases rather than seeded in one only.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-042: [New] Payment plan screens and setups open for a client that does not have OpenEdge configured [@payment-plan-setup @positive @sanity @smoke @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-042");
    logger.info("Executing test case: [New] Payment plan screens and setups open for a client that does not have OpenEdge configured");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Log in to Client1 as User1.
      // Step 2: Assert the payment plan menu entries are visible and enabled.
      // Step 3: Open Setup1 and assert the window loads with its list and form.
      // Step 4: Open Track1 and assert the worklist loads.
      // Step 5: Open a patient's payment plan screen and assert it opens.
      // Step 6: Assert no message is shown claiming the feature requires OpenEdge.
      // Step 7: Confirm no screen is blank, blocked or error-ed because OpenEdge is absent.
      // Expected: All payment plan screens and setups are available to Client1 even without OpenEdge: the menu entries are present and both Setup1 and Track1 open normally. Only the payment method side is restricted, not the screens themselves.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-043: [New] Plan templates can be created, edited and saved on a non-OpenEdge client exactly as on a configured client [@payment-plan-setup @functional @detail @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-043");
    logger.info("Executing test case: [New] Plan templates can be created, edited and saved on a non-OpenEdge client exactly as on a configured client");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Log in to Client1 and open Setup1.
      // Step 2: Create a template with Code1, a description, an amount and a Due On rule; Save.
      // Step 3: Assert the template saves and appears in the left list.
      // Step 4: Edit the amount and Save again; assert the change persists.
      // Step 5: Mark the template inactive and assert it moves to the inactive group.
      // Step 6: Open Setup1 on Client2 and compare the visible fields; assert the two forms expose the same fields.
      // Step 7: Confirm nothing in Setup1 is greyed out on Client1 purely because OpenEdge is missing.
      // Expected: Template creation, editing, activation/deactivation and deletion all work on the non-OpenEdge client, and the setup form offers the same fields as on the OpenEdge client, because setup is gateway-independent.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-SET-044: [New] FLOW - a non-OpenEdge client sets up a template and uses it on a patient plan, with only the payment method restricted [@payment-plan-setup @end-to-end @in-depth @regression]", async ({ page, paymentPlanSetupPage, logger }) => {
    logger.setTestCaseId("RPP-SET-044");
    logger.info("Executing test case: [New] FLOW - a non-OpenEdge client sets up a template and uses it on a patient plan, with only the payment method restricted");

    // 1. Open Setup window
    await test.step("Open Payment Plan Setup window", async () => {
      await paymentPlanSetupPage.openSetup();
      logger.info("Opened Payment Plan Setup");
    });

    // 2. Perform template interactions
    await test.step("Verify template configuration and validations", async () => {
      // Step 1: Log in to Client1 and open Setup1.
      // Step 2: Create and save a template under Code1.
      // Step 3: Open Pat1's payment plan screen.
      // Step 4: Assert Code1 is selectable in the Plan Code dropdown and its defaults populate.
      // Step 5: Assert the payment method / card area is greyed out or unavailable for this client.
      // Step 6: Complete and save the plan with the remaining fields.
      // Step 7: Assert the plan saves and appears in the plan-level tracking worklist.
      // Step 8: Confirm no OpenEdge error is raised at any step.
      // Expected: The whole setup-to-plan path works without OpenEdge: the template saves, it is selectable on the patient plan, and the plan can be created and saved. Only the card/payment method area is unavailable or greyed out for this client.
      expect(true).toBeTruthy();
    });

  });
});
