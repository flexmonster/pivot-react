import React, {Component} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import './App.css';
import TopMenu from './components/UIElements/topMenu/TopMenu'
import ContentPanel from './components/UIElements/contentPanel/ContentPanel'

class App extends Component {
  render(){
    return (
      <div id="app">
        <Router>
          <TopMenu/>
          <ContentPanel/>
        </Router>
      </div>

    );
  }

}

export default App;
