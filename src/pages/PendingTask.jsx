import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
export default function PendingTask() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [data, setData] = useState([
    {
      taskId: null,
      date: null,
      taskName: null,
      taskAssignedTo: null,
      taskSubmittedTo: null,
      status: null,
    },
  ])

  useEffect(() => {
    if (user && user.type === 'dom') {
      router('/404')
    }
  }, [])
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])

  useEffect(() => {
    const url =
      user?.type == 'sub'
        ? 'https://bdsm-backend.onrender.com/api/getSubTask'
        : 'https://bdsm-backend.onrender.com/api/getTask'
    const fetchTasks = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.tasks) {
        console.log(resData.tasks)
        const temp = resData.tasks.filter((d) => {
          d.updatedAt = d.updatedAt.split('T')[0]
          return d.status === 'Pending'
        })

        console.log(temp)
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

  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'updatedAt' },
      { Header: 'Task Name', accessor: 'taskName' },
      { Header: 'Task Assigned To', accessor: 'subName' },
      { Header: 'Task Submitted To', accessor: 'domName' },
      { Header: 'Status', accessor: 'status' },
    ],
    [],
  )

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
              <h1 className="font-semibold mb-8">Pending Tasks Detail</h1>
              {data.length>0 ? <Table columns={columns} data={data} />: 'No Data Yet!'}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
