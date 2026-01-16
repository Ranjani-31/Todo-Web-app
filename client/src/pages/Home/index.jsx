import TodoForm from "../../components/todo/TodoForm";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

import dayjs from "dayjs";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import TodoList from "../../components/todo/TodoList";

const status = {
  initialized: "INITIALIZED",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};
function Home() {
  const [todoState, setTodoState] = useState(status.initialized);
  const [todoList, setTodoList] = useState([]);
  const [date, setDate] = useState(dayjs())
  const url = import.meta.env.VITE_API_URL;
  console.log("Date from state" , date.format())
  useEffect(() => {
    async function fetchData() {
      dayjs.extend(utc);
      dayjs.extend(timezone);

      const startDate = dayjs(date).startOf("day").utc().toISOString();

      // end of day in UTC
      const endDate = dayjs(date).endOf("day").utc().toISOString();

      setTodoState(status.loading);
      const data = await fetch(`${url}/todo/get`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          startDate: startDate,
          endDate: endDate,
        }),
      });
      const response = await data.json();
      console.log(response);

      if (!data.ok) {
        setTodoState(status.failure);
      } else {
        setTodoList(response.todos);
        setTodoState(status.success);
      }
    }
    fetchData();
  }, [date]);
 
  const updateTodoList = (newTodo) => {
    setTodoList((c) => [...c, newTodo]);
  };
  const removeTodo = (id) => {
    const todos = todoList.filter((todo) => todo.id != id);
    setTodoList(todos);
  };
  const updateTodoItem = (updatedtodo) => {
    console.log(updatedtodo, "new");
    setTodoList((todos) => {
      return todos.map((todo) => {
        return todo.id == updatedtodo.id ? updatedtodo : todo;
      });
    });
  };
  const updateDate = (newValue)=>{
    console.log("date from picker",newValue)
    setDate(newValue)
  }
  const renderState = () => {
    switch (todoState) {
      case status.failure:
        return (
          <div className="d-flex justify-content-center align-items-center w-100 h-100">
            <p>Something went Wrong</p>
          </div>
        );
      case status.loading:
        return <ClipLoader color="#7000b1ff" size={50} />;
      case status.success:
        return todoList.length >= 1 ? (
          <ul className="w-50  ">
            {todoList.map((todo) => (
              <TodoList
                todo={todo}
                key={todo.id}
                removeTodo={removeTodo}
                updateTodoItem={updateTodoItem}
              />
            ))}
          </ul>
        ) : (
          <p>No todos</p>
        );
      default:
        return null;
    }
  };
  console.log(todoList);
  return (
    <div>
      <Header />
      <div
        className={
          "d-flex flex-column justify-content-center align-items-center w-100"
        }
      >
        <div className="align-self-end my-2 mx-4">
    <LocalizationProvider dateAdapter={AdapterDayjs} >          
            
              <DatePicker label="Date" value={date} onChange={updateDate} disableFuture/>
                     
        </LocalizationProvider>
        </div>
        <TodoForm updateTodoList={updateTodoList} />
        <div className="w-100 align-self-center">
           
            
        {renderState()}
        </div>
      </div>
    </div>
  );
}

export default Home;
