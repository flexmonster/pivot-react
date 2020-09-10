import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import TopMenu from './components/UIElements/topMenu/TopMenu'
import SideMenu from './components/UIElements/sideMenu/SideMenu'
import ExamplesContainer from './components/UIElements/examplesContainer/ExamplesContainer'

class App extends Component {
  render(){
    return (
      <div id="app">
        <Router>
          <TopMenu/>
          <div className="wrapper">
            <SideMenu/>
            <ExamplesContainer/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
