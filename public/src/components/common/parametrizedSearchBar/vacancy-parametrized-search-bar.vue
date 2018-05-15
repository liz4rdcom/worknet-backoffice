<template>
  <div>
    <parametrized-search-bar :value="value" :paramCategoryList="paramCategoryList" @input="onInput"/>
  </div>
</template>

<script>
import findIndex from 'lodash/findIndex'
import libs from '../../../libs'
import ParametrizedSearchBar from './parametrized-search-bar'

export default {
  name: 'vacancy-parametrized-search-bar',
  props: ['value'],
  data () {
    return {
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
        { id: 'formalEducationLevelName', text: 'განათლების მინ. დონე', paramCompName: 'param-dropdown', additionalProps: {options: []} },
        { id: 'languages.languageName', text: 'ენა', paramCompName: 'param-input' },

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
      ],
    }
  },
  async created () {
    try {
      const result = await libs.fetchFormalEducationLevels()

      const formalEducationLevelOptions = this.getFormalEducationLevelOptions(result)

      const indexOfFormal = findIndex(this.paramCategoryList, ({ id }) => (id === 'formalEducationLevelName'))

      const paramCategFormal = this.paramCategoryList[indexOfFormal]
      const paramCategFormalAdditional = paramCategFormal.additionalProps

      const paramCategoryListNew = [...this.paramCategoryList]

      paramCategoryListNew.splice(
        indexOfFormal, 1, {...paramCategFormal, additionalProps: { ...paramCategFormalAdditional, options: formalEducationLevelOptions }}
      )

      this.paramCategoryList = paramCategoryListNew
    } catch (e) {
      console.error(e)
    }
  },
  methods: {
    onInput (val) {
      this.$emit('input', val)
    },
    getFormalEducationLevelOptions (opts) {
      const retVal = opts.map(nextItem => ({ text: nextItem, value: nextItem }))

      retVal.splice(0, 0, { text: '- აირჩიე -', value: null })

      return retVal
    },
  },
  computed: {},
  components: {
    'parametrized-search-bar': ParametrizedSearchBar,
  },
}
</script>

<style scoped>
</style>
