import React, { useEffect, useState } from 'react'
import Header from '../partials/Header'
import PageIllustration from '../partials/PageIllustration'
import CtaContact from '../partials/CtaContact'
import Footer from '../partials/Footer'
import { useToast } from '@chakra-ui/react'
import axios from 'axios'

function Contact_Booking() {
  const [data, setData] = useState({
    fName: '',
    lName: '',
    email: '',
    subject: '',
    country: 'Germany',
    message: '',
    checkbox: false,
  })
  const [disabled, setDisabled] = useState(false)
  const [countries, setCountries] = useState([])
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => {
        const countries2 = response.data
        const sortedCountries = countries2.sort((a, b) => {
          if (a.name.common < b.name.common) return -1
          if (a.name.common > b.name.common) return 1
          return 0
        })
        setCountries(sortedCountries)
      })
      .catch((error) => {
        console.error('Error retrieving countries:', error)
      })
  }, [])

  const toast = useToast()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    const fieldValue = type === 'checkbox' ? checked : value

    setData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }))
  }

  const handleSubmit = async () => {
    console.log(data)
    if (
      data.email.includes('.') &&
      data.email.includes('@') &&
      data.checkbox
    ) {
      setDisabled(true)
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/contact`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data,
          }),
        },
      )

      const resData = await res.json()

      if (resData.error) {
        toast({
          title: resData.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (resData.message) {
        toast({
          title: resData.message,
          status: 'success',
          duration: 9000,
          isClosable: true,
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
      toast({
        title: 'Invalid data!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden my-auto">
        
      {/*  Page content */}
      <main  className="grow"
 >
        {/*  Page illustration */}
        <div
          className="relative max-w-6xl mx-auto h-0 pointer-events-none"
          aria-hidden="true"
        >
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">
                 Book a Slot !!!
                </h1>
                <p
                  className="text-xl text-gray-400"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                Book A Slot now !
                </p>
              </div>

              {/* Contact form */}
              <form
  onSubmit={(e) => {
    e.preventDefault();
    handleSubmit();
  }}
  className="max-w-xl mx-auto"
  sx={{
    width: '80%', // Adjust the width percentage as needed
    margin: '0 auto', // Center the element horizontally
  }}
>
                <div className="flex flex-wrap -mx-9 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-black-300 text-sm font-medium mb-1"
                      htmlFor="username"
                    >
                      Username <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="Username"
                      type="text"
                      name="Username"
                      value={data.Username}
                      onChange={handleChange}
                      className="form-input w-full text-gray-300"
                      placeholder="Username"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-9 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-black-300 text-sm font-medium mb-1"
                      htmlFor="email"
                    >
                      Email <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      className="form-input w-full text-black-300"
                      placeholder="Email address"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-9 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-black-300 text-sm font-medium mb-1"
                      htmlFor="password"
                    >
                      Password <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      className="form-input w-full text-black-300"
                      placeholder="Password"
                      required
                    />
                  </div>
                </div>
              
                <div className="flex flex-wrap -mx-9 mb-4">
  <div className="w-full px-3">
    <label
      className="block text-black-300 text-sm font-medium mb-1"
      htmlFor="phone"
    >
      Phone Number <span className="text-red-600">*</span>
    </label>
    <input
      id="phone"
      type="tel" // Use "tel" type for phone numbers
      name="phone"
      value={data.phone}
      onChange={handleChange}
      className="form-input w-full text-black-300"
      placeholder="Phone Number"
      required
    />
  </div>
</div>

                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label className="flex items-center">
                      <input
                        name="checkbox"
                        value={data.checkbox}
                        onChange={handleChange}
                        type="checkbox"
                        className="form-checkbox"
                      />
                      <span className="text-gray-400 ml-2">
                        I agree to the privacy policy
                      </span>
                    </label>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mt-6">
                  <div className="w-full px-3">
                    <button
                      type="submit"
                      className="btn text-white rounded-lg bg-purple-600 hover:bg-purple-700 w-full"
                    >
                      {disabled ? 'Loading...' : 'Book'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/*  Bottom CTA */}
        
      </main>

      {/*  Site footer */}
      
    </div>
  )
}

export default Contact_Booking;
