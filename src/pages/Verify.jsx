import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useToast } from '@chakra-ui/react'

function Verify() {
  const { email, otp } = useParams()
  const router = useNavigate()
  const toast = useToast()
  console.log(email, otp)

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/verify`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            otp,
            email: email,
          }),
        })

        const res = await response.json()
        console.log(res)

        if (res.message) {
          toast({
            title: res.message,
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setTimeout(() => {
            router('/signin')
          }, 2000)
        } else if (res.error) {
          toast({
            title: res.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setTimeout(() => {
            router('/signin')
          }, 2000)
        }
      } catch (error) {
        Swal.showValidationMessage(`Request failed: ${error}`)
      }
    }

    verifyEmail()
  }, [email, otp, router, toast])

  return null // or return any loading component if needed
}

export default Verify
