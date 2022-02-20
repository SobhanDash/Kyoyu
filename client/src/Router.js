import React from "react";
import { Switch, Route } from "react-router-dom";
import WithPageTitle from "./services/WithPageTitle";

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

const RouteConfig = () => {
  return (
    <Switch>
      <Route exact path="/" component={IndexComponent} />
      <Route exact path="/login" component={LoginComponent} />
      <Route exact path="/register" component={RegisterComponent} />
      <Route exact path="/profile" component={ProfileComponent} />
      <Route exact path="/editProfile" component={EditProfileComponent} />
      <Route exact path="/post/:postid" component={CommentsComponent} />
    </Switch>
  );
};

export default RouteConfig;
