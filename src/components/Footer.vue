<template>
  <footer>
    <Logo/>
    <a 
      href="https://github.com/ferinaK"
      target="_blank">
        copyright &copy; {{new Date().getFullYear()}} ferain <br>
    </a>
    All Rights Reserved.
  </footer>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components:{
    Logo
  }
}
</script>

<style lang="scss" scoped>
footer{
  padding: 70px 0;
  text-align: center;
  opacity: .3;
  .logo{
    display: block;
    margin-bottom: 10px;
  }
}
</style>