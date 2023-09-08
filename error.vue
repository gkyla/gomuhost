<script setup >
const props = defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
    <!--
        TODO:
        Add an error page. when entering the room If the ID is not found, it will show a dedicated error.
     -->

    <h1 class="text-2xl text-red-500">
    this is client side error, can be force by using fatal: true on createError fn
    </h1>
  <button @click="handleError">Clear errors</button>
</template>
