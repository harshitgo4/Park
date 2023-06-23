import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Button, useToast } from '@chakra-ui/react'

function SignIn() {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)

  // useEffect(() => {
  //   const authToken = Cookies.get('token')
  //   if (authToken) {
  //     navigate('/dashboard')
  //   }
  // }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (email.includes('.') && email.includes('@') && password.length > 2) {
      setDisabled(true)
      try {
        const response = await fetch(
          'https://bdsm-backend.onrender.com/api/signin',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
            }),
          },
        )

        const data = await response.json()

        if (data.error) {
          toast({
            title: data.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        } else if (data.token) {
          Cookies.set('token', data.token, { expires: 7 })
          Cookies.set('email', data.email, { expires: 7 })
          setTimeout(() => {
            navigate('/dashboard')
          }, 2000)
        } else {
          toast({
            title: 'Something went wrong!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }

        setDisabled(false)
      } catch (error) {
        console.log('Error occurred:', error)
        toast({
          title: 'An error occured during signin',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
        setDisabled(false)
      }
    } else {
      toast({
        title: 'Invalid email or password',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  // const handleSubmitGoogle = async (googleAccessToken) => {
  //   setDisabled(true)
  //   try {
  //     const response = await fetch(
  //       'https://bdsm-backend.onrender.com/api/signin',
  //       {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ googleAccessToken }),
  //       },
  //     )

  //     const data = await response.json()

  //     if (data.error) {
  //       toast({
  //         title: data.error,
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //       })
  //     } else if (data.token) {
  //       Cookies.set('token', data.token, { expires: 7 })
  //       Cookies.set('email', data.email, { expires: 7 })
  //       setTimeout(() => {
  //         navigate('/dashboard')
  //       }, 2000)
  //     } else {
  //       toast({
  //         title: 'Something went wrong!',
  //         status: 'error',
  //         duration: 9000,
  //         isClosable: true,
  //       })
  //     }

  //     setDisabled(false)
  //   } catch (error) {
  //     console.log('Error occurred:', error)
  //     toast({
  //       title: 'An error occured during signin',
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     })
  //     setDisabled(false)
  //   }
  // }

  // const handleSubmitFB = async (data) => {
  //   setDisabled(true)
  //   const res = await fetch(`https://bdsm-backend.onrender.com/api/signin`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ fb: data.data }),
  //   })

  //   const res2 = await res.json()
  //   console.log(res2)
  //   if (res2.error) {
  //     toast({
  //       title: res2.error,
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     })
  //   } else if (res2.token) {
  //     Cookies.set('token', res2.token, { expires: 7 })
  //     Cookies.set('email', res2.email, { expires: 7 })
  //     navigate('/dashboard')
  //   } else {
  //     toast({
  //       title: 'Something went wrong!',
  //       status: 'error',
  //       duration: 9000,
  //       isClosable: true,
  //     })
  //   }
  //   setDisabled(false)
  // }

  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) =>
  //     handleSubmitGoogle(tokenResponse.access_token),
  // })

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">

      {/*  Page content */}
      <main className="grow">

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to make entrepreneurship easier.
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignIn
