import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Input, useToast } from '@chakra-ui/react'
import Header2 from '../components/Header2'
import SideBar from '../components/sidebar/Main'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

function DomPage() {
  const { id } = useParams()
  const toast = useToast()

  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  useEffect(() => {
    if (user && user.type === 'dom') {
      router('/404')
    }
  }, [])
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])
  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')
  return (
    <div className="h-[100vh] overflow-y-auto overflow-x-hidden">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
        user={user}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        subscriptionDetails={subscriptionDetails}
        setSubscriptionDetails={setSubscriptionDetails}
      />
      <div className={`flex pb-40 h-screen}`}>
        <SideBar
          showDrawer={showDrawer}
          user={user}
          email={email}
          router={router}
          setShowDrawer={setShowDrawer}
          toggleColorMode={toggleColorMode}
        />
        <main className="z-1 mx-auto w-full md:pl-64 p-4 overflow-y-auto">
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">DOM Details</h1>
              <Box className="space-y-4" p={4}>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">DOM Id:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {id}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">DOM Status:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    Connected
                  </span>
                </div>
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default DomPage
