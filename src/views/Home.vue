<template>
  <div class="home">
    home
    <ul>
      <li>
        <router-link to="/home/a">home A</router-link>
      </li>
      <li>
        <router-link to="/home/b">home B</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name:'home'
}
</script>
