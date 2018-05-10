<template>
  <div>
    <b-row>
      <b-col class="first-col" cols="3">
        <b-form-select :options="comparSignOptions" :value="value.comparSign" @change="comparSignChange" />
      </b-col>

      <b-col class="second-col" cols="9">
        <date-picker-dropdown :label="hintText" :value="value.dateVal" @input="dateChanged" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import datePickerDropdown from '../../date-picker-dropdown'
import { comparisonSigns } from '../../../../constants'

export default {
  name: 'param-date',
  props: {
    value: {
      comparSign: String,
      dateVal: String,
    },
    hintText: String,
  },
  methods: {
    comparSignChange (val) {
      this.$emit('input', {
        comparSign: val,
        dateVal: this.value.dateVal,
      })
    },
    dateChanged (val) {
      this.$emit('input', {
        comparSign: this.value.comparSign,
        dateVal: val,
      })
    },
  },
  computed: {
    comparSignOptions () {
      const retVal = comparisonSigns.map(nextVal => ({ text: nextVal, value: nextVal }))

      retVal.splice(0, 0, { text: 'პირობა', value: null, disabled: true })

      return retVal
    },
  },
  components: {
    'date-picker-dropdown': datePickerDropdown,
  },
}
</script>

<style scoped>
.first-col {
  padding-left: 2px;
  padding-right: 4px;
}
.second-col {
  padding-left: 0px;
  padding-right: 2px;
}
</style>
