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
    disableLoadingScreen({ commit }) {
      commit("set", { type: "showLoadingScreen", item: false });
    },

    setError({ commit }, text) {
      commit("set", { type: "error", item: text });
    },

    async fetchUsers({ commit, dispatch }) {
      await api
        .getUsersData()
        .then(response => {
          commit("set", { type: "users", item: response.data });
          dispatch("disableLoadingScreen");
        })
        .catch(() => {
          dispatch("disableLoadingScreen");
          dispatch("setError", "Error. Please try again later");
        });
    }
  }
});
