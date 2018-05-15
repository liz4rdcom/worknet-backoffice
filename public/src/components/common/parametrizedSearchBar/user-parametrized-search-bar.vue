<template>
  <div>
    <parametrized-search-bar :value="value" :paramCategoryList="paramCategoryList" @input="onInput"/>
  </div>
</template>

<script>
import ParametrizedSearchBar from './parametrized-search-bar'

export default {
  name: 'user-parametrized-search-bar',
  props: ['value'],
  data () {
    return {
      paramCategoryList: [
        { id: 'birthDate', text: 'დაბ.თარიღი', paramCompName: 'param-date' },
        { id: 'ageRange', text: 'ასაკი', paramCompName: 'param-range-input' },
        { id: 'registrationDate', text: 'რეგისტრაციის თარ.', paramCompName: 'param-date' },
        { id: 'desirableJobLocations.locationName', text: 'სასურველი სამს. რეგიონი', paramCompName: 'param-input' },
        { id: 'desirableJobLocations.locationUnitName', text: 'სასურველი სამს. რაიონი', paramCompName: 'param-input' },
        { id: 'desirableJobs.name', text: 'სასურველი პროფესია', paramCompName: 'param-input' },
        { id: 'genderName', text: 'სქესი', paramCompName: 'param-input' },
        { id: 'registrationLocationName', text: 'რეგიონი', paramCompName: 'param-input' },
        { id: 'registrationLocationUnitName', text: 'რაიონი', paramCompName: 'param-input' },
        { id: 'registrationAddressDescription', text: 'მისამართი', paramCompName: 'param-input' },
        { id: 'factLocationName', text: 'ფაქტ.რეგიონი', paramCompName: 'param-input' },
        { id: 'factLocationUnitName', text: 'ფაქტ.რაიონი', paramCompName: 'param-input' },
        { id: 'factAddressDescription', text: 'ფაქტ.მისამართი', paramCompName: 'param-input' },
        { id: 'formalEducationLevelName', text: 'ფორმალური განათლების დონე', paramCompName: 'param-input' },
        { id: 'educations.educationType', text: 'განათლების ტიპი', paramCompName: 'param-input' },
        { id: 'educations.educationLevel', text: 'განათლების დონე', paramCompName: 'param-input' },
        { id: 'languages.languageName', text: 'ენა', paramCompName: 'param-input' },
        { id: 'jobTitle', text: 'პოზიცია', paramCompName: 'param-input' },
        { id: 'desirableSalary', text: 'სასურველი ხელფასი', paramCompName: 'param-number-input' },
        { id: 'drivingLicenceA', text: 'მართვის მოწმობა A', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceB', text: 'მართვის მოწმობა B', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceC', text: 'მართვის მოწმობა C', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceD', text: 'მართვის მოწმობა D', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceE', text: 'მართვის მოწმობა E', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceT1', text: 'მართვის მოწმობა T1', paramCompName: 'param-checkbox' },
        { id: 'drivingLicenceT2', text: 'მართვის მოწმობა T2', paramCompName: 'param-checkbox' },
        { id: 'airLicence', text: 'საჰაერო', paramCompName: 'param-checkbox' },
        { id: 'railwayLicence', text: 'სარკინიგზო', paramCompName: 'param-checkbox' },
        { id: 'seaLicence', text: 'საზღვაო', paramCompName: 'param-checkbox' },
        { id: 'militaryObligation', text: 'სამხედრო ვალდებულება', paramCompName: 'param-checkbox' },
        { id: 'fullTime', text: 'სრულ განაკვეთზე', paramCompName: 'param-checkbox' },
        { id: 'partTime', text: 'ნახევარ განაკვეთზე', paramCompName: 'param-checkbox' },
        { id: 'shiftBased', text: 'ცვლებში', paramCompName: 'param-checkbox' },
        { id: 'unemployed', text: 'უმუშევარი', paramCompName: 'param-checkbox' },
        { id: 'useMediationService', text: 'ჭირდება სააგენტოს დახმარება', paramCompName: 'param-checkbox' },
        { id: 'interestedInTraining', text: 'დაინტერესებულია ტრენინგით', paramCompName: 'param-checkbox' },
        { id: 'interestedInInternship', text: 'დაინტერესებულია სტაჟირებით', paramCompName: 'param-checkbox' },
        { id: 'interestedToBeVolunteer', text: 'დაინტერესებულია მოხალისედ მუშაობით', paramCompName: 'param-checkbox' },
        { id: 'interestedInTemporaryJob', text: 'დაინტერესებულია დროებითი სამსახურით', paramCompName: 'param-checkbox' },
        { id: 'interestedInDangerousJob', text: 'დაინტერესებულია სახიფათო სამსახურით', paramCompName: 'param-checkbox' },
      ],
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
  },
  components: {
    'parametrized-search-bar': ParametrizedSearchBar,
  },
}
</script>

<style scoped>
</style>
