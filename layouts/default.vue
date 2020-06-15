<template>
  <div>
    <no-ssr>
      <app-header/>
    </no-ssr>
    <no-ssr>
      <nuxt/>
    </no-ssr>
    <subscription/>
    <app-footer/>
  </div>
</template>

<script>
  import AppHeader from '~/components/AppHeader.vue'
  import AppFooter from '~/components/AppFooter.vue'
  import Vuex from 'vuex'
  import 'assets/vendor/font-awesome/css/font-awesome.css'
  import Subscription from '~/components/Subscription.vue'
  import VueCarousel from 'vue-carousel'
  import Vue from 'vue'

  Vue.use(VueCarousel, Vuex)

  export default {
    components: {
      AppHeader,
      AppFooter,
      Subscription
    },
    beforeMount() {
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-99TG');
    }
  }
</script>

<style>

</style>
