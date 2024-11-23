import logo from './logo.svg';
import './App.css';
import ListeStagiaires from './listeStagiaires';
import AddStagiaire from './addStagiaire';
import SuppStg from './suppStagiaire';

function App() {
  return (
    <div className="container">
      <AddStagiaire />
      <hr />
      <SuppStg />
      <hr />
      <ListeStagiaires />
    </div>
  );
}

export default App;
