import React, { useState } from 'react'
import Header from '../partials/Header'
import PageIllustration from '../partials/PageIllustration'
import CtaContact from '../partials/CtaContact'
import Footer from '../partials/Footer'
import { useToast } from '@chakra-ui/react'

function Contact() {
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
      data.fName.length > 2 &&
      data.lName.length > 1 &&
      data.subject.length > 2 &&
      data.message.length > 2 &&
      data.checkbox
    ) {
      setDisabled(true)
      const res = await fetch(`https://bdsm-backend.onrender.com/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
        }),
      })

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
    <div className="flex flex-col min-h-screen overflow-hidden bg-[#1A202C] text-white">
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
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
                <h1 className="h1 mb-4" data-aos="fade-up">
                  How can we help you?
                </h1>
                <p
                  className="text-xl text-gray-400"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  We have custom plans to power your business. Tell us your
                  needs, and we’ll contact you shortly.
                </p>
              </div>

              {/* Contact form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
                }}
                className="max-w-xl mx-auto"
              >
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="first-name"
                    >
                      First Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="first-name"
                      type="text"
                      name="fName"
                      value={data.fName}
                      onChange={handleChange}
                      className="form-input w-full text-gray-300 "
                      placeholder="Enter your first name"
                      required
                    />
                  </div>
                  <div className="w-full md:w-1/2 px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="last-name"
                    >
                      Last Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="last-name"
                      type="text"
                      name="lName"
                      value={data.lName}
                      onChange={handleChange}
                      className="form-input w-full text-gray-300"
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
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
                      className="form-input w-full text-gray-300"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="subject"
                    >
                      Subject <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      value={data.subject}
                      onChange={handleChange}
                      className="form-input w-full text-gray-300"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="country"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={data.country}
                      onChange={handleChange}
                      className="form-select w-full text-gray-300"
                    >
                      <option>Germany</option>
                      <option>United States</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-4">
                  <div className="w-full px-3">
                    <label
                      className="block text-gray-300 text-sm font-medium mb-1"
                      htmlFor="message"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      name="message"
                      value={data.message}
                      onChange={handleChange}
                      className="form-textarea w-full text-gray-300"
                      placeholder="Write your message"
                    ></textarea>
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
                      {disabled ? 'Loading...' : 'Send'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/*  Bottom CTA */}
        <CtaContact />
      </main>

      {/*  Site footer */}
      <Footer />
    </div>
  )
}

export default Contact
