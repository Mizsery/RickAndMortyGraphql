import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from '@pages/Home/Home';

import { Container } from './components/Layout/Container';
import { NotFound } from './components/NotFound/NotFound';
import { Episode } from './pages/Episodes/Episode/Episode';
import { EpisodesPage } from './pages/Episodes/Episodes';
import { Character } from './pages/Home/Character/Character';
import { Location } from './pages/Locations/Location/Location';
import { LocationsPage } from './pages/Locations/Locations';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Container />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/locations',
        element: <LocationsPage />
      },
      {
        path: '/locations/:id',
        element: <Location />
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
