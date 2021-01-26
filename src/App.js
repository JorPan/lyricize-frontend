import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import Header from "./containers/Header";
import About from "./pages/About";
import Write from "./pages/Write";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={About} />
        <Route exact path="/write" component={Write} />
      </Switch>
    </div>
  );
}

export default App;
