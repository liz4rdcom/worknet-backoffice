<template>
  <div class="param-comp-enhancer">
    <b-row>
      <b-col cols=7 class="aaa">
        <slot />
      </b-col>

      <b-col cols="3" class="aaa">
        <b-form-radio-group
          :checked="value"
          @change="emitChange"
          :button-variant="value ? 'outline-info' : 'outline-secondary'"
          :options="onOffCheckboxOptions"
          buttons
        />
      </b-col>

      <b-col cols="2" class="aaa">
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
.aaa {
  display: inline-block;
}
</style>
