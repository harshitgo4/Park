import React, { useState, useEffect } from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  ModalContent,
  useColorMode,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useColorModeValue } from '@chakra-ui/react'
import {
  BellAlertIcon,
  ChatBubbleLeftEllipsisIcon,
  QuestionMarkCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
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
import { Search2Icon } from '@chakra-ui/icons'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

function Header2({
  user,
  setUser,
  isOpen,
  onOpen,
  onClose,
  current,
  setShowDrawer,
  showDrawer,
}) {
  const [isLoading, setLoading] = useState(true)
  const authToken = Cookies.get('token')
  const router = useNavigate()

  useEffect(() => {
    const fetchSubscriptionDetails = async () => {
      // Check if data exists in localStorage
      const cachedData = localStorage.getItem('subscriptionData')

      if (cachedData) {
        // If data exists, parse and set it in state
        const parsedData = JSON.parse(cachedData)
        setUser(parsedData.user)
        setLoading(false)
        return
      }

      const response = await fetch(
        'https://bdsm-backend.onrender.com/api/user',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      const data = await response.json()

      if (data.error === 'User not found!') {
        await Cookies.remove('token')
        await localStorage.removeItem('subscriptionData')
        router.push('/signin')
        return
      }

      // Save data in localStorage for future use
      localStorage.setItem('subscriptionData', JSON.stringify(data))

      setUser(data.user)
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
        className={`z-50 w-full ${bg} h-18 shrink-0 flex items-center sticky top-0 border-[#CEC7C7] border-b-2`}
      >
        {/* Menu */}
        <div className="flex-1 flex relative">
          <div>
            <button
              className="z-50 md:hidden ml-auto px-3 py-4 rounded-md  focus:outline-none"
              onClick={() => setShowDrawer(!showDrawer)}
            >
              <Cog6ToothIcon className="h-6 w-6" />
            </button>
          </div>
          {/* User */}

          {/* Actions */}
          <div className="ml-auto inline-flex items-center justify-center mr-10 lg:gap-x-2">
            <div className="mx-4">
              <InputGroup>
                <Input placeholder="Search" />
                <InputRightElement>
                  <Search2Icon color="white" />
                </InputRightElement>
              </InputGroup>
            </div>
            <div className="mx-4 flex flex-row gap-4">
              {' '}
              <BellAlertIcon className="my-2  h-[1.5rem] w-[1.5rem]" />
              <ChatBubbleLeftEllipsisIcon className="my-2  h-[1.5rem] w-[1.5rem]" />
            </div>
            <div className="flex flex-row">
              {user && user.avatar ? (
                <img
                  alt="Avatar"
                  className="rounded-full my-2  h-[3rem] w-[3rem]"
                  src={user?.avatar}
                />
              ) : (
                <UserCircleIcon className="my-2  h-[3rem] w-[3rem]" />
              )}
            </div>

            {/* User Name */}
            <button className="inline-flex items-center text-[#767676] justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-4">
              {user?.fName}
            </button>
          </div>
        </div>
      </Box>

      {/* Drawer */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Box py={2}>
              {/* User Name */}
              {/* Plan ID */}
              <InputGroup>
                <Input placeholder="Search" />
                <InputRightElement>
                  <Search2Icon color="white" />
                </InputRightElement>
              </InputGroup>
              <BellAlertIcon className="my-4 mx-2 h-[1.5rem] w-[1.5rem]" />
              <ChatBubbleLeftEllipsisIcon className="my-4 mx-2 h-[1.5rem] w-[1.5rem]" />
              <button className="px-4 py-2 font-medium rounded-lg flex gap-2 hover:text-[#767676]">
                {user?.fName}
              </button>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Header2
