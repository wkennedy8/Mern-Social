import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AppContextProvider } from './context/AppContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Profile from './pages/Profile';
import Navigation from './components/Navigation';

function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <Navigation />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Register} />
          <PrivateRoute exact path="/" component={Home} />
          <PrivateRoute exact path="/users/:id" component={Profile} />
        </Switch>
      </BrowserRouter>
    </AppContextProvider>
  );
}

export default App;
