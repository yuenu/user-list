<script setup lang="ts">
import { provide, onMounted } from 'vue'
import Header from './components/Header.vue';
import UserList from './components/UserList.vue'
import Pagination from './components/Pagination.vue'
import store, { memorizedPerPage, memorizedCurrentPage } from './store'


onMounted (async () => {
  provide('store', store)
  await store.GET_USERS(memorizedPerPage, memorizedCurrentPage)
})

</script>

<template lang="pug">
div(class="min-h-screen mx-auto max-w-7xl")
  <Header />
  <UserList />
  <Pagination />
</template>
