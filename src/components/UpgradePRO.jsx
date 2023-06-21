import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import { loadStripe } from '@stripe/stripe-js'
import Footer from './footer'
import Header2 from './Header2'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'

const Dashboard = () => {
  const router = useNavigate()
  const authToken = Cookies.get('token')
  const [stripe, setStripe] = useState(null)
  const [user, setUser] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  useEffect(() => {
    const fetchStripe = async () => {
      const stripe = await loadStripe(
        'pk_test_51MlBRCFJwKeowJ2dBZEQ6CsIxuOV8BNmUpppAL6sVBKSh9bZdoBl7sJBn0yAzJplJYLVbV5pd4MrzOH1agbTa5Dj00NO0xFdJy',
      )
      setStripe(stripe)
    }
    fetchStripe()
  }, [])

  const createSubscription = async (priceId) => {
    try {
      const response = await axios.post(
        'https://chatbot-backend-ihn7.onrender.com/api/createCheckoutSession',
        {
          priceId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      stripe.redirectToCheckout({ sessionId: response.data.sessionId })
    } catch (error) {
      console.error(error)
      return { error: error.message }
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        user={user}
        setUser={setUser}
      />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
            <div className="grid gap-6">
              <h3 className="text-xl font-bold sm:text-2xl">
                What's included in the PRO plan
              </h3>
              <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Everything in Free plan
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  20 files collection
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Monthly Tokens: 12000
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Support unstructured PDFs & TXTs
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Document Upload: 200 MB
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Expert Preference Conversation (Chats)
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Cross Referencing (Multiple Uploads)
                </li>
                <li className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>{' '}
                  Business Referencing Writing Editor
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 text-center">
              <div>
                <h4 className="text-7xl font-bold">$20</h4>
                <p className="text-sm font-medium text-muted-foreground">
                  Billed Monthly
                </p>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              onClick={() =>
                createSubscription('price_1N7y2wFJwKeowJ2dNlKfFf7b')
              }
            >
              Continue to SUBSCRIBE
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Dashboard
