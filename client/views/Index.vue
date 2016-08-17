<template>

    <header-view></header-view>
    <main class="mdl-layout__content">
      <div class=" mdl-typography--text-center">
        <h2>Hello World.</h2>
      </div>

      <div class="mdl-typography--text-center">
        <a href="/demo.html"><h3 class=" mdl-typography--display-1-color-contrast">{{ demoMsg }}</h3></a>
      </div>

      <footer-view></footer-view>
    </main>
</template>

<script>

import header from '../components/index/Header';
import footer from '../components/index/Footer';

export default {
  components: {
    'header-view': header,
    'footer-view': footer
  },
  data () {
    return {
      demoMsg: 'GitHub Commits Example by Evan You (yyx990803)'
    }
  }
};
</script>

<style lang="scss">
@import '../assets/base.scss';
</style>
