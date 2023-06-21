import React from 'react'
import { useRef, useState, useEffect } from 'react'
import useNamespaces from '../hooks/useNamespaces'
import { useChats } from '../hooks/useChats'
import { NamespaceList } from '../components/sidebar/NamespaceList'
import MessageList from '../components/chatWindow/MessageList'
import ChatList from '../components/sidebar/ChatList'
import ChatForm from '../components/chatWindow/ChatForm'
import { useCallback } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { BanknotesIcon } from '@heroicons/react/20/solid'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/20/solid'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import DashboardSettings from './Settings'
import Cookies from 'js-cookie'
import { Checkbox, CheckboxGroup, Stack } from '@chakra-ui/react'
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/solid'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import ControlBar from '../components/ControlBar'
import SideBar from '../components/sidebar/Main'
import { css } from '@emotion/react'

export default function Home({ folder, initialNamespace }) {
  const router = useNavigate()
  const [query, setQuery] = useState('')
  const [chatId, setChatId] = useState('1')
  const [showDrawer, setShowDrawer] = useState(false)

  const {
    namespaces,
    setNamespaces,
    selectedNamespace,
    setSelectedNamespace,
    namespaceSource,
    namspaceData,
  } = useNamespaces()

  const {
    chatList,
    selectedChatId,
    setSelectedChatId,
    createChat,
    deleteChat,
    chatNames,
    chatDates,
    updateChatName,
  } = useChats(selectedNamespace)
  const { colorMode, toggleColorMode } = useColorMode()
  const nameSpaceHasChats = chatList.length > 0

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [messageState, setMessageState] = useState({
    messages: [
      {
        message: 'Hi, what would you like to know about these documents?',
        type: 'apiMessage',
      },
    ],
    history: [],
  })

  const { messages, history } = messageState
  const [isModalOpen, setModalOpen] = useState(false)

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [foldersList, setFoldersList] = useState([])
  // Initial state
  const [controlSidebar, setControlSidebar] = useState({
    mode: 'balanced',
    sources: true,
    prompt: true,
  })
  // Function to handle mode change
  const handleModeChange = (mode) => {
    setControlSidebar((prevState) => ({
      ...prevState,
      mode: mode === 'balanced' ? 'strict' : 'balanced',
    }))
  }

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }
  // console.log(chatList);

  const messageListRef = useRef(null)
  const textAreaRef = useRef(null)

  const fetchChatHistory = useCallback(async () => {
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/history?chatId=${chatId}`,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      const { messages: data, email: userEmail } = await response.json()
      setMessageState((state) => ({
        ...state,
        messages: data.map((message) => ({
          type: message.sender === 'user' ? 'userMessage' : 'apiMessage',
          message: message.content,
          sourceDocs: message.sourceDocs,
          date: message.createdAt,
        })),
      }))
      setEmail(userEmail)
    } catch (error) {
      console.error('Failed to fetch chat history:', error)
    }
  }, [chatId])

  useEffect(() => {
    if (selectedChatId) {
      fetchChatHistory()
    }
  }, [selectedChatId, fetchChatHistory])

  useEffect(() => {
    if (initialNamespace) {
      setSelectedNamespace(initialNamespace)
      setSelectedFolder(folder)
    }
  }, [initialNamespace, setSelectedNamespace])

  useEffect(() => {
    textAreaRef.current?.focus()
  }, [])

  useEffect(() => {
    fetchChatHistory()
  }, [chatId, fetchChatHistory])

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)

    if (!query) {
      alert('Please input a question')
      return
    }

    const question = query.trim()
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString()
    setMessageState((state) => ({
      ...state,
      messages: [
        ...state.messages,
        {
          type: 'userMessage',
          message: question,
          date: formattedDate,
        },
      ],
    }))
    setLoading(true)
    setQuery('')

    try {
      const authToken = await Cookies.get('token')

      const response = await fetch(
        'https://chatbot-backend-ihn7.onrender.com/api/chat',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            question,
            history,
            chatId,
            selectedNamespace,
            temp: controlSidebar.mode === 'balanced' ? 0.5 : 0,
          }),
        },
      )

      const data = await response.json()
      console.log('data', data)

      if (data.error) {
        setError(data.error)
      } else {
        const messageWords = data.text.split(' ')
        let currentIndex = 0
        let currentMessage = ''

        setMessageState((state) => ({
          ...state,
          messages: [
            ...state.messages,
            {
              type: 'apiMessage',
              message: '', // Empty message as a placeholder for the typing effect
              sourceDocs: data.sourceDocuments,
              date: data.date,
            },
          ],
        }))
        console.log(data)

        const interval = setInterval(() => {
          currentMessage += messageWords[currentIndex] + ' '

          setMessageState((state) => {
            const updatedMessages = [...state.messages]
            const lastMessageIndex = updatedMessages.length - 1
            updatedMessages[lastMessageIndex] = {
              ...updatedMessages[lastMessageIndex],
              message: currentMessage,
            }
            return {
              ...state,
              messages: updatedMessages,
            }
          })

          currentIndex++

          if (currentIndex >= messageWords.length) {
            clearInterval(interval)
          }
        }, 200) // Adjust the typing speed by changing the interval duration
      }

      console.log('messageState', messageState)

      setLoading(false)

      messageListRef.current?.scrollTo(0, messageListRef.current?.scrollHeight)
    } catch (error) {
      setLoading(false)
      console.error('Error fetching data:', error)
      if (error) {
        console.error('Server responded with:', error)
      }
      setError('An error occurred while fetching the data. Please try again.')
    }
  }

  const handleEnter = (e) => {
    if (e.key === 'Enter' && query) {
      handleSubmit(e)
    } else if (e.key === 'Enter') {
      e.preventDefault()
    }
  }

  const date = new Date()

  const formattedDate = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    day: 'numeric',
    month: 'short',
  })

  const [rest, time] = formattedDate.split(',')
  const [month, day] = rest.trim().split(' ')

  const finalFormat = `${time}, ${day} ${month}`
  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')
  const modalStyles = css`
    z-index: 1;
  `
  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
        user={user}
      />
      <div className={`flex pb-40  ${!nameSpaceHasChats ? 'h-screen' : ''}`}>
        <SideBar
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
        <main className="z-1 pb-20 flex-1 mx-auto w-full md:pl-72">
          <button
            className="z-50 md:hidden ml-auto px-3 py-2 rounded-md  focus:outline-none"
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </button>
          {/* Mobile Drawer */}
          <button
            className="z-50 md:hidden px-3 py-2 rounded-md  focus:outline-none flex-none ml-auto"
            onClick={onOpen}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className={`px-4 sm:px-6 lg:px-8 h-full flex flex-col`}>
            {nameSpaceHasChats ? (
              <>
                <div
                  className={`flex flex-col items-stretch ${
                    messages.length > 0 ? 'flex-grow' : ''
                  }`}
                >
                  <MessageList
                    messages={messages}
                    loading={loading}
                    messageListRef={messageListRef}
                    namespaces={namespaces}
                    namspaceData={
                      namspaceData ? namspaceData[selectedNamespace] : null
                    }
                    handleSubmit={handleSubmit}
                    setQuery={setQuery}
                    controlSidebar={controlSidebar}
                    chatDates={chatDates[selectedChatId]}
                    userName={user ? user.fName + ' ' + user.lName : null}
                    selectedFolder={selectedFolder}
                    selectedNamespace={selectedNamespace}
                    chatName={chatNames[chatId]}
                    user={user}
                  />
                  <div className="flex items-center justify-center mx-auto">
                    <div className="fixed bottom-0 transform  w-[95%] md:w-[75%] pb-6 md:pr-6">
                      <ChatForm
                        loading={loading}
                        error={error}
                        query={query}
                        textAreaRef={textAreaRef}
                        handleEnter={handleEnter}
                        handleSubmit={handleSubmit}
                        setQuery={setQuery}
                        messages={messages}
                        source={namespaceSource}
                        selectedChatId={chatId}
                        selectedNamespace={selectedNamespace}
                        setMessageState={setMessageState}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="m-auto">
                  <div className="text-[0.8rem] flex flex-row">
                    <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                    {finalFormat}
                  </div>
                  <div
                    key={`chatMessage-0`}
                    className={`py-2 px-4 max-w-2xl ${bg}  rounded-br-3xl rounded-tr-3xl rounded-tl-xl`}
                  >
                    <div linkTarget="_blank">
                      Hi {user ? user.fName : null}, Upload or drag and drop a
                      document (PDF or Text) and let us start conversing. I will
                      provide you with answers from the context of the uploaded
                      document. For a fast start, I will provide you with some
                      (3) reference questions which you can use to start a
                      conversation. Given that, my aim is to assist you have
                      fast access into the material. I will not provide your
                      with any subjective answers and I will NOT hallucinate
                      under this context. So please let´s start. After
                      uploading, give me a prompt!
                    </div>
                  </div>
                </div>
                <Button
                  className="w-[15rem] m-auto"
                  colorScheme="green"
                  onClick={openModal}
                >
                  Start Managing Documents
                </Button>
              </>
            )}
            <Modal
              isOpen={isModalOpen}
              onClose={closeModal}
              size="xl"
              css={modalStyles}
            >
              <ModalOverlay />
              <ModalContent
                bg={colorMode == 'light' ? 'white' : '#1A202C'}
                className="p-4"
              >
                <ModalHeader>
                  <div className="text-xl">Document Management</div>
                  <div className="py-2 text-[#716868] text-sm">
                    Start document uploading here.
                  </div>
                </ModalHeader>
                <ModalBody>
                  <DashboardSettings
                    setNamespaces={setNamespaces}
                    namespaces={namespaces}
                    user={user}
                    setModalOpen={setModalOpen}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    foldersList={foldersList}
                    setFoldersList={setFoldersList}
                    selectedNamespace={selectedNamespace}
                    setSelectedNamespace={setSelectedNamespace}
                  />
                </ModalBody>
                <ModalFooter>
                  <button onClick={closeModal}>Close</button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </main>
      </div>
    </div>
  )
}
