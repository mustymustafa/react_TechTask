import React from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



import Home from '../src/Components/Home';
import Info from  '../src/Components/Info'

function App ()   {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Home} />
        <Switch>
          <Route exact path="/info" component={Info} />
        </Switch>
       
       
      </div>

    </Router>
  
  );

}

export default App;
