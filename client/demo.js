import Vue from 'vue';
import Demo from './views/Demo';

Vue.config.debug = process.env.NODE_ENV === 'development'

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { Demo }
});
