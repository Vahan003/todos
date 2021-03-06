const initialState = {
    getTodoStatus: false,
    postTodoStatus: false,
    deleteTodoStatus: false,
    deleteTime: "",
    postTodo: "",
    message: "",
    messageDate: "",
    todo: []
  };
  
  export default function todoReducer(state = initialState, action) {
    switch(action.type) {
      case 'GET_TODO_SUCCSESS':
      return {
        ...state,
        getTodoStatus: true,
        todo: action.payload,
        messageDate: state.messageDate
      }
      case 'GET_TODO_FAILURE':
      return {
        ...state,
        getTodoStatus: false,
        message: action.payload,
        messageDate: new Date()
      }
      case 'POST_TODO_SUCCSESS':
      return {
        ...state,
        postTodoStatus: true,
        postTodo: action.payload,
        message: "Created!",
        messageDate: new Date()
      }
      case 'POST_TODO_FAILURE':
      return {
        ...state,
        postTodoStatus: false,
        message: action.payload,
        messageDate: new Date()
      }
      case 'DELETE_TODO_SUCCSESS':
      return {
        ...state,
        deleteTodoStatus: true,
        deleteTime: action.payload,
        message: "Deleted!",
        messageDate: new Date()
      }
      case 'DELETE_TODO_FAILURE':
      return {
        ...state,
        deleteTodoStatus: false,
        message: action.payload,
        messageDate: new Date()
      }
      default:
        return state;
    }
  }