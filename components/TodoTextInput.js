import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
    static propTypes = {
        onSave: PropTypes.func.isRequired,
        text: PropTypes.string,
        placeholder: PropTypes.string,
        editing: PropTypes.bool,
        newTodo: PropTypes.bool
    }

    constructor(props, context) {
        super(props, context)
        this.state = {
            text: this.props.text || ''
        }
    }

    handleSubmit(e) {
        const text = e.target.value.trim()
        // 当按下的是回车时
        if (e.which === 13) {
            // 保存
            this.props.onSave(text)
            // 如果为新doto，清空text
            if (this.props.newTodo) {
                this.setState({ text: '' })
            }
        }
    }

    // 当改变时，设置值
    handleChange(e) {
        this.setState({ text: e.target.value })
    }

    // 失去焦点
    handleBlur(e) {
        // 如果非新todo, 保存当前值
        if (!this.props.newTodo) {
            this.props.onSave(e.target.value)
        }
    }

    render() {
        return (
            <input className={
                classnames({
                    edit: this.props.editing,       // 是否编辑状态
                    'new-todo': this.props.newTodo  // 是否是新todo
                })}
                type="text"
                placeholder={this.props.placeholder}
                autoFocus="true"                    // 焦点锁定
                value={this.state.text}
                onBlur={this.handleBlur.bind(this)}
                onChange={this.handleChange.bind(this)}
                onKeyDown={this.handleSubmit.bind(this)} />
        )
    }
}

