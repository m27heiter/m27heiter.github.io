<template>
  <div>
    <v-toolbar flat color="white">
      <v-text-field v-model="search" append-icon="search" :label="STRING_TABLE_SEARCH" single-line hide-details />

      <v-spacer />

      <v-dialog v-model="showModal" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-0">{{ this.STRING_TABLE_NEW_USER_BTN }}</v-btn>

        <Modal :tableHeaders="tableHeaders" @handleSave="handleModalSave" @handleClose="handleModalClose" :editedIndex="editedIndex" :editedItem="editedItem" />
      </v-dialog>
    </v-toolbar>

    <v-data-table :headers="tableHeaders" :items="usersData" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">

        <td v-for="header in tableHeaders" :key="header.id">{{ props.item[`${header.value}`] }}</td>

        <td class="justify-center layout px-1">
          <div class="deleteIcon">
            <v-icon small class="mr-2" @click="editItem(props.item)">
              edit
            </v-icon>

            <v-icon small @click="deleteItem(props.item)">
              delete
            </v-icon>
          </div>
        </td>
      </template>

      <template slot="pageText" slot-scope="props">
        Items {{ props.pageStart }} - {{ props.pageStop }} of {{ props.itemsLength }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import {
  STRING_WARNING_USER_DELETETION,
  STRING_TABLE_NEW_USER_BTN,
  STRING_TABLE_SEARCH
} from "@/config/constants";
import Modal from "@/components/Modal";

export default {
  name: "Table",
  data() {
    return {
      search: "",
      showModal: false,
      editedIndex: -1,
      users: this.usersData,
      editedItem: {},
      defaultItem: {},
      STRING_TABLE_NEW_USER_BTN,
      STRING_TABLE_SEARCH
    };
  },
  methods: {
    handleModalSave() {
      if (this.editedIndex > -1) {
        let data = {
          password: "test",
          name: this.editedItem.name,
          email: this.editedItem.email,
          objectId: this.editedItem.objectId
        };

        this.updateUser(data).then(() => {
          this.showModal = false;
          Object.assign(this.users[this.editedIndex], this.editedItem);
        });
      } else {
        let data = {
          password: "test",
          name: this.editedItem.name,
          email: this.editedItem.email
        };

        this.addUser(data).then(() => {
          this.showModal = false;
          this.users.push(this.editedItem);
        });
      }
    },

    handleModalClose() {
      this.showModal = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.showModal = true;
    },

    deleteItem(item) {
      confirm(STRING_WARNING_USER_DELETETION) &&
        this.deleteUser(item.objectId).then(() => {
          this.users.splice(this.users.indexOf(item), 1);
        });
    },

    ...mapActions(["getUser", "addUser", "deleteUser", "updateUser"])
  },
  props: {
    usersData: Array,
    tableHeaders: Array
  },
  components: { Modal }
};
</script>

<style scoped>
.deleteIcon {
  margin-top: 15px;
}
</style>
