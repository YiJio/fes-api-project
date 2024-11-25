// packages
import { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// css
import './screens.css';
// layouts
import HomeLayout from './layouts/HomeLayout';
import RootLayout from './layouts/RootLayout';
// pages
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import LinePage from './pages/LinePage';
import StationPage from './pages/StationPage';
import CreditsPage from './pages/CreditsPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([{
  element: <HomeLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { path: '/', element: <HomePage /> },
    {
      element: <RootLayout />,
      children: [
        { path: '/search', element: <SearchPage /> },
        { path: '/line/:line', element: <LinePage /> },
        { path: '/station/:station', element: <StationPage /> },
        { path: '/credits', element: <CreditsPage /> },
      ]
    }
  ]
}]);

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;