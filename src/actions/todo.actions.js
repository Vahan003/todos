export const getTodoSuccess = (data) => ({
    type: 'GET_TODO_SUCCESS',
    payload: data
  })
  
  export const getTodoFailure = (err) => ({
    type: 'GET_TODO_FAILURE',
    payload: err
  })
  export const postTodoSuccess = (data) => ({
    type: 'POST_TODO_SUCCESS',
    payload: data
  })

  export const postTodoFailure = (err) => ({
    type: 'POST_TODO_FAILURE',
    payload: err
  })
  export const patchTodoSuccess = (data) => ({
    type: 'PATCH_TODO_SUCCESS',
    payload: data
  })
  
  export const patchTodoFailure = (err) => ({
    type: 'PATCH_TODO_FAILURE',
    payload: err
  })
  export const deleteTodoSuccess = (time) => ({
    type: 'DELETE_TODO_SUCCESS',
    payload: time
  })
  
  export const deleteTodoFailure = (err) => ({
    type: 'DELETE_TODO_FAILURE',
    payload: err
  })