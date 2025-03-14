import { Link } from 'react-router-dom'
import { Button } from "@/components/ui/button"
import { Home } from "lucide-react"

const NoPage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen text-center px-4'>
      <h1 className='text-9xl font-bold text-gray-200'>404</h1>
      <h2 className='text-3xl font-semibold mt-4 mb-2'>Page Not Found</h2>
      <p className='text-gray-500 mb-8'>The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link to='/' className='flex items-center gap-2'>
          <Home className="h-4 w-4" />
          Return to Homepage
        </Link>
      </Button>
    </div>
  )
}

export default NoPage
