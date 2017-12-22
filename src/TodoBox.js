import React, { Component } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
        this.loadTodosFromServer = this.loadTodosFromServer.bind(this);
        this.handleTodoSubmit = this.handleTodoSubmit.bind(this);
        this.handleTodoDelete = this.handleTodoDelete.bind(this);
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    }
    loadTodosFromServer() {
        axios.get(this.props.url)
            .then(res => {
                this.setState({ data: res.data });
            })
    }
    handleTodoSubmit(todo) {
        let todos = this.state.data;
        todo.id = Date.now();
        let newTodos = todos.concat([todo]);
        this.setState({ data: newTodos });
        axios.post(this.props.url, todo)
            .catch(err => {
                console.error(err);
                this.setState({ data: todos });
            });
    }
    handleTodoDelete(id) {
        axios.delete(`${this.props.url}/${id}`)
            .then(res => {
                console.log('Todo deleted');
            })
            .catch(err => {
                console.error(err);
            });
    }
    handleTodoUpdate(id, todo) {
       
        axios.put(`${this.props.url}/${id}`, todo)
            .catch(err => {
                console.log(err);
            })
    }
    componentDidMount() {
        this.loadTodosFromServer();
        setInterval(this.loadTodosFromServer, this.props.pollInterval);
    }
    render() {
        return (
            <div >
                <nav className="navbar navbar-light bg-light">
                    <a className="navbar-brand" href="#">
                        <img src="soal.jpg" width="100" height="50" alt=""/>
                    </a>
                </nav>
                <div className="container">
                <h2 className="text-center">Todo's:</h2>
                <TodoForm onTodoSubmit={ this.handleTodoSubmit }/>
                <TodoList
                    onTodoDelete={ this.handleTodoDelete }
                    onTodoUpdate={ this.handleTodoUpdate }
                    data={ this.state.data }/>
                </div>

            </div>
        )
    }
}
export default TodoBox;