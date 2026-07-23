# Sprint 9 - Claim Module Test Cases

| Test Case ID | Test Case Description | Preconditions | Test Steps | Expected Result |
|--------------|----------------------|---------------|------------|-----------------|
| TC_CLAIM_001 | Verify Admin can create a Claim Event | Admin logged in | Navigate to Events → Add → Enter Event Name & Description → Save | Event should be created successfully |
| TC_CLAIM_002 | Verify Admin can create an Expense Type | Admin logged in | Navigate to Expense Types → Add → Enter Expense Type Name & Description → Save | Expense Type should be created successfully |
| TC_CLAIM_003 | Verify Admin can assign a Claim | Event and Expense Type exist | Select Employee → Event → Currency → Remarks → Create | Claim should be created successfully with Reference ID |
| TC_CLAIM_004 | Verify Admin can add an Expense | Claim created | Click Add Expense → Select Expense Type → Enter Date → Amount → Note → Save | Expense should be added successfully |
| TC_CLAIM_005 | Verify added Expense appears in Expenses table | Expense saved | Verify Expense Type and Amount | Expense record should be visible |
| TC_CLAIM_006 | Verify Admin can submit Claim | Expense exists | Click Submit | Claim status should become Paid |
| TC_CLAIM_007 | Verify Employee Claim search using Reference ID | Claim submitted | Navigate to Employee Claims → Search using Reference ID | Correct claim should be displayed |
| TC_CLAIM_008 | Verify Employee Name after search | Claim found | Verify Employee Name | Employee Name should match created claim |
| TC_CLAIM_009 | Verify Event Name after search | Claim found | Verify Event Name | Event Name should match created claim |
| TC_CLAIM_010 | Verify Claim Status after search | Claim found | Verify Status | Status should be Paid |