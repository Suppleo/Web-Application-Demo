import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className='no-page-container'>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to='/' className='home-link'>
        Return to Homepage
      </Link>
    </div>
  )
}

export default NoPage
