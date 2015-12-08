import React, { Component, PropTypes } from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters'

// SHOW 方法映射
const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_UNMARKED]: todo => !todo.marked,
  [SHOW_MARKED]: todo => todo.marked
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context)
    // 默认状态是show_all
    this.state = { filter: SHOW_ALL }
  }

  // 清除已完成的 
  handleClearMarked() {
    // 如果有一个已完成
    const atLeastOneMarked = this.props.todos.some(todo => todo.marked);
    if (atLeastOneMarked) {
      this.props.actions.clearMarked();
    }
  }

  // 设置filter
  handleShow(filter) {
    this.setState({ filter })
  }

  // 渲染勾选所有
  renderToggleAll(markedCount) {
    const { todos, actions } = this.props
    // 如果有todo, 则设置
    if (todos.length > 0) {
      return (
        <input className="toggle-all"
               type="checkbox"
               checked={markedCount === todos.length}
               onChange={actions.markAll} />
      )
    }
  }

  // 渲染尾部
  renderFooter(markedCount) {
    const { todos } = this.props
    const { filter } = this.state

    // 计算存活的数量
    const unmarkedCount = todos.length - markedCount

    if (todos.length) {
      return (
        <Footer markedCount={markedCount}
                unmarkedCount={unmarkedCount}
                filter={filter}
                onClearMarked={::this.handleClearMarked}
                onShow={::this.handleShow} />
      )
    }
  }

  render() {
    const { todos, actions } = this.props
    const { filter } = this.state

    // 过滤todo
    const filteredTodos = todos.filter(TODO_FILTERS[filter])
    // 计算完成的总数
    const markedCount = todos.reduce((count, todo) =>
      todo.marked ? count + 1 : count,
      0
    )

    return (
      <section className="main">
        {this.renderToggleAll(markedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions} />
          )}
        </ul>
        {this.renderFooter(markedCount)}
      </section>
    )
  }
}
