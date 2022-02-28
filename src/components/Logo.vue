<template>
  <RouterLink 
    to="/" 
    class="logo">
    <span>OMDbAPI</span>.COM
  </RouterLink>  
</template>

<style lang="scss" scoped>
@import "../scss/main.scss";
.logo{
  font-size: 25px;
  font-family: 'Oswald', sans-serif;
  color: $black;
  text-decoration: none;
  &:hover{
    color: $black;
  }
  span{
    color: $primary;
  }
}
</style>