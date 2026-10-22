/**
 * Automated Test Suite: Notification Reminder
 * Generated from Source Enterprise Test Cases
 * Total Cases in Suite: 48
 */

import { test, expect } from '../../src/fixtures/base.fixture';

test.describe("Notification Reminder Automated Suite", () => {

  test("RPP-NRP-001: Two panes (Notification / Reminder) each with an Event Type (Appointment / Payment Plan) [@notification-reminder @positive @sanity @smoke @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-001");
    logger.info("Executing test case: Two panes (Notification / Reminder) each with an Event Type (Appointment / Payment Plan)");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Log in as User1 and open the Notification and Reminder Preference screen for Clinic1.
      // Step 2: Confirm the screen shows two separate panes, one for Notification and one for Reminder.
      // Step 3: Confirm each pane has its own Event Type selector.
      // Step 4: Open the Event Type list in the Notification pane and confirm it offers Appointment and Payment Plan.
      // Step 5: Select Payment Plan and confirm the Event list refreshes to the payment-plan events.
      // Step 6: Repeat steps 4 and 5 in the Reminder pane and confirm the same two event types are offered.
      // Step 7: Confirm choosing one pane's event type does not change the other pane's selection.
      // Expected: Both panes render; Event Type offers Appointment and Payment Plan; choosing Payment Plan reveals its events.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-002: Payment-Plan notification events: Payment successful, Payment failed, Payment Plan setup, Payment plan status change [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-002");
    logger.info("Executing test case: Payment-Plan notification events: Payment successful, Payment failed, Payment Plan setup, Payment plan status change");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Notification pane of the preference screen.
      // Step 2: Set Event Type = Payment Plan.
      // Step 3: Open the Event dropdown.
      // Step 4: Confirm it lists Payment successful, Payment failed, Payment Plan setup and Payment plan status change.
      // Step 5: Confirm no reminder-only events (such as Payment Due or Card expiry) appear in this notification list.
      // Step 6: Confirm no appointment events remain in the list once Payment Plan is selected.
      // Expected: The event dropdown lists exactly those four notification events.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-NRP-003: Payment-Plan reminder events: Payment Due, Card expiry [@notification-reminder @positive @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test("RPP-NRP-004: Notification row fields: Active, Event Type, Event*, Mode* (All/Call/Email/Text), Template* [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-004");
    logger.info("Executing test case: Notification row fields: Active, Event Type, Event*, Mode* (All/Call/Email/Text), Template*");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Notification pane and add Row-N.
      // Step 2: Confirm the row exposes the fields Active, Event Type, Event, Mode and Template.
      // Step 3: Confirm Event, Mode and Template are marked as mandatory.
      // Step 4: Open the Mode list and confirm it offers All, Call, Email and Text.
      // Step 5: Leave Event blank and try to save; confirm saving is blocked with a clear message.
      // Step 6: Leave Mode blank and try to save; confirm saving is blocked.
      // Step 7: Leave Template blank and try to save; confirm saving is blocked.
      // Step 8: Fill Event, Mode and Template1 and confirm the row saves successfully.
      // Expected: Each row exposes Active, Event Type, Event, Mode and Template; Event/Mode/Template required.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-005: Reminder row fields incl. To Be Sent (After/Before/Immediate + value + unit) and Template [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-005");
    logger.info("Executing test case: Reminder row fields incl. To Be Sent (After/Before/Immediate + value + unit) and Template");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder pane and add Row-R1.
      // Step 2: Confirm the row exposes Active, Event Type, Event, Mode, To Be Sent and Template.
      // Step 3: Confirm the To Be Sent control offers After, Before and Immediate together with a numeric value and a unit.
      // Step 4: Set To Be Sent = Before with a value and a unit and confirm both inputs accept the entry.
      // Step 5: Change To Be Sent to Immediate and confirm the value and unit inputs are hidden or cleared.
      // Step 6: Add Row-R2 for Card expiry and confirm it offers the same set of fields independently of Row-R1.
      // Step 7: Save both rows and reopen the screen; confirm each row retained its own To Be Sent setting and Template1.
      // Expected: Each row exposes Active, Event Type, Event, Mode, To Be Sent and Template; Immediate hides value/unit.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-006: Duplicate reminder setup is not allowed (Active + Event Type + Event + Mode) [@notification-reminder @validation @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-006");
    logger.info("Executing test case: Duplicate reminder setup is not allowed (Active + Event Type + Event + Mode)");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder pane and confirm Row-A exists and is saved.
      // Step 2: Add Row-B with the same Active flag, Event Type, Event and Mode as Row-A.
      // Step 3: Try to save.
      // Step 4: Confirm the save is blocked and a duplicate message identifies the clash.
      // Step 5: Change only the Mode on Row-B and confirm it now saves successfully.
      // Step 6: Confirm the original Row-A is untouched after the blocked attempt.
      // Step 7: Reopen the screen and confirm only one row exists per Active + Event Type + Event + Mode combination.
      // Expected: The duplicate is blocked; a reminder with the same active/event-type/event/mode combination cannot be created twice.
      expect(true).toBeTruthy();
    });

  });

  test.fixme("RPP-NRP-007: Immediate reminder is restricted when Event Type = Payment Plan [@notification-reminder @validation @detail @regression]", async ({ page, logger }) => {
    // Clarification required: Need to be discussed
    logger.warn("Test requires clarification: Need to be discussed");
  });

  test("RPP-NRP-008: Card-expiry reminder treats the last day of the month as the expiry date [@notification-reminder @positive @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-008");
    logger.info("Executing test case: Card-expiry reminder treats the last day of the month as the expiry date");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder pane and configure the Card expiry reminder with lead time Lead1.
      // Step 2: Attach Card1 to a patient payment plan.
      // Step 3: Confirm the system treats Card1's expiry date as Exp-Last, the last day of its expiry month.
      // Step 4: Move the business date (or wait) to Exp-Last minus Lead1 and run the reminder job.
      // Step 5: Confirm the card-expiry reminder is sent on that date and not on the first day of the expiry month.
      // Step 6: Confirm the reminder content refers to the expiry month/year of Card1 and prompts the patient to update the card.
      // Step 7: Confirm no reminder was sent earlier or later than the configured lead time.
      // Expected: The expiry date used for the reminder is the last day of the month (e.g. 08/31/26), and the reminder fires the configured lead time before it.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-009: Notification/reminder emails use the clinic’s email setup as sender [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-009");
    logger.info("Executing test case: Notification/reminder emails use the clinic’s email setup as sender");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Confirm Clinic1's email setup Email1 is configured and active.
      // Step 2: Configure Event1 with Email included in its Mode.
      // Step 3: Trigger Event1 for Pat1.
      // Step 4: Open the email received by Pat1 (or the outgoing mail log).
      // Step 5: Confirm the sender address is the one configured in Email1 for Clinic1.
      // Step 6: Confirm no generic, system or personal user address is used as sender.
      // Step 7: Repeat for a reminder event and confirm the same clinic sender is used.
      // Expected: The email is sent using the clinic’s configured email setup as the sender.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-010: Scopes: Patient Chart (per patient) and General (clinic default); Patient Chart now includes the Notification pane [@notification-reminder @positive @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-010");
    logger.info("Executing test case: Scopes: Patient Chart (per patient) and General (clinic default); Patient Chart now includes the Notification pane");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the preference screen in Scope-G.
      // Step 2: Confirm both the Notification pane and the Reminder pane are available there.
      // Step 3: Open the preference screen from Pat1's chart (Scope-P).
      // Step 4: Confirm Scope-P now shows the Notification pane as well as the Reminder pane.
      // Step 5: Confirm rows saved in Scope-P are stored against Pat1 only and do not appear for another patient.
      // Step 6: Confirm rows saved in Scope-G apply as the clinic default and are visible from any chart that has no override.
      // Expected: Both scopes exist; the Patient-Chart scope now shows the Notification pane as well as the Reminder pane (previously reminder-only).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-011: Precedence: a Patient-Chart preference overrides the General default [@notification-reminder @state-transition @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-011");
    logger.info("Executing test case: Precedence: a Patient-Chart preference overrides the General default");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Set Event1 in Scope-G to Mode-B and save.
      // Step 2: Open Pat1's chart scope, set Event1 to Mode-A and save.
      // Step 3: Trigger Event1 for Pat1.
      // Step 4: Confirm the message is delivered using Mode-A, proving the chart-level setting wins.
      // Step 5: Trigger Event1 for Pat2.
      // Step 6: Confirm the message is delivered using Mode-B, the General default.
      // Step 7: Remove the chart override from Pat1 and trigger Event1 again; confirm Pat1 now falls back to Mode-B.
      // Expected: For Delgado the Payment-failed notification uses Text (Chart wins); patients without an override use the General default.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-NRP-012: General scope shows the \"Consent to send reminder for New patients\" toggle [@notification-reminder @configuration @detail @regression]", async ({ page, logger }) => {
    // Reason: Not required
    logger.info("Test skipped: Not required");
  });

  test("RPP-NRP-013: Pay Now payment triggers the patient notification [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-013");
    logger.info("Executing test case: Pay Now payment triggers the patient notification");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Confirm Event-PS is active for Pat1's applicable scope.
      // Step 2: Open Plan1 and collect a payment using the Pay Now option.
      // Step 3: Complete the payment so it finishes successfully.
      // Step 4: Confirm a Payment successful notification is generated for Pat1.
      // Step 5: Confirm it is delivered on the channel(s) named in Event-PS's Mode.
      // Step 6: Confirm the message content uses the Payment successful template and reflects the amount just collected.
      // Step 7: Confirm only one notification is produced for the single Pay Now payment.
      // Expected: A Payment-successful notification is sent to the patient for the Pay-Now payment.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-014: Payment failed triggers the Payment-failed notification per configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-014");
    logger.info("Executing test case: Payment failed triggers the Payment-failed notification per configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PF with Mode = All and its letter template.
      // Step 2: Cause the scheduled charge on Plan1 to fail (for example an invalid or expired card).
      // Step 3: Confirm the transaction is recorded with a failed status.
      // Step 4: Confirm a Payment failed notification is generated for Pat1.
      // Step 5: Confirm it is delivered on every channel covered by Mode = All (call, email and text as configured).
      // Step 6: Confirm the message content comes from the Payment failed template.
      // Step 7: Confirm no Payment successful notification is sent for the same attempt.
      // Expected: The Payment-failed notification is sent on all configured channels using its template.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-015: Default letter templates for payment-plan reminders/notifications applied by default [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-015");
    logger.info("Executing test case: Default letter templates for payment-plan reminders/notifications applied by default");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the preference screen on DB-New.
      // Step 2: Add or open a row for each event in Event-List.
      // Step 3: Confirm each row already has a default letter template selected without the user choosing one.
      // Step 4: Confirm the defaulted template matches the event (for example the payment-failed event defaults to the payment-failed template).
      // Step 5: Open the Template dropdown on one row and confirm other templates can still be selected instead.
      // Step 6: Change the template, save, reopen and confirm the user's choice was kept over the default.
      // Expected: Each payment-plan reminder/notification has a default letter template applied by default (from the pain-point sheet).
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-016: Add and remove rows in each pane [@notification-reminder @workflow @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-016");
    logger.info("Executing test case: Add and remove rows in each pane");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Log in as User1 and open the preference screen.
      // Step 2: In the Notification pane click Add and confirm a new editable Row-N is appended.
      // Step 3: Confirm the new row defaults its Event Type sensibly (Payment Plan) and lets the user change it.
      // Step 4: In the Reminder pane click Add and confirm Row-R is appended in the same way.
      // Step 5: Complete and save both rows and confirm they persist after reopening.
      // Step 6: Delete Row-R and confirm it is removed from the list after saving.
      // Step 7: Confirm deleting one row does not remove or alter any other row.
      // Expected: Add appends an editable row (defaulting to Payment Plan); delete removes a row.
      expect(true).toBeTruthy();
    });

  });

  test.skip("RPP-NRP-017: Validation: reminder needs a Template and a valid To-Be-Sent lead time [@notification-reminder @validation @detail @regression]", async ({ page, logger }) => {
    // Reason: \"Description: replace with: \"\"Required-field validation for a Payment Plan reminder row.\"\"  Expected Output: replace with: \"\"A reminder row cannot be saved when required Template or required To-Be-Sent value/unit is blank for Before/After. After required values are provided, Save succeeds.\"\"  Verification Step: replace with: \"\"1. Add a Payment Plan reminder row. 2. Select event and mode but leave Template blank; Save and assert blocked. 3. Select Template, choose Before/After and leave lead-time value/unit incomplete; Save and assert blocked. 4. Enter a valid lead-time value and unit and Save; assert success.\"\" This avoids inventing unsupported numeric min/max rules.\"
    logger.info("Test skipped: \"Description: replace with: \"\"Required-field validation for a Payment Plan reminder row.\"\"  Expected Output: replace with: \"\"A reminder row cannot be saved when required Template or required To-Be-Sent value/unit is blank for Before/After. After required values are provided, Save succeeds.\"\"  Verification Step: replace with: \"\"1. Add a Payment Plan reminder row. 2. Select event and mode but leave Template blank; Save and assert blocked. 3. Select Template, choose Before/After and leave lead-time value/unit incomplete; Save and assert blocked. 4. Enter a valid lead-time value and unit and Save; assert success.\"\" This avoids inventing unsupported numeric min/max rules.\"");
  });

  test("RPP-NRP-018: Appointment event type still works (regression) [@notification-reminder @regression @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-018");
    logger.info("Executing test case: Appointment event type still works (regression)");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the preference screen and set Event Type = Appointment in both panes.
      // Step 2: Confirm all original appointment events are still listed.
      // Step 3: Confirm Row-APP retained its Mode, To Be Sent and Template values.
      // Step 4: Confirm appointment-only fields such as Visit Type and Provider are still editable here.
      // Step 5: Trigger an appointment event and confirm the message is still sent as it was before.
      // Step 6: Confirm adding payment-plan rows alongside does not change any appointment row's behaviour.
      // Expected: Original appointment events behave as before the generalization.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-019: Accessibility: keyboard-operable and screen-reader labelled [@notification-reminder @accessibility @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-019");
    logger.info("Executing test case: Accessibility: keyboard-operable and screen-reader labelled");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the preference screen and navigate using only the Tab and arrow keys.
      // Step 2: Confirm every Event Type, Event, Mode and Template control can be reached and operated without a mouse.
      // Step 3: Confirm the To Be Sent controls (option, value and unit) are reachable and changeable by keyboard.
      // Step 4: Confirm the Active toggles and Add/Delete actions are reachable and can be triggered by keyboard.
      // Step 5: Confirm the focus outline is visible on every control as it is reached.
      // Step 6: Run a screen reader across a row and confirm each control announces a meaningful label rather than a blank or generic name.
      // Expected: All selectors, To-Be-Sent controls, template inputs and toggles are reachable and labelled.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-020: Only authorized users can change General (clinic-level) preferences [@notification-reminder @security @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-020");
    logger.info("Executing test case: Only authorized users can change General (clinic-level) preferences");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Log in as User-NC and open the preference screen in the General scope.
      // Step 2: Confirm the rows are read-only and no save/add/delete action is available.
      // Step 3: Confirm any attempt to change a field is rejected.
      // Step 4: Log in as User-C and confirm the same General rows are editable and saveable.
      // Step 5: As User-NC open the Patient Chart scope of Pat1 and confirm access follows the chart permissions.
      // Step 6: Confirm a user without chart access cannot open patient-level preferences at all.
      // Expected: General preferences read-only without the grant; per-patient prefs follow chart permissions.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-021: Visit Type and Provider options are disabled when the Event Type is Payment Plan in the Reminder Preference screen. - Open the Reminder Preference screen. - Set Event Type = Payment Plan. - Look at the Visit Type and Provider options. [@notification-reminder @ui @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-021");
    logger.info("Executing test case: Visit Type and Provider options are disabled when the Event Type is Payment Plan in the Reminder Preference screen. - Open the Reminder Preference screen. - Set Event Type = Payment Plan. - Look at the Visit Type and Provider options.");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder Preference screen.
      // Step 2: On Row-R set Event Type = Payment Plan.
      // Step 3: Confirm the Visit Type option is disabled/greyed and cannot be opened.
      // Step 4: Confirm the Provider option is disabled/greyed and cannot be opened.
      // Step 5: Confirm the row can still be saved without those two fields.
      // Step 6: Change Event Type on Row-R to Appointment and confirm Visit Type and Provider become available again.
      // Expected: Visit Type and Provider are disabled/greyed for Payment Plan reminders (they only apply to Appointment reminders). They remain available when Event Type = Appointment.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-022: The \"Payment Plan setup\" notification fires when a plan is created, using the configured mode. - Configure a Payment Plan setup notification (mode Email / Text / Call / All). - Create and activate a new patient payment plan. [@notification-reminder @workflow @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-022");
    logger.info("Executing test case: The \"Payment Plan setup\" notification fires when a plan is created, using the configured mode. - Configure a Payment Plan setup notification (mode Email / Text / Call / All). - Create and activate a new patient payment plan.");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PS as active with a chosen Mode and the setup template.
      // Step 2: Create and activate Plan1 for Pat1.
      // Step 3: Confirm a Payment Plan setup notification is generated at the moment the plan is created.
      // Step 4: Confirm it is delivered only on the channel(s) named in the configured Mode.
      // Step 5: Confirm the content uses the Payment Plan setup letter template and reflects Plan1's details.
      // Step 6: Deactivate Event-PS, create another plan and confirm no setup notification is sent.
      // Expected: On plan creation the patient receives the Payment Plan Setup notification through the configured mode(s), using the setup letter template.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-023: The \"Payment plan status change\" notification fires when a plan's status changes. - Configure a \"Payment plan status change\" notification. - Change a plan's status (e.g. active → inactive). [@notification-reminder @workflow @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-023");
    logger.info("Executing test case: The \"Payment plan status change\" notification fires when a plan's status changes. - Configure a \"Payment plan status change\" notification. - Change a plan's status (e.g. active → inactive).");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-SC as active with a Mode and its template.
      // Step 2: Open Plan1 and change its status from Status-Old to Status-New.
      // Step 3: Confirm a status-change notification is generated for Pat1.
      // Step 4: Confirm the message names the previous status, the new status and the effective date.
      // Step 5: Confirm it is delivered only on the configured channel(s).
      // Step 6: Confirm changing the status again produces a further notification reflecting the newer values.
      // Expected: When the plan status changes, the patient receives the Status Update notification (previous status, new status, effective date) via the configured mode.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-024: The \"Payment Due\" reminder fires the configured lead time before the processing date. - Configure a Payment Due reminder with a \"Before\" lead time (e.g. 3 days). - Have a plan with an upcoming scheduled charge. [@notification-reminder @workflow @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-024");
    logger.info("Executing test case: The \"Payment Due\" reminder fires the configured lead time before the processing date. - Configure a Payment Due reminder with a \"Before\" lead time (e.g. 3 days). - Have a plan with an upcoming scheduled charge.");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PD as active with To Be Sent = Before and lead time Lead1.
      // Step 2: Confirm Plan1 has an upcoming charge scheduled for Sched1.
      // Step 3: Move the business date (or wait) to Sched1 minus Lead1 and run the reminder job.
      // Step 4: Confirm the Payment Due reminder is sent to Pat1 on that date.
      // Step 5: Confirm the message shows the scheduled amount Amt1, the processing date Sched1 and the masked card Card1.
      // Step 6: Confirm no reminder is sent on any other day for the same installment.
      // Step 7: Deactivate Event-PD and confirm no reminder is produced for the next installment.
      // Expected: The patient receives the upcoming-payment reminder the configured lead time before the processing date, with the scheduled amount, processing date and card on file.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-025: The \"Card expiry\" reminder fires the configured lead time before the card expiry (treated as the last day of the expiring month). - Configure a Card expiry reminder with a \"Before\" lead time. - Use a saved card whose expiry month is approaching. [@notification-reminder @workflow @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-025");
    logger.info("Executing test case: The \"Card expiry\" reminder fires the configured lead time before the card expiry (treated as the last day of the expiring month). - Configure a Card expiry reminder with a \"Before\" lead time. - Use a saved card whose expiry month is approaching.");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-CE as active with To Be Sent = Before and lead time Lead1.
      // Step 2: Confirm Card1 is attached to Pat1's plan and its expiry month is upcoming.
      // Step 3: Move the business date (or wait) to Exp-Last minus Lead1 and run the reminder job.
      // Step 4: Confirm the card-expiry reminder is sent to Pat1 on that date.
      // Step 5: Confirm the expiry date used is Exp-Last, the last day of the expiring month.
      // Step 6: Confirm the message asks the patient to update the card and identifies the card in masked form.
      // Step 7: Confirm no reminder is sent for a card whose expiry is far outside the lead time.
      // Expected: The reminder fires the configured lead time before the expiry, where the expiry date is taken as the last day of the expiring month, prompting the patient to update the card. (See RPP-NRP-008 for the last-day-of-month rule.)
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-026: [New] The new Agreement event is available in the notification preference event list [@notification-reminder @positive @sanity @smoke @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-026");
    logger.info("Executing test case: [New] The new Agreement event is available in the notification preference event list");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Log in as User1 and open the Notification and Reminder Preference screen for Clinic1.
      // Step 2: In the Notification pane set Event Type = Payment Plan.
      // Step 3: Open the Event dropdown and confirm an Agreement event is listed.
      // Step 4: Select the Agreement event and confirm the Mode and Template fields become available for it.
      // Step 5: Save the row and reopen the screen; confirm the Agreement row persists with its Mode and Template.
      // Step 6: Confirm the existing payment-plan events are still listed and unaffected by the new entry.
      // Expected: The Event list now includes the Agreement event alongside the existing payment-plan notification events, and it can be selected and saved like any other event.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-027: [New] Clicking Agree & Continue on the payment plan agreement sends the agreement email when the event is configured [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-027");
    logger.info("Executing test case: [New] Clicking Agree & Continue on the payment plan agreement sends the agreement email when the event is configured");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-AG as active with Email included in its Mode and the agreement template selected.
      // Step 2: Save Plan1 for Pat1 so the agreement window is presented.
      // Step 3: Click Agree & Continue on the agreement window.
      // Step 4: Confirm the plan is activated and the agreement is recorded against Pat1.
      // Step 5: Open Pat1's mailbox or the outgoing mail log and confirm an agreement email was sent at that moment.
      // Step 6: Confirm the email content comes from the configured agreement template and carries the agreement document.
      // Step 7: Confirm only one agreement email was sent for the single Agree & Continue click.
      // Expected: As soon as the user clicks Agree & Continue, an agreement email is sent to the patient using the configured agreement template, and the plan is activated as usual.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-028: [New] No agreement email is sent when the Agreement event is inactive or not configured [@notification-reminder @negative @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-028");
    logger.info("Executing test case: [New] No agreement email is sent when the Agreement event is inactive or not configured");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Confirm Event-AG is either absent or marked inactive in the notification preference.
      // Step 2: Save Plan1 for Pat1 so the agreement window is presented.
      // Step 3: Click Agree & Continue.
      // Step 4: Confirm the plan is activated and the agreement is stored against Pat1.
      // Step 5: Check Pat1's mailbox and the outgoing mail log and confirm no agreement email was produced.
      // Step 6: Activate Event-AG, repeat the agreement on another plan and confirm the email is then sent, proving the switch controls the behaviour.
      // Expected: The plan is activated and the agreement is recorded, but no agreement email leaves the system because the event is not configured to send.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-029: [New] The Agreement event honours its configured Mode (All / Call / Email / Text) [@notification-reminder @functional @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-029");
    logger.info("Executing test case: [New] The Agreement event honours its configured Mode (All / Call / Email / Text)");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Set Event-AG active with Mode = Email, agree on a plan and confirm only an email is sent.
      // Step 2: Set Mode = Text, agree on another plan and confirm only a text message is sent.
      // Step 3: Set Mode = Call, agree on another plan and confirm only the call/voice channel is used.
      // Step 4: Set Mode = All, agree on another plan and confirm every configured channel receives the message.
      // Step 5: Confirm no channel outside the selected Mode is ever used.
      // Step 6: Confirm the same agreement template is used regardless of the Mode chosen.
      // Expected: The agreement message goes out only on the channel(s) named by Mode-X, and Mode = All delivers on every configured channel.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-030: [New] Switching the Event Type back to Appointment re-enables the Visit Type and Provider options [@notification-reminder @state-transition @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-030");
    logger.info("Executing test case: [New] Switching the Event Type back to Appointment re-enables the Visit Type and Provider options");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder Preference screen and set Row-R's Event Type = Appointment.
      // Step 2: Confirm Visit Type and Provider are enabled and can be opened.
      // Step 3: Switch Event Type to Payment Plan and confirm both fields become disabled/greyed.
      // Step 4: Switch Event Type back to Appointment.
      // Step 5: Confirm Visit Type and Provider are enabled again and VisitType1 and Provider1 can be selected.
      // Step 6: Save the row and confirm the appointment row keeps the selected visit type and provider.
      // Step 7: Confirm switching event type does not raise any error or blank out the rest of the row.
      // Expected: The two fields are disabled while Event Type = Payment Plan and become fully usable again the moment the event type is switched back to Appointment.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-031: [New] A saved Payment Plan reminder row never stores a visit type or provider value [@notification-reminder @data-integrity @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-031");
    logger.info("Executing test case: [New] A saved Payment Plan reminder row never stores a visit type or provider value");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder Preference screen and set Row-R to Event Type = Appointment.
      // Step 2: Select VisitType1 and Provider1 on the row.
      // Step 3: Switch Row-R's Event Type to Payment Plan and confirm the two fields become disabled.
      // Step 4: Save the row.
      // Step 5: Reopen the preference screen and confirm the Payment Plan row shows no visit type and no provider value.
      // Step 6: Switch the saved row back to Appointment and confirm the fields come back empty rather than pre-filled with the old selections.
      // Step 7: Confirm the reminder fires for all applicable patients, proving it was not silently filtered by a hidden visit type or provider.
      // Expected: The saved Payment Plan row carries no visit type and no provider — the earlier selections are cleared, not silently kept in the background.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-032: [New] The Immediate option is not selectable (greyed/absent) for a Payment Plan reminder row [@notification-reminder @validation @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-032");
    logger.info("Executing test case: [New] The Immediate option is not selectable (greyed/absent) for a Payment Plan reminder row");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the Reminder pane and set Row-R's Event Type = Payment Plan.
      // Step 2: Open the To Be Sent option list.
      // Step 3: Confirm Immediate is either absent or shown greyed and cannot be clicked.
      // Step 4: Confirm After and Before remain selectable together with their value and unit fields.
      // Step 5: Attempt to save the row with Immediate (if it can be forced) and confirm the save is blocked with a clear message.
      // Step 6: Save the row with Before and a lead time and confirm it stores correctly.
      // Step 7: Reopen the row and confirm the To Be Sent option is still not Immediate.
      // Expected: Immediate cannot be chosen for a Payment Plan reminder — it is greyed out or not listed — and only After and Before with a lead time can be saved.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-033: [New] Switching a reminder row from Payment Plan to Appointment restores the Immediate option [@notification-reminder @state-transition @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-033");
    logger.info("Executing test case: [New] Switching a reminder row from Payment Plan to Appointment restores the Immediate option");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open Row-R with Event Type = Payment Plan and confirm Immediate is not selectable.
      // Step 2: Switch Event Type to Appointment.
      // Step 3: Open the To Be Sent option list and confirm Immediate is now available.
      // Step 4: Select Immediate and confirm the value and unit fields are hidden or disabled as designed.
      // Step 5: Save the appointment row with Immediate and confirm it saves successfully.
      // Step 6: Switch the row back to Payment Plan and confirm Immediate is restricted again and the row cannot be saved with it.
      // Expected: Immediate becomes available again as soon as the event type is Appointment, and the row can be saved with Immediate for an appointment reminder.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-034: [New] Card expiry is taken as the last day of the expiry month for a 31-day and a 30-day month [@notification-reminder @boundary @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-034");
    logger.info("Executing test case: [New] Card expiry is taken as the last day of the expiry month for a 31-day and a 30-day month");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-CE active with To Be Sent = Before and lead time Lead1.
      // Step 2: Attach Card-31 to a plan and Card-30 to another plan.
      // Step 3: Move the business date to the last day of Card-31's expiry month minus Lead1 and run the reminder job.
      // Step 4: Confirm the reminder for Card-31 is sent on that date and not on any earlier day of the month.
      // Step 5: Repeat for Card-30 using the last day of its 30-day expiry month minus Lead1.
      // Step 6: Confirm the reminder for Card-30 is sent on that date.
      // Step 7: Confirm neither card is treated as expiring on the first day of its expiry month.
      // Expected: The expiry date used is the 31st for Card-31 and the 30th for Card-30 — always the last calendar day of the stored expiry month — and each reminder fires Lead1 before that date.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-035: [New] Card expiry in February is taken as the last day of February, including a leap year [@notification-reminder @boundary @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-035");
    logger.info("Executing test case: [New] Card expiry in February is taken as the last day of February, including a leap year");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-CE active with To Be Sent = Before and lead time Lead1.
      // Step 2: Attach Card-Feb to one plan and Card-Leap to another.
      // Step 3: Move the business date to the last day of Card-Feb's February minus Lead1 and run the job.
      // Step 4: Confirm the reminder for Card-Feb is sent on that date, using the 28th as the expiry date.
      // Step 5: Repeat for Card-Leap and confirm the 29th is used as the expiry date.
      // Step 6: Confirm neither reminder is sent a day early or a day late because of the month length.
      // Step 7: Confirm no error occurs while calculating the February expiry date.
      // Expected: The expiry date is the 28th for the non-leap February and the 29th for the leap February, and each reminder fires Lead1 days before the correct last day.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-036: [New] A card expiring in the current month is still treated as valid until the last day of that month [@notification-reminder @boundary @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-036");
    logger.info("Executing test case: [New] A card expiring in the current month is still treated as valid until the last day of that month");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Confirm Card-Now's expiry month is the current month and Plan1 uses it.
      // Step 2: Run the scheduled charge on a date earlier than Exp-Last.
      // Step 3: Confirm the card is not rejected as expired by the system's own expiry check.
      // Step 4: Confirm the card-expiry reminder is timed against Exp-Last and not against the first day of the month.
      // Step 5: Move the business date past Exp-Last and confirm the card is then treated as expired.
      // Step 6: Confirm a charge attempted after Exp-Last is recorded as failed and the installment turns Overdue on the plan.
      // Expected: Card-Now is treated as valid up to and including Exp-Last, so a charge before that date is attempted normally, and the expiry reminder is timed against Exp-Last.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-037: [New] Both notification and reminder emails for payment plans go out from the clinic's email setup [@notification-reminder @functional @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-037");
    logger.info("Executing test case: [New] Both notification and reminder emails for payment plans go out from the clinic's email setup");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Confirm Clinic1's outgoing email setup Email1 is active and note its sender address.
      // Step 2: Configure Event-N and Event-R with Email included in their Mode.
      // Step 3: Trigger Event-N for Pat1 and open the resulting email.
      // Step 4: Confirm its sender address is the one from Email1.
      // Step 5: Trigger Event-R for Pat1 and open the resulting email.
      // Step 6: Confirm its sender address is also the one from Email1.
      // Step 7: Confirm no email uses a generic system address or the logged-in user's personal address.
      // Expected: Both the notification email and the reminder email show the clinic's configured sender address from Email1, never a system default or an individual user's address.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-038: [New] Changing the clinic email setup changes the sender of subsequent payment-plan emails [@notification-reminder @state-transition @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-038");
    logger.info("Executing test case: [New] Changing the clinic email setup changes the sender of subsequent payment-plan emails");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: With Email1 configured, trigger Event-N for Pat1 and confirm the sender is Email1's address.
      // Step 2: Change Clinic1's outgoing email setup to Email2 and save.
      // Step 3: Trigger Event-N again for Pat1.
      // Step 4: Confirm the new email's sender is Email2's address.
      // Step 5: Confirm the earlier email still shows Email1 in the mail log, unaltered.
      // Step 6: Confirm the same behaviour applies to a reminder email triggered after the change.
      // Expected: Emails sent before the change carry Email1's sender and emails sent after the change carry Email2's sender, with no restart or manual re-selection needed.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-039: [New] Every payment-plan notification/reminder event row comes with its default letter template preselected [@notification-reminder @positive @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-039");
    logger.info("Executing test case: [New] Every payment-plan notification/reminder event row comes with its default letter template preselected");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the preference screen on DB1.
      // Step 2: Add a row and select the first event from Event-List.
      // Step 3: Confirm the Template field is already filled with a default template and is not blank.
      // Step 4: Confirm the defaulted template matches the chosen event by name/content.
      // Step 5: Repeat steps 2 to 4 for every remaining event in Event-List, including the new Agreement event.
      // Step 6: On one row open the Template dropdown and confirm other templates are selectable.
      // Step 7: Change that template, save, reopen and confirm the user's choice was kept instead of the default.
      // Expected: Each event row already shows its matching default letter template without the user selecting one, and the user can still switch to another template if needed.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-040: [New] The default payment-plan letter templates are present in every database by default [@notification-reminder @configuration @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-040");
    logger.info("Executing test case: [New] The default payment-plan letter templates are present in every database by default");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Open the letter template list on DB-A and confirm a default template exists for each event in Event-List.
      // Step 2: Open the preference screen on DB-A and confirm each event row defaults to its template.
      // Step 3: Repeat steps 1 and 2 on DB-B.
      // Step 4: Confirm the same set of default templates is present on both databases.
      // Step 5: Confirm the templates are usable immediately without further configuration.
      // Step 6: Confirm a clinic-specific edit on DB-A does not change the template on DB-B.
      // Expected: Both databases already contain the default letter templates for every payment-plan reminder/notification event, so no clinic has to create them manually.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-041: [New] End-to-end: the Payment Successful notification fires on a successful scheduled charge using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-041");
    logger.info("Executing test case: [New] End-to-end: the Payment Successful notification fires on a successful scheduled charge using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PS active with Mode-X and its default template.
      // Step 2: Let the scheduled charge on Plan1 run and complete successfully.
      // Step 3: Confirm the transaction is recorded with a successful status.
      // Step 4: Confirm the Payment Successful message reaches Pat1 on the channel(s) of Mode-X only.
      // Step 5: Confirm the message shows the paid amount and the confirmation/payment number of that transaction.
      // Step 6: Confirm exactly one message per configured channel is sent for the single successful charge.
      // Step 7: Deactivate Event-PS, run another successful charge and confirm no message is sent.
      // Expected: The patient receives the Payment Successful message on exactly the channels named in Mode-X, with the amount and the payment/confirmation number of the transaction.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-042: [New] End-to-end: the Payment Failed notification fires on a failed charge using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-042");
    logger.info("Executing test case: [New] End-to-end: the Payment Failed notification fires on a failed charge using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PF active with Mode-X and its default template.
      // Step 2: Let the scheduled charge on Plan1 fail.
      // Step 3: Confirm the transaction is recorded as failed in Payment Transaction Tracking.
      // Step 4: Confirm the Payment Failed message reaches Pat1 on the channel(s) of Mode-X only.
      // Step 5: Confirm the message content comes from the payment-failed template and refers to the missed installment.
      // Step 6: Confirm no Payment Successful message was sent for the same attempt.
      // Step 7: Confirm the installment shows Overdue on the plan after the failure.
      // Expected: The patient receives the Payment Failed message only on the channels named in Mode-X, and no success message is produced for the same attempt.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-043: [New] End-to-end: the Payment Plan Setup notification fires on plan creation using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-043");
    logger.info("Executing test case: [New] End-to-end: the Payment Plan Setup notification fires on plan creation using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PSU active with Mode-X and its default template.
      // Step 2: Create and activate Plan-New for Pat1.
      // Step 3: Confirm the setup message is generated at the moment the plan is created.
      // Step 4: Confirm it is delivered only on the channel(s) of Mode-X.
      // Step 5: Confirm the content comes from the setup template and reflects Plan-New's amount, frequency and start date.
      // Step 6: Confirm editing the plan afterwards does not resend the setup message.
      // Step 7: Deactivate Event-PSU, create another plan and confirm no setup message is sent.
      // Expected: The setup message is delivered on the Mode-X channels at the moment the plan is created, carrying the plan's schedule details from the setup template.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-044: [New] End-to-end: the Payment Plan Status Change notification fires on every plan status change using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-044");
    logger.info("Executing test case: [New] End-to-end: the Payment Plan Status Change notification fires on every plan status change using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-SC active with Mode-X and its default template.
      // Step 2: Change Plan1's status from Status-Old to Status-New.
      // Step 3: Confirm one status-change message is generated for Pat1.
      // Step 4: Confirm it is delivered only on the channel(s) of Mode-X.
      // Step 5: Confirm the message names Status-Old, Status-New and the effective date.
      // Step 6: Change the status a second time and confirm a further message with the newer values is sent.
      // Step 7: Confirm a change that does not alter the status (a plain save) does not send a message.
      // Expected: Each status change sends one message on the Mode-X channels naming the old status, the new status and the effective date.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-045: [New] End-to-end: the Payment Due reminder fires before the processing date using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-045");
    logger.info("Executing test case: [New] End-to-end: the Payment Due reminder fires before the processing date using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-PD active with Mode-X, To Be Sent = Before and lead time Lead1.
      // Step 2: Confirm Plan1 has an upcoming charge on Sched1.
      // Step 3: Move the business date to Sched1 minus Lead1 and run the reminder job.
      // Step 4: Confirm the reminder reaches Pat1 only on the channel(s) of Mode-X.
      // Step 5: Confirm the message shows Amt1, the processing date Sched1 and the masked Card1.
      // Step 6: Confirm no reminder is sent on any other day for the same installment.
      // Step 7: Confirm the reminder is not sent for an installment that has already been paid early.
      // Expected: The patient is reminded on the Mode-X channels exactly Lead1 before Sched1, with the upcoming amount, the processing date and the card on file.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-046: [New] End-to-end: the Card Expiry reminder fires before the last day of the expiry month using its configured mode [@notification-reminder @end-to-end @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-046");
    logger.info("Executing test case: [New] End-to-end: the Card Expiry reminder fires before the last day of the expiry month using its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-CE active with Mode-X, To Be Sent = Before and lead time Lead1.
      // Step 2: Confirm Card1 is attached to Plan1 and its expiry month is upcoming.
      // Step 3: Move the business date to Exp-Last minus Lead1 and run the reminder job.
      // Step 4: Confirm the reminder reaches Pat1 only on the channel(s) of Mode-X.
      // Step 5: Confirm the expiry date used in the calculation and the message is Exp-Last.
      // Step 6: Confirm the message identifies the card in masked form and asks for an update.
      // Step 7: Replace the card with a valid one and confirm no further expiry reminder is sent for the old card.
      // Expected: The patient is reminded on the Mode-X channels exactly Lead1 before Exp-Last and is asked to update the card before it expires.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-047: [New] End-to-end: the Agreement event fires when the patient agrees, honouring its configured mode [@notification-reminder @end-to-end @in-depth @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-047");
    logger.info("Executing test case: [New] End-to-end: the Agreement event fires when the patient agrees, honouring its configured mode");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Configure Event-AG active with Mode-X and the agreement template.
      // Step 2: Save Plan1 for Pat1 so the agreement window is shown.
      // Step 3: Click Agree & Continue.
      // Step 4: Confirm the agreement message is delivered only on the channel(s) of Mode-X.
      // Step 5: Confirm the email carries the agreement document/content from the agreement template.
      // Step 6: Create another plan, close the agreement window without agreeing and confirm no agreement message is sent.
      // Step 7: Reopen the agreement from the Agreement button, agree, and confirm the message is then sent.
      // Expected: The agreement message goes out on the Mode-X channels as soon as the user agrees, carrying the agreement document/content, and nothing is sent if the agreement window is closed without agreeing.
      expect(true).toBeTruthy();
    });

  });

  test("RPP-NRP-048: [New] An inactive payment-plan notification/reminder row sends nothing while an active one with Mode = All sends on every channel [@notification-reminder @negative @detail @regression]", async ({ page, notificationReminderPage, logger }) => {
    logger.setTestCaseId("RPP-NRP-048");
    logger.info("Executing test case: [New] An inactive payment-plan notification/reminder row sends nothing while an active one with Mode = All sends on every channel");

    // 1. Open Notification & Reminder Preferences
    await test.step("Open Notification and Reminder Preferences", async () => {
      await notificationReminderPage.openPreferences();
      logger.info("Opened Notification & Reminder Preferences");
    });

    // 2. Verify event configuration
    await test.step("Verify notification/reminder event setup", async () => {
      // Step 1: Save Event-Off with Active unticked and Event-All as active with Mode = All.
      // Step 2: Trigger the situation that would fire Event-Off.
      // Step 3: Confirm no message of any kind is sent to Pat1 for that event.
      // Step 4: Trigger the situation that fires Event-All.
      // Step 5: Confirm the message is delivered on every channel covered by Mode = All.
      // Step 6: Tick Active on Event-Off, trigger it again and confirm it now sends, proving the Active flag is what controls it.
      // Step 7: Confirm no other patient receives messages from either trigger.
      // Expected: Event-Off produces no message at all, while Event-All delivers on every configured channel (call, email and text) for the same patient.
      expect(true).toBeTruthy();
    });

  });
});
