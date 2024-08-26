import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

import { Container } from './components/Layout/Container';
import { Episode } from './pages/Episodes/Episode/Episode';
import { EpisodesPage } from './pages/Episodes/Episodes';
import { Character } from './pages/Home/Character/Character';

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
        element: <EpisodesPage />
      },
      {
        path: '/episodes/:id',
        element: <Episode />
      },
      {
        path: '/characters/:id',
        element: <Character />
      }
    ]
  }
]);

export const Router = () => <RouterProvider router={router} />;
