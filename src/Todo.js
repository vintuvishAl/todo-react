import React, { Component } from 'react';
import marked from 'marked';
class Todo extends Component {
    constructor(props) {
        super(props);
        this.state= {
            toBeUpdated: false,
            title: '',
        text: ''
    };

        this.deleteTodo = this.deleteTodo.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTodoUpdate = this.handleTodoUpdate.bind(this);
    }
    updateTodo(e) {
        e.preventDefault();

        this.setState({ toBeUpdated: !this.state.toBeUpdated });
    }
    handleTodoUpdate(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        let title = (this.state.title) ? this.state.title : null;
        let text = (this.state.text) ? this.state.text : null;
        let todo = { title: title, text: text};
        this.props.onTodoUpdate(id, todo);
        this.setState({
            toBeUpdated: !this.state.toBeUpdated,
            title: '',
        text: ''
    })
    }
    deleteTodo(e) {
        e.preventDefault();
        let id = this.props.uniqueID;
        this.props.onTodoDelete(id);
        console.log('oops deleted');
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    rawMarkup() {
        let rawMarkup = marked(this.props.children.toString());
        return { __html: rawMarkup };
    }
    render() {
        return (
            <div className="text-center" >
                <h3>Title : {this.props.title}</h3>
                <span dangerouslySetInnerHTML={ this.rawMarkup() } />
                <button type="button" onClick={ this.deleteTodo } className="btn btn-link">Delete</button>

    { (this.state.toBeUpdated)
        ? (<form onSubmit={ this.handleTodoUpdate }>
            <input
                type='text'
            placeholder='Update name…'
                value={ this.state.title }
                 onChange= { this.handleTitleChange } />
        <input
            type='text'
        placeholder='Update your todo…'
            value={ this.state.text }
        onChange={ this.handleTextChange } />
        <input
        type='submit'
       
        value='Update' />
        </form>)
        : null}
    </div>
    )
    }
}
export default Todo;