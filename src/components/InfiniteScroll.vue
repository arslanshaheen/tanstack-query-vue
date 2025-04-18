<!-- src/components/InfiniteScroll.vue -->
<template>
    <div>
      <ul v-for="(page, index) in data?.pages" :key="index">
        <li v-for="user in page" :key="user.id" style="padding:10px; border:1px solid #ccc">
          <p>{{ user.login }}</p>
          <img :src="user.avatar_url" :alt="user.login" width="50" height="50" />
        </li>
      </ul>
  
      <div v-observe-visibility="onVisibilityChange" style="padding: 20px; text-align: center">
        <span v-if="isFetchingNextPage">Loading more...</span>
        <span v-else-if="hasNextPage">Scroll down to load more</span>
        <span v-else>No more users</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useInfiniteQuery } from '@tanstack/vue-query'
  import { fetchUsers } from '../api/fetchUsers'
//   import { useObservable } from '@vueuse/core'
  import { ref } from 'vue'
  
  const onVisibilityChange = (isVisible) => {
    if (isVisible && hasNextPage.value) {
      fetchNextPage()
    }
  }
  
  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    error,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    getNextPageParam: (lastPage, allPages) => {
        console.log(lastPage,allPages)
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    },
  })
  </script>
  
  <script>
  import ObserveVisibility from 'vue-observe-visibility'
  
  export default {
    directives: {
      ObserveVisibility,
    },
  }
  </script>
  