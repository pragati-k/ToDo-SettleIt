import React, { Component } from 'react';
import NewTodoForm from './NewTodoForm';
import Todo from './Todo';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        const saveTaskes = JSON.parse(window.localStorage.getItem("taskes"));
        this.state = {
            taskes: saveTaskes || []
        }
        this.addTodo = this.addTodo.bind(this);
        this.list = this.list.bind(this);
        this.update = this.update.bind(this);
        this.toggleCompletion = this.toggleCompletion.bind(this);
        this.deleteAll = this.deleteAll.bind(this);
        this.markAllComplete = this.markAllComplete.bind(this);
    }
    addTodo(evt) {
        this.setState(st => ({
            taskes: [...st.taskes, evt]
        }), this.syncLocalStorage)
    }

    syncLocalStorage() {
        window.localStorage.setItem(
            "taskes", JSON.stringify(this.state.taskes)
        );
    }

    removeTodo(id) {
        this.setState({
            taskes: this.state.taskes.filter(task => task.id !== id)
        }, this.syncLocalStorage)
    }
    deleteAll(){
        this.setState({taskes: []}, this.syncLocalStorage)
    }
    update(id, updatedTask) {
        const updatedTodos = this.state.taskes.map(todo => {
            if (todo.id === id) {
                return { ...todo, task: updatedTask };
            }
            return todo;
        });
        this.setState({ taskes: updatedTodos }, this.syncLocalStorage);
    }

    toggleCompletion(id) {
        const updatedTodos = this.state.taskes.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed };
            }
            return todo;
        });
        this.setState({ taskes: updatedTodos }, this.syncLocalStorage);
    }

    markAllComplete(){
        const updatedTodos = this.state.taskes.map(todo => {
                return { ...todo, completed: true };
        });
        this.setState({ taskes: updatedTodos }, this.syncLocalStorage);
    }

    list() {
        return (
            <div>
                {this.state.taskes.map(todo => (
                    <Todo
                        key={todo.id}
                        task={todo.task}
                        id={todo.id}
                        completed={todo.completed}
                        removeTodo={() => this.removeTodo(todo.id)}
                        updatedTodo={this.update}
                        toggleCompletion={this.toggleCompletion} />
                ))}
            </div>
        )
    }
    render() {
        return (
            <div className="TodoList">
                <h1>Todo List</h1>
                <NewTodoForm addTodo={this.addTodo} />
                {this.list()}
                <button className='deleteAll' onClick={this.deleteAll}>Delete All</button>
                <button className='markAllComplete' onClick={this.markAllComplete}>Mark All Complete</button>
            </div>
        )
    }
}

export default TodoList;