<template>
  <div class="parametrized-search-bar">
    <b-modal
      id="parametersAddingModal"
      title="პარამეტრები"
      header-bg-variant="info"
      header-text-variant="light"
      hide-footer
      centered
    >
      <div v-for="paramCategory in paramCategoryList" :key="paramCategory.id">
        <b-row>
          <b-col cols="10">
            {{paramCategory.text}}
          </b-col>

          <b-col cols="2">
            <b-button variant="secondary" @click="addParamComp(paramCategory.paramCompName)">+</b-button>
          </b-col>
        </b-row>
      </div>
    </b-modal>

    <b-row>
      <b-col cols="5">
        <b-card title="პარამეტრები">
          <div v-for="(paramComp, index) in paramCompList" :key="index">
            <component :is="paramComp"></component>
          </div>
        </b-card>
      </b-col>

      <b-col cols="5">
        <b-card title="დამატებითი პარამეტრები">bar</b-card>
      </b-col>

      <b-col cols="2">
        <b-button variant="secondary" v-b-modal.parametersAddingModal>+</b-button>

        <b-button variant="info">ძებნა</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import ParamCheckbox from './parametrizingComponents/param-checkbox'
import ParamDate from './parametrizingComponents/param-date'
import ParamDropdown from './parametrizingComponents/param-dropdown'
import ParamInput from './parametrizingComponents/param-input'
import ParamNumberInput from './parametrizingComponents/param-number-input'
import ParamRangeInput from './parametrizingComponents/param-range-input'

export default {
  name: 'parametrized-search-bar',
  props: ['paramCategoryList'],
  data () {
    return {
      paramCompList: [],
    }
  },
  methods: {
    addParamComp (paramCompName) {
      this.paramCompList.push(paramCompName)
    },
  },
  components: {
    'param-checkbox': ParamCheckbox,
    'param-date': ParamDate,
    'param-dropdown': ParamDropdown,
    'param-input': ParamInput,
    'param-number-input': ParamNumberInput,
    'param-range-input': ParamRangeInput,
  },
}
</script>

<style scoped>
.parametrized-search-bar {
  padding: 10px;
}
</style>
