<template>
  <v-form v-model="form" @submit.prevent="submit">
    <v-card min-width="100%" min-height="100%">
      <v-card-title>فرم اطلاعات هویتی</v-card-title>
      <v-card-subtitle>
        لطفاً اطلاعات خود را به دقت وارد نمایید.
      </v-card-subtitle>
      <v-card-text>
        <v-row>
          <v-col md="4" cols="12">
            <v-text-field
              v-model="participant.name"
              dense
              outlined
              label="نام"
              :rules="[$required]"
            />
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field
              v-model="participant.family_name"
              dense
              outlined
              label="نام خانوادگی"
              :rules="[$required]"
            />
          </v-col>
          <v-col md="4" cols="12">
            <v-text-field
              v-model="participant.birth_year"
              dense
              outlined
              label="سال تولد"
              type="number"
              :rules="[$required, $range({ min: 1270, max: 1410 })]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="participant.education_level"
              :items="educationItems"
              dense
              outlined
              label="سطح تحصیلات"
              :rules="[$required]"
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-radio-group
              v-model="participant.gender"
              :rules="[$required]"
              label="جنسیت"
              row
            >
              <v-radio label="مرد" :value="ParticipantGenderEnum.Male" />
              <v-radio label="زن" :value="ParticipantGenderEnum.Female" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col cols="12">
            <v-divider />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-title>فرم اطلاعات ذهنی - روان‌شناختی</v-card-title>
      <v-card-text>
        <v-row align="baseline">
          <v-col cols="12" md="9">
            <p>{{ formText.mental_disorder }}</p>
          </v-col>
          <v-col cols="12" md="9" class="d-flex flex-column flex-md-row">
            <v-checkbox
              v-for="(mental, index) in mentalItems"
              :key="mental.value"
              v-model="mentalDisorders"
              multiple
              :hide-details="index !== mentalItems.length - 1"
              :value="mental.value"
              :label="mental.text"
              class="ml-2"
            />
          </v-col>
          <v-col v-if="mentalDisorders.includes(4)" cols="12" md="3">
            <v-text-field
              v-model="otherMental"
              label="نوع بیماری"
              :rules="[$required]"
              dense
              outlined
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-radio-group
              v-model="health.get_covid_19"
              :rules="[$required]"
              :label="formText.get_covid_19 || ''"
              row
            >
              <v-radio :value="0" label="خیر" />
              <v-radio :value="1" label="۱ بار" />
              <v-radio :value="2" label="۲ بار و یا بیشتر" />
            </v-radio-group>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-radio-group
              v-model="health.get_drug"
              :rules="[$required]"
              :label="formText.get_drug || ''"
              row
            >
              <v-radio :value="0" label="خیر" />
              <v-radio :value="1" label="بله" />
            </v-radio-group>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" type="submit" :disabled="!form" x-large>
          مرحله بعدی
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import {
  GetHealthQuestion,
  HelpApiFp,
  ParticipantGenderEnum,
  TaskRegister,
} from '~/lib/api';

export default Vue.extend({
  name: 'SignUp',
  data() {
    return {
      form: false,
      formText: {} as GetHealthQuestion,
      participant: {} as TaskRegister['participant'],
      health: {} as TaskRegister['health'],
      mentalDisorders: [] as number[],
      ParticipantGenderEnum,
      otherMental: '',
      mentalItems: [
        {
          text: 'سکته یا تومور مغزی',
          value: 1,
        },
        {
          text: 'اختلال خفیف شناختی',
          value: 2,
        },
        {
          text: 'آلزایمر (زوال عقل)',
          value: 3,
        },
        {
          text: 'سایر (در قسمت مقابل وارد کنید.)',
          value: 4,
        },
      ],
      educationItems: [
        {
          text: 'بی‌سواد',
          value: 1,
        },
        {
          text: 'کم‌سواد',
          value: 2,
        },
        {
          text: 'زیر دیپلم',
          value: 3,
        },
        {
          text: 'دیپلم',
          value: 4,
        },
        {
          text: 'بالای دیپلم',
          value: 5,
        },
      ],
    };
  },
  mounted() {
    const mobileNumber = this.$store.state.signUp.participant?.mobile_number;
    if (!mobileNumber) {
      this.$router.replace('/login');
      return;
    } else {
      this.participant.mobile_number = mobileNumber;
    }
    HelpApiFp()
      .helpHealthRead()
      .then(result =>
        result().then(result => {
          this.formText = result.data;
        })
      );
  },
  methods: {
    submit() {
      this.$store.commit('setRegister', {
        health: {
          ...this.health,
          mental_disorder: this.mentalDisorders
            .map(item => {
              if (item === 4) {
                return this.otherMental;
              }
              return this.mentalItems.find(({ value }) => value === item)!.text;
            })
            .join(),
        },
        participant: this.participant,
      });
      this.$router.push('/terms');
    },
  },
});
</script>
