import Vue from 'vue';
import Vuex from 'vuex';

import {TodayTime, TomorrowTime, GetLastThreeDays} from './utils/formatTime'
import http from './api/api'

Vue.use(Vuex);
interface Todo {
  content: string,
  createTime: string,
  complete: boolean,
  updateTime?: string,
  id?: string
}
export default new Vuex.Store({
  state: {
    todayTodos: [],
    tomorrowTodos: [],
    newTodo: {},
    ChartData: {
      labels: GetLastThreeDays(),
      datasets: [
        {
          label: '全部',
          backgroundColor: 'rgba(13, 38, f3, .5)',
          data: [5, 4, 6],
        },
        {
          label: '已完成',
          backgroundColor: 'rgba(3, 68, 39, .5)',
          data: [3, 4, 2],
        },
        {
          label: '未完成',
          backgroundColor: 'rgba(94, 64, 26, .5)',
          data: [2, 0, 4],
        },
      ],
    },
  },
  mutations: {
    syncNewTodo(state, data) {
      state.newTodo = data
    },
    syncTodayTodo(state, data) {
      state.todayTodos = data
    },
    syncTomorrowTodo(state, data) {
      state.tomorrowTodos = data
    },
  },
  getters: {
    // ...
  },
  actions: {
    newTodo({commit}, data: Todo) {
      return new Promise((resolve, reject) => {
        http.post('/todos', data).then((res) => {
          // console.log(res)
          commit('syncNewTodo', res.data)
          resolve({
            msg: '你明天有多了一件事要做！',
            todo: res.data,
          })
        })
        .catch((err) => {
          reject(err)
        })
      })
    },
    filterTodayTodos({commit}, complete?: boolean) {
      let query
      if (complete === undefined) {
        query = {
          createTime: TodayTime,
        }
      } else {
        query = {
          createTime: TodayTime,
          complete,
        }
      }
      http.get(`/todos?filter={"where":${JSON.stringify(query)},"skip":0,"limit":10}`).then((res) => {
        // console.log(res)
        commit('syncTodayTodo', res.data)
      })
    },
    getTomorrowTodos({commit}) {
      const query: object = {
        createTime: TomorrowTime,
      }
      http.get(`/todos?filter={"where":${JSON.stringify(query)},"skip":0,"limit":10}`).then((res) => {
        // console.log(res)
        commit('syncTomorrowTodo', res.data)
      })
    },
    deleteTodoById({commit}, id: string) {
      return new Promise((resolve, reject) => {
        const data = {
          _method: 'DELETE',
        }
        http.post(`/todos/${id}`, data).then((res): any => {
          // console.log(res)
          resolve({
            msg: '你明天又可以少做一件事了！',
          })
        }).catch((err): any => {
          reject({
            msg: '删除失败！',
            type: 'error',
            err,
          })
        })
      })
    },
    updateTodoById({commit}, data: any) {
      return new Promise((resolve, reject) => {
        const {id, complete} = data
        const putData = {
          _method: 'PUT',
          complete: !complete,
        }
        http.post(`/todos/${id}`, putData).then((res): any => {
          // console.log(res)
          resolve({
            msg: '你今天又完成了一件事！',
          })
        }).catch((err): any => {
          reject({
            msg: '修改失败！',
            type: 'error',
            err,
          })
        })
      })
    },
  },
});
