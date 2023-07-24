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
import Cookies from 'js-cookie'
function TaskPage() {
  const { id } = useParams()
  const toast = useToast()

  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [taskDetails, setTaskDetails] = useState(null)
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
        `https://bdsm-backend.onrender.com/api/getTaskDetails`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      )

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.taskDetails) {
        console.log(resData.taskDetails)
        setTaskDetails(resData.taskDetails)
      }
    }
    fetchTasks()
  }, [])
  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('text-black', 'text-white')
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
          {' '}
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div
            className={`${bg} ${textColor} m-2 flex flex-row rounded-lg p-8`}
          >
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Tasks Details</h1>
              <Box className="space-y-4" p={4}>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">Task Id:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {id}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">Task Name:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.taskName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">
                    Task Description:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.taskDesc}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">DOM:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.createdBy}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">Task Due Time:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.dueTime}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">
                    Task Start Date:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.startDate.split('T')[0]}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">Task End Date:</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.endDate.split('T')[0]}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">
                    Task Submission Freq:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.submissionFreq}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">
                    Task is Media Req:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.isMediaReq.toString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">
                    Task is Text submission req:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.isSubmissionReq.toString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block">Reward Points</span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {taskDetails?.rewardPoints}
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

export default TaskPage
