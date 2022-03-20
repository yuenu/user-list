<script setup lang="ts">
import { inject, computed } from 'vue';
import UserStore from '../store'
import UserCard from './UserCard.vue';

const store = inject('store', UserStore)
const response = computed(() => store.getters.getResponseData)
const displayType = computed(() => store.getters.getDisplayType)

</script>

<template lang="pug">
div(:class="['grid gap-4', displayType === 'column' ? ' grid-cols-5' : ' grid-cols-1']")
  <UserCard  v-for="card in response" :user="card" />
  
</template>
