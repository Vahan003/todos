import api from "../API";
import {
  getTodoSuccess,
  getTodoFailure,
  postTodoSuccess,
  postTodoFailure,
  patchTodoSuccess,
  patchTodoFailure,
  deleteTodoSuccess,
  deleteTodoFailure,
} from "../actions";

export const getTodoThunk = () => async (dispatch) => {
  try {
    const response = await api.getOrPostTodos.get();
    console.log("response", response);
    dispatch(getTodoSuccess(response.data));
  } catch (err) {
    console.error("FROM GET_THUNK", err);
    if (err.response) {
      dispatch(getTodoFailure(err.response));
    }
  }
};

export const postTodoThunk = (data) => async (dispatch) => {
  try {
    const response = await api.getOrPostTodos.post(data);
    console.log("response", response);
    dispatch(postTodoSuccess(response.data));
  } catch (err) {
    if (err.response) {
      dispatch(postTodoFailure(err.response.data?.message));
    }
  }
};

export const patchTodoThunk = (data, id) => async (dispatch) => {
  try {
    const response = await api.patchOrDeleteTodos(id).put(data);
    console.log("response", response);
    if (response.status === 200) {
      dispatch(
        patchTodoSuccess({
          ...response.data,
          date: new Date(),
        })
      );
    } else {
      dispatch(patchTodoFailure("Todo is missing attributes"));
    }
  } catch (err) {
    if (err) {
      dispatch(patchTodoFailure(err.response.data?.message));
    }
  }
};

export const deleteTodoThunk = (id) => async (dispatch) => {
  try {
    const response = await api.patchOrDeleteTodos(id).delete();
    console.log("response", response);
    if (response.status === 200) {
      dispatch(deleteTodoSuccess(new Date()));
      return;
    }
    dispatch(deleteTodoFailure(response.message));
  } catch (err) {
    if (err) {
      dispatch(deleteTodoFailure(err));
    }
  }
};
