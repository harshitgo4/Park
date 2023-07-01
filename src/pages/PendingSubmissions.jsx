import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function PendingSubmissions() {
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

  const data = useMemo(
    () => [
      {
        taskId: 1,
        subName: 'Subject 1',
        taskName: 'Task 1',
        submissionDate: '2023-06-01',
        submissionTime: '10:00 AM',
        pointValue: 5,
      },
      {
        taskId: 2,
        subName: 'Subject 2',
        taskName: 'Task 2',
        submissionDate: '2023-06-02',
        submissionTime: '11:30 AM',
        pointValue: 7,
      },
      {
        taskId: 3,
        subName: 'Subject 3',
        taskName: 'Task 3',
        submissionDate: '2023-06-03',
        submissionTime: '1:45 PM',
        pointValue: 4,
      },
      {
        taskId: 4,
        subName: 'Subject 4',
        taskName: 'Task 4',
        submissionDate: '2023-06-04',
        submissionTime: '9:15 AM',
        pointValue: 6,
      },
      {
        taskId: 5,
        subName: 'Subject 5',
        taskName: 'Task 5',
        submissionDate: '2023-06-05',
        submissionTime: '2:30 PM',
        pointValue: 8,
      },
      {
        taskId: 6,
        subName: 'Subject 6',
        taskName: 'Task 6',
        submissionDate: '2023-06-06',
        submissionTime: '10:45 AM',
        pointValue: 3,
      },
      {
        taskId: 7,
        subName: 'Subject 7',
        taskName: 'Task 7',
        submissionDate: '2023-06-07',
        submissionTime: '12:00 PM',
        pointValue: 5,
      },
      {
        taskId: 8,
        subName: 'Subject 8',
        taskName: 'Task 8',
        submissionDate: '2023-06-08',
        submissionTime: '3:20 PM',
        pointValue: 6,
      },
      {
        taskId: 9,
        subName: 'Subject 9',
        taskName: 'Task 9',
        submissionDate: '2023-06-09',
        submissionTime: '9:30 AM',
        pointValue: 4,
      },
      {
        taskId: 10,
        subName: 'Subject 10',
        taskName: 'Task 10',
        submissionDate: '2023-06-10',
        submissionTime: '2:00 PM',
        pointValue: 7,
      },
      {
        taskId: 11,
        subName: 'Subject 11',
        taskName: 'Task 11',
        submissionDate: '2023-06-11',
        submissionTime: '11:45 AM',
        pointValue: 5,
      },
      {
        taskId: 12,
        subName: 'Subject 12',
        taskName: 'Task 12',
        submissionDate: '2023-06-12',
        submissionTime: '1:15 PM',
        pointValue: 6,
      },
    ],

    [],
  )

  const columns = useMemo(
    () => [
      { Header: 'Task ID', accessor: 'taskId' },
      { Header: 'Sub Name', accessor: 'subName' },
      { Header: 'Task Name', accessor: 'taskName' },
      { Header: 'Submission Date', accessor: 'submissionDate' },
      { Header: 'Submission Time', accessor: 'submissionTime' },
      { Header: 'Point Value', accessor: 'pointValue' },
    ],
    [],
  )

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
              <h1 className="font-semibold mb-8">Pending Submissions</h1>
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
