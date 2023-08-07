import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Cookies from 'js-cookie'
import GetTask2 from '../partials/GetTask2'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function CurrentTask() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [selectedOption, setSelectedOption] = useState('Daily')
  const [data, setData] = useState()
  const [filteredData, setFilteredData] = useState()

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

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await fetch(
        `https://bdsm-backend.onrender.com/api/getSubPendingSubmissions`,
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
      } else if (resData.tasks) {
        console.log(resData.tasks)
        setData(resData.tasks)
      }
    }
    fetchTasks()
  }, [])
  useEffect(() => {
    if (data && selectedOption) {
      const temp = data.filter((el) => el.submissionFreq == selectedOption)
      setFilteredData(temp)
    }
  }, [selectedOption, data])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const handleButtonClick = (option) => {
    setSelectedOption(option)
  }

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
              <h1 className="font-semibold mb-8">Current Tasks</h1>
              <Box mt={4} mb={2} className="flex flex-row space-x-4">
                <Button
                  colorScheme={selectedOption === 'Daily' ? 'blue' : 'gray'}
                  onClick={() => handleButtonClick('Daily')}
                >
                  Daily
                </Button>
                <Button
                  colorScheme={selectedOption === 'Weekly' ? 'blue' : 'gray'}
                  onClick={() => handleButtonClick('Weekly')}
                >
                  Weekly
                </Button>
                <Button
                  colorScheme={selectedOption === 'Monthly' ? 'blue' : 'gray'}
                  onClick={() => handleButtonClick('Monthly')}
                >
                  Monthly
                </Button>
              </Box>
              <Box p={4}>
                <GetTask2 data={filteredData} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
