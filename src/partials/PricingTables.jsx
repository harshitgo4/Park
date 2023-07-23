import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import { Modal, ModalOverlay } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

function PricingTables() {
  const [value, setValue] = useState(true)
  const [isLoading, setLoading] = useState(true)
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])
  const authToken = Cookies.get('token')
  const router = useNavigate()
  const [stripe, setStripe] = useState(null)

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      // Check if subscription details exist in localStorage
      const cachedSubscriptionDetails = localStorage.getItem(
        'subscriptionDetails',
      )
      if (cachedSubscriptionDetails) {
        const data = JSON.parse(cachedSubscriptionDetails)
        setSubscriptionDetails(data)
        setLoading(false)
      } else {
        // Fetch subscription details from the API
        const response = await fetch(
          'https://bdsm-backend.onrender.com/api/getSubscription',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          },
        )
        const data = await response.json()
        console.log(data)
        if (data.error === 'User not found!') {
          await Cookies.remove('token')
          await localStorage.removeItem('subscriptionDetails')
          await Cookies.remove('email')
          await Cookies.remove('selectedNamespace')
          await Cookies.remove('selectedChatId')
          await Cookies.remove('selectedFolder')
          router('/signin')
        }
        setSubscriptionDetails(data)
        setLoading(false)
        // Cache the subscription details in localStorage
        localStorage.setItem('subscriptionDetails', JSON.stringify(data))
      }
    }
    if (authToken) {
      fetchSubscriptionDetails()
    } else {
      setLoading(false)
    }
  }, [authToken])
  useEffect(() => {
    const fetchStripe = async () => {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC)
      setStripe(stripe)
    }
    fetchStripe()
  }, [])

  const createSubscription = async (priceId) => {
    console.log(priceId)
    try {
      const response = await axios.post(
        'https://bdsm-backend.onrender.com/api/createCheckoutSession',
        {
          priceId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      await Cookies.remove('token')
      await localStorage.removeItem('subscriptionDetails')
      stripe.redirectToCheckout({ sessionId: response.data.sessionId })
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }
  const [priceOutput] = useState({
    plan1: {
      false: ['$', '0', '/yr'],
      true: ['$', '0', '/mo'],
    },
    plan2: {
      false: ['$', '100', '/yr'],
      true: ['$', '4.99', '/mo'],
    },
    plan3: {
      false: ['$', '200', '/yr'],
      true: ['$', '30', '/mo'],
    },
  })

  return (
    <>
      <Modal isCentered isOpen={isLoading}>
        <ModalOverlay
          bg="blackAlpha.300"
          backdropFilter="blur(10px) hue-rotate(90deg)"
          className="items-center flex justify-center"
        >
          <Spinner size="xl" />
        </ModalOverlay>
      </Modal>
      <section className="relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Section header */}
            <div className="max-w-3xl mx-auto text-center pb-12">
              <h1 className="h1 mb-4" data-aos="fade-up">
                Simple, transparent pricing
              </h1>
              <p
                className="text-xl text-gray-400"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                Our pricing options are tailored to accommodate a suitable
                solution for all.
              </p>
            </div>

            {/* Pricing tables */}
            <div>
              <div className="max-w-sm mx-auto grid gap-8 lg:grid-cols-3 lg:gap-6 items-start lg:max-w-none">
                {/* Pricing table 1 */}
                <div
                  className="relative flex flex-col h-full p-6 bg-gray-800 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="h4 text-purple-600 mb-1">Free</div>
                    <div className="inline-flex items-baseline mb-2">
                      <span className="text-2xl md:text-3xl font-medium text-gray-400">
                        {priceOutput.plan1[value][0]}
                      </span>
                      <span className="h2">{priceOutput.plan1[value][1]}</span>
                      <span className="font-medium text-gray-400">
                        {priceOutput.plan1[value][2]}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      Managing research papers, lecture notes, and assignments
                      efficiently.
                    </div>
                  </div>
                  <div className="font-medium mb-3">Features include:</div>
                  <ul className="text-gray-400 -mb-3 grow">
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Email notifications included</span>
                    </li>
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>20 tasks</span>
                    </li>
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>10 rewards</span>
                    </li>
                  </ul>
                  <div className="border border-gray-700 p-3 mt-6  rounded-lg">
                    <a
                      className={`btn-sm  rounded-lg text-white ${
                        subscriptionDetails &&
                        subscriptionDetails.planId === 'Free Plan'
                          ? 'bg-green-400'
                          : 'bg-purple-600'
                      } hover:bg-purple-700 w-full`}
                      href="#0"
                    >
                      {subscriptionDetails &&
                      subscriptionDetails.planId === 'Free Plan'
                        ? 'Active'
                        : 'Start free trial'}
                    </a>
                  </div>
                </div>

                {/* Pricing table 2 */}
                <div
                  className="relative flex flex-col h-full p-6 bg-gray-800 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  <div className="absolute top-0 right-0 mr-6 -mt-4">
                    <div className="inline-flex text-sm font-semibold py-1 px-3 mt-px text-green-600 bg-green-200 rounded-full">
                      Standard
                    </div>
                  </div>
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="h4 text-purple-600 mb-1">Pro</div>
                    <div className="inline-flex items-baseline mb-2">
                      <span className="text-2xl md:text-3xl font-medium text-gray-400">
                        {priceOutput.plan2[value][0]}
                      </span>
                      <span className="h2">{priceOutput.plan2[value][1]}</span>
                      <span className="font-medium text-gray-400">
                        {priceOutput.plan2[value][2]}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      Assist document search, summarization, on papers and
                      articles.
                    </div>
                  </div>
                  <div className="font-medium mb-3">
                    All features of Essential plus:
                  </div>
                  <ul className="text-gray-400 -mb-3 grow">
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Email & Phone notifications</span>
                    </li>
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Unlimited tasks & rewards</span>
                    </li>

                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>24 hour response time technical support</span>
                    </li>
                  </ul>
                  <div className="border  rounded-lg border-gray-700 p-3 mt-6">
                    <a
                      className={`btn-sm  rounded-lg text-white ${
                        subscriptionDetails &&
                        subscriptionDetails.planId === 'Standard Plan'
                          ? 'bg-green-400'
                          : 'bg-purple-600'
                      } hover:bg-purple-700 w-full`}
                      onClick={() => {
                        if (
                          subscriptionDetails &&
                          subscriptionDetails.planId !== 'Standard Plan'
                        ) {
                          createSubscription(
                            import.meta.env.VITE_STANDARD_PRICE_ID,
                          )
                        } else {
                          router('/signin')
                        }
                      }}
                    >
                      {subscriptionDetails &&
                      subscriptionDetails.planId === 'Standard Plan'
                        ? 'Active'
                        : 'Get Started'}
                    </a>
                  </div>
                </div>

                {/* Pricing table 3 */}
                <div
                  className="relative flex flex-col h-full p-6 bg-gray-800 rounded-lg"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <div className="mb-4 pb-4 border-b border-gray-700">
                    <div className="h4 text-purple-600 mb-1">Yearly Pro</div>
                    <div className="inline-flex items-baseline mb-2">
                      <span className="text-2xl md:text-3xl font-medium text-gray-400">
                        {priceOutput.plan3[value][0]}
                      </span>
                      <span className="h2">{priceOutput.plan3[value][1]}</span>
                      <span className="font-medium text-gray-400">
                        {priceOutput.plan3[value][2]}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      Aid in organizing and retrieving documents, contracts, and
                      reports.
                    </div>
                  </div>
                  <div className="font-medium mb-3">
                    All features of Essential plus:
                  </div>
                  <ul className="text-gray-400 -mb-3 grow">
                    <li className="flex items-center mb-3">
                      <svg
                        className="w-3 h-3 fill-current text-green-500 mr-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>“Insiders Club“ (influence new features)</span>
                    </li>
                  </ul>
                  <div className="border  rounded-lg border-gray-700 p-3 mt-6">
                    <a
                      className={`btn-sm  rounded-lg text-white ${
                        subscriptionDetails &&
                        subscriptionDetails.planId === 'Pro Plan'
                          ? 'bg-green-400'
                          : 'bg-purple-600'
                      } hover:bg-purple-700 w-full`}
                      onClick={() => {
                        subscriptionDetails &&
                        subscriptionDetails.planId === 'Pro Plan' &&
                        !authToken
                          ? ''
                          : createSubscription(
                              import.meta.env.VITE_PRO_PRICE_ID,
                            )
                      }}
                    >
                      {subscriptionDetails &&
                      subscriptionDetails.planId === 'Pro Plan'
                        ? 'Active'
                        : 'Get Started'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Bottom infobox */}
              <div className="flex flex-col lg:flex-row justify-between items-center mt-12 lg:mt-6 lg:py-8 lg:border-t lg:border-b lg:border-gray-800">
                <div className="font-medium text-lg text-center lg:text-left mb-4 lg:mb-0">
                  Expecting more than 1000 Active End Users?
                </div>
                <div>
                  <a
                    className="btn-sm text-white bg-purple-600 hover:bg-purple-700 rounded-lg "
                    href="/contact"
                  >
                    Contact us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{' '}
    </>
  )
}

export default PricingTables
