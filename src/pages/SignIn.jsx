import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import Header from '../partials/Header'
import PageIllustration from '../partials/PageIllustration'
import { useEffect } from 'react'
import { Button, useToast } from '@chakra-ui/react'
import FacebookLogin from 'react-facebook-login'
import { FaceFrownIcon } from '@heroicons/react/20/solid'

function SignIn() {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    const authToken = Cookies.get('token')
    if (authToken) {
      navigate('/dashboard')
    }
  }, [])

  const handleSignIn = async (e) => {
    e.preventDefault()

    if (email.includes('.') && email.includes('@') && password.length > 2) {
      setDisabled(true)
      try {
        const response = await fetch('http://localhost:5000/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })

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

  const handleSubmitGoogle = async (googleAccessToken) => {
    setDisabled(true)
    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ googleAccessToken }),
      })

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
  }

  const handleSubmitFB = async (data) => {
    console.log(data)
    setDisabled(true)
    const res = await fetch(`http://localhost:5000/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fb: data }),
    })

    const res2 = await res.json()
    console.log(res2)
    if (res2.error) {
      toast({
        title: res2.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (res2.token) {
      Cookies.set('token', res2.token, { expires: 7 })
      Cookies.set('email', res2.email, { expires: 7 })
      navigate('/dashboard')
    } else {
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    setDisabled(false)
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse)
      handleSubmitGoogle(tokenResponse.access_token)
    },
  })

  const responseFacebook = (response) => {
    handleSubmitFB(response)
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="grow">
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">
                  Welcome back. We exist to make entrepreneurship easier.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <div className="flex flex-wrap -mx-3">
                  <div className="w-full px-3">
                    <button
                      onClick={googleLogin}
                      className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center"
                    >
                      <svg
                        className="w-4 h-4 fill-current text-white opacity-75 shrink-0 mx-4"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                      </svg>
                      <span
                        className="h-6 flex items-center border-r border-white border-opacity-25 mr-4"
                        aria-hidden="true"
                      ></span>
                      <span className="flex-auto pl-16 pr-8 -ml-16">
                        Sign in with Google
                      </span>
                    </button>
                  </div>
                  <div className="w-full my-2 px-3">
                    {/* btn px-0 text-white bg-blue-600 hover:bg-blue-700 w-full relative flex items-center */}
                    <FacebookLogin
                      appId="707856684325818"
                      autoLoad={false}
                      fields="email"
                      callback={responseFacebook}
                      textButton="Sign in with Facebook"
                      cssClass="my-facebook-button-class"
                      buttonStyle={{
                        backgroundColor: 'blue',
                        padding: '1rem',
                        paddingInline: '4.7rem',
                        width: '100%',
                        marginTop: '0.5rem',
                        borderRadius: '2px',
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-700 border-dotted grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-400">
                    Or, sign in with your email
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full text-gray-300"
                      placeholder="you@yourcompany.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full text-gray-300"
                      placeholder="Password (at least 10 characters)"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="flex justify-between">
                      <label className="flex items-center">
                        <input type="checkbox" className="form-checkbox" />
                        <span className="text-gray-400 ml-2">
                          Keep me signed in
                        </span>
                      </label>
                      <Link
                        to="/reset-password"
                        className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <Button
                      disabled={disabled}
                      className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                      isLoading={disabled}
                      bg="purple-700"
                      onClick={handleSignIn}
                    >
                      Sign in
                    </Button>
                  </div>
                </div>
                <div className="text-gray-400 text-center mt-6">
                  Don’t you have an account?{' '}
                  <Link
                    to="/signup"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Sign up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default SignIn
