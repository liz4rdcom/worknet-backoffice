<template>
  <div role="tablist">
    <b-card no-body class="mb-1 vacancy-card" v-for="vacancy in vacancies" :key="vacancy.id">
      <b-card-header class="p-1" role="tab">
        <b-btn block v-b-toggle="vacancy.id" variant="outline-secondary">
          <h3><b>{{vacancy.positionName}}</b></h3>
        </b-btn>
      </b-card-header>
      <b-collapse :id="vacancy.id" accordion="my-accordion" role="tabpanel">
        <b-card-body>
          <b-form-checkbox
            @change="setApproved($event, vacancy.id)"
            :checked="vacancy.approvedByMediationService"
          >
            გადამოწმებულია
          </b-form-checkbox>

          <h6 v-if="vacancy.organization"><label>დამსაქმებელი: &nbsp; </label><b>{{vacancy.organization}}</b></h6>
          <h6><label>მისამართი: &nbsp; </label><b>{{vacancy.addressLine}}</b></h6>
          <h6><label>განათლების რეკომენდირებული მინიმალური დონე: &nbsp; </label><b>{{vacancy.formalEducationLevelName}}</b></h6>
          <h6 v-if="vacancy.fullTime"><label>სრული განაკვეთი</label></h6>
          <h6 v-if="vacancy.partTime"><label>ნახევარი განაკვეთი</label></h6>
          <h6 v-if="vacancy.shiftBased"><label>ცვლები</label></h6>
          <h6><label>თანამდებობრივი მოვალეობის აღწერილობა: &nbsp; </label><b>{{vacancy.functionsDescription}}</b></h6>
          <h6><label>გასაუბრებების დაწყების სავარაუდო თარიღი: &nbsp; </label><b>{{vacancy.interviewSupposedStartDate}}</b></h6>
          <h6 v-if="vacancy.vacantPlacesQuantity"><label>ვაკანტური ადგილების რაოდენობა: &nbsp; </label><b>{{vacancy.vacantPlacesQuantity}}</b></h6>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'vacancies-list',
  props: {
    vacancies: {
      type: Array,
      default: function () {
        return []
      },
    },
  },
  data () {
    return {}
  },
  methods: {
    async setApproved (checkboxValue, id) {
      try {
        await this.$http.put(`/api/vacancies/setApproved/${id}`, { value: checkboxValue })
      } catch (e) {}
    },
  },
}
</script>

<style scoped>
.vacancy-card {
  text-align: left;
}

.vacancy-card h6 {
  line-height: 1.0;
}
</style>
