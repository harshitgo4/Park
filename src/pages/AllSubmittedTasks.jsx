import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Cookies from 'js-cookie'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import SubmittedTaskCards from '../partials/SubmittedTaskCards'

export default function AllSubmittedTasks() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [data, setData] = useState([])
  const [user, setUser] = useState(null)

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

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        'https://bdsm-backend.onrender.com/api/getSubmittedTask',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
        },
      )

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.submittedTasks) {
        console.log(resData.submittedTasks)
        const temp = resData.submittedTasks.map((d, i) => {
          return {
            _id: d._id,
            id: d.taskId,
            subName: d.subName,
            taskName: d.taskName,
            proofText: d.submissionText,
            submissionDate: d.createdAt.split('T')[0],
            submissionTime: d.createdAt.split('T')[1],
            image: d.image,
          }
        })
        setData(temp)
      }
    }
    fetchTasks()
  }, [user])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)

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
          <Button onClick={() => router('/createTask')} className="m-2">
            Create task
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">All Submitted Tasks</h1>
              <Box p={4}>
                <SubmittedTaskCards data={data} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
