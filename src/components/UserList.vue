<script setup lang="ts">
import { inject, computed,ref, Teleport, onMounted  } from 'vue';
import type { Result } from '../types'
import UserStore from '../store'
import UserCard from './UserCard.vue';
import Modal from './Modal.vue';
import Skeletion from './Skeleton.vue'

const store = inject('store', UserStore)
const response = computed(() => store.getters.getResponseData)
const displayType = computed(() => store.getters.getDisplayType)
const isLoading = computed(() => store.getters.getIsLoading)

const UserInfo = ref<Result>()
const isModalOpen = ref(false)
const onUserClick = (user: Result) => {
  UserInfo.value = user
  isModalOpen.value = true
}

const closeModal = () => isModalOpen.value = false

</script>

<template lang="pug">
div(:class="['grid gap-4 px-4', displayType === 'column' ? 'grid-cols-2  md:grid-cols-4 lg:grid-cols-5' : ' grid-cols-1']")
  <Skeletion v-if="isLoading"  v-for="index in 10" :key="index" />
  <UserCard v-else  v-for="user in response" :user="user" :displayType="displayType" :isLoading="isLoading" :key="user.id.value" @click="onUserClick(user)" />

<Teleport to="#modals">
  <Modal v-if="isModalOpen && UserInfo" :user="UserInfo" @closeModal="closeModal" />
</Teleport>

</template>
