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
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
const ControlBar = ({
  showDrawer,
  email,
  router,
  setShowDrawer,
  toggleColorMode,
}) => {
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
            className={`z-99 overflow-y-scroll fixed left-0 w-full lg:w-1/2 md:w-[19.1rem]  h-screen flex flex-col px-6 border-[#CEC7C7] border-e-2 `}
            id="responsive"
          >
            <nav className="mb-8 mt-8 h-auto">
              <ul role="list" className="gap-y-6">
              </ul>
            </nav>
            <div className="mt-8 mb-8 flex flex-row">
              <span className="text-left font-semibold text-[#00A739] text-sm">
                {email}
              </span>
              <span className="-mt-4 justify-end  font-bolder text-3xl flex flex-1 text-right">
                <Menu>
                  <MenuButton rightIcon={<ChevronDownIcon />}>...</MenuButton>
                  <MenuList className="text-sm">
                    <MenuItem onClick={() => router('/pricing')}>
                      Pricing{' '}
                      <BanknotesIcon className="-mr-[8rem] h-5 w-5 flex flex-1" />
                    </MenuItem>
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
            {/* Theme Selection */}
            <div
              onClick={toggleColorMode}
              className="text-center text-[#767676] justify-center mb-20 flex flex-row text-lg rounded-lg border border-2 p-1 w-[50%] m-auto"
            >
              <button className="p-2">Light</button>
              <button className="p-2 bg-black text-white rounded-lg">
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
