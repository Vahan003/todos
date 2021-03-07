import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTodoThunk,
  postTodoThunk,
  patchTodoThunk,
  deleteTodoThunk,
} from "./thunks/todo.thunk";
import "./App.css";
import Bar from "./components/Bar";
import TodoList from "./components/TodoList";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import Message from "./components/Message";
import AcceptModal from "./components/AcceptModal";
function App(props) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [element, setElement] = useState({});
  const [updateMod, setUpdateMode] = useState(false);
  const [modalName, setModalName] = useState("Create New Todo");
  const [acceptText, setAcceptText] = useState(
    "Are you sure you want to delete all Todos?"
  );
  const getTodosAsync = async () => {
    await props.getTodos();
    setLoading(false);
  };
  useEffect(() => {
    if (JSON.stringify(element) !== JSON.stringify({})) {
      setUpdateMode(true);
      setIsOpen(true);
      setModalName("Update Todo");
    } else {
      setUpdateMode(false);
      setIsOpen(false);
      setModalName("Create New Todo");
    }
  }, [element]);

  useEffect(() => {
    setLoading(true);
    setTodos((prev) => prev.filter((el) => el._id !== element._id));
    getTodosAsync();
  }, [props.postTodo._id, props.postTodo.date, props.deleteTime]);

  useEffect(() => {
    if (props.getTodoStatus && props.todo.length !== todos.length) {
      setTodos(props.todo);
    }
  }, [props.todo]);

  useEffect(() => {
    if (props.messageDate) {
      setIsOpenMessage(true);
    }
  }, [props.messageDate]);

  const deleteAllTodos = async () => {
    setLoading(true);
    for await (let todo of todos) {
      props.deleteTodo(todo._id);
    }
    if (!todos.length) {
      setAcceptText("No Todos!");
    }
    setLoading(false);
  };

  return (
    <>
      <Bar
        setOpenModal={setIsOpen}
        onDeleteAll={() => {
          setIsOpenAcceptModal(true);
          setAcceptText("Are you sure you want to delete all Todos?");
        }}
      />
      <AcceptModal
        text={acceptText}
        isOpen={isOpenAcceptModal}
        setIsOpen={setIsOpenAcceptModal}
        onAccept={deleteAllTodos}
        loading = {loading}
      />
      {loading && <Loading />}
      <TodoList
        todos={todos}
        deleteTodo={props.deleteTodo}
        setElement={setElement}
        loading={loading}
      />
      <Modal
        name={modalName}
        updateMode={updateMod}
        element={element}
        isOpen={isOpen}
        setOpen={setIsOpen}
        onCreate={props.postTodos}
        onUpdate={props.patchTodo}
        status={props.postTodoStatus}
        messageDate={props.messageDate}
        postTodoId={props.postTodo._id}
        setElement={setElement}
        setUpdateMode={setUpdateMode}
      />
      <Message
        isOpen={isOpenMessage}
        setIsOpenMessage={setIsOpenMessage}
        onMessage={props.message}
        messageDate={props.messageDate}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  const { todo } = state;
  return todo;
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTodos: async () => {
      await dispatch(getTodoThunk());
    },
    postTodos: async (data) => {
      await dispatch(postTodoThunk(data));
    },
    patchTodo: async (data, id) => {
      await dispatch(patchTodoThunk(data, id));
    },
    deleteTodo: async (id) => {
      await dispatch(deleteTodoThunk(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
