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
import { useColorModeValue, useColorMode } from '@chakra-ui/react'

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
  return (
    <div>
      {' '}
      <Box
        display={{ base: 'none', md: 'block' }}
        className={`pt-2 pl-2 pr-0 z-99 overflow-y-scroll w-[19.1rem] fixed left-0 h-screen flex flex-col border-[#CEC7C7] border-r-2`}
        id="responsive"
      >
        <div className="my-8 pb-12 w-full my-8 space-y-4">
          <button
            onClick={() => router('/dashboard')}
            className={`flex flex-row text-right ${
              window.location.pathname === '/dashboard'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <AdjustmentsVerticalIcon className="w-5 mx-2" />
            Dashboard
          </button>
          <button
            hidden={user?.type == 'dom'}
            onClick={() => {
              user?.type === 'sub' ? router('/SubmitTask') : null
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/SubmitTask'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Submit Task' : null}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/SearchDOM')
                : router('/SubRequests')
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/SearchDOM' ||
              window.location.pathname === '/SubRequests'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Search DOM' : 'Sub requests'}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/CurrentTask')
                : router('/ConnectedSub')
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/CurrentTask' ||
              window.location.pathname === '/ConnectedSub'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Current Task' : 'Connected Sub'}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/AssignedTask')
                : router('/createTask')
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/AssignedTask' ||
              window.location.pathname === '/createTask'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Assigned Tasks' : 'Create task'}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/Rewards')
                : router('/CreateReward')
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/Rewards' ||
              window.location.pathname === '/CreateReward'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Reward Points' : 'Create Reward'}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/BuyReward')
                : router('/ManageTask')
            }}
            className={`flex flex-row text-right ${
              window.location.pathname === '/BuyReward' ||
              window.location.pathname === '/ManageTask'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Buy Reward' : 'Manage Tasks'}
          </button>
          <button
            onClick={() => {
              user?.type === 'sub'
                ? router('/AllTask')
                : router('/AllSubmittedTasks')
            }}
            className={`flex flex-row text-right ${
              (window.location.pathname === '/AllTask' &&
                user?.type === 'sub') ||
              window.location.pathname === '/AllSubmittedTasks'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'All Task' : 'Submitted Tasks'}
          </button>
          <button
            hidden={user?.type === 'sub'}
            className={`flex flex-row text-right ${
              window.location.pathname === '/PendingSubmissions'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
            onClick={() => router('/PendingSubmissions')}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? '' : 'Pending Submissions'}
          </button>
          <button
            hidden={user?.type === 'sub'}
            className={`flex flex-row text-right ${
              window.location.pathname === '/ManageRewards'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
            onClick={() => router('/ManageRewards')}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? '' : 'Manage Rewards'}
          </button>
          <button
            className={`flex flex-row text-right ${
              window.location.pathname === '/AllRewardsBought'
                ? `w-full p-4 rounded-lg ${bg} ${txt}`
                : null
            }`}
            onClick={() => router('/AllRewardsBought')}
          >
            <CalendarDaysIcon className="w-5 mx-2" />
            {'Rewards History'}
          </button>
        </div>
        <div className="bottom-0 flex flex-row">
          <span className="text-left font-semibold text-[#00A739] text-sm ">
            {user?.email}
          </span>
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
        <div
          onClick={toggleColorMode}
          className="text-center text-[#767676] justify-center mb-20 flex flex-row text-lg rounded-lg border border-2 p-1 w-[50%] m-auto "
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
