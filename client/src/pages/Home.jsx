import {useState} from 'react';

function Home(){
    const [todo, setTodo] = useState('');
    const [todos, setTodos]= useState([]);

    const addTodo =(e)=>{
        e.preventDefault()
        setTodos(t=>[...t, todo]);
        setTodo('')
    }
    const Delete = (id)=>{
        setTodos(t=>t.map((item,index)=>index !== id))
    }
    return(
        <div>
            <form onSubmit={addTodo}>
                <input value={todo} placeholder='Enter new todo' onChange={(e)=>setTodo(t=>e.target.value)}/>
                <button type="submit">Submit</button>
            </form>

            <ul>
                {
                    todos.map((item, index)=>(
                        
                            <li key={index}>
                                <p>{item}</p>
                                <button >Edit</button>
                                <button>Delete</button>
                                  </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Home