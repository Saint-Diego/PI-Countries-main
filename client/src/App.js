import { Switch } from 'react-router-dom';
import './App.css';
import './styles/components.css';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';
import Home from './components/Home/Home';
import LoadPage from './components/LoadPage/LoadPage';
import NavBar from './components/NavBar/NavBar';
import NotFound from './components/NotFound/NotFound';
import RecipeDetail from './components/RecipeDetail/RecipeDetail';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Switch>
        <Route exact path="/" component={LoadPage}/>
        <Route exact path="/home" component={Home}/>
        <Route path="/countries/:idPais" component={RecipeDetail}/>
        <Route path="/activities" component={CreateRecipe}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </div>
  );
}

export default App;
