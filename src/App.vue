<!-- <template>
  <ion-app>
    <ion-content class="ion-padding">
      <ion-segment value="paging" @ionChange="changed" :modelValue="activeSegment">
        <ion-segment-button value="paging">
          <ion-label>Paging</ion-label>
        </ion-segment-button>
        <ion-segment-button value="infinite">
          <ion-label>Infinite</ion-label>
        </ion-segment-button>
      </ion-segment>
      <ExampleInfinite  v-if="activeSegment ==='infinite'"/>
      <ExamplePaging v-if="activeSegment ==='paging'"/>
      <parentComponent/>
    </ion-content>
  </ion-app> 
</template>

<script  setup>
// import { IonApp, IonContent, IonSegment, IonLabel,IonSegmentButton } from "@ionic/vue";
// import {ref} from 'vue';

// import ExampleInfinite from "./components/ExampleInfinite.vue";
// import ExamplePaging from "./components/ExamplePaging.vue";
// import parentComponent from "./components/PropsDrilling/ParentComponent.vue"
// const activeSegment = ref('paging')
// const changed = ({detail}) => {
//   activeSegment.value = detail.value
// }
</script> -->

<template>
<Post/>
</template>
<script setup>
import Post from './views/Post.vue';



</script>