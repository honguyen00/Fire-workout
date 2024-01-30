import './App.css'
import { Outlet } from 'react-router-dom'
import { ConfigProvider, Layout, theme } from 'antd'
import NavBar from './components/Navbar'

function App() {
  return (
  <>
  <ConfigProvider theme={{
    token: {
      colorPrimary: '6530AE',
      colorSuccess: '#a3d721',
      colorInfo: '#6530ae',
      colorWarning: '#de9e29',
      colorError: '#ff5c5e',
      colorLink: '#A6CBFC',
      colorBgBase: '#000000',
      sizeStep: 5,
      sizeUnit: 2,
      borderRadius: 2,
    },
    algorithm: theme.darkAlgorithm
  }}>
  <Layout>
  <Outlet />
  </Layout>
  {window.location.pathname != '/' ? <NavBar /> : null}
  </ConfigProvider>
  </>
  )
}

export default App
