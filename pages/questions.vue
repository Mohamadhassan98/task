<template>
  <v-card v-if="questions.length" width="100vw">
    <v-card-subtitle class="question">
      {{ last + 1 }}. {{ questions[last].text }}
    </v-card-subtitle>
    <v-card-text class="font">
      <v-radio-group v-model="questions[last].answer">
        <v-radio
          v-for="answer in questions[last].answers"
          :key="answer.id"
          :value="answer.id"
          :label="answer.text"
          @click="next"
        >
          <template #label>
            <span v-html="answer.text" />
          </template>
        </v-radio>
      </v-radio-group>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="questions.length > 1"
        color="secondary"
        x-large
        @click="prev"
      >
        سؤال قبلی
      </v-btn>
      <v-spacer />
      <v-btn
        v-if="!questions[last].next_id"
        color="primary"
        x-large
        :disabled="!questions[last].answer"
        @click="submit"
      >
        رفتن به مرحله بعد
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Question, QuestionApiFp, RegisterApiFp } from '~/lib/api';

export default Vue.extend({
  name: 'Questions',
  data() {
    return {
      questions: [] as (Question & { answer?: number })[],
      loadingNext: false,
    };
  },
  computed: {
    last(): number {
      return this.questions.length - 1;
    },
  },
  mounted() {
    if (
      !this.$store.state.signUp.health ||
      !this.$store.state.signUp.participant
    ) {
      this.$router.replace('/login');
      return;
    }
    QuestionApiFp()
      .questionRead()
      .then(result =>
        result().then(result => {
          this.questions = [result.data];
        })
      );
  },
  methods: {
    next() {
      const currentId = this.questions[this.last].next_id;
      if (!currentId || this.loadingNext) {
        // do nothing
      } else {
        this.loadingNext = true;
        QuestionApiFp()
          .questionRead_1(currentId)
          .then(result =>
            result().then(result => {
              this.questions = [...this.questions, result.data];
              this.loadingNext = false;
            })
          );
      }
    },
    prev() {
      this.questions = this.questions.filter((_, index) => index !== this.last);
    },
    submit() {
      RegisterApiFp()
        .registerCreate({
          ...this.$store.state.signUp,
          answers: this.questions.map(q => ({
            answer: q.answer,
            question: q.id,
          })),
        })
        .then(res =>
          res().then(() => {
            this.$router.push('/test');
          })
        );
    },
  },
});
</script>
<style lang="scss" scoped>
.font {
  ::v-deep.v-label {
    font-size: 20px !important;
    white-space: normal;
  }
}
.question {
  font-size: 18px;
}
</style>
