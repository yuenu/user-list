<script setup lang="ts">
import { inject, computed } from 'vue';
import type { Result } from '../types'
import UserStore from '../store'

defineProps<{ user: Result }>()

const store = inject('store', UserStore)
const isColumn = computed(() => store.getters.getDisplayType)
const isLoading = computed(() => store.getters.getIsLoading)


</script>

<template lang="pug">
div(:class="['w-full h-auto bg-gray cursor-pointer', isLoading && 'animate-pulse']")
  img(:src=" user.picture.large" :class="['object-cover w-full max-w-full', isColumn !== 'column' && 'h-[200px] w-[200px] mx-auto']")
  
</template>
