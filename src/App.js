import React, {useState} from 'react';
import './App.scss';

import {BrowserRouter as Router, Switch, Route, Link, withRouter} from 'react-router-dom';

import Calculator from './components/calculator/calculator.component'
import Opening from './components/opening/opening.component';
import Summary from './components/summary/summary.component';




const goTo = (path) => {
  this.props.history.push(path);
}

const App = () => {
  const [data, setData] = useState('');

  const getState = (state) => {
    setData(state);
  }

  return (
    <div className="App">
      <Switch>
        <Route exact path='/' render={() => <Opening goTo={goTo}/>}/>
        <Route path='/calculator' render={() => <Calculator getState={getState} />} />
        <Route exact path='/summary' render={() => <Summary data={data} />} />
      </Switch>
    </div>
  );
}

export default withRouter(App);
