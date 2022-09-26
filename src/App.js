//import logo from './logo.svg';
import './App.css';
import React from 'react';
import RepoList from './components/repolist';

function App() {
  return (
    <div className="App">
      <nav>Cyral Quickstart Repositories</nav>
      <header className="App-header">
        <RepoList/>
      </header>
    </div>
  );
}

export default App;
