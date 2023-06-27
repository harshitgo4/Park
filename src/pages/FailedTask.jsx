import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function FailedTask() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)

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
        date: '2023-06-01',
        taskName: 'Task 1',
        taskAssignedTo: 'User 1',
        taskSubmittedTo: 'User 2',
        status: 'Completed and Approved',
      },
      {
        taskId: 2,
        date: '2023-06-02',
        taskName: 'Task 2',
        taskAssignedTo: 'User 2',
        taskSubmittedTo: 'User 3',
        status: 'Completed and Failed',
      },
      {
        taskId: 3,
        date: '2023-06-03',
        taskName: 'Task 3',
        taskAssignedTo: 'User 3',
        taskSubmittedTo: 'User 1',
        status: 'Did not complete at all',
      },
      {
        taskId: 4,
        date: '2023-06-04',
        taskName: 'Task 4',
        taskAssignedTo: 'User 1',
        taskSubmittedTo: 'User 2',
        status: 'Completed and Approved',
      },
      {
        taskId: 5,
        date: '2023-06-05',
        taskName: 'Task 5',
        taskAssignedTo: 'User 2',
        taskSubmittedTo: 'User 3',
        status: 'Completed and Failed',
      },
      {
        taskId: 6,
        date: '2023-06-06',
        taskName: 'Task 6',
        taskAssignedTo: 'User 3',
        taskSubmittedTo: 'User 1',
        status: 'Did not complete at all',
      },
      {
        taskId: 7,
        date: '2023-06-07',
        taskName: 'Task 7',
        taskAssignedTo: 'User 1',
        taskSubmittedTo: 'User 2',
        status: 'Completed and Approved',
      },
      {
        taskId: 8,
        date: '2023-06-08',
        taskName: 'Task 8',
        taskAssignedTo: 'User 2',
        taskSubmittedTo: 'User 3',
        status: 'Completed and Failed',
      },
      {
        taskId: 9,
        date: '2023-06-09',
        taskName: 'Task 9',
        taskAssignedTo: 'User 3',
        taskSubmittedTo: 'User 1',
        status: 'Did not complete at all',
      },
      {
        taskId: 10,
        date: '2023-06-10',
        taskName: 'Task 10',
        taskAssignedTo: 'User 1',
        taskSubmittedTo: 'User 2',
        status: 'Completed and Approved',
      },
      {
        taskId: 11,
        date: '2023-06-11',
        taskName: 'Task 11',
        taskAssignedTo: 'User 2',
        taskSubmittedTo: 'User 3',
        status: 'Completed and Failed',
      },
      {
        taskId: 12,
        date: '2023-06-12',
        taskName: 'Task 12',
        taskAssignedTo: 'User 3',
        taskSubmittedTo: 'User 1',
        status: 'Did not complete at all',
      },
    ],

    [],
  )

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
              <h1 className="font-semibold mb-8">Failed Tasks Detail</h1>
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
