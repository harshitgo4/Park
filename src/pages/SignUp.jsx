import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import Header from '../partials/Header'
import PageIllustration from '../partials/PageIllustration'
import { Button, Input, useToast } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'
import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  ModalFooter,
} from '@chakra-ui/react'
import FacebookLogin from 'react-facebook-login'

function SignUp() {
  const router = useNavigate()
  const toast = useToast()

  const [disabled, setDisabled] = React.useState(false)
  const [token, setToken] = React.useState({
    googleAccessToken: '',
    fb: '',
  })
  const [data, setData] = React.useState({
    fName: '',
    lName: '',
    email: '',
    password: '',
    type: 'dom',
    phone: '',
  })

  const authToken = Cookies.get('token')
  if (authToken) {
    router('/dashboard')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      data.email.includes('.') &&
      data.email.includes('@') &&
      data.fName.length > 2 &&
      data.lName.length > 1 &&
      data.password.length > 2
    ) {
      setDisabled(true)
      const res = await fetch(`http://localhost:5000/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fName: data.fName,
          lName: data.lName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          type: data.type,
        }),
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
      } else if (res2.message) {
        toast({
          title: 'OTP Sent!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        Swal.fire({
          title: `We’ve sent a verification code to your email: ${data.email}. Please enter it here.`,
          input: 'number',
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: (otp) => {
            return fetch(`http://localhost:5000/api/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                otp,
                email: data.email,
              }),
            })
              .then((response) => response.json())
              .then((res) => {
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
                }
              })
              .catch((error) => {
                Swal.showValidationMessage(`Request failed: ${error}`)
              })
          },
          allowOutsideClick: () => !Swal.isLoading(),
        })
      } else {
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      setDisabled(false)
    } else {
      console.log('Error')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const preHandlerSocialLogin = async (googleAccessToken, fb) => {
    onOpen()
    console.log(googleAccessToken, fb)
    if (googleAccessToken) {
      setToken({ googleAccessToken, fb: null })
    } else if (fb) {
      setToken({ googleAccessToken: null, fb })
    }
  }

  const handleSubmitGoogle = async (googleAccessToken) => {
    setDisabled(true)
    const res = await fetch(`http://localhost:5000/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        googleAccessToken,
        fName: data.fName,
        lName: data.lName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        type: data.type,
      }),
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
    } else if (res2.message) {
      toast({
        title: 'User Created!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        router('/signin')
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
  }

  const handleSubmitFB = async (fb) => {
    setDisabled(true)
    const res = await fetch(`http://localhost:5000/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fb: fb,
        phone: data.phone,
        type: data.type,
      }),
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
    } else if (res2.message) {
      toast({
        title: 'User Created!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        router('/signin')
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
  }

  const handleChange = (e) => {
    const newdata = { ...data }
    newdata[e.target.id] = e.target.value
    setData(newdata)
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) =>
      preHandlerSocialLogin(tokenResponse.access_token, null),
    // flow: 'implicit', // implicit is the default
  })

  const responseFacebook = (response) => {
    preHandlerSocialLogin(null, response)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

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
                  Welcome. We exist to make entrepreneurship easier.
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
                        Sign up with Google
                      </span>
                    </button>
                  </div>
                  <div className="w-full px-3 my-2">
                    {/* btn px-0 text-white bg-blue-600 hover:bg-blue-700 w-full relative flex items-center */}
                    <FacebookLogin
                      appId="707856684325818"
                      autoLoad={false}
                      fields="email,first_name,last_name,picture"
                      callback={responseFacebook}
                      textButton="Sign up with Facebook"
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
                    Or, register with your email
                  </div>
                  <div
                    className="border-t border-gray-700 border-dotted grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <div className="p-2 rounded-3xl text-white bg-blue-500 text-center">
                      <button
                        className={`p-4 w-1/3 rounded-3xl ${
                          data.type === 'dom' ? 'text-blue-500 bg-white' : ''
                        }`}
                        onClick={() => setData({ ...data, type: 'dom' })}
                      >
                        Dom
                      </button>
                      <button
                        className={`p-4 w-1/3 rounded-3xl ${
                          data.type === 'sub' ? 'text-blue-500 bg-white' : ''
                        }`}
                        onClick={() => setData({ ...data, type: 'sub' })}
                      >
                        Sub
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block  text-sm font-medium mb-1"
                      htmlFor="fName"
                    >
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="fName"
                      type="text"
                      className="form-input w-full "
                      placeholder="First name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block  text-sm font-medium mb-1"
                      htmlFor="lName"
                    >
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="lName"
                      type="text"
                      className="form-input w-full "
                      placeholder="Last name"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block  text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Phone no. <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input w-full "
                      placeholder="+123456789"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block  text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Work Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input w-full "
                      placeholder="you@yourcompany.com"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block  text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="form-input w-full "
                      placeholder="Password (at least 10 characters)"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-center">
                  I agree to be contacted by Open PRO about this offer as per
                  the{' '}
                  <a
                    href="#"
                    className="border-b border-gray-600 border-dotted"
                  >
                    privacy policy
                  </a>
                  .
                </div>
                <div className="mt-4">
                  <Button
                    className="btn btn-primary w-full"
                    disabled={disabled}
                    onClick={handleSubmit}
                    isLoading={disabled}
                  >
                    Sign up
                  </Button>
                </div>
                <div className="mt-4 text-sm  text-center">
                  Already have an account?{' '}
                  <Link
                    to="/signin"
                    className="border-b border-gray-600 border-dotted"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm your type</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="p-2 rounded-3xl text-white bg-blue-500 text-center">
                    <button
                      className={`p-4 w-1/3 rounded-3xl ${
                        data.type === 'dom' ? 'text-blue-500 bg-white' : ''
                      }`}
                      onClick={() => setData({ ...data, type: 'dom' })}
                    >
                      Dom
                    </button>
                    <button
                      className={`p-4 w-1/3 rounded-3xl ${
                        data.type === 'sub' ? 'text-blue-500 bg-white' : ''
                      }`}
                      onClick={() => setData({ ...data, type: 'sub' })}
                    >
                      Sub
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label
                    className="block  text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Phone no. <span className="text-red-600">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-input w-full "
                    placeholder="+123456789"
                    required
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => {
                onClose()
                if (token.googleAccessToken) {
                  handleSubmitGoogle(token.googleAccessToken)
                } else if (token.fb) {
                  handleSubmitFB(token.fb)
                }
              }}
              colorScheme="blue"
              mr={3}
            >
              Confirm
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default SignUp
