import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import rout from './Rout/Rout.jsx'
import { HelmetProvider } from 'react-helmet-async';
import Authonicate from './ContextHandler/Authonicate/Authonicate.jsx'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <HelmetProvider >
        <Authonicate>
          <RouterProvider router={rout}></RouterProvider>
        </Authonicate>
      </HelmetProvider>
    </QueryClientProvider>

  </React.StrictMode>,
)
