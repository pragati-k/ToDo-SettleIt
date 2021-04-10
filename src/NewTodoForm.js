import React, {Component} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './NewTodoForm.css';

class NewTodoForm extends Component{
    constructor(props){
        super(props);
        this.state={
            task: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(evt){
        this.setState({
            task: evt.target.value
        });
    }
    handleSubmit(t){
        t.preventDefault();
        const newBox = {...this.state, id: uuidv4(), completed: false}
        this.props.addTodo(newBox);
        this.setState({task:""})
    }
    render(){
        return(
                <form className= "NewTodoForm" onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name='task'
                    id='task'
                    placeholder="TO DO"
                    value={this.state.task}
                    onChange ={this.handleChange}/>
                    <button>ADD</button>
                </form>
        )
    }
}

export default NewTodoForm;