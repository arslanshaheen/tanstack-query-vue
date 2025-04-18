<template>
      <div>
    <ion-list>
      <div v-for="(page, index) in data?.pages" :key="index">
        <ion-item v-for="item in page.pageData" :key="item.login.uuid">
          <ion-label>{{ item.email }}</ion-label>
        </ion-item>
      </div>
    </ion-list>
  
    <ion-button @click="nextPage" :disabled="isFetching" v-if="hasNextPage">
      {{ isFetching ? "Loading..." : "Load More Data" }}
    </ion-button>
  
    <ion-spinner v-if="isLoading"></ion-spinner>
</div>
  </template>
  
  <script setup>
  import {
    IonItem,
    IonLabel,
    IonList,
    IonButton,
    IonSpinner
  } from "@ionic/vue";
  
  import { useInfiniteQuery } from "@tanstack/vue-query";
  
  const peopleFetcher = async ({ pageParam = 1 }) => {
    const response = await fetch(
      `https://randomuser.me/api/?page=${pageParam}&results=10&seed=abc`
    );
    const data = await response.json();
  
    // Fake delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
  
    return {
      pageData: data.results || [],
      cursor: pageParam === 3 ? undefined : pageParam + 1,
    };
  };
  
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading
  } = useInfiniteQuery({
    queryKey: ["people"],
    queryFn: peopleFetcher,
    getNextPageParam: (lastPage) => lastPage.cursor,
  });
  
  const nextPage = () => {
    fetchNextPage();
  };
  </script>
  