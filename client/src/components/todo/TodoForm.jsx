import { useEffect, useState } from "react";

import TextField from '@mui/material/TextField'
import {Select, MenuItem} from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';



function TodoForm() {
  const [isProgress, setIsprogress] = useState(false);
  const [todo, setTodo] = useState({
    todo: '',
    descrition: '',
    status: 'pending',
    priority: 'medium',
    dueDate: ''

  })

  const statusUpdate=(e)=>{
    setTodo(c=>({...c, status: e.target.value}))

  }
  const priorityUpdate=(e)=>{
    setTodo(c=>({...c, priority: e.target.value}))

  }
 
  const updateDesc =(e)=>{
    setTodo(c=>({...c, descrition: e.target.value}))

  }
   const updateTodo =(e)=>{
    setTodo(c=>({...c, todo: e.target.value}))

  }
  const updateProgress = () => {
    setIsprogress((c) => !c);
  };

  return (
    <div>
      <button onClick={updateProgress}>
        {isProgress ? (
          <span className="material-symbols-outlined">add</span>
        ) : (
          <span className="material-symbols-outlined">close</span>
        )}
      </button>
      {
        !isProgress && (
            <form>
                <TextField
                onChange={updateTodo}
  hiddenLabel
  id="filled-hidden-label-small"
  placeholder="Enter the task"
  variant="filled"
  size="small"
/>
<TextField
onChange={updateDesc}
  hiddenLabel
  id="filled-hidden-label-small"
  placeholder="Description(optional)"
  variant="filled"
  size="small"
/>
 <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={todo.status}
          onChange={statusUpdate}
        >
          
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'in-progress'}>In progress</MenuItem>
          <MenuItem value={'completed'}>Completed</MenuItem>
        </Select>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={todo.priority}
          onChange={priorityUpdate}
        >
          
          <MenuItem value={'low'}>Low</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'high'}>High</MenuItem>
        </Select>
         <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker label="Basic time picker" />
    </LocalizationProvider>
            </form>
        )
      }
    </div>
  ); 
}
 
export default TodoForm;
