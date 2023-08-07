import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import {
  Box,
  Button,
  useColorModeValue,
  useColorMode,
  Input,
  Textarea,
  Select,
} from '@chakra-ui/react'
import { useDisclosure, useToast } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import Cookies from 'js-cookie'
export default function CreateTask() {
  const router = useNavigate()
  const toast = useToast()
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [connections, setConnections] = useState(null)

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
    const fetchSubConnected = async () => {
      const res = await fetch(
        `https://bdsm-backend.onrender.com/api/fetchSubConnected`,
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
        console.log('Error fetching users')
      } else if (resData.connections) {
        setConnections(resData.connections)
      }
    }
    fetchSubConnected()
  }, [])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)
  const [data, setData] = useState({
    email: '',
    userName: '',
    taskName: '',
    rewardPoints: '',
    description: '',
    selectedFreq: 'Daily',
    isMediaReq: true,
    isSubmissionReq: true,
  })

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setData({ ...data, selectedFreq: event.target.value })
    // Handle the selected value here
    console.log('Selected value:', selectedValue)
  }

  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value
    setData({ ...data, userName: event.target.value })
    // Handle the selected value here
    console.log('Selected value:', selectedValue)
  }

  const [dueTime, setDueTime] = useState('00:00:00')
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [isNoEndDate, setIsNoEndDate] = useState(false)

  const handleNoEndDateChange = (event) => {
    setIsNoEndDate(event.target.checked)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.taskName && data.rewardPoints && data.userName && dueTime) {
      const res = await fetch(
        `https://bdsm-backend.onrender.com/api/createTask`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data,
            dueTime,
            startDate,
            endDate,
            isNoEndDate,
          }),
        },
      )

      const resData = await res.json()

      if (resData.error) {
        console.log('Error creating task')
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (resData.message) {
        setData({
          email: '',
          userName: '',
          taskName: '',
          rewardPoints: '',
          description: '',
          selectedFreq: 'Daily',
          isMediaReq: true,
          isSubmissionReq: true,
        })
        setDueTime('')
        setStartDate(new Date())
        setEndDate(new Date())
        setIsNoEndDate(false)
        toast({
          title: 'Task Created!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setTimeout(() => {
          router('/ManageTask')
        }, 1000)
      }
    } else {
      toast({
        title: 'Please input all fields!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

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
              <h1 className="font-semibold mb-8">Create tasks</h1>
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Input
                  onChange={(e) =>
                    setData({ ...data, taskName: e.target.value })
                  }
                  value={data.taskName}
                  placeholder="Task Name*"
                />
                <Input
                  onChange={(e) =>
                    setData({ ...data, rewardPoints: e.target.value })
                  }
                  value={data.rewardPoints}
                  type="number"
                  placeholder="Reward Points*"
                />
              </div>
              <div className="mt-6 gap-4 grid grid-cols-1">
                <Textarea
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  value={data.description}
                  placeholder="Description (in max 200 chars)"
                  maxLength={200}
                />
              </div>
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Select value={data.userName} onChange={handleSelectChange2}>
                  <option value={null}>Select Sub*</option>
                  {connections?.map((d, i) => {
                    return (
                      <option key={i} value={d.subEmail}>
                        {d.subName}
                      </option>
                    )
                  })}
                </Select>
                <Input
                  value={user?.email}
                  placeholder="Email"
                  type="email"
                  readOnly
                />
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Frequency
                  </FormLabel>
                  <Select
                    value={data.selectedFreq}
                    onChange={handleSelectChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Every Other Day">Every Other Day</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Due time*</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Media Required?
                  </FormLabel>
                  <Select
                    value={data.isMediaReq}
                    onChange={(e) => {
                      setData({ ...data, isMediaReq: e.target.value })
                    }}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Text Required?
                  </FormLabel>
                  <Select
                    value={data.isSubmissionReq}
                    onChange={(e) => {
                      setData({ ...data, isSubmissionReq: e.target.value })
                    }}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Start Date:</FormLabel>
                  <SingleDatepicker
                    name="date-input"
                    date={startDate}
                    onDateChange={setStartDate}
                  />
                </FormControl>

                <FormControl className="flex flex-col">
                  <FormLabel className="text-[#6D7D86]">End Date:</FormLabel>
                  <SingleDatepicker
                    name="date-input"
                    date={isNoEndDate ? null : endDate}
                    onDateChange={setEndDate}
                    disabled={isNoEndDate}
                  />
                  <Checkbox
                    isChecked={isNoEndDate}
                    onChange={handleNoEndDateChange}
                    className="mt-2"
                  >
                    No End Date
                  </Checkbox>
                </FormControl>
                <div className="mt-6 flex gap-4 grid  grid-cols-2">
                  <Button colorScheme="green" onClick={handleSubmit}>
                    Add +
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
