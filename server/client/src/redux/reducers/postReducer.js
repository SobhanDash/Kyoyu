let isPosts;
let isError;

if (sessionStorage.getItem("kyoyu_posts") === null) {
  isPosts = [];
} else {
  isPosts = JSON.parse(sessionStorage.getItem("kyoyu_posts"));
}

if (sessionStorage.getItem("kyoyu_error") === null) {
  isError = [];
} else {
  isError = JSON.parse(sessionStorage.getItem("kyoyu_error"));
}

const initState = {
  posts: isPosts,
  comments: [],
  post: [],
  error: isError,
  isLoading: false,
};

const postReducer = (state = initState, action) => {

  if (action.type === "set-loading") {
    return { ...state, isLoading: true };
  } 
  
  else if (action.type === "get-posts") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "add-post") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "update-post") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "delete-post") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "like-post") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "unlike-post") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "fetch-post") {
    const { post, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, post: post, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "add-comment") {
    const { posts, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, posts: posts, isLoading: false, error: null };
    }
  } 
  
  else if (action.type === "get-comments") {
    const { comments, error } = action.payload;
    if (error) {
      return { ...state, error: error, isLoading: false };
    } else {
      return { ...state, comments: comments, isLoading: false, error: null };
    }
  } 
  
  else {
    return state;
  }
};

export default postReducer;
