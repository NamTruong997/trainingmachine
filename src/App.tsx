import SignInPage from 'components/page/mainpage/MainPage';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SignInPage}/>
        </Switch>
      </BrowserRouter>
    </main>
  );
}

export default App;
