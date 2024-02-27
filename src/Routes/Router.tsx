import { Routes, Route } from 'react-router-dom'
// import Home from '../Pages/Home'
import { ProtectedRoute } from './ProtectedRoute'
import { OpenRoute } from './OpenRoute'
import Landing from '../Pages/Landing'
import UserPage from '../Pages/UserPage'
import Login from '../Pages/Login'
import Results from '../Pages/Results'
import Register from '../Pages/Register'
import { User } from '../Pages/User/User'
import Edit from '../Pages/Edit'
import Followed from '../Pages/Followed'
import Announcement from '../Pages/Announcement'

export enum routes {
  register = '/register',
  login = '/login',
  results = '/results',
  announcement = '/announcement/:id',
  user = '/user/:action',
  landing = '/landing',
  edit = '/edit/:id',
  profile = 'profile/:id',
  followed = 'followed',
  all = '/*'
}

export const Router = () => (
  <Routes>
    {/* open routes*/}
    {/* <Route
      path={routes.home}
      element={
        <OpenRoute>
          <Home />
        </OpenRoute>
      }
    ></Route> */}
    <Route path={routes.all} element={<Login />}></Route>
    <Route
      path={routes.login}
      element={
        <OpenRoute>
          <Login />
        </OpenRoute>
      }
    ></Route>
    <Route
      path={routes.register}
      element={
        <OpenRoute>
          <Register />
        </OpenRoute>
      }
    ></Route>

    {/* login required - protected routes*/}
    <Route
      path={routes.landing}
      element={
        <ProtectedRoute>
          <Landing />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.user}
      element={
        <ProtectedRoute>
          <User />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.results}
      element={
        <ProtectedRoute>
          <Results />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.edit}
      element={
        <ProtectedRoute>
          <Edit />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.announcement}
      element={
        <ProtectedRoute>
          <Announcement />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.announcement}
      element={
        <ProtectedRoute>
          <Announcement />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.profile}
      element={
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      }
    ></Route>
    <Route
      path={routes.followed}
      element={
        <ProtectedRoute>
          <Followed />
        </ProtectedRoute>
      }
    ></Route>
    {/* Admin */}
  </Routes>
)
