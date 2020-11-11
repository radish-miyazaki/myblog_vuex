<template>
  <v-app>
    <my-header />
    <Nuxt />
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from '../components/shared/myHeader'
import myFooter from '../components/shared/myFooter'

export default {
  components: {
    myHeader, myFooter
  }
}

</script>

