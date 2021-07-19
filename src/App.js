import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Funds from "./Funds";

function App() {
  return (
    <Router>
      <Navbar />
      <Funds />
    </Router>
  );
}

export default App;
