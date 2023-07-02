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
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react'

export default function AddTask() {
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
  const [data, setData] = useState({
    email: '',
    userName: '',
    taskName: '',
    rewardPoints: '',
    description: '',
    selectedFreq: 'Daily',
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

  const [dueTime, setDueTime] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isNoEndDate, setIsNoEndDate] = useState(false)

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

  const handleNoEndDateChange = (event) => {
    setIsNoEndDate(event.target.checked)
  }

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

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
              <h1 className="font-semibold mb-8">Create tasks</h1>
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Input
                  onChange={(e) =>
                    setData({ ...data, taskName: e.target.value })
                  }
                  value={data.taskName}
                  placeholder="Task Name"
                />
                <Input
                  onChange={(e) =>
                    setData({ ...data, rewardPoints: e.target.value })
                  }
                  value={data.rewardPoints}
                  type="number"
                  placeholder="Reward Points"
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
                  <option value="null">Select Sub</option>
                  <option value="Sub 1">Sub 1</option>
                  <option value="Sub 2">Sub 2</option>
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
                  <FormLabel className="text-[#6D7D86]">Due time</FormLabel>
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
                  <Select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Text Required?
                  </FormLabel>
                  <Select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Start Date:</FormLabel>
                  <Input
                    placeholder="Start Date"
                    size="md"
                    type="date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                  />
                </FormControl>

                <FormControl className="flex flex-col">
                  <FormLabel className="text-[#6D7D86]">End Date:</FormLabel>
                  <Input
                    placeholder="End Date"
                    size="md"
                    type="date"
                    selected={isNoEndDate ? null : endDate}
                    onChange={handleEndDateChange}
                    disabled={isNoEndDate}
                  />
                  <Checkbox
                    checked={isNoEndDate}
                    onChange={handleNoEndDateChange}
                    className="mt-2"
                  >
                    No End Date
                  </Checkbox>
                </FormControl>
                <div className="mt-6 flex gap-4 grid  grid-cols-2">
                  <Button>Add +</Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
