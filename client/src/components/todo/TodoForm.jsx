import { useEffect, useState } from "react";

import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";


import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

function TodoForm() {
  const [isProgress, setIsprogress] = useState(false);
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: "",
  });
const url = import.meta.env.VITE_API_URL
  const statusUpdate = (e) => {
    setTodo((c) => ({ ...c, status: e.target.value }));
  };
  const priorityUpdate = (e) => {
    setTodo((c) => ({ ...c, priority: e.target.value }));
  };

  const updateDesc = (e) => {
    setTodo((c) => ({ ...c, description: e.target.value }));
  };
  const updateTodo = (e) => {
    setTodo((c) => ({ ...c, title: e.target.value }));
  };
  const updateTime = (newTime)=>{
    setTodo((c) => ({ ...c, dueDate:newTime}));
    
  }
  const updateProgress = () => {
    setIsprogress((c) => !c);
  };

  const todoSubmition =async (e)=>{
    e.preventDefault()

    const newTodo = {
      ...todo,
      dueDate: new Date(todo.dueDate)
    }
    console.log(newTodo)

    const response = await fetch(`${url}/todo/add`, {
      method: 'POST',
      headers: {
        "COntent-Type" : "application/json"
      },
      credentials: 'include',
      body: JSON.stringify(newTodo)
    }) 
    console.log("response",response)
const responseTodo = await response.json()
console.log("json formatted",responseTodo)

  }
  return (
    <div>
      <button onClick={updateProgress}>
        {isProgress ? (
          <span className="material-symbols-outlined">add</span>
        ) : (
          <span className="material-symbols-outlined">close</span>
        )}
      </button>
      {!isProgress && (
        <form onSubmit={todoSubmition} className="d-flex flex-column justify-content-center align-items-center ">
          <TextField
            onChange={updateTodo}
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder="Enter the task"
            variant="filled"
            size="small"
            className="w-50"
          />
          <TextField
            onChange={updateDesc}
            hiddenLabel
            id="filled-hidden-label-small"
            placeholder="Description(optional)"
            variant="filled"
            size="small"
            className="w-50 mt-4"
          />
          <div className="d-flex flex-row justify-content-between align-items-center w-50 mt-4">

           <InputLabel id="status-label" >Status</InputLabel>
            <Select
              labelId="demo-simple-select-filled-label status-label"
              id="demo-simple-select-filled"
             
              value={todo.status}
              onChange={statusUpdate}
            className="w-25"

            >
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"in-progress"}>In progress</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
</div>
          <div className="d-flex flex-row justify-content-between align-items-center w-50 mt-4">
          
           <InputLabel id="priority-label">Priority</InputLabel>

            <Select
              labelId="demo-simple-select-filled-label priority-label"
              id="demo-simple-select-filled"
              value={todo.priority}
              onChange={priorityUpdate}
            className="w-25"

            >
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
              <MenuItem value={"high"}>High</MenuItem>
            </Select>
</div>
             
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <TimePicker label="Due time"  onChange={updateTime} className="w-50 mt-4"/>
            </LocalizationProvider>
            <Button variant="contained" type="submit" className="mt-4 w-50">Submit</Button>
           
        </form>
      )}
    </div>
  );
}

export default TodoForm;
