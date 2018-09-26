<template>
  <v-alert :value="true" type="error">
    {{ this.errorText }}
  </v-alert>
</template>

<script>
export default {
  name: "Error",
  props: {
    errorText: String
  }
};
</script>
