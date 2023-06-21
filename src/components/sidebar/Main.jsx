import {
  Box,
  Checkbox,
  CheckboxGroup,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from '@chakra-ui/react'
import { NamespaceList } from './NamespaceList'
import ChatList from './ChatList'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import Cookies from 'js-cookie'
import ControlBar from '../ControlBar'

function SideBar({
  showDrawer,
  namespaces,
  selectedNamespace,
  setSelectedNamespace,
  setChatId,
  setSelectedChatId,
  createChat,
  user,
  selectedFolder,
  setSelectedFolder,
  foldersList,
  setFoldersList,
  chatList,
  chatNames,
  updateChatName,
  deleteChat,
  controlSidebar,
  setControlSidebar,
  email,
  router,
  setShowDrawer,
  selectedChatId,
  handleModeChange,
  toggleColorMode,
}) {
  return (
    <div>
      {' '}
      <Box
        display={{ base: 'none', md: 'block' }}
        className={`z-99 overflow-y-scroll fixed left-0 w-[19.1rem] h-screen flex flex-col px-6 border-[#CEC7C7] border-r-2`}
        id="responsive"
      >
        <nav className="mb-8 mt-8 h-auto">
          <ul role="list" className="gap-y-6">
            <NamespaceList
              namespaces={namespaces}
              selectedNamespace={selectedNamespace}
              setSelectedNamespace={setSelectedNamespace}
              setChatId={setChatId}
              setSelectedChatId={setSelectedChatId}
              createChat={createChat}
              user={user}
              selectedFolder={selectedFolder}
              setSelectedFolder={setSelectedFolder}
              foldersList={foldersList}
              setFoldersList={setFoldersList}
            />
            <ChatList
              chatList={chatList}
              chatNames={chatNames}
              selectedChatId={selectedChatId}
              setChatId={setChatId}
              setSelectedChatId={setSelectedChatId}
              createChat={createChat}
              updateChatName={updateChatName}
              deleteChat={deleteChat}
            />
          </ul>
        </nav>
        <CheckboxGroup
          colorScheme="green"
          value={controlSidebar.mode ? [controlSidebar.mode] : []}
          onChange={(value) => {
            const selectedMode = value[0]
            handleModeChange(selectedMode)
          }}
        >
          <Stack spacing={[1, 3]} direction={['column']}>
            <div className="p-2 border-2">
              <Checkbox value="balanced">
                <h3 className=" font-semibold">Balanced Mode</h3>
              </Checkbox>
              <div className="text-sm text-sm text-[#767676] mt-2">
                "Balance mode" generally refers to an AI chatbot or language
                model designed to strike a balance between providing helpful
                responses and maintaining appropriate boundaries with users.
              </div>
            </div>

            <div className="p-2 border-2">
              <Checkbox onClick={(e) => e.preventDefault()} value="strict">
                <h3 className=" font-semibold">Strict Mode</h3>
              </Checkbox>
              <div className="text-sm text-sm text-[#767676] mt-2">
                "Strict mode" generally refers to an AI chatbot or language
                model that is designed to strictly adhere to a set of predefined
                rules or guidelines for responding to user queries.
              </div>
            </div>
          </Stack>
        </CheckboxGroup>
        <button className="p-2 mt-8 mb-8 text-left flex text-sm w-full border-2 text-[#5D5DFF]">
          <span>Version GPT 3.5</span>
          <ChevronDownIcon className="flex-none ml-auto  h-5" />
        </button>
        <CheckboxGroup
          colorScheme="green"
          defaultValue={controlSidebar.sources ? ['source', 'prompt'] : []}
          onChange={(values) => {
            setControlSidebar((prevState) => ({
              ...prevState,
              sources: values.includes('source'),
              prompt: values.includes('prompt'),
            }))
          }}
        >
          <Stack spacing={[1, 3]} direction={['column']}>
            <Checkbox value="source">
              <h3 className=" font-semibold">Show resource-link</h3>
            </Checkbox>
            <Checkbox value="prompt">
              <h3 className=" font-semibold">Show Proposed Prompt</h3>
            </Checkbox>
          </Stack>
        </CheckboxGroup>
        <div className="mt-8 mb-8 flex flex-row">
          <span className="text-left font-semibold text-[#00A739] text-sm ">
            {email}
          </span>
          <span className="-mt-4 justify-end font-bolder text-3xl flex flex-1 text-right">
            {' '}
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
        namespaces={namespaces}
        selectedNamespace={selectedNamespace}
        setSelectedNamespace={setSelectedNamespace}
        setChatId={setChatId}
        setSelectedChatId={setSelectedChatId}
        createChat={createChat}
        user={user}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
        foldersList={foldersList}
        setFoldersList={setFoldersList}
        chatList={chatList}
        chatNames={chatNames}
        updateChatName={updateChatName}
        deleteChat={deleteChat}
        controlSidebar={controlSidebar}
        setControlSidebar={setControlSidebar}
        email={email}
        router={router}
        setShowDrawer={setShowDrawer}
        selectedChatId={selectedChatId}
        handleModeChange={handleModeChange}
        toggleColorMode={toggleColorMode}
      />
    </div>
  )
}

export default SideBar
