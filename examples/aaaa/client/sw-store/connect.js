import React, { component, PureComponent } from 'react'
import { Consumer } from './context'
export default (mapStateToProps, mapDispatchToProps) => {
	return Comp => {
		return props => (
			<Consumer>
				{context => {
					console.log(context)
					const { state, dispatchers } = context
					return <Comp {...props} {...mapStateToProps(state)} {...mapDispatchToProps(dispatchers)} />
				}}
			</Consumer>
		)
	}
}
