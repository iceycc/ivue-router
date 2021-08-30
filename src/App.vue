<template>
  <div id="app">
    <ul>
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
    <router-view/>
<!--    {{ $route }}-->
  </div>
</template>
<script>
export default {
  name: "app"
}
</script>
