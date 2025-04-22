<template>
  <form @submit.prevent="handleFormSubmit" class="form-container">
    <div class="form-group">
      <label for="title">Title</label>
      <input
        type="text"
        id="title"
        v-model="addData.title"
        placeholder="Add title"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="body">Body</label>
      <input
        type="text"
        id="body"
        v-model="addData.body"
        placeholder="Add body"
        autocomplete="off"
      />
    </div>

    <button type="submit" :value="isEditMode ? 'Edit' : 'Add'">
      {{ isEditMode ? "Edit" : "Add" }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { postCreate, updatePost } from '@/api/PostApi'

const props = defineProps({
  data: Array,
  setData: Function,
  updateApiData: Object,
  setUpdateApiData: Function,
})

const addData = ref({
  title: '',
  body: ''
})

const isEditMode = computed(() => Object.keys(props.updateApiData).length > 0)

watch(
  () => props.updateApiData,
  (newVal) => {
    addData.value.title = newVal.title || ''
    addData.value.body = newVal.body || ''
  },
  { immediate: true, deep: true }
)

const addPostData = async () => {
  const res = await postCreate(addData.value)
  if (res.status === 201) {
    props.setData([...props.data, res.data])
    resetForm()
  }
}

const updatePostApiData = async () => {
  const res = await updatePost(props.updateApiData.id, addData.value)
  if (res.status === 200) {
    const updatedList = props.data.map((post) =>
      post.id === res.data.id ? res.data : post
    )
    props.setData(updatedList)
    resetForm()
    props.setUpdateApiData({})
  }
}

const resetForm = () => {
  addData.value.title = ''
  addData.value.body = ''
}

const handleFormSubmit = (e) => {
  const action = e.submitter.value
  if (action === 'Add') {
    addPostData()
  } else {
    updatePostApiData()
  }
}
</script>

<style scoped>
/* 🔷 Form Container */
.form-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 1.5rem;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

/* 🔹 Input Group Styling */
.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}

/* 🔸 Label Styling */
label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

/* 🟢 Input Styling */
input {
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
}

/* 🟣 Button Styling */
button {
  background-color: #007bff;
  color: white;
  padding: 0.7rem 1.2rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3;
}
</style>
