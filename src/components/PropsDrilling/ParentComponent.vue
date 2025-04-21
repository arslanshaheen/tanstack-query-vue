<template>
    <ComponentA :message="greeting" />
  </template>
  
  <script setup>
  import ComponentA from './ComponentA/ComponentA.vue'
  //props drillings
  const greeting = 'Hello from Parent pass as props !'
  </script>
  