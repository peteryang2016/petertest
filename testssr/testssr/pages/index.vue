<template>
  <div class="container">
    首页
    <NuxtLink to="/posts">返回posts</NuxtLink>
    <br/>
    <NuxtLink to="/child/123">child123</NuxtLink>
    <br/>
    <NuxtLink to="/child/456">child456</NuxtLink>
    <NuxtLink to="/section">section</NuxtLink>

    <div style="background: yellow">
      <nuxt-child name="Section" />
    </div>

    <div style="background: red">
      <nuxt-child />
    </div>



  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
