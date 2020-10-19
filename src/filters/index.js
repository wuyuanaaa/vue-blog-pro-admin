import Vue from 'vue'
import { completeTime, simpleTime } from './global'

Vue.filter('completeTime', completeTime)
Vue.filter('simpleTime', simpleTime)

export * from './date'
