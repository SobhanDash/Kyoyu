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

const UserProfilePage = React.lazy(() =>
  import("./pages/ProfilePage/UserProfile")
);

// const MsgPage = React.lazy(() => import("./pages/MessagePage/MessagePage"));

const Following = React.lazy(() => import("./pages/FollowList/Following"));

const Followers = React.lazy(() => import("./pages/FollowList/Followers"));

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

// const MsgPageComponent = WithPageTitle({
//   component: MsgPage,
//   title: "Message",
// });

const FollowingComponent = WithPageTitle({
  component: Following,
  title: "Following",
});

const FollowersComponent = WithPageTitle({
  component: Followers,
  title: "Followers",
});

const RouteConfig = ({ UserContext }) => {
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const { state, dispatch } = useContext(UserContext);
  const tokenFetch = async () => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
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
      <Route
        exact
        path="/userprofile/:userid"
        component={UserProfileComponent}
      />
       <Route exact path="/following" component={FollowingComponent} />
      <Route exact path="/followers" component={FollowersComponent} />
      {/*<Route exact path="/message" component={MsgPageComponent} /> */}
    </Switch>
  );
};

export default RouteConfig;
