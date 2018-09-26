<template>
  <v-toolbar app>
    <v-toolbar-title>{{ headerTitle }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
  props: {
    headerTitle: String
  }
};
</script>
