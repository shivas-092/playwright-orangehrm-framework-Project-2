import { test } from '@playwright/test';
import { RecruitmentComponent } from '../../components/recruitment/recruitment.component';
import { VacancyComponent } from '../../components/recruitment/vacancy.component';
import { CandidateComponent } from '../../components/recruitment/candidate.component';
import { VacancyData } from '../../test-data/vacancy.data';
import { CandidateData } from '../../test-data/candidate.data';

test.describe('Recruitment Module - E2E Workflow', () => {
  test('Admin can create vacancy, add candidate, search candidate and shortlist candidate', async ({ page }) => {
    const recruitmentComponent = new RecruitmentComponent(page);
    const vacancyComponent = new VacancyComponent(page);
    const candidateComponent = new CandidateComponent(page);

    const vacancy = VacancyData.createVacancy();
    const candidate = CandidateData.createCandidate();
    const candidateFullName = `${candidate.firstName} ${candidate.lastName}`;

    await recruitmentComponent.navigateToRecruitment();

    await recruitmentComponent.openVacanciesTab();
    await vacancyComponent.clickAddVacancy();
    await vacancyComponent.createVacancy(vacancy);
    await vacancyComponent.searchVacancy(vacancy.vacancyName);

    await recruitmentComponent.openCandidatesTab();
    await candidateComponent.clickAddCandidate();
    await candidateComponent.addCandidate(candidate, vacancy.vacancyName);
    await candidateComponent.shortlistCandidate();
    await candidateComponent.searchCandidate(candidateFullName);
  });
});