import TodoForm from '../../components/todo/TodoForm'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import {ClipLoader} from 'react-spinners'
import TodoList from '../../components/todo/TodoList'
const status = {
    initialized: "INITIALIZED",
    success: 'SUCCESS',
    failure: "FAILURE",  
    loading:"LOADING"
}
function Home(){
    const [todoState, setTodoState] = useState(status.initialized) 
    const [todoList, setTodoList] = useState([])
    const url = import.meta.env.VITE_API_URL
useEffect( ()=>{
    async function fetchData(){   
        setTodoState(status.loading)
 const data =await fetch(`${url}/todo/get`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }, 
        credentials: "include"
    })
    const response = await data.json()
console.log(response)

    if (!data.ok){
        
        setTodoState(status.failure)
    }else{
        
        setTodoList(response.todos)
        setTodoState(status.success)
        
    }
   

    }
    fetchData()
   
}, []) 

const updateTodoList = (newTodo)=>{
    setTodoList(c=>([...c, newTodo]))
}
const removeTodo = (id)=>{
   const todos =  todoList.filter(todo=> todo.id != id)
   setTodoList(todos)
}
const updateTodoItem = (updatedtodo)=>{
    console.log(updatedtodo, "new")
    setTodoList(todos=>{
        return  todos.map(todo=>{
           console.log(todo, "todo")
           console.log("new", updatedtodo)
            console.log(todo.id == updatedtodo.id ? updatedtodo : todo)
            return todo.id == updatedtodo.id ? updatedtodo : todo})
       
    })
   
}
const renderState = ()=>{
    switch(todoState){
        case status.failure:
            return (
                <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
            <p>Something went Wrong</p>
            </div>
        )
        case status.loading:
            return <ClipLoader color="#7000b1ff" size={50} />
        case status.success:
            return (todoList.length>=1 ? (<ul className='vw-100 '>
                    {
                        todoList.map(todo=>(
                            <TodoList todo={todo} key={todo.id} removeTodo={removeTodo} updateTodoItem={updateTodoItem}/>
                        ))
                    }
                </ul>):(
                    <p>No todos</p>
                ))
        default:
            return null
    }
}
 console.log(todoList)
    return(
        <div >  
            <Header />
            <div className={"d-flex flex-column justify-content-center align-items-center vw-100"}>
                <TodoForm updateTodoList={updateTodoList} />
                
                 {renderState()}
            </div>
                
        </div>
    )
}

export default Home