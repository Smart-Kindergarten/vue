<template>
  <div id="app">
    <router-view></router-view>
  </div>

</template>

<script>
  import "./assets/css/VueAll.css"
  import dududu from './components/dududu'
  import Index from './components/view/Index'
  import Login from './components/view/Login'
export default {
  name: 'App',
  components:{dududu: dududu,Index : Index,Login : Login},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
