import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment'
import http from './api/api'

Vue.use(Vuex);

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
    newTodo({commit}, data: any) {
      interface Todo {
        event: string,
        date: string,
        complete: boolean,
        _id?: string
      }
      http.post('/todos', data).then((res) => {
        console.log(res)
      })
    },
    findAll({commit}, query) {

    },
  },
});
