import { BrowserRouter } from 'react-router';
import RouterProvider from './router/RouterProvider';
import { store } from './store';
import { Provider } from 'react-redux';
import { AppInitializer } from './providers/AppInitializer';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <AppInitializer/>
      <RouterProvider />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
