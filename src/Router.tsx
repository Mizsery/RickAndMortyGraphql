import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

import { Container } from './Layout/Container';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
