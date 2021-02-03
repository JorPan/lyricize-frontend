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
        <Route path="/write" component={Write} />
        <Route path="/songs" component={Songs} />
        <Route path="/lyrics" component={Lyrics} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
