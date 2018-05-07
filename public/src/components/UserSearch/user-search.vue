<template>
  <div>
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
          <user-parametrized-search-bar />
      </b-collapse>
    </b-card-header>

    <div>სულ ნაპოვნია {{searchedList.length}} ჩანაწერი</div>

    <users-list :users="searchedList"/>
  </div>
</template>

<script>
import UsersList from '../../components/users-list'
import UserParametrizedSearchBar from '../../components/common/parametrizedSearchBar/user-parametrized-search-bar'

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
  },
  components: {
    'users-list': UsersList,
    'user-parametrized-search-bar': UserParametrizedSearchBar,
  },
}
</script>

<style scoped>
</style>
