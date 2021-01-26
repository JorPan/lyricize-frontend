import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./containers/Header";
import About from "./pages/About";
import Write from "./pages/Write";
import Songs from "./pages/Songs";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/write" component={Write} />
        <Route exact path="/songs" component={Songs} />
      </Switch>
    </div>
  );
}

export default App;
