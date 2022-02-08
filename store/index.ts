import { ApplyTask, TaskRegister } from '~/lib/api';

export const state = () => ({
  signUp: {} as TaskRegister,
  result: {} as Pick<
    ApplyTask,
    'next_date' | 'reaction_time_mean' | 'score' | 'text'
  >,
});

export const mutations = {
  setRegister(state: { signUp: TaskRegister }, val: Partial<TaskRegister>) {
    state.signUp = {
      ...state.signUp,
      ...val,
    };
  },
  resetRegister(state: { signUp: TaskRegister }) {
    state.signUp = {} as any;
  },
  setResult(
    state: {
      result: Pick<ApplyTask, 'next_date' | 'reaction_time_mean' | 'score'>;
    },
    val: Pick<ApplyTask, 'next_date' | 'reaction_time_mean' | 'score'>
  ) {
    state.result = val;
  },
};
