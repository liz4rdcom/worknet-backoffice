<template>
  <div>
    {{'adw' + formalEducationLevels}}
    <parametrized-search-bar :value="value" :paramCategoryList="paramCategoryList" @input="onInput"/>
  </div>
</template>

<script>
import libs from '../../../libs'
import ParametrizedSearchBar from './parametrized-search-bar'

export default {
  name: 'vacancy-parametrized-search-bar',
  props: ['value'],
  data () {
    return {
      formalEducationLevels: [],
      paramCategoryList: [
        { id: 'publishDate', text: 'გამოქვეყნების თარ.', paramCompName: 'param-date' },
        { id: 'useMediationService', text: 'სურს მედიაციის სერვისის გამოყენება', paramCompName: 'param-checkbox' },
        { id: 'positionName', text: 'პოზიცია', paramCompName: 'param-input' },
        { id: 'vacantPlacesQuantity', text: 'ვაკანტური ადგილები', paramCompName: 'param-number-input' },
        { id: 'endDate', text: 'დასრულების თარ.', paramCompName: 'param-date' },
        { id: 'locationName', text: 'რეგიონი', paramCompName: 'param-input' },
        { id: 'locationUnitName', text: 'რაიონი', paramCompName: 'param-input' },
        { id: 'addressLine', text: 'მისამართი', paramCompName: 'param-input' },
        { id: 'interviewSupposedStartDate', text: 'გასაუბრების დაწყ.', paramCompName: 'param-date' },

        { id: 'განათლების მინ. დონე', text: 'განათლების მინ. დონე', paramCompName: 'param-checkbox' },
        { id: 'უმაღლესი/პროფესიული', text: 'უმაღლესი/პროფესიული', paramCompName: 'param-checkbox' },
        { id: 'მიმართულება', text: 'მიმართულება', paramCompName: 'param-checkbox' },
        { id: 'სპეციალობა', text: 'სპეციალობა', paramCompName: 'param-checkbox' },
        { id: 'სპეციალიზაცია', text: 'სპეციალიზაცია', paramCompName: 'param-checkbox' },
        { id: 'სპეციალიზაცია(პროფესიული)', text: 'სპეციალიზაცია(პროფესიული)', paramCompName: 'param-checkbox' },
        { id: 'დამ. პროფესია/სამუშაო', text: 'დამ. პროფესია/სამუშაო', paramCompName: 'param-checkbox' },
        { id: 'დამ. გამოცდილება(თვეებში)', text: 'დამ. გამოცდილება(თვეებში)', paramCompName: 'param-checkbox' },
        { id: 'ჯამური გამოცდილება(თვეებში)', text: 'ჯამური გამოცდილება(თვეებში)', paramCompName: 'param-checkbox' },
        { id: 'ენა', text: 'ენა', paramCompName: 'param-checkbox' },
        { id: 'კომპ.უნარები', text: 'კომპ.უნარები', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა A', text: 'მართვის მოწმობა A', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა B', text: 'მართვის მოწმობა B', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა C', text: 'მართვის მოწმობა C', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა D', text: 'მართვის მოწმობა D', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა E', text: 'მართვის მოწმობა E', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა T1', text: 'მართვის მოწმობა T1', paramCompName: 'param-checkbox' },
        { id: 'მართვის მოწმობა T2', text: 'მართვის მოწმობა T2', paramCompName: 'param-checkbox' },
        { id: 'საჰაერო', text: 'საჰაერო', paramCompName: 'param-checkbox' },
        { id: 'სარკინიგზო', text: 'სარკინიგზო', paramCompName: 'param-checkbox' },
        { id: 'საზღვაო', text: 'საზღვაო', paramCompName: 'param-checkbox' },
      ],
    }
  },
  async created () {
    try {
      this.formalEducationLevels = await libs.fetchFormalEducationLevels()
    } catch (e) {
      console.error(e)
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
