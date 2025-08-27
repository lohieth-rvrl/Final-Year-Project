import { useEffect } from 'react'
import { useLocation } from 'wouter'

export default function Redirect({ to }) {
  const [, setLocation] = useLocation()
  useEffect(() => {
    setLocation(to)
  }, [to, setLocation])
  return null
}


