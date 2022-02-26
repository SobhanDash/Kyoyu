import React, { useEffect, useContext } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import WithPageTitle from "./services/WithPageTitle";
import axios from "axios";

const LoginPage = React.lazy(() => import("./pages/LoginPage/LoginPage"));
const RegisterPage = React.lazy(() =>
  import("./pages/RegisterPage/RegisterPage")
);
const IndexPage = React.lazy(() => import("./pages/Index/Index"));
const ProfilePage = React.lazy(() => import("./pages/ProfilePage/ProfilePage"));
const EditProfilePage = React.lazy(() =>
  import("./pages/ProfilePage/EditProfile")
);
const CommentsPage = React.lazy(() =>
  import("./pages/CommentsPage/CommentsPage")
);
const UserProfilePage = React.lazy(() => {
  import("./pages/ProfilePage/UserProfile");
});

const IndexComponent = WithPageTitle({
  component: IndexPage,
  title: "Kyōyū",
});

const LoginComponent = WithPageTitle({
  component: LoginPage,
  title: "Login",
});

const RegisterComponent = WithPageTitle({
  component: RegisterPage,
  title: "Register",
});

const ProfileComponent = WithPageTitle({
  component: ProfilePage,
  title: "Profile",
});

const EditProfileComponent = WithPageTitle({
  component: EditProfilePage,
  title: "Edit Profile",
});

const CommentsComponent = WithPageTitle({
  component: CommentsPage,
  title: "Edit Profile",
});
const UserProfileComponent = WithPageTitle({
  component: UserProfilePage,
  title: "User Profile",
});

const RouteConfig = ({ UserContext }) => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const tokenFetch = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const res = await axios.get("/api/auth/profile", {
        headers: { "auth-token": token },
      });
      if (res.data.user) {
        dispatch({ type: "USER", payload: res.data.user });
      } else {
        if (!history.location.pathname.startsWith("/reset"))
          history.push("/login");
      }
    }
  };
  useEffect(() => {
    tokenFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Switch>
      <Route exact path="/" component={IndexComponent} />
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
      <Route exact path="/profile" component={ProfileComponent} />
      <Route exact path="/editProfile" component={EditProfileComponent} />
      <Route exact path="/post/:postid" component={CommentsComponent} />
      <Route exact path="/profile/:userid" component={UserProfileComponent} />
    </Switch>
  );
};

export default RouteConfig;
