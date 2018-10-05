<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ formTitle }}</span>
    </v-card-title>

    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex v-for="header in tableHeaders" :key="header.id" xs12 sm12 md6>
            <v-text-field v-model="editedItem[`${header.value}`]" :label="header.text" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer />

      <v-btn color="blue darken-1" flat @click="$emit('handleClose')">{{ STRING_TABLE_MODAL_CANCEL_BTN }}</v-btn>

      <v-btn color="blue darken-1" flat @click="$emit('handleSave')">{{ STRING_TABLE_MODAL_SAVE_BTN }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import {
  STRING_TABLE_MODAL_NEW_USER,
  STRING_TABLE_MODAL_EDIT_USER,
  STRING_TABLE_MODAL_SAVE_BTN,
  STRING_TABLE_MODAL_CANCEL_BTN
} from "@/config/constants";

export default {
  data() {
    return {
      STRING_TABLE_MODAL_SAVE_BTN,
      STRING_TABLE_MODAL_CANCEL_BTN
    };
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? STRING_TABLE_MODAL_NEW_USER
        : STRING_TABLE_MODAL_EDIT_USER;
    }
  },
  props: {
    tableHeaders: Array,
    handleSave: Function,
    handleClose: Function,
    editedIndex: Number,
    editedItem: Object
  }
};
</script>
