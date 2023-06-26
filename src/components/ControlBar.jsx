import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
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
import { useColorModeValue, useColorMode } from '@chakra-ui/react'
const ControlBar = ({
  showDrawer,
  email,
  router,
  setShowDrawer,
  toggleColorMode,
  colorMode,
  user,
}) => {
  const bg = useColorModeValue('bg-[#1E293B]', 'bg-[#fff]')
  const txt = useColorModeValue('text-white', 'text-blue-500')
  return (
    <Drawer
      placement="left"
      onClose={() => setShowDrawer(false)}
      isOpen={showDrawer}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody>
          <Box
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
                onClick={() => {
                  user?.type === 'sub' ? router('/SearchDOM') : null
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/SearchDOM'
                    ? `w-full p-4 rounded-lg ${bg} ${txt}`
                    : null
                }`}
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? 'Search DOM' : 'Submit requests'}
              </button>
              <button
                onClick={() => {
                  user?.type === 'sub' ? router('/GetTask') : null
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/GetTask'
                    ? `w-full p-4 rounded-lg ${bg} ${txt}`
                    : null
                }`}
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? 'Get Task' : 'Connected Sub'}
              </button>
              <button
                onClick={() => {
                  user?.type === 'sub' ? router('/AssignedTask') : null
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/AssignedTask'
                    ? `w-full p-4 rounded-lg ${bg} ${txt}`
                    : null
                }`}
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? 'Assigned Tasks' : 'Add a Task'}
              </button>
              <button
                onClick={() => {
                  user?.type === 'sub' ? router('/Rewards') : null
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/Rewards'
                    ? `w-full p-4 rounded-lg ${bg} ${txt}`
                    : null
                }`}
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? 'Reward Points' : 'Create Reward'}
              </button>
              <button
                onClick={() => {
                  user?.type === 'sub' ? router('/BuyReward') : null
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/BuyReward'
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
                    : router('/SubmittedTask')
                }}
                className={`flex flex-row text-right ${
                  window.location.pathname === '/AllTask' ||
                  window.location.pathname === '/SubmittedTask'
                    ? `w-full p-4 rounded-lg ${bg} ${txt}`
                    : null
                }`}
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? 'All Task' : 'Submitted Tasks'}
              </button>
              <button
                hidden={user?.type === 'sub'}
                className="flex flex-row text-right"
              >
                <CalendarDaysIcon className="w-5 mx-2" />
                {user?.type === 'sub' ? '' : 'Submission List'}
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
                        await localStorage.removeItem('subscriptionData')
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
                  colorMode === 'light'
                    ? 'bg-black text-white rounded-lg'
                    : null
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default ControlBar
