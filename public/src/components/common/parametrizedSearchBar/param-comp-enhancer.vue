<template>
  <div class="param-comp-enhancer">
    <b-row>
      <b-col cols="8">
        <slot />
      </b-col>

      <b-col cols="3">
        <b-form-radio-group
          :checked="value"
          @change="emitChange"
          :button-variant="value ? 'outline-info' : 'outline-secondary'"
          :options="onOffCheckboxOptions"
          buttons
        />
      </b-col>

      <b-col cols="1">
        <b-button variant="danger" @click="removeClick">-</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'param-comp-enhancer',
  props: ['value'],
  data () {
    return {
      onOffCheckboxOptions: [{text: 'On', value: true}, {text: 'Off', value: false}],
    }
  },
  methods: {
    removeClick () {
      this.$emit('removeClick')
    },
    emitChange (val) {
      this.$emit('input', val)
    },
  },
  components: {
  },
}
</script>

<style scoped>
.param-comp-enhancer {
  padding: 20px
}
</style>
