import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

import { Container } from './components/Layout/Container';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    errorElement: <div>Page doesn`t exist</div>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/locations',
        element: <div>Locations</div>
      },
      {
        path: '/episodes',
        element: <div>Episodes</div>
      },
      {
        path: '/character/:id',
        element: <div>current character </div>
      }
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
