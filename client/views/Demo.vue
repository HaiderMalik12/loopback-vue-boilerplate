<template>
    <header-view></header-view>
    <main class="mdl-layout__content">

      <div class="mdl-typography--text-center">
        <a href="http://jsfiddle.net/yyx990803/KupQL"><h3 class=" mdl-typography--display-1-color-contrast">GitHub Commits Example by Evan You (yyx990803)</h3>
        </a> 
      </div>

      <div id="demo">
        <h1>Latest Vue.js Commits</h1>

        <input type="radio" id="master" name="branch" v-model="branch" value="master">
        <label for="master">master</label>
        <br>
        <input type="radio" id="dev" name="branch" v-model="branch" value="dev">
        <label for="dev">dev</label>
        <ul>
            <li v-for="cm in commits">
                <a href="{{html_url}}" target="_blank" class="commit">
                    {{cm.sha.slice(0, 7)}}
                </a>
                - <span class="message">{{cm.commit.message | truncate}}</span>
                <br>
                by <span class="author">{{cm.commit.author.name}}</span>
                at <span class="date">{{cm.commit.author.date | formatDate}}</span>
            </li>
        </ul>
      </div>
      <footer-view></footer-view>
    </main>
</template>

<script>

import header from '../components/index/Header';
import footer from '../components/index/Footer';

const apiUrl = 'https://api.github.com/repos/yyx990803/vue/commits?per_page=3&sha='

/*eslint-disable*/
export default {
  components: {
    'header-view': header,
    'footer-view': footer
  },
  data () {
    return {
      commits: [],
      branch: 'master'
    }
  },
  created() {
    this.$watch('branch', function () {
      this.fetchData()
    })
  },
  ready(){
    this.fetchData();
  },
  filters: {
    truncate: function (v) {
      var newline = v.indexOf('\n')
      return newline > -1 ? v.slice(0, newline) : v
    },
    formatDate: function (v) {
      return v.replace(/T|Z/g, ' ')
    }
  },
  methods: {
    fetchData: function () {
      var xhr = new XMLHttpRequest(),
          self = this
      xhr.open('GET', apiUrl + self.branch)
      xhr.onload = function () {
          self.commits = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
};
</script>

<style lang="scss">
@import '../assets/base.scss';
#demo {
    font-family:'Helvetica', Arial, sans-serif;
    font-size: 13px;
    padding-left: 125px;
    margin: 0px auto;
    max-width: 700px;
}
a {
    text-decoration: none;
    color: #f66;
}
li {
    line-height: 1.5em;
    margin-bottom: 20px;
}
.author, .date {
    font-weight: bold;
}
</style>
