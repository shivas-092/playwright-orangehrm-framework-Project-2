import { test } from '@playwright/test';
import { MyInfoComponent } from '../../components/my-info/my-info.component';
import { PersonalDetailsComponent } from '../../components/my-info/personal-details.component';
import { ContactDetailsComponent } from '../../components/my-info/contact-details.component';
import { EmergencyContactComponent } from '../../components/my-info/emergency-contact.component';
import { DependentComponent } from '../../components/my-info/dependents.component';
import { QualificationComponent } from '../../components/my-info/qualification.component';
import { MembershipComponent } from '../../components/my-info/membership.component';
import { MyInfoData } from '../../test-data/my-info.data';

test.describe.serial('My Info Module', () => {
  test('Employee can manage My Info details', async ({ page }) => {
    const myInfoComponent = new MyInfoComponent(page);
    const personalDetailsComponent = new PersonalDetailsComponent(page);
    const contactDetailsComponent = new ContactDetailsComponent(page);
    const emergencyContactComponent = new EmergencyContactComponent(page);
    const dependentComponent = new DependentComponent(page);
    const qualificationComponent = new QualificationComponent(page);
    const membershipComponent = new MembershipComponent(page);

    await myInfoComponent.navigateToMyInfo();

    await personalDetailsComponent.updatePersonalDetails(MyInfoData.personalDetails);

    await myInfoComponent.navigateToContactDetails();
    await contactDetailsComponent.updateContactDetails(MyInfoData.contactDetails);

    await myInfoComponent.navigateToEmergencyContacts();
    await emergencyContactComponent.addEmergencyContact(MyInfoData.emergencyContact);

    await myInfoComponent.navigateToDependents();
    await dependentComponent.addDependent(MyInfoData.dependent);

    await myInfoComponent.navigateToQualifications();
    await qualificationComponent.addWorkExperience(MyInfoData.workExperience);

    await myInfoComponent.navigateToMemberships();
    await membershipComponent.addMembership(MyInfoData.membership);
  });
});