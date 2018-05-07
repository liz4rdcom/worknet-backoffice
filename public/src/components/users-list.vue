<template>
  <div>
    <b-card class="vacancy-card" v-for="user in users" :key="user.id">
      <h3><b>{{user.firstName}} {{user.lastName}} ({{user.personalId}})</b></h3>
      <h6><label>ფაქტ. რეგიონი: &nbsp; </label><b>{{user.factLocationName}}</b></h6>
      <h6><label>ფაქტ. რაიონი: &nbsp; </label><b>{{user.factLocationUnitName}}</b></h6>
      <h6><label>ფაქტ. მისამართი: &nbsp; </label><b>{{user.factAddressDescription}}</b></h6>
      <h6><label>მობილური: &nbsp; </label><b>{{user.mobileNumber}}</b></h6>
      <h6><label>ელ-ფოსტა: &nbsp; </label><b>{{user.email}}</b></h6>
      <h6><label>ფორმალური განათლების დონე: &nbsp; </label><b>{{user.formalEducationLevelName}}</b></h6>
      <h6><label>სასურველი ხელფასი: &nbsp; </label><b>{{user.desirableSalary}}</b></h6>
      <h6><label>სურს სააგენტოს დახმარება: &nbsp; </label><b>{{user.useMediationService | boolToText}}</b></h6>
      <h6><label>სურს პროფესიული მომზადება/გადამზადება: &nbsp; </label><b>{{user.interestedInInternship | boolToText}}</b></h6>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'users-list',
  props: {
    users: {
      type: Array,
      default: function () {
        return []
      },
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
