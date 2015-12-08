import React, { PropTypes, Component } from 'react';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_MARKED, SHOW_UNMARKED } from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_UNMARKED]: 'Active',
  [SHOW_MARKED]: 'Completed'
}

export default class Footer extends Component {
  static propTypes = {
    markedCount: PropTypes.number.isRequired,
    unmarkedCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearMarked: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  }
  // 渲染todo个数
  renderTodoCount() {
    // 获取活动的todo
    const { unmarkedCount } = this.props
    const itemWord = unmarkedCount === 1 ? 'item' : 'items'

    // 有活跃, 显示个数，否则显示No 
    return (
      <span className="todo-count">
        <strong>{unmarkedCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  // 渲染过滤条件
  renderFilterLink(filter) {
    // 获取要显示的标题
    const title = FILTER_TITLES[filter]

    // 获取当前选择filter 和 onShow func 
    const { filter: selectedFilter, onShow } = this.props

    // 如果匹配上传入的filter, 则selected 显示
    // 指定手势图标
    // 绑定onShow 方法
    return (
      <a className={classnames({ selected: filter === selectedFilter })}
         style={{ cursor: 'hand' }}
         onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  // 渲染清除按钮
  renderClearButton() {
    // 传入 完成的数量 和 清除的方法
    const { markedCount, onClearMarked } = this.props
    if (markedCount > 0) {
      return (
        <button className="clear-completed"
                onClick={onClearMarked} >
          Clear completed
        </button>
      )
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[ SHOW_ALL, SHOW_UNMARKED, SHOW_MARKED ].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}

