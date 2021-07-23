import { BrowserRouter as Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Funds from "./Funds";
import FundCreate from "./FundCreate";
import FundView from "./FundView";

function App() {
  return (
    <>
      <Navbar />
      <Switch>
          <Route exact path='/' component={Funds} />
          <Route exact path='/create' component={FundCreate} />
          <Route exact path='/view/:id' component={FundView} />
        </Switch>
    </>
  );
}

export default App;
