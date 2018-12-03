import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment'
import http from './api/api'

Vue.use(Vuex);
interface Todo {
  content: string,
  creatTime: string,
  complete: boolean,
  updateTime?: string,
  _id?: string
}
export default new Vuex.Store({
  state: {
    gname: 'Lytton',
    todos: [],
    newtodo: {},
  },
  mutations: {
    syncNewTodo(state, data) {
      state.newtodo = data;
    },
  },
  actions: {
    newTodo({commit}, data: Todo) {
      http.post('/todos', data).then((res) => {
        console.log(res)
      })
    },
    getTodos({commit}, query) {
      http.get('/todos', query).then((res) => {
        console.log(res)
      })
    },
    findAll({commit}, query) {
      // ..
      http.get('/todos').then((res) => {
        console.log(res)
      })
    },
  },
});
