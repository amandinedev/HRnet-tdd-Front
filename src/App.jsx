import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './reduxFeatures/store.js';
import Router from './components/Router/Router.jsx';
import '../src/sass/index.scss';

const root = document.getElementById("root");

function App() {
  return (
    <>
      <Router/>
    </>
  );
}

createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading Redux state...</div>} persistor={persistor}>
        <App/>
      </PersistGate>
    </Provider>
  </StrictMode>
);

export default App;