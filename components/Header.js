import React, { PropTypes, Component } from 'react'
import TodoTextInput from './TodoTextInput'

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }
 // 保存方法 handle打头
  handleSave(text) {
    if (text.length !== 0) {
      this.props.addTodo(text)
    }
  }

  render() {
      //  传入newTodo 属性  onSave on 打头
    return (
      <header className="header">
          <h1>todos</h1>
          <TodoTextInput newTodo={true}
                         onSave={::this.handleSave}
                         placeholder="What needs to be done?" />
      </header>
    )
  }
}
