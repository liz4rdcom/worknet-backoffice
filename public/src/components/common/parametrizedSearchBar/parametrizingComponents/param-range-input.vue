<template>
  <div>
    <b-input-group>
      <b-form-input
        :value="value.startValue"
        @input="startValChange"
        :placeholder="hintText"
        type="text"
      ></b-form-input>
      -დან

      <b-form-input
        :value="value.endValue"
        @input="endValChange"
        :placeholder="hintText"
        type="text"
      ></b-form-input>

      -მდე
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'param-range-input',
  props: {
    value: {
      startValue: Number,
      endValue: Number,
    },
    hintText: String,
  },
  methods: {
    startValChange (val) {
      this.$emit('input', {
        startValue: val,
        endValue: this.value.endValue,
      })
    },
    endValChange (val) {
      this.$emit('input', {
        startValue: this.value.startValue,
        endValue: val,
      })
    },
  },
}
</script>

<style scoped>
</style>
