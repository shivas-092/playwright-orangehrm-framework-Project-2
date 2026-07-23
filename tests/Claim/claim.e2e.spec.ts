import { test } from '@playwright/test';
import { EventComponent } from '../../components/claim/event.component';
import { ExpenseTypeComponent } from '../../components/claim/expense-type.component';
import { AssignClaimComponent } from '../../components/claim/assign-claim.component';
import { ClaimData } from '../../test-data/claim.data';

test.describe.serial('Claim Module', () => {
  test('Admin user can configure and submit an employee claim', async ({ page }) => {
    const eventComponent = new EventComponent(page);
    const expenseTypeComponent = new ExpenseTypeComponent(page);
    const assignClaimComponent = new AssignClaimComponent(page);

    let referenceId = '';
    let selectedEmployeeName = '';

    await test.step('Create a new claim event', async () => {
      await eventComponent.navigateToEvents();
      await eventComponent.clickAddEvent();
      await eventComponent.createEvent(ClaimData.eventName, ClaimData.eventDescription);
    });

    await test.step('Create a new expense type', async () => {
      await expenseTypeComponent.navigateToExpenseTypes();
      await expenseTypeComponent.clickAddExpenseType();
      await expenseTypeComponent.createExpenseType(ClaimData.expenseTypeName, ClaimData.expenseTypeDescription);
    });

    await test.step('Assign a new claim to an available employee', async () => {
      await assignClaimComponent.navigateToAssignClaim();
      selectedEmployeeName = await assignClaimComponent.createClaimRequest(ClaimData.eventName, ClaimData.currency, ClaimData.claimRemarks);
      referenceId = await assignClaimComponent.getReferenceId();
    });

    await test.step('Add an expense to the claim', async () => {
      await assignClaimComponent.clickAddExpense();
      await assignClaimComponent.addExpense(ClaimData.expenseTypeName, ClaimData.expenseDate, ClaimData.expenseAmount, ClaimData.expenseNote);
      await assignClaimComponent.verifyExpenseInTable(ClaimData.expenseTypeName, ClaimData.expenseAmount);
    });

    await test.step('Submit the claim', async () => {
      await assignClaimComponent.submitClaim();
      await assignClaimComponent.verifyClaimStatus(ClaimData.expectedSubmittedStatus);
    });

    await test.step('Verify the submitted employee claim', async () => {
      await assignClaimComponent.navigateToEmployeeClaims();
      await assignClaimComponent.searchEmployeeClaimByReferenceId(referenceId);
      await assignClaimComponent.verifyEmployeeClaimInTable(referenceId, selectedEmployeeName, ClaimData.eventName, ClaimData.expectedSubmittedStatus);
    });
  });
});