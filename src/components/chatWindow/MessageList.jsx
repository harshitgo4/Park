import React, { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  ClipboardDocumentCheckIcon,
  PaperAirplaneIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {
  ChatBubbleLeftEllipsisIcon,
  DocumentMagnifyingGlassIcon,
  DocumentTextIcon,
  FolderIcon,
} from '@heroicons/react/24/outline'
import { Worker } from '@react-pdf-viewer/core'
// Import the main component
import { Viewer } from '@react-pdf-viewer/core'
import ChatForm from './ChatForm'
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

// Import styles
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

function MessageList({
  messages,
  loading,
  messageListRef,
  namspaceData,
  handleSubmit,
  setQuery,
  controlSidebar,
  chatDates,
  userName,
  namespaces,
  selectedFolder,
  selectedNamespace,
  chatName,
  user,
  error,
  query,
  textAreaRef,
  handleEnter,
  source,
  selectedChatId,
  setMessageState,
}) {
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Function to scroll to the bottom of the chatContainer
  function scrollToBottom() {
    const chatContainer = messageListRef.current
    if (chatContainer) {
      const scrollHeight = chatContainer.scrollHeight
      const height = chatContainer.clientHeight
      const maxScrollTop = scrollHeight - height
      chatContainer.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0
    }
  }

  // Call scrollToBottom with a slight delay to ensure content is rendered

  const [modalData, setModalData] = React.useState({ pg: null, content: null })
  const [previewPdf, setPreviewPdf] = React.useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const [finalDate, setFinalDate] = useState()

  useEffect(() => {
    const date = new Date(chatDates[selectedChatId] || Date.now())

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
    setFinalDate(finalFormat)
  }, [chatDates, selectedChatId])

  const setModalOpen = (pg, content) => {
    setModalData({
      pg,
      content,
    })
    onOpen()
  }
  const { isOpen, onOpen, onClose } = useDisclosure()

  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const textColor = useColorModeValue('text-black', 'text-gray-400')
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')
  const bg2 = useColorModeValue('bg-[#fff]', 'bg-[#1A202C]')
  return (
    <>
      <div className={`flex flex-row gap-4 h-screen`}>
        <div
          id="chatWindow"
          ref={messageListRef}
          className={`flex flex-col  mx-auto overflow-y-scroll h-screen gap-4 ${
            previewPdf ? 'w-1/2' : 'w-[100%] lg:w-[70%]'
          } m-auto`}
        >
          <>
            <div
              className={`sticky top-0 z-50 relative md:mb-10 flex flex-row gap-x-4 text-xs items-center justify-between p-2 ${bg2} h-fit text-gray-400`}
            >
              <Button
                size="sm"
                display={{ base: 'none', md: 'block' }}
                leftIcon={<FolderIcon className="w-4 h-4 z-1" />}
              >
                {selectedFolder}
              </Button>
              <Button
                size="sm"
                display={{ base: 'none', md: 'block' }}
                leftIcon={<DocumentTextIcon className="w-4 h-4 " />}
              >
                {selectedNamespace}
              </Button>
              <Button
                size="sm"
                display={{ base: 'none', md: 'block' }}
                leftIcon={<ChatBubbleLeftEllipsisIcon className="w-4 h-4 " />}
              >
                {chatName ? chatName : 'Untitled'}
              </Button>
              <Button size="xs" display={{ base: 'block', md: 'none' }}>
                {selectedFolder + '->' + selectedNamespace + '->' + chatName}
              </Button>
              <Button
                className="flex justify-end ml-auto"
                size="xs"
                onClick={() => setPreviewPdf(!previewPdf)}
                leftIcon={<DocumentMagnifyingGlassIcon className="w-5 h-5 " />}
              >
                Preview Document
              </Button>
            </div>
            <div className='h-screen'>
              <div
                hidden={!controlSidebar.prompt}
                className="text-[0.8rem] flex flex-row"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                {finalDate ? finalDate : null}
              </div>
              <div
                key={`chatMessage-0`}
                hidden={!controlSidebar.prompt}
                className={`py-2 px-4 max-w-2xl ${bg} self-start rounded-br-3xl rounded-tr-3xl rounded-tl-xl`}
              >
                <div linkTarget="_blank">
                  Hey {userName ? userName.split(' ')[0] : null}! The document
                  you uploaded has context in{' '}
                  {namspaceData ? namspaceData[0] : null}. I will welcome your
                  questions and provide you with answers within the context of
                  this document. <br />
                  <br /> Here are some suitable questions (prompts) we can start
                  conversing about:
                  <br />
                  <br />
                  <span
                    onMouseOver={(e) => setQuery(namspaceData[1][0])}
                    onClick={(e) => handleSubmit(e)}
                    className="flex flex-row cursor-pointer z-1"
                  >
                    <PaperAirplaneIcon className="h-6 w-6 -rotate-[35deg] text-[#5D5DFF] mr-2 z-1" />
                    {namspaceData ? namspaceData[1][0] : null}
                  </span>
                  <br />
                  <span
                    onMouseOver={(e) => setQuery(namspaceData[1][1])}
                    onClick={(e) => handleSubmit(e)}
                    className="flex flex-row cursor-pointer"
                  >
                    <PaperAirplaneIcon className="h-6 w-6 -rotate-[35deg] text-[#5D5DFF] mr-2" />
                    {namspaceData ? namspaceData[1][1] : null}
                  </span>
                  <br />
                  <span
                    onMouseOver={(e) => setQuery(namspaceData[1][2])}
                    onClick={(e) => handleSubmit(e)}
                    className="flex flex-row cursor-pointer"
                  >
                    <PaperAirplaneIcon className="h-6 w-6 -rotate-[35deg] text-[#5D5DFF] mr-2" />
                    {namspaceData ? namspaceData[1][2] : null}
                  </span>
                </div>
              </div>
            </div>
          </>
          {messages && messages.length > 0
            ? messages.map((message, index) => {
                let className
                if (message.type === 'apiMessage') {
                  className = `self-start rounded-br-3xl ${bg} rounded-tr-3xl rounded-tl-xl w-full`
                } else {
                  className =
                    loading && index + 1 === messages.length - 1
                      ? 'text-[#888888] self-end pb-30'
                      : 'text-[#888888] self-end'
                }
                if (message.type === 'apiMessage') {
                  const date = new Date(message.date)

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
                  return (
                    <>
                      <div className="text-[0.8rem] flex flex-row">
                        <ClipboardDocumentCheckIcon className="h-5 w-5 mr-2" />
                        {finalFormat}
                      </div>
                      <div
                        key={`chatMessage-${index + 1}`}
                        className={`py-2 px-4 max-w-2xl ${className}`}
                      >
                        <ReactMarkdown linkTarget="_blank">
                          {message.message}
                        </ReactMarkdown>
                        <div
                          hidden={!controlSidebar.sources}
                          className="mt-6 font-semibold text-sm text-[#48BB78]"
                        >
                          Sources:
                        </div>
                        <div
                          hidden={!controlSidebar.sources}
                          className="text-sm text-[#48BB78] flex flex-row overflow-y-auto"
                        >
                          {message && message.sourceDocs
                            ? message.sourceDocs.map((d, i) => {
                                return (
                                  <div
                                    onClick={() =>
                                      setModalOpen(
                                        d.metadata.pdf_numpages,
                                        d.pageContent,
                                      )
                                    }
                                    className="p-1 border boder-2"
                                  >
                                    <p>
                                      {`pg ${d.metadata.pdf_numpages}`} -{' '}
                                      {`${d.pageContent
                                        .split(' ')
                                        .splice(0, 4)
                                        .join(' ')}.....`}
                                    </p>
                                  </div>
                                )
                              })
                            : null}
                        </div>
                      </div>
                    </>
                  )
                } else {
                  const date = new Date(message.date)

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
                  return (
                    <div
                      key={`chatMessage-${index + 1}`}
                      className={`py-2 px-4 text-right max-w-2xl ${className}`}
                    >
                      <div className="flex flex-row">
                        <div className="flex flex-col">
                          <div className="text-[0.8rem] text-right">
                            {finalFormat}
                          </div>
                          <ReactMarkdown linkTarget="_blank">
                            {message.message}
                          </ReactMarkdown>
                        </div>

                        <div>
                          {user && user.avatar ? (
                            <img
                              alt="Avatar"
                              className="rounded-full h-[3rem] w-[3rem] m-2 -mt-1"
                              src={user?.avatar}
                            />
                          ) : (
                            <UserCircleIcon className="m-2 -mt-1 h-[3rem] w-[3rem]" />
                          )}
                        </div>
                      </div>
                    </div>
                  )
                }
              })
            : null}
          <div
            className={`sticky ${bg2} bottom-0 transform  relative w-full pb-20`}
          >
            <ChatForm
              loading={loading}
              error={error}
              query={query}
              textAreaRef={textAreaRef}
              handleEnter={handleEnter}
              handleSubmit={handleSubmit}
              setQuery={setQuery}
              messages={messages}
              source={source}
              selectedChatId={selectedChatId}
              selectedNamespace={selectedNamespace}
              setMessageState={setMessageState}
            />
          </div>
        </div>
        {previewPdf ? (
          <div
            className={`flex flex-row h-screen overflow-y-hidden w-1/2 md:p-2`}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                plugins={[defaultLayoutPluginInstance]}
                fileUrl={namespaces[0].documentURL}
              />
            </Worker>
          </div>
        ) : null}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Source Pg. {modalData.pg}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{modalData.content}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default MessageList
