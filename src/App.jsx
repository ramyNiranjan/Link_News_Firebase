import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
// import CreateLink from "./components/Link/CreateLink";
import Home from "./Home";
import CreateLink from "./components/CreateLink";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={CreateLink} />
      <Route path="/edit/:id" component={CreateLink} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      {/* <Route exact path="/" render={() => <Redirect to="/new/1" />} /> */}
      {/* <Route path="/new/:page" component={LinkList} /> */}
      {/* <Route path="/login" component={Login} />
      <Route path="/forgot" component={ForgotPassword} />
      <Route path="/search" component={SearchLinks} />
      <Route path="/top" component={LinkList} />
      <Route path="/new/:page" component={LinkList} />
      <Route path="/link/:linkId" component={LinkDetail} /> */}
    </Switch>
  );
}

export default App;
