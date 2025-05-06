import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

export default function AuthListener() {

    const token = useSelector((state) => state.auth.token)
    const navigate = useNavigate()
    const prevAuthRef = useRef(token)
  
    useEffect(() => {
        console.log(prevAuthRef.current)
        console.log(token)
      if (prevAuthRef.current && !token ) {
        
        navigate('/', {replace: true}) 
      }
      prevAuthRef.current = token
    }, [token, navigate])

  return null
}