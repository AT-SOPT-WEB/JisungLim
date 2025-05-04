import React from 'react'
import { RouterProvider } from 'react-router'
import router from './router/Router'
import GlobalStyles from './styles/GlobalStyles'

const App = () => {
  return (
    <div>
      <GlobalStyles />
      <RouterProvider router={router} />
    </div>
  )
}

export default App
