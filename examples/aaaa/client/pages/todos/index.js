import React from 'react'
import { Button, Input, Row, Col } from 'antd'
import Layout from '../../Layout/Layout'
import { connect } from '../../sw-store'
class Todos extends React.Component {
	constructor() {
		super()
		this.state = {
			task: '',
		}
	}
	render() {
		const { tasks, addTasks } = this.props
		const todoItem = tasks.map((v, index) => <div key={index}>{v}</div>)
		return (
			<Layout>
				<h1>这是一个Todos 的 Demo</h1>
				{todoItem}
				<Row>
					<Col span={4}>
						<Input
							placeholder="input task"
							onChange={e => {
								this.setState({ task: e.target.value })
							}}
						/>
					</Col>
				</Row>

				<Button
					type="primary"
					onClick={() => {
						addTasks({ new_tasks: this.state.task })
					}}
				>
					add
				</Button>
			</Layout>
		)
	}
}
export default connect(
	states => ({
		tasks: states.todo.tasks,
	}),
	dispatchers => ({
		addTasks: dispatchers.todo.addTasks,
	})
)(Todos)
