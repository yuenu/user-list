<script setup lang="ts">
import { inject, ref, watch, computed  } from 'vue';
import UserStore from '../store'
import ColumnIcon from '../assets/icon/Column.vue';
import RowIcon from '../assets/icon/Row.vue';

const store = inject('store', UserStore)
const displayType = computed(() => store.getters.getDisplayType)
const selected = ref(store.getters.getPerPage)

watch(selected, async (newSelected, _oldSelected) => {
  await store.GET_USERS(newSelected)
})

</script>

<template lang="pug">
header(class="flex items-center justify-between w-full p-4 sm:p-10")
	span(class="relative inline-block text-xl sm:text-2xl md:text-5xl lg:text-6xl before:block before:absolute before:-inset-1 before:-skew-y-2 before:bg-pink-500")
		span(class="relative text-white") FOUND RANDOM
	//- div(class="text-xl sm:text-2xl md:text-5xl lg:text-6xl before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500")
	div(class="flex items-center w-ful gap-x-3")
		div(id='select')
			select(class="p-2 border rounded-sm border-gray" v-model="selected")
				option(value="10") 10
				option(value="30") 30
				option(value="50") 50


		div(class="space-x-0")
			<ColumnIcon :class="[displayType === 'column' && 'bg-red-300','cursor-pointer']" @click="store.SWITCH_DISPLAY_TYPE('column')" />
			<RowIcon :class="[displayType === 'row' && 'bg-red-300','cursor-pointer']" @click="store.SWITCH_DISPLAY_TYPE('row')" />
		
</template>


<style scoped lang="scss">
svg {
	width: 40px;
	height: 40px;
	display: inline-block;
	padding:10px;
	fill: #4399e4;
}

select {
	appearance: none;
	padding-right:30px;
}

#select {
	position:relative;

	&::before,
	&::after {
		content: "";
		position:absolute;
		border-left: 4px solid transparent;
    border-right: 4px solid transparent;
		right: 10px;
	}

	&::before {
		top: 16px;
    border-bottom: 4px solid black;
	}

	&::after {
		border-top: 4px solid black;
		top: 24px;
	}
}
</style>