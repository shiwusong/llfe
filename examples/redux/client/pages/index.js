import React from 'react'
import { connect } from 'react-redux'
class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      input: ''
    }
  }
  add = () => {
    if (this.props.setTasks)
      this.props.setTasks([...this.props.tasks, this.state.input])
  }
  render() {
    let _t = []
    if (this.props.tasks.length)
      _t = this.props.tasks.map((t, i) => <div key={i}>{t}</div>)
    return (
      <div>
        {_t}
        <input
          onChange={e => {
            this.setState({ input: e.target.value })
          }}
        />
        <button onClick={this.add}>add</button>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  tasks: state.todo.tasks
})

const mapispatchToProps = dispatch => ({
  setTasks: states => dispatch({ type: 'todo/setTasks', infos: states })
})

export default connect(
  mapStateToProps,
  mapispatchToProps
)(Index)
