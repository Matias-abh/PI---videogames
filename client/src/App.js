import { Route, Switch, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views/index.js';
import NavBar from './components/NavBar/NavBar.jsx';
import PageNotFound from './components/PageNotFound/PageNotFound.jsx';


function App() {

  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/' && <NavBar />}
    <Switch>      
      <Route exact path='/' render={() => <Landing />} />
      <Route exact path='/home' render={() => <Home />} />
      <Route exact path='/detail/:gameId' render={({ match }) => <Detail match={match} />} />
      <Route exact path='/create' render={() => <Form />} />
      <Route path="*" component={PageNotFound} />
    </Switch>
    </>
  );
}

export default App;
