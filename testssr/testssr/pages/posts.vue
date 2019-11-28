<template>
  <div>
    <span>博客组件</span>
    <span>{{age}}</span>
    <span>{{name}}</span>
    <NuxtLink to="/">去slug</NuxtLink>
  </div>

</template>

<script>
    export default {
      name: "posts",
      asyncData(context){
        console.log(context);
        return {
          name:'peter'
        }
      },
      data(){
        return {
          age:18
        }
      }
    }
</script>

<style scoped>

</style>
