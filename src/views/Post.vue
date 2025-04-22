<template>
    <section class="section-form">
      <FormComponent
        :data="data"
        :setData="setData"
        :updateApiData="updateApiData"
        :setUpdateApiData="setUpdateApiData"
      />
    </section>
  
    <section class="section-post">
      <ol>
        <li v-for="post in data" :key="post.id" class="post-item">
          <p><strong>Title:</strong> {{ post.title }}</p>
          <p><strong>Body:</strong> {{ post.body }}</p>
          <button @click="handleOnClickUpdate(post)">Edit</button>
          <button class="btn-delete" @click="handleOnClickDeletePost(post.id)">Delete</button>
        </li>
      </ol>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import { getPost, postDelete } from '@/api/PostApi'
  import FormComponent from '@/components/Form/FormComponent.vue'
  
  const data = ref([])
  const updateApiData = ref({})
  
  // GET posts
  const getPostData = async () => {
    try {
      const res = await getPost()
      console.log("Total posts fetched:", res.data.length)
      if (res.status === 200) {
        data.value = res.data
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  onMounted(() => {
    getPostData()
  })
  
  // DELETE post
  const handleOnClickDeletePost = async (id) => {
    try {
      const res = await postDelete(id)
      if (res.status === 200) {
        data.value = data.value.filter((post) => post.id !== id)
      }
    } catch (err) {
      console.error(err)
    }
  }
  
  // Update click
  const handleOnClickUpdate = (post) => {
    updateApiData.value = { ...post }
  }
  
  const setData = (newData) => {
    data.value = newData
  }
  const setUpdateApiData = (newData) => {
    updateApiData.value = newData
  }
  </script>
  
  <style scoped>
  .section-post {
    max-height: 500px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 1rem;
    margin-top: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  .post-item {
    margin-bottom: 1rem;
    border-bottom: 1px solid #ddd;
    padding-bottom: 0.5rem;
  }
  button {
    margin-right: 0.5rem;
    padding: 0.3rem 0.7rem;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;
  }
  .btn-delete {
    background-color: #dc3545;
  }
  button:hover {
    opacity: 0.8;
  }
  </style>
  