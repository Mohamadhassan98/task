import { Plugin } from '@nuxt/types';

const Validators: Plugin = (_ctx, inject) => {
  inject(
    'required',
    (value: string | undefined) =>
      (value !== undefined && value !== null && !!value.toString().trim()) ||
      'وارد کردن این فیلد اجباری است.'
  );
  inject(
    'range',
    (config: { min?: number; max?: number; type?: 'length' | 'compare' }) =>
      config.type === 'length'
        ? (value: string) =>
            (!!value &&
              value.trim().length >= (config.min || 0) &&
              value.trim().length <= (config.max || Number.MAX_VALUE)) ||
            'مقدار وارد شده معتبر نیست.'
        : (value: string) =>
            (!!value &&
              +value.trim() >= (config.min || 0) &&
              +value.trim() <= (config.max || Number.MAX_VALUE)) ||
            'مقدار وارد شده معتبر نیست.'
  );
};

export default Validators;
