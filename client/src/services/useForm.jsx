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
    if (!errors.email && !errors.password) {
      console.log(values);
    }
    if (values.email === "" || values.password === "") {
      toast.error("Enter All Fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    // API END-POINT { /api/auth/login }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      if (res.data.success) {
        window.localStorage.setItem("token", res.data.authToken);
        history.push("/");
        toast.success("Welcome Back", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Login Failed", {
          position: "top-right",
          autoClose: 2500,
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
      window.localStorage.setItem("Error", err);
      toast.error("Error with Login", {
        position: "top-right",
        autoClose: 2500,
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
    if (
      rvalues.username === "" ||
      rvalues.name === "" ||
      rvalues.mobile === "" ||
      rvalues.email === "" ||
      rvalues.password === "" ||
      rvalues.confirmPassword === ""
    ) {
      toast.error("Enter All Fields", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username: rvalues.username,
        name: rvalues.name,
        email: rvalues.email,
        phone: rvalues.mobile,
        password: rvalues.password,
      });

      if (res.data.success) {
        window.localStorage.setItem("token", res.data.authToken);
        history.push("/");
        toast.success("Welcome!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error("Registration Failed", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      setRvalues({
        username: "",
        name: "",
        mobile: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      window.localStorage.setItem("error", err);
      toast.error("Error while Register", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };


  const getProfile = async () => {
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
  };

  const getPost = async () => {
    const userpost = await fetch("http://localhost:5000/api/posts/getposts", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await userpost.json();

    const { posts } = json;
    setUserPosts(posts);
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
