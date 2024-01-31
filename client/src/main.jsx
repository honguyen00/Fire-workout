import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Profile from './pages/Profile.jsx'
import Excercises from './pages/Exercises.jsx'
import Workout from './pages/Workout.jsx'
import History from './pages/History.jsx'
import Measure from './pages/Measure.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    // errorElement: <h1>404! Sorry, the page you are trying to access does not exist.</h1>,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/profile',
        element: <Profile />
      },
      {
        path: '/history',
        element: <History />
      },
      {
        path: '/workout',
        element: <Workout />
      },
      {
        path: '/exercises',
        element: <Excercises />
      },
      {
        path: '/measure',
        element: <Measure />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)