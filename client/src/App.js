import { Route, Switch } from 'react-router-dom';
import './App.css';
import './styles/components.css';
import About from './components/About/About';
import CountryDetail from './components/CountryDetail/CountryDetail';
import CreateActivity from './components/CreateActivity/CreateActivity';
import Home from './components/Home/Home';
import LoadPage from './components/LoadPage/LoadPage';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={LoadPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/countries/:idPais" component={CountryDetail}/>
        <Route path="/activities" component={CreateActivity}/>
        <Route path="/about" component={About}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
