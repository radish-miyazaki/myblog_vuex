<template>
    <div>
      <v-footer
        color="blue-grey darken-2"
        padless
      >
        <v-row
          justify="center"
          no-gutters
        >
          <v-col
            class="blue-grey darken-2 py-4 text-center white--text"
            cols="12"
          >
            {{ new Date().getFullYear() }} — <strong>RADISH TECH</strong>
          </v-col>
        </v-row>
      </v-footer>
    </div>
</template>

<script>
export default {

}
</script>