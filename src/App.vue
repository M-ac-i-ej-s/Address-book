<template>
  <div>
    <NavbarComponent/>
    <TableComponent/>
  </div>
</template>
<script>
import TableComponent from './components/TableComponent.vue'
import NavbarComponent from './components/NavbarComponent.vue'

export default {
  components: {
    TableComponent,
    NavbarComponent,
  }
}
</script>
<style lang="scss">
body {
  overflow: hidden;
}
</style>

<!-- npm run build && npx http-server dist -->