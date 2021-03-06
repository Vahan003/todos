export const getTodoSuccsess = (data) => ({
    type: 'GET_TODO_SUCCSESS',
    payload: data
  })
  
  export const getTodoFailure = (err) => ({
    type: 'GET_TODO_FAILURE',
    payload: err
  })
  export const postTodoSuccsess = (data) => ({
    type: 'POST_TODO_SUCCSESS',
    payload: data
  })
  
  export const postTodoFailure = (err) => ({
    type: 'POST_TODO_FAILURE',
    payload: err
  })
  export const deleteTodoSuccsess = (time) => ({
    type: 'DELETE_TODO_SUCCSESS',
    payload: time
  })
  
  export const deleteTodoFailure = (err) => ({
    type: 'DELETE_TODO_FAILURE',
    payload: err
  })