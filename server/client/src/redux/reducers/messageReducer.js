let isConversations;
let isError;

if (sessionStorage.getItem("kyoyu_conversations") === null) {
  isConversations = [];
} else {
  isConversations = JSON.parse(sessionStorage.getItem("kyoyu_conversations"));
}

if (sessionStorage.getItem("kyoyu_error") === null) {
  isError = null;
} else {
  isError = sessionStorage.getItem("kyoyu_error");
}

const initState = {
  conversations: isConversations,
  messages: [],
  error: isError,
  isLoading: false,
};

let messageReducer = (state = initState, action) => {
  
  if (action.type === "msg-loading") {
    return { ...state, isLoading: true };
  } 
  
  else if (action.type === "get-msgs") {
    const { msgs, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, messages: msgs, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "send-msg") {
    const { msgs, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, messages: msgs, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "get-cnvs") {
    const { cnvs, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, conversations: cnvs, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "add-cnv") {
    const { cnv, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return {
        ...state,
        conversations: [...state.conversations, cnv],
        isLoading: false,
        error: null,
      };
    }
  } 
  
  else if (action.type === "logout") {
    return {
      ...state,
      conversations: [],
      messages: [],
      isLoading: false,
      error: null,
    };
  }
  
  else {
    return state;
  }
};

export default messageReducer;
