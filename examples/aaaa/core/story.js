import React from 'react'
export const context = React.createContext()
export const Provider = context.Provider
export const connect = Com => {
	return props => (
		<context.Consumer>
			{value => {
				return <Com value={value} {...props} />
			}}
		</context.Consumer>
	)
}

const GlobalContext = {}
export const createStory = modules => {
	if (!modules) throw new Error('No story params!')

	Object.entries(modules).forEach(([name, module]) => {
		// 1. mounting state
		GlobalContext[name] = GlobalContext[name] || {}
		if (!module.state || typeof module.state != 'function') throw new Error(`[${name}] has no state function`)
		GlobalContext[name].state = module.state()
		// 2. mounting mutations
		if (module.mutations) {
		}
	})
}
