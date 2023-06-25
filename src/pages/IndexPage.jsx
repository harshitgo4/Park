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
import BarChart from '../partials/BarChart'

export default function Home({ folder, initialNamespace }) {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')

  const options = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }

  const formattedTime = new Date('2021-11-17T10:00:00').toLocaleString(
    undefined,
    options,
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
        <main className="z-1 mx-auto w-full md:pl-72 overflow-y-auto">
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-3 p-8">
            <div className="m-2 bg-green-400 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub'
                    ? 'Completed Task'
                    : 'All Submitted Tasks'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/CompletedTask')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClipboardDocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div className="m-2 bg-red-400 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Failed Task' : 'Add Task'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/FailedTask')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClipboardDocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div className="m-2 bg-pink-400 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Rewards' : 'Create Reward'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/Rewards')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <GiftIcon className="w-16" />
              </div>
            </div>
            <div className="m-2 bg-teal-400 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Accepted Task' : 'Manage Task'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/AcceptedTask')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <DocumentCheckIcon className="w-16" />
              </div>
            </div>
            <div className="m-2 bg-blue-400 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub' ? 'Pending Task' : 'Submission'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/PendingTask')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <ClockIcon className="w-16" />
              </div>
            </div>
            <div className="m-2 bg-teal-600 flex flex-row p-4">
              <div>
                {' '}
                <h1 className="font-semibold">
                  {user?.type === 'sub'
                    ? 'Daily /Monthly /Weekly Recap'
                    : 'Pending Submissions'}
                </h1>
                <p className="text-3xl">473</p>
                <Button
                  onClick={() =>
                    user?.type === 'sub'
                      ? router('/TaskRecap')
                      : 'All Submitted Tasks'
                  }
                  rightIcon={<ArrowRightIcon className="w-5" />}
                >
                  View Details
                </Button>
              </div>
              <div className="flex justify-center items-center m-auto">
                <BriefcaseIcon className="w-16" />
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Statistics</h1>
              <div className="bg-black p-2 rounded-lg my-4">
                <div className="flex flex-row">
                  <div>Today</div>
                  <div className="ml-auto">
                    <span className="font-bold">2</span>/4
                  </div>
                </div>

                <Progress colorScheme="green" size="sm" value={20} />
              </div>
              <div className="bg-black p-2 rounded-lg my-4">
                <div className="flex flex-row">
                  <div>This week</div>
                  <div className="ml-auto">
                    <span className="font-bold">2</span>/4
                  </div>
                </div>

                <Progress colorScheme="orange" size="sm" value={20} />
              </div>
              <div className="bg-black p-2 rounded-lg my-4">
                <div className="flex flex-row">
                  <div>This month</div>
                  <div className="ml-auto">
                    <span className="font-bold">2</span>/4
                  </div>
                </div>

                <Progress colorScheme="yellow" size="sm" value={20} />
              </div>
              <div className="bg-black p-2 rounded-lg my-4">
                <div className="flex flex-row">
                  <div>Remaining</div>
                  <div className="ml-auto">
                    <span className="font-bold">2</span>/4
                  </div>
                </div>

                <Progress colorScheme="purple" size="sm" value={20} />
              </div>
              <div className="bg-black p-2 rounded-lg my-4">
                <div className="flex flex-row">
                  <div>Overtime</div>
                  <div className="ml-auto">
                    <span className="font-bold">2</span>/4
                  </div>
                </div>

                <Progress colorScheme="red" size="sm" value={20} />
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Task Overview</h1>
              <div className="bg-black p-2 rounded-lg my-4 text-center">
                {formattedTime}
              </div>
              <div className="bg-black p-2 rounded-lg my-4 ">
                <div className="flex flex-col space-y-4 m-auto p-4">
                  <CircularProgress className="m-auto" size="150px" value={50}>
                    <CircularProgressLabel style={{ fontSize: '1.2rem' }}>
                      <span className="font-bold">2</span>/4
                    </CircularProgressLabel>
                  </CircularProgress>
                  <Button colorScheme="green">
                    <Countdown />
                  </Button>
                </div>
              </div>
            </div>
            <div className={`rounded-lg ${bg} p-4 m-2`}>
              <h1 className="font-semibold ">Daily Records</h1>
              <div className="bg-black p-2 rounded-lg my-4 ">
                <div className="flex flex-col space-y-4 m-auto p-4">
                  <BarChart />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
