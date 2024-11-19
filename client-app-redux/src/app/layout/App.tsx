import { Container } from 'semantic-ui-react'
import NavBar from './NavBar'
import { Outlet, useLocation } from 'react-router-dom'
import HomePage from '../../features/home/HomePage'
import { ToastContainer } from 'react-toastify'
import { NavRoutes } from '../../shared/enums'

function App() {

  const location = useLocation();

  return (
    <>
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      {location.pathname === NavRoutes.Home ? <HomePage /> : (
        <>
          <NavBar />
          <Container style={{ marginTop: '7em' }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  )
}

export default App
