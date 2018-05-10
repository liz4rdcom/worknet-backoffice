<template>
  <div>
    <parametrized-search-bar :paramCategoryList="paramCategoryList"/>
  </div>
</template>

<script>
import ParametrizedSearchBar from './parametrized-search-bar'

export default {
  name: 'user-parametrized-search-bar',
  data () {
    return {
      paramCategoryList: [
        { id: 1, text: 'სურს დას. ხელშ. სამს. დახმარება', paramCompName: 'param-checkbox' }, // paramCompName: 'param-dropdown', additionalProps: {options: [{text: 'text 1', value: 'value1'}, {text: 'text 2', value: 'value2'}, {text: 'text 3', value: 'value3'}]}
        { id: 2, text: 'ასაკი', paramCompName: 'param-range-input' },
        { id: 3, text: 'დაბ.თარიღი', paramCompName: 'param-date' },
        { id: 4, text: 'რეგისტრაციის თარ.', paramCompName: 'param-date' },
        { id: 5, text: 'სასურველი სამს. რეგიონი', paramCompName: 'param-input' },
        { id: 6, text: 'სასურველი სამს. რაიონი', paramCompName: 'param-input' },
        { id: 7, text: 'სასურველი პროფესია', paramCompName: 'param-input' },
        { id: 8, text: 'სქესი', paramCompName: 'param-input' },
        { id: 9, text: 'სიმაღლე', paramCompName: 'param-number-input' },
        { id: 10, text: 'რეგიონი', paramCompName: 'param-input' },
        { id: 11, text: 'რაიონი', paramCompName: 'param-input' },
        { id: 12, text: 'მისამართი', paramCompName: 'param-input' },
        { id: 13, text: 'ფაქტ.რეგიონი', paramCompName: 'param-input' },
        { id: 14, text: 'ფაქტ.რაიონი', paramCompName: 'param-input' },
        { id: 15, text: 'ფაქტ.მისამართი', paramCompName: 'param-input' },
        { id: 16, text: 'ფორმალური განათლების დონე', paramCompName: 'param-input' },
        { id: 17, text: 'განათლების ტიპი', paramCompName: 'param-input' },
        { id: 18, text: 'განათლების დონე', paramCompName: 'param-input' },
        { id: 19, text: 'მინიჭებული კვალიფიკაცია', paramCompName: 'param-input' },
        { id: 20, text: 'ენა', paramCompName: 'param-input' },
        { id: 21, text: 'კომპ.უნარები', paramCompName: 'param-input' },
        { id: 22, text: 'პროფესია', paramCompName: 'param-input' },
        { id: 23, text: 'პოზიცია', paramCompName: 'param-input' },
        { id: 24, text: 'საქმიანობა', paramCompName: 'param-input' },
        { id: 25, text: 'სასურველი ხელფასი', paramCompName: 'param-number-input' },
        { id: 26, text: 'მართვის მოწმობა A', paramCompName: 'param-checkbox' },
        { id: 27, text: 'მართვის მოწმობა B', paramCompName: 'param-checkbox' },
        { id: 28, text: 'მართვის მოწმობა C', paramCompName: 'param-checkbox' },
        { id: 29, text: 'მართვის მოწმობა D', paramCompName: 'param-checkbox' },
        { id: 30, text: 'მართვის მოწმობა E', paramCompName: 'param-checkbox' },
        { id: 31, text: 'მართვის მოწმობა T1', paramCompName: 'param-checkbox' },
        { id: 32, text: 'მართვის მოწმობა T2', paramCompName: 'param-checkbox' },
        { id: 33, text: 'საჰაერო', paramCompName: 'param-checkbox' },
        { id: 34, text: 'სარკინიგზო', paramCompName: 'param-checkbox' },
        { id: 35, text: 'საზღვაო', paramCompName: 'param-checkbox' },
        { id: 36, text: 'სამხედრო ვალდებულება', paramCompName: 'param-checkbox' },
        { id: 37, text: 'სრულ განაკვეთზე', paramCompName: 'param-checkbox' },
        { id: 38, text: 'ნახევარ განაკვეთზე', paramCompName: 'param-checkbox' },
        { id: 39, text: 'ცვლებში', paramCompName: 'param-checkbox' },
        { id: 40, text: 'უმუშევარი', paramCompName: 'param-checkbox' },
        { id: 41, text: 'ჭირდება სააგენტოს დახმარება', paramCompName: 'param-checkbox' },
        { id: 42, text: 'დაინტერესებულია ტრენინგით', paramCompName: 'param-checkbox' },
        { id: 43, text: 'დაინტერესებულია პროფესიული ტრენინგით', paramCompName: 'param-checkbox' },
      ],
    }
  },
  methods: {
  },
  components: {
    'parametrized-search-bar': ParametrizedSearchBar,
  },
}
</script>

<style scoped>
</style>
