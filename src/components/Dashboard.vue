<template>
    <div><barchart></barchart>

    <br>
    <CallAPI></CallAPI></div>
</template>

<script>
import barchart from './charts/Barchart';
import CallAPI from './CallAPI'

export default {
    components: {
        barchart,
        CallAPI,
    },    
}
</script>

<style scoped>

</style>