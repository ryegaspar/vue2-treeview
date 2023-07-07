<template>
	<div id="app">
		<div class="border border-gray-800/50 w-80 p-4">
			<h2 class="font-bold">Tree View</h2>
			<TreeView :propDepartments="mockData"
					  v-model="selected"
			/>
		</div>
		<div>
			SELECTED IDs: {{ selected }}
		</div>
	</div>
</template>

<script>
import mockData from "@/mock-data"

export default {
	name: 'App',
	data() {
		return {
			selected: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			mockData
		}
	}
}
</script>
