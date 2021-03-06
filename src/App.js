import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  getTodoThunk,
  postTodoThunk,
  deleteTodoThunk,
} from "./thunks/todo.thunk";
import "./App.css";
import Bar from "./components/Bar";
import TodoList from "./components/TodoList";
import Loading from "./components/Loading";
import Modal from "./components/Modal";
import Message from "./components/Message";
function App(props) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMessage, setIsOpenMessage] = useState(false);
  const getTodosAsync = async () => {
    await props.getTodos();
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getTodosAsync();
  }, [props.postTodo._id, props.deleteTime]);

  useEffect(() => {
    if (props.getTodoStatus && props.todo.length !== todos.length) {
      setTodos(props.todo);
    }
  }, [props.todo]);

  useEffect(() => {
    setIsOpenMessage(true);
  }, [props.messageDate]);
  useEffect(() => {
    console.log(props)
  }, [props]);
  return (
    <>
      <Bar setOpenModal={setIsOpen} />
      {loading && <Loading />}
      <TodoList
        todos={todos}
        deleteTodo={props.deleteTodo}
        onMessage={props.message}
      />
      <Modal
        isOpen={isOpen}
        setOpen={setIsOpen}
        onCreate={props.postTodos}
        status={props.postTodoStatus}
        messageDate ={props.messageDate}
        postTodoId={props.postTodo._id}
      />
      <Message isOpen = {isOpenMessage} onMessage={props.message} messageDate ={props.messageDate}/>
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
    deleteTodo: async (id) => {
      await dispatch(deleteTodoThunk(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
