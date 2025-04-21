<template>
    <ComponentC :message="message" />
  </template>
  
  <script setup>
  import ComponentC from './ComponentC/ComponentC.vue'
  
  defineProps(['message'])
  </script>
  