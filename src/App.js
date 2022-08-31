import logo from './logo.svg';
import './App.css';


function App() {

  const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const RESPONSE_TYPE = process.env.REACT_APP_RESPONSE_TYPE;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Now Playing</h1>
        <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>
          Log in to Spotify
        </a>
      </header>
    </div>
    );
}

export default App;

