import logo from './logo.svg';
import './App.css';
import ImageBoard from './ImageBoard';
//https://source.unsplash.com/random
function App() {
  return (
    <div>
      <div className="App">
        Image App
      </div>
      <ImageBoard count = {10} interval = {3000}/>
    </div>
  );
}

export default App;
