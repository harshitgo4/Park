import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import {
  AdjustmentsVerticalIcon,
  CalendarDaysIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
import ControlBar from '../ControlBar'
import { useColorModeValue, useColorMode, Collapse } from '@chakra-ui/react'

function SideBar({
  showDrawer,
  user,
  email,
  router,
  setShowDrawer,
  toggleColorMode,
}) {
  const { colorMode } = useColorMode()

  const bg = useColorModeValue('bg-[#1E293B]', 'bg-[#fff]')
  const txt = useColorModeValue('text-white', 'text-blue-500')

  const [isTaskOpen, setTaskOpen] = useState(false)
  const [isRewardOpen, setRewardOpen] = useState(false)
  const [isConnectOpen, setConnectOpen] = useState(false)

  useEffect(() => {
    if (window.location.pathname === '/dashboard') {
      console.log('Dashboard')
    } else if (
      window.location.pathname === '/SubmitTask' ||
      window.location.pathname === '/CurrentTask' ||
      window.location.pathname === '/AssignedTask' ||
      window.location.pathname === '/AllTask' ||
      window.location.pathname === '/createTask' ||
      window.location.pathname === '/ManageTask' ||
      window.location.pathname === '/AllTask' ||
      window.location.pathname === '/AllSubmittedTasks' ||
      window.location.pathname === '/PendingSubmissions'
    ) {
      setTaskOpen(true)
    } else if (
      window.location.pathname === '/SearchDOM' ||
      window.location.pathname === '/ConnectedSub' ||
      window.location.pathname === '/SubRequests'
    ) {
      setConnectOpen(true)
    } else if (
      window.location.pathname === '/Rewards' ||
      window.location.pathname === '/BuyReward' ||
      window.location.pathname === '/PendingRewards' ||
      window.location.pathname === '/ManageRewards' ||
      window.location.pathname === '/CreateReward' ||
      window.location.pathname === '/AllRewardsBought'
    ) {
      setRewardOpen(true)
    }
  }, [])

  return (
    <div>
      {' '}
      <Box
        display={{ base: 'none', md: 'block' }}
        className={`pt-2 pl-2 pr-0 z-99 overflow-y-scroll w-[15rem] fixed left-0 h-screen flex flex-col border-[#CEC7C7] border-r-2`}
        id="responsive"
      >
        <div className="my-8 pb-12 w-full my-8 space-y-4">
          <Button
            onClick={() => router('/dashboard')}
            className={`flex flex-row text-right w-full py-4 rounded-lg ${bg} ${txt}`}
            rightIcon={
              <AdjustmentsVerticalIcon
                className={`${
                  isConnectOpen ? 'transform rotate-180' : 'transform rotate-0'
                }`}
              />
            }
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            Dashboard
          </Button>

          {/* Task */}
          <Button
            onClick={() => setTaskOpen(!isTaskOpen)}
            className={`flex flex-row text-right w-full py-4 rounded-lg ${bg} ${txt}`}
            rightIcon={
              <ChevronDownIcon
                className={`${
                  isTaskOpen ? 'transform rotate-180' : 'transform rotate-0'
                }`}
              />
            }
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            Tasks
          </Button>
          <Collapse className="my-8 w-full my-8 space-y-4" in={isTaskOpen}>
            <button
              hidden={user?.type == 'dom'}
              onClick={() => {
                user?.type === 'sub' ? router('/SubmitTask') : null
              }}
              className={`flex flex-row text-right ${
                window.location.pathname === '/SubmitTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Submit Task
            </button>
            <button
              onClick={() => router('/CurrentTask')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/CurrentTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Current Task
            </button>
            <button
              onClick={() => router('/AssignedTask')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/AssignedTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Assigned Tasks
            </button>
            <button
              onClick={() => router('/AllTask')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/AllTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              All Task
            </button>
            <button
              onClick={() => router('/createTask')}
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/createTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Create task
            </button>
            <button
              onClick={() => router('/ManageTask')}
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/ManageTask'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Manage Tasks
            </button>
            <button
              onClick={() => router('/AllSubmittedTasks')}
              className={`flex flex-row text-right ${
                window.location.pathname === '/AllSubmittedTasks'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Submitted Tasks
            </button>
            <button
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-left ${
                window.location.pathname === '/PendingSubmissions'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
              onClick={() => router('/PendingSubmissions')}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Pending Submissions
            </button>
          </Collapse>

          {/* Connection */}
          <Button
            onClick={() => setConnectOpen(!isConnectOpen)}
            className={`flex flex-row text-right w-full py-4 rounded-lg ${bg} ${txt}`}
            rightIcon={
              <ChevronDownIcon
                className={`${
                  isConnectOpen ? 'transform rotate-180' : 'transform rotate-0'
                }`}
              />
            }
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            Connections
          </Button>
          <Collapse className="my-8 w-full my-8 space-y-4" in={isConnectOpen}>
            <button
              onClick={() => router('/SearchDOM')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/SearchDOM'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Search DOM
            </button>
            <button
              onClick={() => router('/SubRequests')}
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/SubRequests'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Sub requests
            </button>
            <button
              onClick={() => router('/ConnectedSub')}
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/ConnectedSub'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Connected Sub
            </button>
          </Collapse>

          {/* Rewards */}
          <Button
            onClick={() => setRewardOpen(!isRewardOpen)}
            className={`flex flex-row text-right w-full py-4 rounded-lg ${bg} ${txt}`}
            rightIcon={
              <ChevronDownIcon
                className={`${
                  isRewardOpen ? 'transform rotate-180' : 'transform rotate-0'
                }`}
              />
            }
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            Rewards
          </Button>
          <Collapse className="my-8 w-full my-8 space-y-4" in={isRewardOpen}>
            <button
              onClick={() => router('/Rewards')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/Rewards'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Reward Points
            </button>
            <button
              onClick={() => router('/BuyReward')}
              hidden={user?.type == 'dom'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/BuyReward'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Buy Reward
            </button>
            <button
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/PendingRewards'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
              onClick={() => router('/PendingRewards')}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Pending Rewards
            </button>
            <button
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/ManageRewards'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
              onClick={() => router('/ManageRewards')}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Manage Rewards
            </button>
            <button
              onClick={() => router('/CreateReward')}
              hidden={user?.type == 'sub'}
              className={`flex flex-row text-right ${
                window.location.pathname === '/CreateReward'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Create Reward
            </button>
            <button
              className={`flex flex-row text-right ${
                window.location.pathname === '/AllRewardsBought'
                  ? `w-full py-4 rounded-lg ${bg} ${txt}`
                  : null
              }`}
              onClick={() => router('/AllRewardsBought')}
            >
              <CalendarDaysIcon className="w-5 mx-2" />
              Rewards History
            </button>
          </Collapse>
        </div>

        <div className="bottom-0 flex flex-row">
          <div
            onClick={toggleColorMode}
            className="text-center text-[#767676] justify-center flex flex-row text-lg rounded-lg border border-2 p-1 w-[60%] m-auto "
          >
            <button
              className={`p-2 ${
                colorMode === 'light' ? 'bg-black text-white rounded-lg' : null
              } `}
            >
              Light
            </button>
            <button
              className={`p-2 ${
                colorMode === 'dark' ? 'bg-black text-white rounded-lg' : null
              } `}
            >
              Dark
            </button>
          </div>
          <span className="-mt-4 justify-end font-bolder text-3xl flex flex-1 text-right">
            {' '}
            <Menu>
              <MenuButton rightIcon={<ChevronDownIcon />}>...</MenuButton>
              <MenuList className="text-sm">
                <MenuItem onClick={() => router('/settings')}>
                  Settings{' '}
                  <Cog6ToothIcon className="-mr-[8rem] h-5 w-5 flex flex-1" />
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await Cookies.remove('token')
                    await localStorage.removeItem('subscriptionDetails')
                    router('/signin')
                  }}
                >
                  Signout{' '}
                  <ArrowRightOnRectangleIcon className="-mr-[8rem] h-5 w-5 flex flex-1" />
                </MenuItem>
              </MenuList>
            </Menu>
          </span>
        </div>
      </Box>
      <ControlBar
        showDrawer={showDrawer}
        user={user}
        email={user?.email}
        router={router}
        setShowDrawer={setShowDrawer}
        toggleColorMode={toggleColorMode}
        colorMode={colorMode}
      />
    </div>
  )
}

export default SideBar
