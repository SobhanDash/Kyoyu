import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const register =
  ({ username, name, email, password }) =>
  async (dispatch) => {
    dispatch({
      type: "set-loading",
    });

    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const res = await axios.post(`${url}/api/auth/register`, {
        username,
        name,
        email,
        password,
      });
      console.log(res);
      if (res.data.success) {
        sessionStorage.setItem("kyoyu_token", res.data.authToken);
        toast.success("Hello There!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        sessionStorage.removeItem("kyoyu_error");

        dispatch({
          type: "register",
          payload: {
            user: res.data.authToken,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        toast.error("Registration Failed", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: "register",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Error with Registration", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "register",
        payload: {
          error: error.message,
        },
      });
    }
  };

export const login =
  ({ email, password }) =>
  async (dispatch) => {
    dispatch({
      type: "set-loading",
    });

    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const res = await axios.post(`${url}/api/auth/login`, {
        email,
        password,
      });

      if (res.data.success) {
        sessionStorage.setItem("kyoyu_token", res.data.authToken);
        toast.success("Welcome Back", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        sessionStorage.removeItem("kyoyu_error");
        dispatch({
          type: "login",
          payload: {
            user: res.data.authToken,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: "login",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Error with Login", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch({
        type: "login",
        payload: {
          error: error.message,
        },
      });
    }
  };

export const getProfile = () => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/auth/profile`, {
      headers: { "auth-token": token },
    });
    // console.log(res.data);
    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "profile",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Error in Fetching Profile", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "profile",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Internal Server Error: Can't get Profile", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "profile",
      payload: {
        error: error.message,
      },
    });
  }
};

export const editProfile =
  ({ username, name, email, profilepic, bio }) =>
  async (dispatch) => {
    dispatch({
      type: "user-loading",
    });

    const token = sessionStorage.getItem("kyoyu_token");
    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const res = await axios.put(
        `${url}/api/auth/editProfile`,
        { username, name, email, profilepic, bio },
        { headers: { "auth-token": token } }
      );

      if (res.data.success) {
        sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
        toast.success("Saved Successfully", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        sessionStorage.removeItem("kyoyu_error");
        dispatch({
          type: "edit-profile",
          payload: {
            profile: res.data.user,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        toast.error("Could not save data: Try Again!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: "edit-profile",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Could not save data", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "edit-profile",
        payload: {
          error: error.message,
        },
      });
    }
  };

export const follow = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/auth/follow/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      toast.success("User Followed", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "follow",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Could not follow user: Try Again", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "follow",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Could not follow user", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "follow",
      payload: {
        error: error.message,
      },
    });
  }
};

export const unfollow = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/auth/unfollow/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      toast.success("User Unfollowed", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "unfollow",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Could not unfollow user: Try Again", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "unfollow",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Could not unfollow user", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "unfollow",
      payload: {
        error: error.message,
      },
    });
  }
};

export const remove = (id) => async (dispatch) => {
  // dispatch({
  //     type: "user-loading"
  // });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/auth/remove/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      toast.success("User Removed", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "remove",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Could not remove user: Try Again", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "remove",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Could not remove user", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "remove",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getSuggestion = () => async (dispatch) => {
  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/auth/getSuggestion`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.setItem(
        "kyoyu_suggestions",
        JSON.stringify(res.data.suggestions)
      );
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "get-suggestion",
        payload: {
          suggestions: res.data.suggestions,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-suggestion",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "get-suggestion",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addDp = (image) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const data = new FormData();
  data.append("file", image);
  data.append("upload_preset", "kyoyu-cloudinary");
  data.append("cloud_name", "kyoyu");
  const response = await axios.post(
    "https://api.cloudinary.com/v1_1/kyoyu/image/upload",
    data
  );
  const url = response.data.secure_url;

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const backend_url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${backend_url}/api/auth/adddp`,
      { image: url },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      toast.success("Profile Pic Updated Successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "add-dp",
        payload: {
          profile: res.data.user,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Couldn't update profile pic: Try Again!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "add-dp",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Couldn't update profile pic", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "add-dp",
      payload: {
        error: error.message,
      },
    });
  }
};

export const searchUsers = (name) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/auth/users/${name}`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "search-users",
        payload: {
          searchedUsers: res.data.users,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "search-users",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "search-users",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/auth/user/${id}`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      dispatch({
        type: "get-user",
        payload: {
          otherUser: res.data.otherUser,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-user",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-user",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getOnlineUsers = (users) => async (dispatch) => {
  dispatch({
    type: "user-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/auth/onlineusers/`,
      {
        users: users,
      },
      {
        headers: { "auth-token": token },
      }
    );

    if (res.data.success) {
      dispatch({
        type: "get-online-users",
        payload: {
          onlineUsers: res.data.onlineUsers,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-online-users",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-online-users",
      payload: {
        error: error.message,
      },
    });
  }
};

export const logout = () => async (dispatch) => {
  sessionStorage.clear();
  dispatch({
    type: "logout",
  });
};

// ***************POST SECTION******************\\

export const getPosts = () => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/posts/getposts`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "get-posts",
        payload: {
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-posts",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Couldn't get posts", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "get-posts",
      payload: {
        error: error.message,
      },
    });
  }
};

export const fetchPost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/posts/${id}`, {
      headers: { "auth-token": token },
    });
    // console.log(res.data);
    if (res.data.success) {
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "fetch-post",
        payload: {
          post: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "fetch-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "fetch-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addPost = (image, caption) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.post(
      `${url}/api/posts/addpost`,
      { image, caption },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      toast.success("Post Added Successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      dispatch({
        type: "add-post",
        payload: {
          profile: res.data.user,
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Couldn't add post: Try Again!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "add-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Couldn't add post", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "add-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const updatePost =
  ({ id, image, caption }) =>
  async (dispatch) => {
    dispatch({
      type: "set-loading",
    });

    const token = sessionStorage.getItem("kyoyu_token");
    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const res = await axios.put(
        `${url}/api/posts/updatepost/${id}`,
        { image, caption },
        { headers: { "auth-token": token } }
      );

      if (res.data.success) {
        sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
        toast.success("Post Updated Successfully", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        sessionStorage.removeItem("kyoyu_error");
        dispatch({
          type: "update-post",
          payload: {
            posts: res.data.posts,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        toast.error("Couldn't update post: Try Again!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        toast.error(res.data.error, {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        dispatch({
          type: "update-post",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      // console.log(error.message);
      toast.error("Couldn't update post", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "update-post",
        payload: {
          error: error.message,
        },
      });
    }
  };

export const deletePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.delete(`${url}/api/posts/deletepost/${id}`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_profile", JSON.stringify(res.data.user));
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      sessionStorage.removeItem("kyoyu_error");
      
      toast.success("Post Deleted", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "delete-post",
        payload: {
          profile: res.data.user,
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Couldn't Delete Post: Try Again!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "delete-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Couldn't delete post", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "delete-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const likePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/posts/like/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "like-post",
        payload: {
          posts: res.data.posts,
          mypost: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "like-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "like-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const unlikePost = (id) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.put(
      `${url}/api/posts/unlike/${id}`,
      {},
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "unlike-post",
        payload: {
          posts: res.data.posts,
          mypost: res.data.post,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "unlike-post",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "unlike-post",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getComments = (id) => async (dispatch) => {
  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/comments/post/${id}`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "get-comments",
        payload: {
          comments: res.data.comments,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "add-comment",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    dispatch({
      type: "add-comment",
      payload: {
        error: error.message,
      },
    });
  }
};

export const addComment = (id, text) => async (dispatch) => {
  dispatch({
    type: "set-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.post(
      `${url}/api/comments/addcomment/${id}`,
      { comment: text },
      { headers: { "auth-token": token } }
    );

    if (res.data.success) {
      sessionStorage.setItem("kyoyu_posts", JSON.stringify(res.data.posts));
      toast.success("Comment Added", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      sessionStorage.removeItem("kyoyu_error");
      dispatch({
        type: "add-comment",
        payload: {
          posts: res.data.posts,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      toast.error("Couldn't add comment: Try Again!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch({
        type: "add-comment",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    // console.log(error.message);
    toast.error("Couldn't add comment", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch({
      type: "add-comment",
      payload: {
        error: error.message,
      },
    });
  }
};

// *************MESSAGE SECTION******************\\
export const getConversations = () => async (dispatch) => {
  // dispatch({
  //     type: 'msg-loading'
  // });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(`${url}/api/message/conversations`, {
      headers: { "auth-token": token },
    });

    if (res.data.success) {
      sessionStorage.setItem(
        "kyoyu_conversations",
        JSON.stringify(res.data.conversations)
      );
      dispatch({
        type: "get-cnvs",
        payload: {
          cnvs: res.data.conversations,
          error: null,
        },
      });
    }

    if (res.data.error) {
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-cnvs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-cnvs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const getMessages = (receiverId, senderId) => async (dispatch) => {
  dispatch({
    type: "msg-loading",
  });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    // console.log(senderId);
    const res = await axios.get(
      `${url}/api/message/msg/${senderId}/${receiverId}`,
      {
        headers: { "auth-token": token },
      }
    );
    if (res.data.success) {
      // console.log(res.data);
      dispatch({
        type: "get-msgs",
        payload: {
          msgs: res.data.messages,
          error: null,
        },
      });
    }

    if (res.data.error) {
      console.log("error in getMessages");
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-msgs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-msgs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const receiveMessages = (receiverId, senderId) => async (dispatch) => {
  // dispatch({
  //     type: 'msg-loading'
  // });

  const token = sessionStorage.getItem("kyoyu_token");
  try {
    const url =
      process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
    const res = await axios.get(
      `${url}/api/message/msg/${senderId}/${receiverId}`,
      {
        headers: { "auth-token": token },
      }
    );
    if (res.data.success) {
      // console.log(res.data);
      dispatch({
        type: "get-msgs",
        payload: {
          msgs: res.data.messages,
          error: null,
        },
      });
    }

    if (res.data.error) {
      console.log("error in receiveMessages");
      sessionStorage.setItem("kyoyu_error", res.data.error);
      dispatch({
        type: "get-msgs",
        payload: {
          error: res.data.error,
        },
      });
    }
  } catch (error) {
    dispatch({
      type: "get-msgs",
      payload: {
        error: error.message,
      },
    });
  }
};

export const sendMessage =
  ({ socket, text, images, receiverId, senderId }) =>
  async (dispatch) => {
    // dispatch({
    //     type: 'loading'
    // });

    const token = sessionStorage.getItem("kyoyu_token");
    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      // console.log("Sender: ",senderId);
      // console.log("Receiver: ",receiverId);
      const res = await axios.post(
        `${url}/api/message/${senderId}/${receiverId}`,
        { text, images },
        { headers: { "auth-token": token } }
      );

      if (res.data.success) {
        socket.current.emit("sendMessage", res.data.message);
        dispatch({
          type: "send-msg",
          payload: {
            msgs: res.data.messages,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        dispatch({
          type: "send-msg",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "send-msg",
        payload: {
          error: error.message,
        },
      });
    }
  };

  export const newCnv = (senderId, receiverId) => async (dispatch) => {
    dispatch({
      type: "convo-loading",
    });

    const token = sessionStorage.getItem("kyoyu_token");
    try {
      const url =
        process.env.NODE_ENV === "development" ? "http://localhost:5000" : "";
      const res = await axios.post(
        `${url}/api/message/newcnv/${senderId}/${receiverId}`,
        {},
        { headers: { "auth-token": token } }
      );

      if (res.data.success) {
        sessionStorage.setItem(
          "kyoyu_conversations",
          JSON.stringify(res.data.conversations)
        );
        dispatch({
          type: "new-cnv",
          payload: {
            cnv: res.data.conversations,
            msgs: res.data.messages,
            error: null,
          },
        });
      }

      if (res.data.error) {
        sessionStorage.setItem("kyoyu_error", res.data.error);
        dispatch({
          type: "new-cnv",
          payload: {
            error: res.data.error,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: "new-cnv",
        payload: {
          error: error.message,
        },
      });
    }
  };
