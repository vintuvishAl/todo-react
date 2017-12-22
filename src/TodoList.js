import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {
    render() {
        let todoNodes = this.props.data.map(todo => {
            return (
                <Todo
                    title={ todo.title }
                    uniqueID={ todo['_id'] }
                    onTodoDelete={ this.props.onTodoDelete }
                    onTodoUpdate={ this.props.onTodoUpdate }
                    key={ todo['_id'] }>
                    { todo.text }
                </Todo>
            )
        });
        return (
            <div>
                { todoNodes }
            </div>
        )
    }
}
export default TodoList;