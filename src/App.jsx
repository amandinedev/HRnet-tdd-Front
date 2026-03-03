import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './reduxFeatures/store.js';
import Router from './components/Router/Router.jsx';
import '../src/sass/index.scss';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

function App() {
  return (
    <>
      <Router/>
    </>
  );
}

root.render(
  <StrictMode>
    <Provider store={store}>
        <App/>
    </Provider>
  </StrictMode>
);

export default App;