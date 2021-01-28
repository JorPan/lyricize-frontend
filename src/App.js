import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./containers/Header";
import About from "./pages/About";
import Write from "./pages/Write";
import Songs from "./pages/Songs";
import Lyrics from "./pages/Lyrics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/songs" component={Songs} />
        <Route exact path="/lyrics" component={Lyrics} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
