import React, { Component } from 'react';
class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = { title: '', text: '' };
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleTitleChange(e) {
        this.setState({ title: e.target.value });
    }
    handleTextChange(e) {
        this.setState({ text: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        let title = this.state.title.trim();
        let text = this.state.text.trim();
        if (!text || !title) {
            return;
        }
        this.props.onTodoSubmit({ title: title, text: text });
        this.setState({ title: '', text: '' });
    }
    render() {
        return (
            <form onSubmit={ this.handleSubmit } className="text-center">
                <input
                    type='text'
                placeholder='Title…'
                    value={ this.state.title }
                  onChange={ this.handleTitleChange } />
        <input
            type='text'
             placeholder='Do it…'

              value={ this.state.text }
              onChange={ this.handleTextChange } />
        <input
            type='submit'
    value='Post'/>
    </form>
    )
    }
}
export default TodoForm;