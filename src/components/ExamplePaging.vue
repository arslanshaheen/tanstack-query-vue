<template>
    <div>
      <div v-if="isLoading && !data">
        <h1><ion-loading /></h1>
      </div>
      <div v-else>
        <p>Current Page: {{ page }}</p>
  
        <ion-button @click="prevPage" :disabled="isFetching || page === 1">
          {{ isFetching ? "Loading..." : "Prev Page" }}
        </ion-button>
  
        <ion-button @click="nextPage" :disabled="isFetching">
          {{ isFetching ? "Loading..." : "Next Page" }}
        </ion-button>
  
        <ion-list>
          <ion-item v-for="item in data" :key="item.login.uuid">
            <ion-label>{{ item.email }}</ion-label>
          </ion-item>
        </ion-list>
      </div>
    </div>
  </template>
  
  <script setup>
  import { IonItem, IonLabel, IonList, IonButton, IonLoading } from "@ionic/vue";
  import { ref } from "vue";
  import { useQuery } from "@tanstack/vue-query";
  
  // Page number state
  const page = ref(1);
  
  // Fetch data for the given page
  const peopleFetcher = async () => {
    const response = await fetch(
      `https://randomuser.me/api/?page=${page.value}&results=20&seed=abc`
    );
    const data = await response.json();
  
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return data.results || [];
  };
  
  // Vue Query for fetching paginated data
  const { isLoading, isError, data, error, isFetching, isPreviousData } = useQuery({
    queryKey: ["people", page],
    queryFn: peopleFetcher,
    keepPreviousData: true,
  });
  
  // Next page
  const nextPage = () => {
    if (!isPreviousData.value) {
      page.value++;
    }
  };
  
  // Previous page
  const prevPage = () => {
    page.value = Math.max(page.value - 1, 1);
  };
  </script>
  