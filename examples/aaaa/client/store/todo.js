module.exports = {
	state: {
		tasks: ['default'],
	},
	dispatchers: {
		addTasks: ({ state }, { new_tasks }) => {
			state.tasks.push(new_tasks)
		},
	},
}
