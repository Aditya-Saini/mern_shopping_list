import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import {Container} from 'reactstrap';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
          <AppNavbar/>
          <ItemModal/>
          <ShoppingList/>
      </div>
    </Provider>
  );
}

export default App;
