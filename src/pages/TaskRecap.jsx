import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import {
  Box,
  Button,
  useColorModeValue,
  useColorMode,
  Select,
  VStack,
  Switch,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import PieChart from '../partials/PieChart'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'

export default function TaskRecap() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [subEmail, setSubEmail] = useState(null)
  const [connections, setConnections] = useState(null)
  const [pieData, setPieData] = useState(null)
  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const [selectedOption, setSelectedOption] = useState('Daily')

  const [data2, setData2] = useState([
    {
      taskId: null,
      date: '',
      taskName: '',
      taskAssignedTo: '',
      taskSubmittedTo: '',
      status: '',
    },
  ])
  const [data3, setData3] = useState([
    {
      taskId: null,
      date: '',
      taskName: '',
      taskAssignedTo: '',
      taskSubmittedTo: '',
      status: '',
    },
  ])
  const [data4, setData4] = useState([
    {
      taskId: null,
      date: '',
      taskName: '',
      taskAssignedTo: '',
      taskSubmittedTo: '',
      status: '',
    },
  ])

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
        console.log('resData.connections', resData.connections)
        setConnections(resData.connections)
      }
    }
    if (user?.type == 'dom') {
      fetchSubConnected()
    }
  }, [user])
  useEffect(() => {
    const url =
      user?.type == 'sub'
        ? 'https://bdsm-backend.onrender.com/api/getSubTaskRecap'
        : 'https://bdsm-backend.onrender.com/api/getTaskRecap'
    const fetchTasks = async () => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subEmail,
          selectedOption,
        }),
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.tasks) {
        console.log(resData.tasks)
        const temp2 = []
        const temp3 = []
        const temp4 = []

        resData.tasks.forEach((d, i) => {
          if (d.status == 'Accepted') {
            temp2.push({
              taskId: d.taskId,
              date: d.updatedAt.split('T')[0],
              taskName: d.taskName,
              taskAssignedTo: d.subName,
              taskSubmittedTo: d.domName,
              status: d.status,
              submissionFreq: d.submissionFreq,
            })
          } else if (d.status == 'Failed' || d.status == 'Denied') {
            temp3.push({
              taskId: d.taskId,
              date: d.updatedAt.split('T')[0],
              taskName: d.taskName,
              taskAssignedTo: d.subName,
              taskSubmittedTo: d.domName,
              status: d.status,
              submissionFreq: d.submissionFreq,
            })
          } else if (d.status == 'Pending') {
            temp4.push({
              taskId: d.taskId,
              date: d.updatedAt.split('T')[0],
              taskName: d.taskName,
              taskAssignedTo: d.subName,
              taskSubmittedTo: d.domName,
              status: d.status,
              submissionFreq: d.submissionFreq,
            })
          }
        })
        setData2(temp2)
        setData3(temp3)
        setData4(temp4)

        if (temp2.length > 0 || temp3.length > 0 || temp4.length > 0) {
          setPieData([
            ['Status', 'Count'],
            ['Completed', temp2.length],
            ['Failed', temp3.length],
            ['Pending', temp4.length],
          ])
        }
      }
    }
    fetchTasks()
  }, [user])

  useEffect(() => {
    if (selectedOption) {
      const temp2 = data2.filter((el) => el.submissionFreq == selectedOption)
      const temp3 = data3.filter((el) => el.submissionFreq == selectedOption)
      const temp4 = data4.filter((el) => el.submissionFreq == selectedOption)
      console.log(data2, temp2)
      if (temp2.length == 0 && temp3.length == 0 && temp4.length == 0) {
        setPieData(null)
      } else {
        setPieData([
          ['Status', 'Count'],
          ['Completed', temp2.length],
          ['Failed', temp3.length],
          ['Pending', temp4.length],
        ])
      }
    }
  }, [data2, data3, data4, selectedOption])

  const { colorMode, toggleColorMode } = useColorMode()

  const handleButtonClick = (option) => {
    setSelectedOption(option)
  }

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'date' },
      { Header: 'Task Name', accessor: 'taskName' },
      { Header: 'Task Assigned To', accessor: 'taskAssignedTo' },
      { Header: 'Task Submitted To', accessor: 'taskSubmittedTo' },
      { Header: 'Status', accessor: 'status' },
    ],
    [],
  )

  const handleSelectChange2 = (event) => {
    setSubEmail(event.target.value)
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
        <main className="z-1 mx-auto w-full overflow-x-hidden md:pl-80 p-4 overflow-y-auto">
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Task Recap</h1>
              <Box
                hidden={user?.type == 'sub'}
                mt={2}
                mb={2}
                className="flex flex-row space-x-4"
              >
                {user?.type == 'dom' ? (
                  <Select value={subEmail} onChange={handleSelectChange2}>
                    <option value="">Select Sub</option>
                    {connections?.map((d, i) => {
                      return (
                        <option key={i} value={d?.subEmail}>
                          {d?.subName}
                        </option>
                      )
                    })}
                  </Select>
                ) : null}
              </Box>
              <div>
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
                <PieChart data={pieData} />
              </div>
            </div>
          </div>
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Completed Tasks Detail</h1>
              {data2.length > 0 ? (
                <Table columns={columns} data={data2} />
              ) : (
                'No Data Yet!'
              )}
            </div>
          </div>
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Failed Tasks Detail</h1>
              {data3.length > 0 ? (
                <Table columns={columns} data={data3} />
              ) : (
                'No Data Yet!'
              )}
            </div>
          </div>
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Pending Tasks Detail</h1>
              {data4.length > 0 ? (
                <Table columns={columns} data={data4} />
              ) : (
                'No Data Yet!'
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
