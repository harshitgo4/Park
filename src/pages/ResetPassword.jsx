import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import Header from '../partials/Header'
import PageIllustration from '../partials/PageIllustration'
import { useState } from 'react'
import Swal from 'sweetalert2'
import { Button } from '@chakra-ui/react'

function ResetPassword() {
  const [email, setEmail] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const toast = useToast()
  const router = useNavigate()
  const handlePasswordReset = async (e) => {
    e.preventDefault()

    if (email && email.includes('.') && email.includes('@')) {
      setDisabled(true)
      const res = await fetch(`http://localhost:5000/api/resetPassword1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
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
          title: 'Enter new password',
          html: `
    <input id="otp" class="swal2-input" style="border-radius: 10px; padding: 10px; width: 75%;" placeholder="Enter OTP" type="text" autofocus>
    <input id="password" class="swal2-input" style="border-radius: 10px; padding: 10px; width: 75%;" placeholder="Enter new password" type="password">
  `,
          showCancelButton: true,
          confirmButtonText: 'Submit',
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const otp = document.getElementById('otp').value
            const password = document.getElementById('password').value
            return fetch('http://localhost:5000/api/resetPassword2', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                password,
                email,
                otp,
              }),
            })
              .then((response) => response.json())
              .then((res) => {
                console.log(res)
                if (res.message === 'Password Reset!') {
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
                <h1 className="h1 mb-4">Forgot your password?</h1>
                <p className="text-xl text-gray-400">
                  We'll email you instructions on how to reset it.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block  text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full "
                        placeholder="you@yourcompany.com"
                        required
                        value={email}
                        disabled={disabled}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <Button
                        onClick={(e) => {
                          handlePasswordReset(e)
                        }}
                        bg="purple-700"
                        className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                        isLoading={disabled}
                      >
                        Reset Password
                      </Button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-400 text-center mt-6">
                  <Link
                    to="/signin"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Cancel
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

export default ResetPassword
