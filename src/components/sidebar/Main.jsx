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

function SideBar({
  showDrawer,
  user,
  email,
  router,
  setShowDrawer,
  toggleColorMode,
}) {
  return (
    <div>
      {' '}
      <Box
        display={{ base: 'none', md: 'block' }}
        className={`pt-2 pl-2 pr-0 z-99 overflow-y-scroll w-[19.1rem] fixed left-0 h-screen flex flex-col border-[#CEC7C7] border-r-2`}
        id="responsive"
      >
        <div className="my-8">
          <h1 className="font-semibold">Main</h1>
          <div className="text-right p-4 my-2 rounded-lg bg-white text-blue-500">
            <button className="flex flex-row text-right">
              <AdjustmentsVerticalIcon className="w-5 mx-2" />
              Dashboard
            </button>
          </div>
        </div>
        <div className="pb-12 my-8 space-y-4">
          <h1 className="font-semibold">Get Details</h1>
          <button className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Search DOM' : 'Submit requests'}
          </button>
          <button className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Get Task' : 'Connected Sub'}
          </button>
          <button className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Assigned Tasks' : 'Add a Task'}
          </button>
          <button className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Reward Points' : 'Create Reward'}
          </button>
          <button className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? 'Buy Reward' : 'Manage Tasks'}
          </button>
          <button hidden={user?.type==='sub'} className="flex flex-row text-right">
            <CalendarDaysIcon className="w-5 mx-2" />
            {user?.type === 'sub' ? '' : 'Submitted Tasks'}
          </button>
          <button hidden={user?.type==='sub'} className="flex flex-row text-right">
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
          <button className="p-2 ">Light</button>
          <button className="p-2 bg-black text-white rounded-lg">Dark</button>
        </div>
      </Box>
      <ControlBar
        showDrawer={showDrawer}
        user={user}
        email={user?.email}
        router={router}
        setShowDrawer={setShowDrawer}
        toggleColorMode={toggleColorMode}
      />
    </div>
  )
}

export default SideBar
