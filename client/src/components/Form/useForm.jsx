import { useCallback, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useForm = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();

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

  // const [errors, setErrors] = useState({});

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email: values.email,
        password: values.password,
      });

      // console.log(res);

      if (res.data.success) {
        console.log(res.data.authToken);
        window.localStorage.setItem("token", res.data.authToken);
        history.push("/");
        // window.localStorage.setItem(
        //   "userdata",
        //   `${res.data.userID} ${res.data.userName} ${res.data.authToken}`
        // );
      }

      setValues({
        email: "",
        password: "",
      });
    } catch (err) {
      window.localStorage.setItem("error", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    //TODO: validation for password and confiirmPassword
    //TODO: encrypt pass and confirmPass
    // const erpassword = "Encrypt the password";
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
      }
    } catch (err) {
      window.localStorage.setItem("error", err);
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
    console.log("post");
    setUserPosts(posts);
  }, [setUserPosts]);

  const addPost = async (url, cap = "") => {
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

  return {
    handleChange,
    handleRegisterChange,
    handleLogin,
    handleRegister,
    values,
    rvalues,
    emailValues,
    // errors,
    passwordValues,
    getProfile,
    profile,
    getPost,
    userposts,
    addPost,
  };
};

export default useForm;
