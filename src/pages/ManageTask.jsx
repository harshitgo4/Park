import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import CardsWithPagination from '../partials/CardsWithPagination'
import BuyRewardCard from '../partials/BuyRewardCard'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import SubmittedTaskCards from '../partials/SubmittedTaskCards'
import ManageTaskCard from '../partials/ManageTaskCard'

export default function ManageTask() {
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
      taskName: 'Task 1',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 2,
      taskName: 'Task 2',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 3,
      taskName: 'Task 3',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 4,
      taskName: 'Task 4',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 5,
      taskName: 'Task 5',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 6,
      taskName: 'Task 6',
      points: 100,
      submissionDate: '2023-06-01',
    },
    {
      id: 7,
      taskName: 'Task 7',
      points: 'No',
      submissionDate: '2023-06-01',
    },
    {
      id: 8,
      taskName: 'Task 8',
      points: 'No',
      submissionDate: '2023-06-01',
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
              <h1 className="font-semibold mb-8">Manage Tasks</h1>
              <Box p={4}>
                <ManageTaskCard data={data} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
