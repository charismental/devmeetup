import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import { store } from './store'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import DateFilter from './filters/date'
import AlertCmp from './Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

// import colors from 'vuetify/es5/util/colors'

Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

Vue.use(Vuetify, {
  theme: {
    primary: '#D32F2F',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyDfsyY_4Fs9I34iOrnar5Fs2I61YfrqdOc',
      authDomain: 'devmeetup-1aa15.firebaseapp.com',
      databaseURL: 'https://devmeetup-1aa15.firebaseio.com',
      projectId: 'devmeetup-1aa15',
      storageBucket: 'gs://devmeetup-1aa15.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
  }
})
