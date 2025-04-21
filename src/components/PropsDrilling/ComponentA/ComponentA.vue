<template>
    <ComponentB :message="message" />
  </template>
  
  <script setup>
  import ComponentB from './ComponentB/ComponentB.vue'
  
  defineProps(['message'])
  </script>
  