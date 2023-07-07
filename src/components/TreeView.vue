<template>
	<div>
		<div v-for="(department, index) in departments"
			 :key="index"
		>
			<div class="flex justify-between">
				<div class="flex gap-1">
					<div v-if="department.children.length"
						 @click="toggleShowChildren(department)"
						 class="hover:cursor-pointer"
					>
						<span>{{ showChildren[department.department_id] ? '-' : '+' }}</span>
					</div>
					<label :for="department.department_id">
						{{ department.department_name }} (<span class="italic">{{ department.department_id }}</span>)
					</label>
				</div>
				<input type="checkbox"
					   :id="department.department_id"
					   v-model="department.selected"
					   @change.prevent="checkChanged(department)"
					   :indeterminate.prop="department.triState"
				/>
			</div>
			<div v-if="department.showChildren"
				 class="ml-6"
			>
				<TreeView :prop-departments="department.children"
						  :modelValue="selectedIds"
						  @update:modelValue="checkChanged"
				/>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	model: {
		prop: 'modelValue',
		event: 'update:modelValue'
	},
	props: {
		propDepartments: {
			type: Array,
			required: true
		},
		modelValue: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			departments: [],
			showChildren: {},
			selectedIds: this.modelValue
		}
	},
	mounted() {
		this.departments = this.propDepartments

		this.departments.forEach(department => this.initialize(department))
	},
	methods: {
		initialize(parent) {
			parent.selected = this.modelValue.includes(parent.department_id)

			const childrenCount = parent.children.length

			if (childrenCount) {
				parent.children.forEach(item => this.initialize(item))

				const selectedChildrenCount = parent.children.filter(item => item.selected).length
				const triStateChildrenCount = parent.children.filter(item => item.triState).length

				// set checkbox tri-state and show children
				parent.triState = parent.showChildren = false

				if (
					(selectedChildrenCount > 0 && selectedChildrenCount !== childrenCount) ||
					triStateChildrenCount
				) {
					parent.triState = true

					parent.showChildren = true
				}
			}
		},
		setSelectedIds(parent) {
			if (parent.selected || parent.triState) {
				this.selectedIds.push(parent.department_id)
			}

			// search selected recursively
			if (parent.children.length) {
				parent.children.forEach(item => this.setSelectedIds(item))
			}
		},
		updateSelected(department, status) {
			if (status) {
				department.triState = false
			}

			department.selected = status

			// update status recursively
			if (department.children.length) {
				department.children.forEach(item => this.updateSelected(item, status))
			}
		},
		updateTriState(department) {
			const childrenCount = department.children.length

			if (childrenCount) {
				department.children.forEach(item => this.updateTriState(item))

				const selectedChildrenCount = department.children.filter(item => item.selected).length
				const triStateChildrenCount = department.children.filter(item => item.triState).length

				department.triState = false

				if (
					(selectedChildrenCount > 0 && selectedChildrenCount !== childrenCount) ||
					triStateChildrenCount
				) {
					department.triState = true
					department.selected = false
				}

				if (!selectedChildrenCount) {
					department.selected = false
				}

				if (selectedChildrenCount === childrenCount) {
					department.selected = true
				}
			}
		},
		toggleShowChildren(department) {
			department.showChildren = !department.showChildren

			this.$forceUpdate()
		},
		checkChanged(department) {
			this.selectedIds = []

			// update children selected status
			if (department?.children?.length) {
				department.children.forEach(item => this.updateSelected(item, department.selected))
			}

			// update tristate and parent status
			this.departments.forEach(department => this.updateTriState(department))

			this.departments.forEach(department => this.setSelectedIds(department))

			this.$emit('update:modelValue', this.selectedIds)
		}
	}
}
</script>