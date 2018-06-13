<template>
  <main role="application" id="app">
    <AppHeader></AppHeader>
    <router-view/>
  </main>
</template>
<script>
import AppHeader from '@/layout/AppHeader.vue'
export default {
  components: {
    AppHeader
  }
}
</script>

<style lang="less">
  @import './assets/css/global.less';
  @font-face {
    font-family: "FontAwesome";
    src: url("https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/fonts/fontawesome-webfont.woff2?v=4.3.0") format("woff2")
  }
  :root{
    --primary: #1e1e82;
    --white: #fff;
    --gray: #ddd;
    --black: #333;

    --main-font: 'Montserrat', sans-serif;
    --text-font: 'Roboto', sans-serif;
  }
  body {
    margin: 0;
    font-family: var(--text-font);
    color: var(--black);
    background: var(--gray);
    overflow-x: hidden;
  }
  #app {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 4rem auto;
    grid-template-areas: "navbar"
                          "view";
  }
</style>
