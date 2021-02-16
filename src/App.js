import SearchBox from "./components/SearchBox"
import { Provider } from "react-redux"
import store from "./store/store"
import Graph from "./components/Graph"
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <SearchBox />
        <Graph />
      </div>
    </Provider>
  );
}

export default App;
