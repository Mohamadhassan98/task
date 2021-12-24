import moment from 'moment';
import Vue from 'vue';
const faLocale = require('moment/locale/fa');
moment.locale('fa', faLocale);
Vue.use(moment);
