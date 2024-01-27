import './App.css'
import { Route, Routes } from 'react-router-dom'
import { ConfigProvider, Layout, theme } from 'antd'

import Profile from './pages/Profile'
import History from './pages/History'
import Workout from './pages/Workout'
import Excercises from './pages/Exercises'
import Measure from './pages/Measure'
import Login from './pages/Login'

function App() {
  return (
  <>
  <ConfigProvider theme={{
    token: {
      colorPrimary: '6530AE',
      colorSuccess: '#a3d721',
      colorInfo: '#6530ae',
      colorWarning: '#de9e29',
      colorError: '#c2282a',
      colorLink: '#1677ff',
      colorBgBase: '#000000',
      sizeStep: 5,
      sizeUnit: 2,
      borderRadius: 2,
    },
    algorithm: theme.darkAlgorithm
  }}>
  <Layout>
  <Routes>
    <Route path='/profile' element={<Profile />}></Route>
    <Route path='/history' element={<History />}></Route>
    <Route path='/workout' element={<Workout />}></Route>
    <Route path='/exercises' element={<Excercises />}></Route>
    <Route path='/measure' element={<Measure />}></Route>
    <Route path='/' element={<Login />}></Route>
  </Routes>
  </Layout>
  </ConfigProvider>
  </>
  )
}

export default App
