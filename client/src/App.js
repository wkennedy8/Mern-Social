import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Profile from './pages/Profile';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/users/:id" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
