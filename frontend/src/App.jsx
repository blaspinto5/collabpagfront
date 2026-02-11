/**
 * App Component
 * Root component with router provider
 */

import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
