<template>
  <div>
    <b-form-select :options="comparSignOptions" :value="value.comparSign" @change="comparSignChange" />

    <b-form-input
      :value="value.numInput"
      @input="inputChange"
      :placeholder="hintText"
      type="number"
    ></b-form-input>
  </div>
</template>

<script>
import { comparisonSigns } from '../../../../constants'

export default {
  name: 'param-number-input',
  props: {
    value: {
      comparSign: String,
      numInput: Number,
    },
    hintText: String,
  },
  methods: {
    comparSignChange (val) {
      this.$emit('input', {
        comparSign: val,
        numInput: this.value.numInput,
      })
    },
    inputChange (val) {
      this.$emit('input', {
        comparSign: this.value.comparSign,
        numInput: val,
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
}
</script>

<style scoped>
</style>
