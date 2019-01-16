import { createStore } from '.'
export default () => {
	const files = require.context('../store', true, /^\.\/(?!-)[^.]+\.(js)$/)
	let store = createStore()
	files.keys().forEach(filename => {
		store = createStore(filename, files(filename))
	})
	return store
}
