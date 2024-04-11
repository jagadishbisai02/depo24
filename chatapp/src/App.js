import { Switch, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
const App = () => {
  return (
    <Switch>
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/setAvatar" component={SetAvatar} />
      <Route exact path="/" component={Chat} />
    </Switch>
  );
};

export default App;
