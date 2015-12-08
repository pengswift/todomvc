import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    markTodo: PropTypes.func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    // 默认编辑状态
    this.state = {
      editing: false
    }
  }
   
  // 双击事件
  handleDoubleClick() {
    this.setState({ editing: true })
  }

  // 保存，传入 id 和 text
  handleSave(id, text) {
    // 如果没有内容, 则删除
    if (text.length === 0) {
      this.props.deleteTodo(id)
    } else {
      // 否则，保存
      this.props.editTodo(id, text)
    }
    // 重置编辑状态
    this.setState({ editing: false })
  }

  render() {
    // 获取todo 任务, 完成方法， 删除方法
    const { todo, markTodo, deleteTodo } = this.props

    let element
    // 如果处于编辑状态
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       editing={this.state.editing}
                       onSave={(text) => this.handleSave(todo.id, text)} />
      )
    } else {
      // 非编辑状态
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.marked}
                 onChange={() => markTodo(todo.id)} />
          <label onDoubleClick={::this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => deleteTodo(todo.id)} />
        </div>
      );
    }

    return (
      <li className={classnames({
        completed: todo.marked,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  }
}
