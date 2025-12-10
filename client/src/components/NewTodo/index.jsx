function NewTodo ({addTodo,todo,setTodo}){

    return (
         <form onSubmit={addTodo}>
                <input value={todo} placeholder='Enter new todo' onChange={(e)=>setTodo(t=>e.target.value)}/>
                <button type="submit">Submit</button>
            </form>
    )
}

export default NewTodo