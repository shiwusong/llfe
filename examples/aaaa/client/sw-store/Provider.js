import React, { PureComponent, Children } from 'react'
import { Provider } from './context'

export default class EnhancedProvider extends PureComponent {
	constructor(props) {
		super(props)
		const { store } = props
		this.state = {
			store: store.getStore(),
		}
		store.subscribe(() => {
			this.setState({
				store: store.getStore(),
			})
		})
	}
	render() {
		return <Provider value={this.state.store}>{Children.only(this.props.children)}</Provider>
	}
}
