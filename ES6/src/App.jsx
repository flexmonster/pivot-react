import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import TopMenu from './components/UIElements/TopMenu'
import SideMenu from './components/UIElements/SideMenu'
import ExamplesContainer from './components/UIElements/ExamplesContainer'

class App extends Component {
  render(){
    return (
      <div id="app">
        <Router>
          <TopMenu/>
          <div className="wrap">
            <SideMenu/>
            <ExamplesContainer/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
