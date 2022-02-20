import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
} from "../components/Comments/api.js";

toast.configure();
const useForm = (validation) => {
  const history = useHistory();

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [userposts, setUserPosts] = useState([]);

  const [rvalues, setRvalues] = useState({
    username: "",
    name: "",
    mobile: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [profile, setProfile] = useState({
    username: "",
    name: "",
    email: "",
    phone: 0,
    followers: [],
    following: [],
    posts: [],
    profilePic: "",
    bio: "",
  });

  const [emailValues, setEmailValues] = useState({
    email: "",
  });

  const [passwordValues, setPasswordValue] = useState({
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });

    setEmailValues({
      ...emailValues,
      [name]: value,
    });

    setPasswordValue({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;

    setRvalues({
      ...rvalues,
      [name]: value,
    });
  };

  // HANDLEING LOGIN LOGIC HERE----------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors(validation(values));
    if (!errors.email && errors.password) {
      console.log(values);
    }
    // API END-POINT { /api/login }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      // console.log(res);

      if (res.data.success) {
        // console.log(res.data.authToken);
        window.localStorage.setItem("token", res.data.authToken);
        history.push("/");
        // window.localStorage.setItem(
        //   "userdata",
        //   `${res.data.userID} ${res.data.userName} ${res.data.authToken}`
        // );
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

      setValues({
        email: "",
        password: "",
      });
    } catch (err) {
      window.localStorage.setItem("error", err);
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors(validation(values));
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: rvalues.username,
        name: rvalues.name,
        email: rvalues.email,
        phone: rvalues.mobile,
        password: rvalues.password,
      });

      // console.log(res);

      if (res.data.success) {
        // console.log(res.data.authToken);
        window.localStorage.setItem("token", res.data.authToken);
        history.push("/");
        toast.success(`${res.data.message}`, {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (err) {
      window.localStorage.setItem("error", err);
      toast.error(`${err}`, {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const getProfile = useCallback(async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: { "auth-token": token },
      });
      setProfile({
        username: res.data.user.username,
        name: res.data.user.name,
        email: res.data.user.email,
        phone: res.data.user.phone,
        followers: res.data.user.followers,
        following: res.data.user.following,
        posts: res.data.user.posts,
        profilePic: res.data.user.about.profilepic,
        bio: res.data.user.about.bio,
      });
    }
  }, [setProfile]);

  const getPost = useCallback(async () => {
    const userpost = await fetch(
      "http://localhost:5000/api/posts/fetchallposts",
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token"),
        },
      }
    );

    const json = await userpost.json();

    const { posts } = json;

    // console.log(json.posts);
    setUserPosts(posts);
  }, [setUserPosts]);

  const addPost = async (url, cap = "") => {
    // eslint-disable-next-line no-unused-vars
    const token = window.localStorage.getItem("token");
    const postConfig = {
      "auth-token": localStorage.getItem("token"),
    };
    const postBody = {
      image: url,
      caption: cap,
    };
    const res = await axios.post(
      "http://localhost:5000/api/posts/addpost",
      postBody,
      {
        headers: postConfig,
      }
    );
    console.log(res);
  };

  // COMMENTS
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );
  // console.log(backendComments);
  // console.log(rootComments);
  const getReplies = (commentId) => {
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
  };

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = backendComments.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text };
        }
        return backendComment;
      });
      setBackendComments(updatedBackendComments);
      setActiveComment(null);
    });
  };
  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove comment?")) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = backendComments.filter(
          (backendComment) => backendComment.id !== commentId
        );
        setBackendComments(updatedBackendComments);
      });
    }
  };

  return {
    handleChange,
    handleRegisterChange,
    handleLogin,
    handleRegister,

    values,
    rvalues,
    emailValues,
    errors,
    passwordValues,
    getProfile,
    profile,
    setProfile,
    getPost,
    userposts,
    setUserPosts,
    addPost,

    activeComment,
    setActiveComment,
    backendComments,
    setBackendComments,
    getReplies,
    addComment,
    deleteComment,
    updateComment,
    rootComments,
  };
};

export default useForm;
