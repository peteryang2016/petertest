<template>
  <div class="hello">
   TestB

   <div @click="test">返回上一层</div>
   <span></span>
  </div>
</template>

<script>
    export default {
    name: 'HelloWorld',
    data () {
        return {
        }
    },
    mounted() {
    },
    methods:{
        test(){
            this.$router.go(-1)
        }
    }
}
</script>
<style scoped>
</style>
