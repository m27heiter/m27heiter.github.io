<template>
  <div class="home">
    <v-app>
      <Header :headerTitle="STRING_APP_HEADER" />
      <v-content>
        <Loading v-if="showLoadingScreen" />
        <Error v-else-if="error !== null" :errorText="this.error" />
        <Table v-else :usersData="users" :tableHeaders="tableHeaders" />
      </v-content>
    </v-app>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Table from "@/components/Table.vue";
import Loading from "@/components/Loading.vue";
import Header from "@/components/Header.vue";
import Error from "@/components/Error.vue";
import {
  STRING_APP_HEADER,
  STRING_TABLE_MODAL_USER_NAME,
  STRING_TABLE_MODAL_EMAIL
} from "@/config/constants";

export default {
  name: "Home",
  data() {
    return {
      page: 1,
      tableHeaders: [
        {
          id: 1,
          text: STRING_TABLE_MODAL_USER_NAME,
          align: "left",
          value: "name"
        },
        {
          id: 2,
          text: STRING_TABLE_MODAL_EMAIL,
          align: "left",
          value: "email"
        }
      ],
      STRING_APP_HEADER
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: mapActions(["getUsers"]),
  computed: mapState(["users", "showLoadingScreen", "error"]),
  components: { Table, Loading, Header, Error }
};
</script>
