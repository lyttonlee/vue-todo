import Vue from 'vue'
import Notification from './Notify.vue'

// const NotificationConstructor = Vue.extend(Notification)
const notify = (options) => {
  if (Vue.prototype.$isServer) {
    return
  }
  const instance = new Notification({
    propsData: options,
  })
  instance.$mount()
  document.body.appendChild(instance.$el)
  // console.log(instance)
  return instance
}
export default notify
