let isUser;
let isProfile;
let isError;
let isSuggestions;

if (sessionStorage.getItem("kyoyu_token") === null) {
  isUser = null;
} else {
  isUser = sessionStorage.getItem("kyoyu_token");
}

if (sessionStorage.getItem("kyoyu_profile") === null) {
  isProfile = [];
} else {
  isProfile = JSON.parse(sessionStorage.getItem("kyoyu_profile"));
}

if (sessionStorage.getItem("kyoyu_error") === null) {
  isError = null;
} else {
  isError = sessionStorage.getItem("kyoyu_token");
}

if (sessionStorage.getItem("kyoyu_suggestions") === null) {
  isSuggestions = null;
} else {
  isSuggestions = JSON.parse(sessionStorage.getItem("kyoyu_suggestions"));
}

const initState = {
  user: isUser,
  profile: isProfile,
  isLoading: false,
  error: isError,
  suggestions: isSuggestions,
  otherUser: null,
  searchedUsers: [],
  onlineUsers: [],
};

const userReducer = (state = initState, action) => {
  if (action.type === "user-loading") {
    return {
      ...state,
      isLoading: true,
    };
  } else if (action.type === "register") {
    const { user, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        user: user,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "login") {
    const { user, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        user: user,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "profile") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "edit-profile") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "follow") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "unfollow") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "add-dp") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "add-post") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "delete-post") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "get-suggestion") {
    const { suggestions, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        suggestions: suggestions,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "get-user") {
    const { otherUser, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        otherUser: otherUser,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "search-users") {
    const { searchedUsers, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        searchedUsers: searchedUsers,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "remove") {
    const { profile, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        profile: profile,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "get-online-users") {
    const { onlineUsers, error } = action.payload;
    if (error) {
      return {
        ...state,
        error: error,
        isLoading: false,
      };
    } else {
      return {
        ...state,
        onlineUsers: onlineUsers,
        isLoading: false,
        error: null,
      };
    }
  } else if (action.type === "logout") {
    return {
      ...state,
      user: null,
      profile: [],
      suggestions: [],
      error: null,
      isLoading: false,
    };
  } else {
    return state;
  }
};

export default userReducer;
