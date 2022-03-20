<script setup lang="ts">
import { inject, computed, watch } from 'vue';
import UserStore from '../store'

const store = inject('store', UserStore)
const TOTAL = 3010

const perPage = computed(() => store.getters.getPerPage)
const currentPage = computed(() => store.getters.getCurrentPage)

const onPageClick =async (page: number) => {
  store.CHANGE_PAGE(page)
  await store.GET_USERS(perPage.value, currentPage.value)
}

// watch(perPage, (newPerPage, oldPerPage) => {
//   console.log(newPerPage, oldPerPage)
// })


</script>


<template lang="pug">
div(class="flex items-center justify-center gap-2 mt-5 mb-20 font-extrabold")
  div(class="px-3 py-2 border cursor-pointer bg-gray hover:bg-red-300" @click="onPageClick(currentPage - 1)") &lt;
  div(class="px-3 py-2 border cursor-pointer bg-cyan") {{currentPage}}
  div(class="px-3 py-2 border cursor-pointer bg-gray") ...
  div(class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 4)") {{currentPage + 4}}
  div(class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 5)") {{currentPage + 5}}
  div(class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 6)") {{currentPage + 6}}
  div(class="px-3 py-2 border cursor-pointer bg-gray") ...
  div(class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 9)") {{currentPage + 9}}
  div(class="px-3 py-2 border cursor-pointer bg-gray hover:bg-red-300" @click="onPageClick(currentPage + 1)") &gt;
  
</template>