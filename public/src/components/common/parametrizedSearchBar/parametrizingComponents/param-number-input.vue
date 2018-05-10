<template>
  <div>
    <b-row>
      <b-col class="first-col" cols="5">
          <b-form-select :options="comparSignOptions" :value="value.comparSign" @change="comparSignChange" />
      </b-col>

      <b-col class="second-col" cols="7">
        <b-form-input
          :value="value.numInput"
          @input="inputChange"
          :placeholder="hintText"
          type="number"
        ></b-form-input>
      </b-col>
    </b-row>
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
.first-col {
  padding-left: 2px;
  padding-right: 4px;
}
.second-col {
  padding-left: 0px;
  padding-right: 2px;
}
</style>
