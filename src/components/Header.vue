<script setup lang="ts">
import { inject, ref, watch  } from 'vue';
import UserStore from '../store'
import DisplayColumnIcon from '../assets/icon/DisplayColumn.vue';
import DisplayRowIcon from '../assets/icon/DisplayRow.vue';

const store = inject('store', UserStore)
const selected = ref<10 | 30 | 50>(30)

watch(selected, async (newSelected, _oldSelected) => {
  store.CHANGE_PER_PAGE(newSelected)
  await store.GET_USERS(newSelected)
})
</script>

<template lang="pug">
header(class="flex justify-end w-full p-10")
	div(class="flex items-center w-ful gap-x-3")
		select(class="p-2 border rounded-sm border-gray" v-model="selected")
			option(value="10") 10
			option(value="30") 30
			option(value="50") 50


		div(class="space-x-0")
			<DisplayColumnIcon :class="[store.getters.getDisplayType === 'column' && 'bg-red-300','cursor-pointer']" @click="store.SWITCH_DISPLAY_TYPE('column')" />
			<DisplayRowIcon :class="[store.getters.getDisplayType === 'row' && 'bg-red-300','cursor-pointer']" @click="store.SWITCH_DISPLAY_TYPE('row')" />
		
</template>


<style scoped>
svg {
	width: 40px;
	height: 40px;
	display: inline-block;
	padding:10px;
	fill: #4399e4;
}
</style>