import Vue from "vue";
import Vuex from "vuex";
import api from "@/config/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: null,
    showLoadingScreen: true,
    error: null
  },
  mutations: {
    set(state, { type, item }) {
      state[type] = item;
    }
  },
  actions: {
    enableLoadingScreen({ commit }) {
      commit("set", { type: "showLoadingScreen", item: true });
    },

    disableLoadingScreen({ commit }) {
      commit("set", { type: "showLoadingScreen", item: false });
    },

    setError({ commit }, text) {
      commit("set", { type: "error", item: text });
    },

    async getUsers({ commit, dispatch }) {
      dispatch("enableLoadingScreen");

      await api
        .getUsers()
        .then(response => {
          commit("set", { type: "users", item: response.data });
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Error. Please try again later");
        });
    },

    async getUser({ dispatch }, objectID) {
      dispatch("enableLoadingScreen");

      await api
        .getUser(objectID)
        .then(() => {
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Error. Please try again later");
        });
    },

    async addUser({ dispatch }, data) {
      dispatch("enableLoadingScreen");

      await api
        .addUser({
          password: data.password,
          name: data.name,
          email: data.email
        })
        .then(() => {
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Server error or wrong e-mail format");
        });
    },

    async deleteUser({ dispatch }, objectId) {
      dispatch("enableLoadingScreen");

      await api
        .deleteUser({ objectId: objectId })
        .then(() => {
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Error. Please try again later");
        });
    },

    async updateUser({ dispatch }, data) {
      dispatch("enableLoadingScreen");

      await api
        .updateUser({
          password: data.password,
          name: data.name,
          email: data.email,
          objectId: data.objectId
        })
        .then(() => {
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Error. Please try again later");
        });
    }
  }
});
