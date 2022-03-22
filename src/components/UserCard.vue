<script setup lang="ts">
import type { Result, ListDisplay } from '../types'

defineProps<{ 
  user: Result
  displayType: string
  isLoading: boolean
}>()
</script>

<template lang="pug">
div(:class="['w-full h-auto cursor-pointer', isLoading && 'animate-pulse', displayType === 'row' && 'flex flex-col sm:flex-row items-center justify-between w-full lg:w-1/2 mx-auto']")
  img(:src=" user.picture.large" :class="['object-cover w-full max-w-full', displayType !== 'column' && 'h-[200px] w-[200px]']")
  span(v-if="displayType === 'row'" class="text-3xl") {{ user.name.first }}  {{ user.name.last }}
  
</template>
