import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
]);

export const Router = () => <RouterProvider router={router} />;
