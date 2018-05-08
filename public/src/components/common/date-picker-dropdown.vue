<template>
  <div>
    <b-container>
      <b-form-group :label="label">
        <b-row>
          <b-col class="day-col">
              <b-form-select :options="daysOptions" @change="dayChange" :value="dayValue" />
          </b-col>

          <b-col class="month-col">
              <b-form-select :options="monthOptions" @change="monthChange" :value="monthValue" />
          </b-col>

          <b-col class="year-col">
              <b-form-select :options="yearOptions" @change="yearChange" :value="yearValue" />
          </b-col>
        </b-row>
      </b-form-group>
    </b-container>
  </div>
</template>

<script>
import reverse from 'lodash/reverse'
import utils from '../../utils'
import { MONTH_NAMES } from '../../constants'

const MAX_DAYS_IN_MONTH = 31

export default {
  name: 'date-picker-dropdown',
  props: {
    startYear: {
      type: Number,
      default: 1800,
    },
    endYear: {
      type: Number,
      default: new Date().getFullYear() + 10,
    },
    value: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    dayChange (val) {
      this.$emit('input', new Date(this.yearValue, this.monthValue, val).toString())
    },
    monthChange (val) {
      this.$emit('input', new Date(this.yearValue, val, this.dayValue).toString())
    },
    yearChange (val) {
      this.$emit('input', new Date(val, this.monthValue, this.dayValue).toString())
    },
  },
  computed: {
    datePropConstructed () {
      return new Date(this.value)
    },

    dayValue () {
      return this.datePropConstructed.getDate()
    },
    monthValue () {
      return this.datePropConstructed.getMonth()
    },
    yearValue () {
      return this.datePropConstructed.getFullYear()
    },

    daysOptions () {
      const retVal = utils.getRangeNumberArray(1, MAX_DAYS_IN_MONTH)
        .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- დღე -', disabled: true })

      return retVal
    },
    monthOptions () {
      const retVal = MONTH_NAMES
        .map((next, index) => ({ value: index, text: next }))

      retVal.splice(0, 0, { value: null, text: '- თვე -', disabled: true })

      return retVal
    },
    yearOptions () {
      const retVal = reverse(utils.getRangeNumberArray(this.startYear, this.endYear))
        .map(next => ({ value: next, text: next }))

      retVal.splice(0, 0, { value: null, text: '- წელი -', disabled: true })

      return retVal
    },
  },
  components: {
  },
}
</script>

<style scoped>
.day-col {
  padding-left: 0px;
  padding-right: 2px;
}
.month-col {
  padding-left: 2px;
  padding-right: 2px;
}
.year-col {
  padding-left: 2px;
  padding-right: 0px;
}
</style>
