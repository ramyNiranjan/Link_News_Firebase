import React from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import Home from "./Home";
import CreateLink from "./components/CreateLink";
import About from "./components/About";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/create" component={CreateLink} />
      <Route path="/edit/:id" component={CreateLink} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/signUp" component={SignUp} />
      <Route path="/about" component={About} />
    </Switch>
  );
}

export default App;
