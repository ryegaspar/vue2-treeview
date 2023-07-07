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
			selected: [2, 3, 10, 11, 24, 29, 30],
			mockData
		}
	}
}
</script>
