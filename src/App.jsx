// packages
import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// css
import 'react-loading-skeleton/dist/skeleton.css'
// hooks
import useDbData from './hooks/useDbData';
// layouts
import RootLayout from './layouts/RootLayout';
import MainLayout from './layouts/MainLayout';
// pages
import { LandingPage } from './pages/landing';
import { HomePage } from './pages/home';
import { SearchPage } from './pages/search';
import { LinePage } from './pages/line';
import { StationPage } from './pages/station';
import CreditsPage from './pages/CreditsPage';
import NotFoundPage from './pages/NotFoundPage';
import TestPage from './pages/TestPage';

const router = createBrowserRouter([{
  element: <RootLayout />,
  errorElement: <NotFoundPage />,
  children: [
    { path: '/', element: <LandingPage /> },
    {
      element: <MainLayout />,
      children: [
        { path: '/home', element: <HomePage /> },
        { path: '/search', element: <SearchPage /> },
        { path: '/line/:lineId', element: <LinePage /> },
        { path: '/station/:stationId', element: <StationPage /> },
        { path: '/credits', element: <CreditsPage /> },
        { path: '/test', element: <TestPage /> },
      ]
    }
  ]
}]);

function App() {
  // force hook to cache data already regardless of where user is
  const { lines, stations } = useDbData();

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;