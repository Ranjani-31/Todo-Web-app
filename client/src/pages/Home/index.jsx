import {useState} from 'react';
import Todo from '../../components/Todo'
import NewTodo from '../../components/NewTodo'
import './index.css'
function Home(){
    const [todo, setTodo] = useState('');
    const [todos, setTodos]= useState([]);
    const [updateTodo, setUpdateTodo] = useState('')
    const addTodo =(e)=>{
        e.preventDefault()
        setTodos(t=>[...t, todo]);
        setTodo('')
    }
    const deleteTodo = (id)=>{
        setTodos(t=>t.filter((item,index)=>index !== id))
        console.log(todos)
    }
    const editTodo = (id)=>{
        setTodos(t=>[...t, t[id=newTodo]])
    }
    console.log('re-rendered')
    return(
        <div className='content'> 
            
                <NewTodo addTodo={addTodo} setTodo={setTodo} todo={todo}/>
            <ul className='todo-list'>
                {
                    todos.map((item, index)=>(                        
                          <Todo index={index} deleteTodo={deleteTodo} item={item}/>
                    ))
                }
            </ul>
        </div>
    )
}

export default Home