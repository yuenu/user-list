<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CloseIcon from '../assets/icon/Close.vue'
import type { Result } from '../types'

defineProps<{ user: Result }>()
const emit = defineEmits(['closeModal'])


const ModalEl = ref<HTMLDivElement | null>(null)

onMounted(() => {
  ModalEl.value?.addEventListener('click', (e: Event) => {
    e.preventDefault()
    if((e.target as Element).id === 'defaultModal') emit('closeModal')
  })
})
</script>

<template lang="pug">
div(id="defaultModal" ref="ModalEl" class="fixed inset-0 z-10 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/50 h-modal md:h-full md:inset-0")
  div(class="modal-content relative bg-white md:max-w-[600px] w-11/12 md:w-full h-auto rounded-lg")
    <CloseIcon @click="emit('closeModal')" class="absolute bg-black rounded-full cursor-pointer w-7 h-7 -top-2 -right-2 fill-white" />
    div(class="flex flex-col gap-4 md:flex-row")
      img(:src="user.picture.large" class="rounded-t-lg md:rounded-t-none md:rounded-l-lg  md:h-[300px]")
      div(class="px-5 mb-4 space-y-1 md:flex md:justify-center md:flex-col md:mb-0 md:px-3")
        p Gender : {{user.gender}}
        p Name : {{ user.name.first }} {{ user.name.last}}
        p Email : {{ user.email }}
        p Phone : {{ user.phone}}
        p Location : {{ user.location.street.number }} {{ user.location.street.name}}, {{ user.location.city}}, {{ user.location.country}}
</template>