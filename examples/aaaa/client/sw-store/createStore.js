const GlobalState = {}
const GlobalDispatchers = {}
let listener = () => {}
let subscribe = func => {
	listener = func
}
let GlobalCommit = () => {}
let GlobalDispatcher = () => {}
let getStore = () => ({ state: GlobalState, dispatchers: GlobalDispatchers })
// const files = require.context('../', true, /^\.\/(?!-)[^.]+\.(js)$/)
// const filenames = files.keys()
// console.log(filenames)

// export default stores => {
// 	Object.entries(stores).forEach(([storeKey, store]) => {
// 		GlobalState[storeKey] = {}
// 		GlobalDispatchers[storeKey] = {}
// 		const { state, dispatchers } = store
// 		Object.entries(state).forEach(([key, value]) => {
// 			GlobalState[storeKey][key] = value
// 		})
// 		Object.entries(dispatchers).forEach(([key, func]) => {
// 			GlobalDispatchers[storeKey][key] = infos => {
// 				func(
// 					{
// 						state: GlobalState[storeKey],
// 						commit: GlobalCommit,
// 						dispatcher: GlobalDispatcher,
// 					},
// 					infos
// 				)
// 				listener()
// 			}
// 		})
// 	})
// 	return {
// 		subscribe,
// 		getStore,
// 	}
// }
export default (namespace, store) => {
	if (!namespace) {
		return {
			subscribe,
			getStore,
		}
	}
	// 去除首位'.'
	if (namespace.charAt(0) === '.') {
		namespace = namespace.slice(1)
	}
	// 去除后缀名
	namespace = namespace.replace('.js', '')
	let _namespaces = namespace.split('/')
	let _state = GlobalState
	let _dispatcher = GlobalDispatchers
	_namespaces.forEach((module, index) => {
		// 去除空串
		if (module === '') return
		// 迭代对象
		if (!_state[module]) {
			_state[module] = {}
		}
		_state = _state[module]
		if (!_dispatcher[module]) {
			_dispatcher[module] = {}
		}
		_dispatcher = _dispatcher[module]

		if (index !== _namespaces.length - 1) return

		const { state, dispatchers } = store
		Object.entries(state).forEach(([key, value]) => {
			_state[key] = value
		})
		Object.entries(dispatchers).forEach(([key, func]) => {
			_dispatcher[key] = infos => {
				func(
					{
						state: _state,
						commit: GlobalCommit,
						dispatcher: GlobalDispatcher,
					},
					infos
				)
				listener()
			}
		})
	})
	return {
		subscribe,
		getStore,
	}
}
