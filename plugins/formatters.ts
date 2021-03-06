import moment from 'jalali-moment';
import Vue from 'vue';

export enum DateTimeType {
  Standard = 'standard',
  Long = 'long',
  Short = 'short',
}

interface DateFormatterConfig {
  locale?: 'fa' | 'en';
  dateType?: DateTimeType;
  timeType?: DateTimeType;
  includeTime?: boolean;
  includeDate?: boolean;
  customFormat?: string;
  iso?: boolean;
}

export function FormatDateTime(
  dateObject: string | undefined | null,
  config?: DateFormatterConfig
) {
  const {
    locale = 'fa',
    dateType = DateTimeType.Standard,
    timeType = DateTimeType.Standard,
    includeTime = false,
    includeDate = true,
    iso = false,
    customFormat,
  } = config || {};
  if (!dateObject) {
    return '';
  }
  if (iso) {
    return moment(dateObject).locale('en').format('YYYY-MM-DD');
  }
  let actualFormat = '';
  const timeFormat =
    timeType === DateTimeType.Long
      ? 'HH:mm:ss'
      : timeType === DateTimeType.Short
      ? 'HH:mm'
      : 'HH:mm:ss'; // <-- standard and Long are same for now...
  const dateFormat =
    dateType === DateTimeType.Long
      ? 'D MMMM YYYY'
      : dateType === DateTimeType.Short
      ? 'dddd D MMMM'
      : 'YYYY/MM/DD';
  if (includeDate && includeTime) {
    actualFormat = `${dateFormat} - ${timeFormat}`;
  } else if (includeTime) {
    actualFormat = timeFormat;
  } else if (includeDate) {
    actualFormat = dateFormat;
  } else {
    return '';
  }
  return moment(dateObject)
    .locale(locale)
    .format(customFormat || actualFormat);
}

Vue.filter('formatDateTime', FormatDateTime);
