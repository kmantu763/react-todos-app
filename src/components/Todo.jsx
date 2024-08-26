import { Component } from "react";

class Todo extends Component{
    state = {
        inputValue : "",
        editedTodo : {},
        todoList : localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]
    }

    changeInput = (event)=>{
        this.setState({
            inputValue : event.target.value
        })
    }
 
    addTodo = (e)=>{
        e.preventDefault();
        if(this.state.inputValue){
            const list = [...this.state.todoList];
            list.push({
                id : Date.now(),
                value : this.state.inputValue,
                isDone : false
            });
            this.setState({
                todoList : list,
                inputValue : ""
            })
            
            localStorage.setItem("todos",JSON.stringify(list));
        }
        else{
            alert("plaese enter some input");
        }
    }

    deleteTodo = (deleteItem)=>{
        let list = [];
        [...this.state.todoList].map((item)=>{
            if(item !== deleteItem){
                list.push(item)
            }
            return list;
        })
        this.setState({
            todoList : list
        })
        localStorage.setItem("todos",JSON.stringify(list));
    }

    handleCheckBox = (checkedItem)=>{
        let list = [...this.state.todoList];
        list = list.map((todo)=>{
            if(todo === checkedItem){
                todo.isDone = !todo.isDone
            }
            return todo;
        })
        this.setState({
            todoList : list
        })
        localStorage.setItem("todos",JSON.stringify(list));
    }

    editTodo = (editItem)=>{
        this.setState({
            editedTodo : editItem
        })
    }

    updateTodo = (editValue)=>{
        let list = [...this.state.todoList];
        list = list.map((todo)=>{
            if(todo.id===editValue.id){
                todo.value = editValue.value;
            }
            return todo;
        })

        this.setState({
            todoList : list
        })

        localStorage.setItem("todos",JSON.stringify(list))
    }

    render(){
        return(
            <>
                {/* Heading */}
                <h1 className="text-center my-5">Todo React App</h1>

                {/* Creating Form */}
                <div className="container">
                    <form onSubmit={this.addTodo} className="mb-3">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Add Todo" onChange={this.changeInput} value={this.state.inputValue} />

                            {/* AddTodo Button */}
                            <div className="input-group-append">
                                <button type="submit" className="btn btn-success" >Add Todo</button>
                            </div>
                        </div>
                    </form>

                    {/* Todo Table Creaating */}
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    {/* Table Heading */}
                                    <th>#</th>
                                    <th className="text-center">Checkbox</th>
                                    <th>Name</th>
                                    <th className="text-center">Action</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Iterrating Todo List */}
                                {   this.state.todoList.map((todo, index)=>(
                                    <tr key={todo.id}>
                                        <td>{index+1}</td>

                                        <td className="text-center">
                                            {/* Chechbox */}
                                            <input type="checkbox" defaultChecked={todo.isDone} onClick={()=>this.handleCheckBox(todo)}/>
                                        </td>

                                        {/* Name Value */}
                                        <td>{todo.value}</td>

                                        <td>
                                            {/* Edit Button */}
                                            <button className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal" onClick={()=>this.editTodo(todo)}> Edit </button>
                                        </td>

                                        <td>
                                            {/* Delete Button */}
                                            <button className="btn btn-danger" onClick={()=>this.deleteTodo(todo)}>Delete</button> 
                                        </td>
                                    </tr>
                                ))

                                }
                            </tbody>
                        </table>
                        
                        {/* Modal for Edit Todo */}
                        <div className="modal" id="editModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">
                                            {/* Modal Title */}
                                            <b>Update Todo Value</b>
                                        </h4>
                                        <button className="btn-close" data-bs-dismiss="modal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <form onSubmit={e=>{e.preventDefault()}}>
                                            <div>
                                            <label>Value : </label>

                                            {/* Editing Todo Value */}
                                            <input type="text" className="form-control" 
                                                value={this.state.editedTodo.value} 
                                                onChange={e=>{this.setState({
                                                    ...this.state,
                                                    editedTodo : { ...this.state.editedTodo,
                                                    value : e.target.value
                                                                } 
                                                    })
                                                }}/>
                                            </div>

                                            {/* Modal Footer */}
                                            <div className="modal-footer">

                                                {/* Close Button */}
                                                <button className="btn btn-secondary" data-bs-dismiss="modal">
                                                    close
                                                </button>

                                                {/* Update Button */}
                                                <button  className="btn btn-success" data-bs-dismiss="modal" onClick={()=>{this.updateTodo(this.state.editedTodo)}}>
                                                    Update
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Todo;