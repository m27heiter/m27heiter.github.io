<template>
  <div>
    <v-toolbar flat color="white">
      <v-text-field v-model="search" append-icon="search" label="Search" single-line hide-details></v-text-field>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <v-btn slot="activator" color="primary" dark class="mb-0">{{ this.STRING_TABLE_NEW_USER }}</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md6>
                  <v-text-field v-model="editedItem.name" label="User name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm12 md6>
                  <v-text-field v-model="editedItem.email" label="E-mail"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">{{ STRING_TABLE_CANCEL_BTN }}</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">{{ STRING_TABLE_SAVE_BTN }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="users" :search="search" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.name }}</td>
        <td>{{ props.item.email }}</td>
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
import {
  STRING_WARNING_USER_DELETETION,
  STRING_TABLE_NEW_USER,
  STRING_TABLE_EDIT_USER,
  STRING_TABLE_SAVE_BTN,
  STRING_TABLE_CANCEL_BTN
} from "@/config/constants";

export default {
  name: "Table",
  data() {
    return {
      search: "",
      dialog: false,
      editedIndex: -1,
      users: this.usersData,
      headers: [
        {
          text: "User name",
          align: "left",
          value: "name"
        },
        {
          text: "E-mail",
          align: "left",
          value: "email"
        }
      ],
      editedItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      defaultItem: {
        name: "",
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0
      },
      STRING_TABLE_NEW_USER,
      STRING_TABLE_SAVE_BTN,
      STRING_TABLE_CANCEL_BTN
    };
  },
  methods: {
    close() {
      this.dialog = false;

      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }

      this.close();
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      confirm(STRING_WARNING_USER_DELETETION) && this.users.splice(index, 1);
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? STRING_TABLE_NEW_USER
        : STRING_TABLE_EDIT_USER;
    }
  },
  props: {
    usersData: Array
  }
};
</script>

<style scoped>
.deleteIcon {
  margin-top: 15px;
}
</style>
