<template>
  <div>
    <pre>{{
      JSON.stringify(paramCompList, null, 2)
    }}</pre>

    <b-form-group label="საძიებო სიტყვა">
      <b-input-group>
        <b-form-input autofocus type="text" v-model="searchText"></b-form-input>
        <b-input-group-append>
          <b-button variant="secondary" @click="searchByText">ძებნა</b-button>
        </b-input-group-append>
      </b-input-group>
    </b-form-group>

    <b-form-group>
      <b-form-radio-group v-model="durationRadioValue" :options="durationRadioOptions" v-on:change="boom">
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
      durationRadioValue: 'one-week',
      paramCompList: [],
      searchedList: [],
    }
  },
  methods: {
    async searchByText () {
      try {
        const result = await this.$http.get('/api/users/', {params: this.searchText})

        this.searchedList = result.data
      } catch (error) {
      }
    },
    boom (value) {
      console.log('duration radio changed, value: ', value)
    },
    async advancedSearch () {
      try {
        const result = await this.$http.post('/api/users/advancedSearch', this.paramsForApi)

        this.searchedList = result.data
      } catch (error) {
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
.parametrized-search-bar-row {
  padding: 10px;
}
</style>
