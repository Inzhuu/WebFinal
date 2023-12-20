import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom/cjs/react-router-dom.min';

import './App.css';

import { Input } from './Input';
import { List } from './List';
import { Details } from './Details';
import { ErrorBoundary } from './ErrorBoundary';
import { useCitiesList } from './hooks/useCitiesList';

export const GlobalContext = React.createContext();

function App() {
  const [state, dispatch] = useCitiesList();
  return (
    <BrowserRouter>
      <GlobalContext.Provider value={{ state, dispatch }}>
        <div className="Main">
          <Route path="/home">
            <Input />
            <ErrorBoundary>
              <List />
            </ErrorBoundary>
          </Route>
          <Route path="/city/:city" component={Details} />
        </div>
      </GlobalContext.Provider>
    </BrowserRouter>
  );
}

export default App;