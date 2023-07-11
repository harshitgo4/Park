import React from 'react'
import { useRef, useState, useEffect } from 'react'
import {
  BriefcaseIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
  GiftIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import SideBar from '../components/sidebar/Main'
import { css } from '@emotion/react'
import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Progress } from '@chakra-ui/react'
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import Countdown from '../partials/Countdown'
import { BarChart } from '../partials/BarChart'
import Cookies from 'js-cookie'
export default function Home({ folder, initialNamespace }) {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [barData, setBarData] = useState([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ])
  const [statistics, setStatistics] = useState({
    todayCompleted: 0,
    todayTotal: 0,
    thisWeekCompleted: 0,
    thisWeekTotal: 0,
    thisMonthCompleted: 0,
    thisMonthTotal: 0,
    remaining: 0,
    overtime: 0,
    total: 0,
  })
  const [counts, setCounts] = useState({
    rewardsCount: 0,
    totalSubs: 0,
  })
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
        `https://bdsm-backend.onrender.com/api/getTaskDash`,
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

        // Create a function to get the past date based on the number of days ago
        function getDateAgo(daysAgo) {
          const today = new Date()
          const pastDate = new Date(today.setDate(today.getDate() - daysAgo))
          return pastDate.toISOString().split('T')[0]
        }

        // Initialize the counts for each status
        const statusCounts = {
          Completed: [],
          Failed: [],
          Pending: [],
        }

        // Initialize variables
        let todayCompleted = 0
        let todayTotal = 0
        let thisWeekCompleted = 0
        let thisWeekTotal = 0
        let thisMonthCompleted = 0
        let thisMonthTotal = 0
        let remaining = 0
        let overtime = 0

        // Iterate through resData.tasks
        resData.tasks.forEach((task) => {
          const taskEndDate = task.endDate.split('T')[0]
          const daysAgo = Math.floor(
            (new Date() - new Date(taskEndDate)) / (1000 * 60 * 60 * 24),
          )

          // Count for each status and day
          if (statusCounts.hasOwnProperty(task.status)) {
            if (daysAgo < 7) {
              statusCounts[task.status][daysAgo] =
                (statusCounts[task.status][daysAgo] || 0) + 1
            }
          }

          // Today
          if (taskEndDate === getDateAgo(0) && task.status === 'Completed') {
            todayCompleted++
          }
          if (taskEndDate === getDateAgo(0)) {
            todayTotal++
          }

          // This Week
          if (
            new Date(taskEndDate) >= new Date(getDateAgo(6)) &&
            new Date(taskEndDate) <= new Date(getDateAgo(0)) &&
            task.status === 'Completed'
          ) {
            thisWeekCompleted++
          }
          if (
            new Date(taskEndDate) >= new Date(getDateAgo(6)) &&
            new Date(taskEndDate) <= new Date(getDateAgo(0))
          ) {
            thisWeekTotal++
          }

          // This Month
          if (
            new Date(taskEndDate) >= new Date(getDateAgo(30)) &&
            new Date(taskEndDate) <= new Date(getDateAgo(0)) &&
            task.status === 'Completed'
          ) {
            thisMonthCompleted++
          }
          if (
            new Date(taskEndDate) >= new Date(getDateAgo(30)) &&
            new Date(taskEndDate) <= new Date(getDateAgo(0))
          ) {
            thisMonthTotal++
          }

          // Remaining
          if (
            task.status === 'Pending' &&
            new Date(taskEndDate) >= new Date()
          ) {
            remaining++
          }

          // Overtime
          if (
            new Date(taskEndDate) < new Date() &&
            task.status !== 'Completed'
          ) {
            overtime++
          }
        })
        setStatistics({
          todayCompleted: todayCompleted,
          todayTotal: todayTotal,
          thisWeekCompleted: thisWeekCompleted,
          thisWeekTotal: thisWeekTotal,
          thisMonthCompleted: thisMonthCompleted,
          thisMonthTotal: thisMonthTotal,
          remaining: remaining,
          overtime: overtime,
          total: resData.tasks.length,
        })
        setCounts({
          rewardsCount: resData.rewardsCount,
          totalSubs: resData.totalSubs,
        })
        // Prepare the data for the bar chart
        const tempData = [['Status', 'Completed', 'Failed', 'Pending']]
        for (let i = 6; i >= 0; i--) {
          const date = getDateAgo(i)
          const counts = [
            date,
            statusCounts['Completed'][i] || 0,
            statusCounts['Failed'][i] || 0,
            statusCounts['Pending'][i] || 0,
          ]
          tempData.push(counts)
        }

        console.log(tempData)
        setBarData(tempData)
        //         [
        //   ['Year', 'Sales', 'Expenses', 'Profit'],
        //   ['2014', 1000, 400, 200],
        //   ['2015', 1170, 460, 250],
        //   ['2016', 660, 1120, 300],
        //   ['2017', 1030, 540, 350],
        // ]
      }
    }
    fetchTasks()
  }, [])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedTime = new Date().toLocaleString(undefined, options)

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
        <main className="z-1 mx-auto w-full md:pl-72 overflow-y-auto">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-3 p-8">
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/CompletedTask')
                  : router('/AcceptedTask')
              }
              className="m-2 bg-green-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Completed Tasks' : 'Accepted Tasks'}
                </h1>
                <p className="text-3xl">
                  {statistics.total -
                    statistics.remaining -
                    statistics.overtime}
                </p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClipboardDocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/FailedTask')
                  : router('/FailedTask')
              }
              className="m-2 bg-red-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Failed Tasks' : 'Failed Tasks'}
                </h1>
                <p className="text-3xl">{statistics.overtime}</p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClipboardDocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/Rewards')
                  : router('/PendingRewards')
              }
              className="m-2 bg-pink-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Rewards' : 'Pending Rewards'}
                </h1>
                <p className="text-3xl">{counts.rewardsCount}</p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <GiftIcon className="w-16" />
              </div>
            </div>
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/AcceptedTask')
                  : router('/AllTask')
              }
              className="m-2 bg-teal-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Accepted Tasks' : 'All Tasks'}
                </h1>
                <p className="text-3xl">{statistics.total}</p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <DocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/PendingTask')
                  : router('/PendingTask')
              }
              className="m-2 bg-blue-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Pending Tasks' : 'Pending Tasks'}
                </h1>
                <p className="text-3xl">{statistics.remaining}</p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClockIcon className="w-16" />
              </div>
            </div>
            <div
              onClick={() =>
                user?.type === 'sub'
                  ? router('/TaskRecap')
                  : router('/TaskRecap')
              }
              className="m-2 bg-teal-600 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Reportings' : 'Reportings'}
                </h1>
                <p className="text-3xl">{counts.totalSubs}</p>
                <Button rightIcon={<ArrowRightIcon className="w-5" />}>
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <BriefcaseIcon className="w-16" />
              </div>
            </div>
            <div className={`rounded-lg  ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Statistics</h1>
              <div className="bg-black p-2  text-white rounded-lg my-4">
                <div className="flex flex-row text-white">
                  <div>Today</div>
                  <div className="ml-auto">
                    <span className="font-bold">
                      {statistics.todayCompleted}
                    </span>
                    /{statistics.todayTotal}
                  </div>
                </div>

                <Progress
                  colorScheme="green"
                  size="sm"
                  value={
                    (statistics.todayCompleted / statistics.todayTotal) * 100
                  }
                />
              </div>
              <div className="bg-black p-2  text-white rounded-lg my-4">
                <div className="flex flex-row">
                  <div>This week</div>
                  <div className="ml-auto">
                    <span className="font-bold">
                      {statistics.thisWeekCompleted}
                    </span>
                    /{statistics.thisWeekTotal}
                  </div>
                </div>

                <Progress
                  colorScheme="orange"
                  size="sm"
                  value={
                    (statistics.thisWeekCompleted / statistics.thisWeekTotal) *
                    100
                  }
                />
              </div>
              <div className="bg-black p-2  text-white rounded-lg my-4">
                <div className="flex flex-row">
                  <div>This month</div>
                  <div className="ml-auto">
                    <span className="font-bold">
                      {statistics.thisMonthCompleted}
                    </span>
                    /{statistics.thisMonthTotal}
                  </div>
                </div>

                <Progress
                  colorScheme="yellow"
                  size="sm"
                  value={
                    (statistics.thisMonthCompleted /
                      statistics.thisMonthTotal) *
                    100
                  }
                />
              </div>
              <div className="bg-black p-2  text-white rounded-lg my-4">
                <div className="flex flex-row">
                  <div>Remaining</div>
                  <div className="ml-auto">
                    <span className="font-bold">{statistics.remaining}</span>/
                    {statistics.total}
                  </div>
                </div>

                <Progress
                  colorScheme="purple"
                  size="sm"
                  value={(statistics.remaining / statistics.total) * 100}
                />
              </div>
              <div className="bg-black p-2  text-white rounded-lg my-4">
                <div className="flex flex-row">
                  <div>Overtime</div>
                  <div className="ml-auto">
                    <span className="font-bold">{statistics.overtime}</span>/
                    {statistics.total}
                  </div>
                </div>

                <Progress
                  colorScheme="red"
                  size="sm"
                  value={(statistics.overtime / statistics.total) * 100}
                />
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Tasks Overview</h1>
              <div className="bg-black  text-white p-2 rounded-lg my-4 text-center">
                {formattedTime}
              </div>
              <div className="bg-black  text-white p-2 rounded-lg my-4 ">
                <div className="flex flex-col space-y-4 m-auto p-4">
                  <CircularProgress
                    className="m-auto"
                    size="150px"
                    value={
                      (statistics.todayCompleted / statistics.todayTotal) * 100
                    }
                  >
                    <CircularProgressLabel style={{ fontSize: '1.2rem' }}>
                      <span className="font-bold">
                        {statistics.todayCompleted}
                      </span>
                      /{statistics.todayTotal}
                    </CircularProgressLabel>
                  </CircularProgress>
                  <div className="bg-green-500 p-2 rounded-lg text-center text-white">
                    <Countdown />
                  </div>
                </div>
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Daily Records</h1>
              <div className="bg-black p-2 rounded-lg my-4 ">
                <div className="flex flex-col space-y-4 m-auto p-4">
                  <BarChart data={barData} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
