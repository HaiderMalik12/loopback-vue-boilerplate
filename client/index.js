import Vue from 'vue';
import index from './views/Index';

Vue.config.debug = process.env.NODE_ENV === 'development';

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { index }
});
