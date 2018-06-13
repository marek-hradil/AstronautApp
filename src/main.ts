import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'
import VeeValidate from 'vee-validate'

Vue.config.productionTip = false

const httpLink = new HttpLink({
  uri: 'http://www.marekhradil.net:7080/graphql'
})

const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.use(VueApollo)
Vue.use(VeeValidate)

new Vue({
  router,
  render: h => h(App),
  provide: apolloProvider.provide()
}).$mount('#app')
