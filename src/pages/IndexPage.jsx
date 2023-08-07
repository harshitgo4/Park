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
import moment from 'moment'
export default function Home({ folder, initialNamespace }) {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [user, setUser] = useState(null)
  const [barData, setBarData] = useState([
    ['Year', 'Sales', 'Expenses', 'Profit'],
    ['2014', 1000, 400, 200],
    ['2015', 1170, 460, 250],
    ['2016', 660, 1120, 300],
    ['2017', 1030, 540, 350],
  ])
  const [data, setData] = useState({
    Accepted: 0,
    Failed: 0,
    Pending: 0,
    All: 0,
  })
  const [statistics, setStatistics] = useState({
    todayCompleted: 0,
    todayTotal: 0,
    thisWeekCompleted: 0,
    thisWeekTotal: 0,
    thisMonthCompleted: 0,
    thisMonthTotal: 0,
    remaining: 0,
    overdue: 0,
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
    const url =
      user?.type == 'sub'
        ? 'https://bdsm-backend.onrender.com/api/getSubTaskDash'
        : 'https://bdsm-backend.onrender.com/api/getTaskDash'
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
        console.log(resData.totalTasks)
        setCounts({
          rewardsCount: resData.rewardsCount,
          totalSubs: resData.totalSubs,
        })
        const temp = await resData.tasks.filter(
          (el) => el.status === 'Accepted',
        )
        const temp2 = await resData.tasks.filter((el) => el.status === 'Denied')
        const temp3 = resData.totalTasks.filter((el) => {
          // Convert the endDate to a date object
          const endDate = new Date(el.endDate.split('T')[0])

          // Check if endDate is greater than or equal to today's date
          const isEndDatePassed = endDate >= new Date()
          const today = new Date().toISOString().split('T')[0]
          // Check if there are no tasks in resData.tasks with the same createdAt date as today
          const hasNoTasksToday = !resData.tasks.some((d) => {
            const createdAtDate = new Date(d.createdAt)
              .toISOString()
              .split('T')[0]
            return createdAtDate === today
          })

          // Check if there are no tasks in resData.tasks with the same createdAt week as the current week
          const thisWeekStart = new Date()
          thisWeekStart.setDate(
            thisWeekStart.getDate() - ((thisWeekStart.getDay() + 6) % 7),
          )
          const thisWeekEnd = new Date(thisWeekStart)
          thisWeekEnd.setDate(thisWeekEnd.getDate() + 6)
          const hasNoTasksThisWeek = !resData.tasks.some((d) => {
            const taskDate = new Date(d.createdAt)
            return taskDate >= thisWeekStart && taskDate <= thisWeekEnd
          })

          // Check if there are no tasks in resData.tasks with the same createdAt month as the current month
          const thisMonthStart = new Date()
          thisMonthStart.setDate(1)
          const thisMonthEnd = new Date(thisMonthStart)
          thisMonthEnd.setMonth(thisMonthEnd.getMonth() + 1)
          thisMonthEnd.setDate(thisMonthEnd.getDate() - 1)
          const hasNoTasksThisMonth = !resData.tasks.some((d) => {
            const taskDate = new Date(d.createdAt)
            return taskDate >= thisMonthStart && taskDate <= thisMonthEnd
          })

          // Filter based on the conditions for 'Daily', 'Weekly', and 'Monthly' submissionFreqs
          return (
            isEndDatePassed &&
            ((el.submissionFreq === 'Daily' && hasNoTasksToday) ||
              (el.submissionFreq === 'Weekly' && hasNoTasksThisWeek) ||
              (el.submissionFreq === 'Monthly' && hasNoTasksThisMonth))
          )
        })

        // Calculate todayCompleted
        const today = new Date().toISOString().split('T')[0]
        const todayCompleted = resData.tasks.filter((d) => {
          const createdAtDate = new Date(d.createdAt)
            .toISOString()
            .split('T')[0]
          return d.status === 'Accepted' && createdAtDate === today
        }).length

        const todayFailed = resData.tasks.filter((d) => {
          const createdAtDate = new Date(d.createdAt)
            .toISOString()
            .split('T')[0]
          return d.status === 'Denied' && createdAtDate === today
        }).length

        // Calculate todayTotal
        const todayTotal = resData.totalTasks.filter((d) =>
          isDueForSubmissionToday(d, resData.tasks),
        ).length

        // Calculate weekCompleted (tasks completed within the current week from Monday to Sunday)
        const weekCompleted = resData.totalTasks.filter((d) =>
          isCompletedLastWeek(d, resData.tasks),
        ).length

        const weekFailed = resData.totalTasks.filter((d) =>
          isFailedLastWeek(d, resData.tasks),
        ).length

        // Calculate weekTotal (tasks due for submission within the current week from Monday to Sunday)
        const weekTotal = resData.totalTasks.filter((d) =>
          isDueForSubmissionWeek(d, resData.tasks),
        ).length

        // Calculate monthCompleted (tasks completed within the current month from 1st to the end of the month)
        const monthCompleted = resData.totalTasks.filter((d) =>
          isCompletedThisMonth(d, resData.tasks),
        ).length

        const monthFailed = resData.totalTasks.filter((d) =>
          isFailedThisMonth(d, resData.tasks),
        ).length

        // Calculate monthTotal (tasks due for submission within the current month from 1st to the end of the month)
        const monthTotal = resData.totalTasks.filter((d) =>
          isDueForSubmissionMonth(d, resData.tasks),
        ).length

        setData({
          Accepted: temp.length,
          Failed: temp2.length,
          All: resData.totalTasks.length,
          Pending: resData.pendingTaskCount,
        })
        setStatistics({
          todayCompleted,
          todayTotal,
          thisWeekTotal: weekTotal,
          thisWeekCompleted: weekCompleted,
          thisMonthCompleted: monthCompleted,
          thisMonthTotal: monthTotal,
          remaining: temp3.length,
          overdue: temp2.length,
          total: resData.totalTasks.length,
        })

        setBarData([
          ['Status', 'Completed', 'Failed', 'Pending'],
          [
            'Today',
            todayCompleted,
            todayFailed,
            todayTotal - todayCompleted - todayFailed,
          ],
          [
            'Weekly',
            weekCompleted,
            weekFailed,
            weekTotal - weekCompleted - weekFailed,
          ],
          [
            'Monthly',
            monthCompleted,
            monthFailed,
            monthTotal - monthCompleted - monthFailed,
          ],
        ])
      }
    }
    if (user) {
      fetchTasks()
    }
  }, [user])

  function isDueForSubmissionToday(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date().toISOString().split('T')[0]

    if (submissionFreq === 'Daily') {
      // For daily tasks, check if there's no task submitted today
      return !tasksData.some((d) => d.taskId === task._id && d.date === today)
    }

    return false // Invalid submission frequency
  }

  // Function to check if the task is due for submission within the current week (Monday to Sunday)
  function isDueForSubmissionWeek(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Weekly') {
      // Find the start and end dates of the current week (from Monday to Sunday)
      const thisWeekStart = new Date()
      thisWeekStart.setDate(
        thisWeekStart.getDate() - ((thisWeekStart.getDay() + 6) % 7),
      )
      const thisWeekEnd = new Date(thisWeekStart)
      thisWeekEnd.setDate(thisWeekEnd.getDate() + 6)

      // Check if the task is due for submission within the current week
      return !tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= thisWeekStart &&
          taskDate <= thisWeekEnd
        )
      })
    }

    return false // Invalid submission frequency
  }

  // Function to check if the task was completed within the last week (from Monday to Sunday)
  function isCompletedLastWeek(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Weekly') {
      // Find the start and end dates of the last week (from Monday to Sunday)
      const lastWeekStart = new Date()
      lastWeekStart.setDate(
        lastWeekStart.getDate() - ((lastWeekStart.getDay() + 6) % 7) - 7,
      )
      const lastWeekEnd = new Date(lastWeekStart)
      lastWeekEnd.setDate(lastWeekEnd.getDate() + 6)

      // Check if the task was completed within the last week
      return tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= lastWeekStart &&
          taskDate <= lastWeekEnd &&
          d.status === 'Accepted'
        )
      })
    }

    return false // Invalid submission frequency
  }

  function isFailedLastWeek(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Weekly') {
      // Find the start and end dates of the last week (from Monday to Sunday)
      const lastWeekStart = new Date()
      lastWeekStart.setDate(
        lastWeekStart.getDate() - ((lastWeekStart.getDay() + 6) % 7) - 7,
      )
      const lastWeekEnd = new Date(lastWeekStart)
      lastWeekEnd.setDate(lastWeekEnd.getDate() + 6)

      // Check if the task was completed within the last week
      return tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= lastWeekStart &&
          taskDate <= lastWeekEnd &&
          d.status === 'Denied'
        )
      })
    }

    return false // Invalid submission frequency
  }

  // Function to check if the task is due for submission within the current month (from 1st to the end of the month)
  function isDueForSubmissionMonth(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Monthly') {
      // Find the start and end dates of the current month (from 1st to the end of the month)
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const thisMonthEnd = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      )

      // Check if the task is due for submission within the current month
      return !tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= thisMonthStart &&
          taskDate <= thisMonthEnd
        )
      })
    }

    return false // Invalid submission frequency
  }

  // Function to check if the task was completed within the current month (from 1st to the end of the month)
  function isCompletedThisMonth(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Monthly') {
      // Find the start and end dates of the current month (from 1st to the end of the month)
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const thisMonthEnd = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      )

      // Check if the task was completed within the current month
      return tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= thisMonthStart &&
          taskDate <= thisMonthEnd &&
          d.status === 'Accepted'
        )
      })
    }

    return false // Invalid submission frequency
  }

  function isFailedThisMonth(task, tasksData) {
    const { createdAt, submissionFreq } = task
    const today = new Date()

    if (submissionFreq === 'Monthly') {
      // Find the start and end dates of the current month (from 1st to the end of the month)
      const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
      const thisMonthEnd = new Date(
        today.getFullYear(),
        today.getMonth() + 1,
        0,
      )

      // Check if the task was completed within the current month
      return tasksData.some((d) => {
        const taskDate = new Date(d.date)
        return (
          d.taskId === task._id &&
          taskDate >= thisMonthStart &&
          taskDate <= thisMonthEnd &&
          d.status === 'Denied'
        )
      })
    }

    return false // Invalid submission frequency
  }

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)

  const textColor = useColorModeValue('text-black', 'text-white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')
  const bg2 = useColorModeValue('bg-white', 'bg-black')

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
                  {user?.type === 'sub'
                    ? 'Completed Tasks'
                    : 'Accepted Submissions'}
                </h1>
                <p className="text-3xl">{data.Accepted}</p>
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
                  {user?.type === 'sub'
                    ? 'Failed Submissions'
                    : 'Failed Submissions'}
                </h1>
                <p className="text-3xl">{data.Failed}</p>
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
                  {user?.type === 'sub' ? 'Accepted Submissions' : 'All Tasks'}
                </h1>
                <p className="text-3xl">{data.All}</p>
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
                  ? router('/PendingSubmissions')
                  : router('/PendingSubmissions')
              }
              className="m-2 bg-blue-400 flex flex-row p-4"
            >
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub'
                    ? 'Pending Submissions'
                    : 'Pending Submissions'}
                </h1>
                <p className="text-3xl">{data.Pending}</p>
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
                  {user?.type === 'sub' ? 'Reporting' : 'Reporting'}
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
              <div className={`${bg2} p-2  ${textColor} rounded-lg my-4`}>
                <div className="flex flex-row">
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
              <div className={`${bg2} p-2 rounded-lg my-4`}>
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
              <div className={`${bg2} p-2 rounded-lg my-4`}>
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
              <div className={`${bg2} p-2  rounded-lg my-4`}>
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
              <div className={`${bg2} p-2  rounded-lg my-4`}>
                <div className="flex flex-row">
                  <div>Overdue</div>
                  <div className="ml-auto">
                    <span className="font-bold">{statistics.overdue}</span>/
                    {statistics.total}
                  </div>
                </div>

                <Progress
                  colorScheme="red"
                  size="sm"
                  value={(statistics.overdue / statistics.total) * 100}
                />
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Tasks Overview</h1>
              <div
                className={`${bg2}  ${textColor} p-2 rounded-lg my-4 text-center`}
              >
                {formattedTime}
              </div>
              <div className={`${bg2}  p-2 rounded-lg my-4 `}>
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
                  <div className="bg-green-500 p-2 rounded-lg text-center">
                    <Countdown />
                  </div>
                </div>
              </div>
            </div>
            <div className={`rounded-lg ${bg} ${textColor} p-4 m-2`}>
              <h1 className="font-semibold ">Daily Records</h1>
              <div className={`${bg2} p-2 rounded-lg my-4 `}>
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
