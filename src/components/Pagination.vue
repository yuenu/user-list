<script setup lang="ts">
import { inject, computed, ref } from 'vue';
import UserStore from '../store'
import { TOTAL_USER } from '../constant'

const store = inject('store', UserStore)

const perPage = computed(() => store.getters.getPerPage)
const currentPage = computed(() => store.getters.getCurrentPage)
const lastPage = computed(() => Math.ceil(TOTAL_USER / perPage.value))

const onPageClick =async (page: number) => {
  if(page < 1 || page > lastPage.value) return
  store.CHANGE_PAGE(page)
  await store.GET_USERS(perPage.value, currentPage.value)
}

</script>


<template lang="pug">
div(class="flex items-center justify-center gap-2 mt-5 mb-20 font-extrabold")
  div(class="px-3 py-2 border cursor-pointer bg-gray hover:bg-red-300" @click="onPageClick(currentPage - 1)") &lt;

  div(:class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === 1 && 'bg-cyan']" @click="onPageClick(1)") 1
  div(v-if="currentPage > 2" class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage - 2)") ...
  
  div(v-if="currentPage <= 2" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === 2 && 'bg-cyan']" @click="onPageClick(2)") 2
  div(v-if="currentPage <= 2" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === 3 && 'bg-cyan']" @click="onPageClick(3)") 3
  div(v-if="currentPage <= 2" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === 4 && 'bg-cyan']" @click="onPageClick(4)") 4
  div(v-if="currentPage <= 2" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === 5 && 'bg-cyan']" @click="onPageClick(5)") 5

  div(v-if="currentPage > 2 && currentPage < (lastPage - 1)" class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage - 1)") {{currentPage - 1}}
  div(v-if="currentPage > 2 && currentPage < (lastPage - 1)" class="px-3 py-2 border cursor-pointer bg-cyan" @click="onPageClick(currentPage)") {{currentPage}}
  div(v-if="currentPage > 2 && currentPage < (lastPage - 1)" class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 1)") {{currentPage + 1}}

  div(v-if="currentPage > 2 && currentPage < (lastPage - 1)" class="px-3 py-2 border cursor-pointer bg-gray" @click="onPageClick(currentPage + 2)") ...

  div(v-if="currentPage > (lastPage - 2)" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === lastPage - 3 && 'bg-cyan']" @click="onPageClick(lastPage - 3)") {{ lastPage - 3}}
  div(v-if="currentPage > (lastPage - 2)" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === lastPage - 2 && 'bg-cyan']" @click="onPageClick(lastPage - 2)") {{ lastPage - 2}}
  div(v-if="currentPage > (lastPage - 2)" :class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === lastPage - 1 && 'bg-cyan']" @click="onPageClick(lastPage - 1)") {{ lastPage - 1}}

  div(:class="['px-3 py-2 border cursor-pointer bg-gray', currentPage === lastPage && 'bg-cyan']" @click="onPageClick(lastPage)") {{lastPage}}

  div(class="px-3 py-2 border cursor-pointer bg-gray hover:bg-red-300" @click="onPageClick(currentPage + 1)") &gt;
  
</template>