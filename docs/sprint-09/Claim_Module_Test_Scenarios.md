# Sprint 9 - Claim Module Test Scenarios

## Module
Claim

## Objective
Validate the complete Claim workflow including configuration, claim creation, expense management, submission, and verification.

---

## TS_CLAIM_001
### Verify Admin can create a new Claim Event

**Preconditions**
- Admin user is logged in.
- Claim module is accessible.

**Test Steps**
1. Navigate to Claim → Configuration → Events.
2. Click Add.
3. Enter Event Name.
4. Enter Description.
5. Save.

**Expected Result**
- Event should be created successfully.
- Success message should be displayed.

---

## TS_CLAIM_002
### Verify Admin can create a new Expense Type

**Preconditions**
- Admin user is logged in.

**Test Steps**
1. Navigate to Claim → Configuration → Expense Types.
2. Click Add.
3. Enter Expense Type Name.
4. Enter Description.
5. Save.

**Expected Result**
- Expense Type should be created successfully.
- Success message should be displayed.

---

## TS_CLAIM_003
### Verify Admin can assign a claim to an employee

**Preconditions**
- Claim Event exists.
- Expense Type exists.

**Test Steps**
1. Navigate to Assign Claim.
2. Select Employee.
3. Select Event.
4. Select Currency.
5. Enter Remarks.
6. Click Create.

**Expected Result**
- Claim should be created.
- Reference ID should be generated.

---

## TS_CLAIM_004
### Verify Admin can add an expense to the created claim

**Preconditions**
- Claim Request exists.

**Test Steps**
1. Click Add under Expenses.
2. Select Expense Type.
3. Enter Date.
4. Enter Amount.
5. Enter Note.
6. Save.

**Expected Result**
- Expense should be added successfully.
- Expense should appear in the Expenses table.

---

## TS_CLAIM_005
### Verify Admin can submit the claim

**Preconditions**
- Claim contains at least one expense.

**Test Steps**
1. Click Submit.

**Expected Result**
- Claim should be submitted successfully.
- Status should become Paid.

---

## TS_CLAIM_006
### Verify submitted claim using Reference ID

**Preconditions**
- Claim has already been submitted.

**Test Steps**
1. Navigate to Employee Claims.
2. Search using Reference ID.
3. Execute Search.

**Expected Result**
- Correct claim should be displayed.
- Employee Name should match.
- Event Name should match.
- Status should be Paid.