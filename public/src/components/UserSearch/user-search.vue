<template>
  <div class="user-search-container">
    <!-- <pre>{{
      JSON.stringify(this.$data, null, 2)
    }}</pre> -->

    <b-form-group label="საძიებო სიტყვა">
      <b-input-group>
        <b-form-input autofocus type="text" v-model="searchText" v-on:keyup.enter.native="searchByText"></b-form-input>
        <b-input-group-append>
          <b-button variant="secondary" @click="searchByText">ძებნა</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-form-group>
      <b-form-radio-group v-model="durationRadioValue" :options="durationRadioOptions" v-on:change="onDurationRadioChange">
      </b-form-radio-group>
    </b-form-group>

    <b-card-header class="p-1">
      <b-btn block v-b-toggle.parametrizedSearch variant="info">პარამეტრიზებული ძებნა</b-btn>
      <b-collapse id="parametrizedSearch">
        <b-row class="parametrized-search-bar-row">
          <b-col cols="11">
            <user-parametrized-search-bar v-model="paramCompList" />
          </b-col>

          <b-col cols="1">
            <b-button variant="info" @click="advancedSearch">ძებნა</b-button>
          </b-col>
        </b-row>
      </b-collapse>
    </b-card-header>

    <div>სულ ნაპოვნია {{searchedList.length}} ჩანაწერი</div>

    <users-list :users="searchedList"/>
  </div>
</template>

<script>
import UsersList from '../../components/users-list'
import UserParametrizedSearchBar from '../../components/common/parametrizedSearchBar/user-parametrized-search-bar'
import utils from '../../utils'

const millisecondsInDay = 1000 * 60 * 60 * 24
const millisecondsInWeek = millisecondsInDay * 7
const millisecondsInMonth = millisecondsInDay * 30

export default {
  name: 'user-search',
  data () {
    return {
      searchText: '',
      durationRadioOptions: [
        { text: '1 დღე', value: 'one-day' },
        { text: '1 კვირა', value: 'one-week' },
        { text: '1 თვე', value: 'one-month' },
        { text: 'ყველა', value: 'all' },
      ],
      durationRadioValue: 'all',
      paramCompList: [],
      searchedList: [],
      lastSearchConfig: {
        searchType: null, // 0 text search, 1 advanced.
        config: null,
      },
    }
  },
  methods: {
    async searchByText () {
      try {
        const result = await this.$http.post('/api/users/advancedSearch', [{fieldName: '$text$', value: this.searchText}])

        this.lastSearchConfig = {
          searchType: 0,
          config: this.searchText,
        }

        this.searchedList = result.data
      } catch (error) {
      }
    },
    async advancedSearch () {
      try {
        const result = await this.$http.post('/api/users/advancedSearch', this.paramsForApi)

        this.lastSearchConfig = {
          searchType: 1,
          config: this.paramsForApi,
        }

        this.searchedList = result.data
      } catch (error) {
      }
    },
    async onDurationRadioChange (value) {
      if (this.lastSearchConfig.searchType !== null) {
        const nowDate = new Date()

        const advancedSearchParams = []

        if (this.lastSearchConfig.searchType === 0) {
          advancedSearchParams.push({fieldName: '$text$', value: this.lastSearchConfig.config})
        } else if (this.lastSearchConfig.searchType === 1) {
          advancedSearchParams.push(...this.lastSearchConfig.config)
        }

        if (value !== 'all') {
          const durRestricDate = new Date(nowDate - utils.getConditionalValue('one-day', 'one-week', 'one-month')(
            millisecondsInDay, millisecondsInWeek, millisecondsInMonth
          )(value)).toISOString()

          advancedSearchParams.push({fieldName: 'registrationDate', value: durRestricDate, condition: '>='})
        }

        try {
          const result = await this.$http.post('/api/users/advancedSearch', advancedSearchParams)

          this.searchedList = result.data
        } catch (error) {}
      }
    },
  },
  computed: {
    paramsForApi () {
      return utils.userAdvancedSearchParamsToApi(this.paramCompList)
    },
  },
  components: {
    'users-list': UsersList,
    'user-parametrized-search-bar': UserParametrizedSearchBar,
  },
}
</script>

<style scoped>
.user-search-container {
  padding-left: 10px;
  padding-right: 10px;
}
.parametrized-search-bar-row {
  padding: 10px;
}
</style>
