<template>
  <div>
    ID:{{id}}
  </div>
</template>

<script>
    export default {
        name: "Child",
      computed:{
          id(){
            return this.$route.params.id
          }
      }
    }
</script>

<style scoped>

</style>
