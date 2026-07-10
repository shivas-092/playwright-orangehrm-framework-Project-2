# Recruitment Module - Test Scenarios

## Module
Recruitment

## Sprint
Sprint 5

---

## TS_001 - Create Vacancy

**Objective**

Verify that an Admin user can create a new recruitment vacancy.

### Steps

1. Login as Admin
2. Navigate to Recruitment
3. Open Vacancies
4. Click Add
5. Enter Vacancy Name
6. Select Job Title
7. Select Hiring Manager
8. Enter Description
9. Enter Number of Positions
10. Click Save

### Expected Result

A new vacancy should be created successfully and displayed in the Edit Vacancy page.

---

## TS_002 - Verify Created Vacancy

**Objective**

Verify the created vacancy is available under the Vacancies list.

### Steps

1. Navigate to Vacancies
2. Open Vacancy List
3. Verify newly created vacancy exists

### Expected Result

Created vacancy should be displayed in the vacancy table.

---

## TS_003 - Add Candidate

**Objective**

Verify that an Admin user can add a candidate against an existing vacancy.

### Steps

1. Navigate to Recruitment
2. Open Candidates
3. Click Add
4. Enter Candidate First Name
5. Enter Candidate Last Name
6. Select Vacancy
7. Enter Email
8. Enter Contact Number
9. Enter Keywords
10. Enter Notes
11. Click Save

### Expected Result

Candidate should be added successfully.

---

## TS_004 - Search Candidate

**Objective**

Verify the created candidate can be searched.

### Steps

1. Navigate to Candidates
2. Search Candidate Name
3. Click Search

### Expected Result

Created candidate should appear in search results.

---

## TS_005 - Shortlist Candidate

**Objective**

Verify recruiter can shortlist the candidate.

### Steps

1. Open Candidate Profile
2. Click Shortlist
3. Save

### Expected Result

Candidate status should be updated to Shortlisted.