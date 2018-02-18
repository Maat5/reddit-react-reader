import React, { Component } from 'react';
import { connect } from 'react-redux';
import TopicScreen from './containers/topics/TopicsScreen';
import PostsScreen from './containers/posts/PostsScreen';
import * as topicsSelectors from './store/topics/reducer';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React Workshop</h1>
        </header>
        {
          !this.props.isSelectionFinalized ?
            <TopicScreen /> :
            <PostsScreen />
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSelectionFinalized: topicsSelectors.isTopicSelectionFinalized(state)
  };
}

export default connect(mapStateToProps)(App);