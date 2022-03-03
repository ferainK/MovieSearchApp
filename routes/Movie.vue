<template>
    <h1>Movie!</h1>
</template>

<script>
export default {
    created(){
        this.$store.dispatch('moive/searchMoiveWithId',{
            id: this.$store.params.id
        })
    }
}
</script>