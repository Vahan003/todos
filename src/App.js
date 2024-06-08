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
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAcceptModal, setIsOpenAcceptModal] = useState(false);
  const [element, setElement] = useState(null);
  const [updateMod, setUpdateMode] = useState(false);
  const [acceptText, setAcceptText] = useState(
    "Are you sure you want to delete all Todos?"
  );

  const getTodos = async () => {
    setLoading(true);
    await props.getTodos();
    setLoading(false);
  };

  const deleteAllTodos = async () => {
    if (!props.todos.length) {
      setAcceptText("No Todos!");
      return;
    }

    for (let todo of props.todos) {
      await props.deleteTodo(todo?.id);
    }

    setIsOpenAcceptModal(false);

    await getTodos();
  };

  const onUpdate = (el) => {
    setElement(el);
    setUpdateMode(true);
    setIsOpen(true);
  };

  const onCreateFromModal = async (data) => {
    await props.postTodos(data);
    setIsOpen(false);
    await props.getTodos();
  };

  const onUpdateFromModal = async (data) => {
    await props.patchTodo(data, element.id);
    setIsOpen(false);
    setUpdateMode(false);
    setElement(null);
    await props.getTodos();
  };

  const onCancel = () => {
    setIsOpen(false);
    setUpdateMode(false);
  };

  const onCancelAccept = () => {
    setIsOpenAcceptModal(false);
  };

  const onDelete = async (id) => {
    await props.deleteTodo(id);
    await props.getTodos();
  };

  const onDeleteAllTodos = () => {
    setIsOpenAcceptModal(true);
    setAcceptText("Are you sure you want to delete all Todos?");
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <>
      <Bar setOpenModal={setIsOpen} onDeleteAll={onDeleteAllTodos} />
      <AcceptModal
        text={acceptText}
        isOpen={isOpenAcceptModal}
        onCancel={onCancelAccept}
        onAccept={deleteAllTodos}
        loading={loading}
      />
      {loading && <Loading />}
      <TodoList
        todos={props.todos}
        onDelete={onDelete}
        onUpdate={onUpdate}
        loading={loading}
      />
      <Modal
        name={updateMod ? "Update Todo" : "Create New Todo"}
        updateMode={updateMod}
        element={element}
        isOpen={isOpen}
        onCreate={onCreateFromModal}
        onUpdate={onUpdateFromModal}
        onCancel={onCancel}
      />
      <Message message={props.message} messageDate={props.messageDate} />
    </>
  );
}

const mapStateToProps = (state) => {
  const { todos } = state;
  return todos;
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
