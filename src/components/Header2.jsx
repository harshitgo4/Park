import React, { useState, useEffect } from 'react'
import { ModalContent, useColorMode } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useColorModeValue } from '@chakra-ui/react'
import { QuestionMarkCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { LinkIcon } from '@heroicons/react/24/outline'
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Modal,
  ModalOverlay,
} from '@chakra-ui/react'
import { UserCircleIcon } from '@heroicons/react/24/solid'
import { Spinner } from '@chakra-ui/react'

function Header2({ user, setUser, isOpen, onOpen, onClose, current }) {
  const { colorMode, toggleColorMode } = useColorMode()
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const authToken = Cookies.get('token')
  const router = useNavigate()

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      const response = await fetch(
        'https://chatbot-backend-ihn7.onrender.com/api/getSubscription',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      const data = await response.json()
      console.log(data)
      if (data.error == 'User not found!') {
        await Cookies.remove('token')
        router('/signin')
      }
      setUser(data.user)
      setSubscriptionDetails(data)
      setLoading(false)
    }
    fetchSubscriptionDetails()
  }, [])
  if (!authToken) {
    router('/signin')
  }

  const chatTextColor = useColorModeValue('text-slate-300', 'text-slate-300')
  const settingsTextColor = useColorModeValue(
    'text-slate-300',
    'text-slate-300',
  )

  const bg = useColorModeValue('bg-white', 'bg-slate-800')

  const handleLinkClick = (index) => {
    onClose()
  }

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
      {/* Header */}
      <Box
        display={{ base: 'none', md: 'block' }}
        className={`z-50 w-full ${bg} h-18 shrink-0 flex items-center sticky top-0 border-[#CEC7C7] border-b-2`}
      >
        {/* Menu */}
        <div className="flex-1 flex relative">
          <div className="text-[#C5D2DC] px-2 w-[19.1rem] flex py-2 pr-2 border-[#CEC7C7] border-r-2">
            <a
              className={`px-6 py-2 font-medium rounded-lg flex gap-2 ${
                current === 0 ? 'text-[#5D5DFF]' : ''
              }`}
              href="/dashboard"
              onClick={() => handleLinkClick(0)}
            >
              Chat
            </a>
            <a
              className={`px-6 py-2 font-medium rounded-lg flex gap-2 ${
                current === 1 ? 'text-[#5D5DFF]' : ''
              }`}
              href="/content"
              onClick={() => handleLinkClick(1)}
            >
              Content
            </a>
            <a
              className={`px-6 py-2 font-medium rounded-lg flex gap-2 ${
                current === 2 ? 'text-[#5D5DFF]' : ''
              }`}
              href="/bot"
              onClick={() => handleLinkClick(2)}
            >
              Bot
            </a>
          </div>

          {/* User */}
          <div className="lg:ml-10 flex flex-row">
            {user && user.avatar ? (
              <img
                alt="Avatar"
                className="rounded-full my-2 mx-4 h-[3rem] w-[3rem]"
                src={user?.avatar}
              />
            ) : (
              <UserCircleIcon className="my-2 mx-4 h-[3rem] w-[3rem]" />
            )}
            <div className="m-auto flex justify-center flex-col text-md font-semibold">
              {subscriptionDetails?.planId}
              <div className="text-[#48BB78] text-sm">Activated</div>
            </div>
          </div>

          {/* Actions */}
          <div className="ml-auto inline-flex items-center justify-center mr-10 lg:gap-x-4">
            {/* Upgrade Plan */}
            <button
              hidden={subscriptionDetails?.planId === 'Pro Plan'}
              onClick={() => router('/pricing')}
              className="inline-flex items-center text-[#D69D0B] justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4"
            >
              Upgrade Plan
            </button>

            {/* Help */}
            <button className="inline-flex items-center text-[#767676] justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4">
              Help
            </button>

            {/* API */}
            <button className="inline-flex items-center text-[#767676] justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4">
              API
            </button>

            {/* User Name */}
            <button className="inline-flex items-center text-[#767676] justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4">
              {subscriptionDetails?.user.fName +
                ' ' +
                subscriptionDetails?.user.lName}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        <button
          className="md:hidden ml-auto px-3 py-2 rounded-md bg-gray-200 text-gray-800 focus:outline-none"
          onClick={onOpen}
        >
          Menu
        </button>
      </Box>

      {/* Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Box py={2}>
              <a
                className={`px-4 py-2 font-medium rounded-lg flex gap-2 ${
                  current === 0 ? 'text-[#5D5DFF]' : ''
                }`}
                href="/dashboard"
                onClick={() => handleLinkClick(0)}
              >
                Chat
              </a>
              <a
                className={`px-4 py-2 font-medium rounded-lg flex gap-2 ${
                  current === 1 ? 'text-[#5D5DFF]' : ''
                }`}
                href="/content"
                onClick={() => handleLinkClick(1)}
              >
                Content
              </a>
              <a
                className={`px-4 py-2 font-medium rounded-lg flex gap-2 ${
                  current === 2 ? 'text-[#5D5DFF]' : ''
                }`}
                href="/bot"
                onClick={() => handleLinkClick(2)}
              >
                Bot
              </a>

              {/* Upgrade Plan */}
              <button
                hidden={subscriptionDetails?.planId === 'Pro Plan'}
                onClick={() => router('/pricing')}
                className="px-4 py-2 font-medium rounded-lg flex gap-2 text-[#D69D0B] hover:text-[#D69D0B]"
              >
                Upgrade Plan
              </button>

              {/* API */}
              <button className="px-4 py-2 font-medium rounded-lg flex gap-2 hover:text-[#767676]">
                API
              </button>

              {/* User Name */}
              {/* Plan ID */}
              <button className="px-4 py-2 font-medium rounded-lg flex gap-2 hover:text-[#767676]">
                {subscriptionDetails?.planId +
                  ' - ' +
                  subscriptionDetails?.user.fName +
                  ' ' +
                  subscriptionDetails?.user.lName}
              </button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header2
