import { useEffect, useState } from "react";
import Modal from "react-modal";
import React from "react";
import ReactDOM from "react-dom";
import dayjs from "dayjs";

import EditTodoForm from "./EditTodoForm";

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';


const url = import.meta.env.VITE_API_URL;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function TodoList(props) {
  const { id, title, description, status, priority, dueDate } = props.todo;
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const deleteTodo = async () => {
    try {
      const response = await fetch(`${url}/todo/delete/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      if (!response.ok) {
        console.error("Todo Not existed");
        return;
      }
      if (response.ok) {
        props.removeTodo(id);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <li className="d-flex flex-column justify-content-start align-items-between w-100">
      <div className="d-flex flex-row justify-content-between">
        <p>{dayjs(dueDate).format("hh:mm A")}</p>
       
        <p>{priority}</p>
      </div>

      <div className="d-flex justify-content-between">
        <div>
          <p>{title}</p>
          <p>{description}</p>
          <p>status: {status}</p>
        </div>

        <div>
          <button
            onClick={openModal}
            disabled={status == "overdue" ? true : false}
          >
            Edit
          </button>
          <button onClick={deleteTodo}>
            <DeleteOutlineOutlinedIcon />
          </button>
        </div>
      </div>

      {/* popup for edit the existing todo */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>I am a modal</div>
        <EditTodoForm todo={props.todo} updateTodoItem={props.updateTodoItem} />
      </Modal>
    </li>
  );
}

export default TodoList;
