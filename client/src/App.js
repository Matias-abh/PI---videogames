import { Route, useLocation } from 'react-router-dom';
import { Landing, Home, Detail, Form } from './views/index.js';
import NavBar from './components/NavBar/NavBar.jsx';


function App() {

  const { pathname } = useLocation();



  return (
    <div>
      {pathname !== '/' && <NavBar />}
      <Route exact path='/' render={() => <Landing />} />
      <Route exact path='/home' render={() => <Home />} />
      <Route exact path='/detail/:gameId' render={({ match }) => <Detail match={match} />} />
      <Route path='/create' render={() => <Form />} />
    </div>
  );
}

export default App;
