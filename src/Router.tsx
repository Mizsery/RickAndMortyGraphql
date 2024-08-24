import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

import { Container } from './components/Layout/Container';
import { Character } from './pages/Character/Character';

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
        path: '/locations/:id',
        element: <div>Location id</div>
      },
      {
        path: '/episodes',
        element: <div>Episodes</div>
      },
      {
        path: '/episodes/:id',
        element: <div>Episode id</div>
      },
      {
        path: '/characters/:id',
        element: <Character />
      }
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
