import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import ConnectedSubCard from '../partials/ConnectedSubCard'


export default function ConnectedSub() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  useEffect(() => {
    if (user && user.type === 'sub') {
      router('/404')
    }
  }, [])
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

  const data = [
    {
      id: 1,
      subName: 'Sub 1',
      duration: '1 year'
    },
    {
      id: 2,
      subName: 'Sub 2',
      duration: '1 year'
    },
    {
      id: 3,
      subName: 'Sub 3',
      duration: '1 year'
    },
    {
      id: 4,
      subName: 'Sub 4',
      duration: '1 year'
    },
    {
      id: 5,
      subName: 'Sub 5',
      duration: '1 year'
    },
    {
      id: 6,
      subName: 'Sub 6',
      duration: '1 year'
    },
    {
      id: 7,
      subName: 'Sub 7',
      duration: '1 year'
    },
    {
      id: 8,
      subName: 'Sub 8',
      duration: '1 year'
    },
    // Add more data
  ]

  return (
    <div className="h-[100vh] overflow-y-auto">
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
        <main className="z-1 mx-auto w-full md:pl-80 p-4 overflow-y-auto">
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Connected Sub</h1>
              <Box p={4}>
                <ConnectedSubCard data={data} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
