// packages
import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
// css
import 'react-loading-skeleton/dist/skeleton.css'
// hooks
import useDbData from './hooks/useDbData';
// layouts
import { MainLayout, RootLayout } from './layouts';
// pages
import { CreditsPage, HomePage, LandingPage, LinePage, NotFoundPage, SearchPage, StationPage } from './pages';
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