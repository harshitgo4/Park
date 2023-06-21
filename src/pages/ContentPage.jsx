import React from 'react'
import { useRef, useState, useEffect } from 'react'
import useNamespaces from '../hooks/useNamespaces'
import { useChats } from '../hooks/useChats'
import {
  ArrowUturnDownIcon,
  CloudIcon,
  Cog6ToothIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import {
  Box,
  Button,
  Input,
  useColorModeValue,
  useColorMode,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import SideBar from '../components/sidebar/Main'
import { Editor } from 'react-draft-wysiwyg'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { saveAs } from 'file-saver'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer'
import html2pdf from 'html2pdf.js'
import { useToast } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { TrashIcon } from '@heroicons/react/20/solid'
function ContentPage() {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [chatId, setChatId] = useState('1')

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

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [selectedFolder, setSelectedFolder] = useState(null)
  const [docs, setDocs] = useState([])
  const [foldersList, setFoldersList] = useState([])
  const [editorState, setEditorState] = useState(EditorState.createEmpty())

  const [title, setTitle] = useState('')
  // Initial state
  const [controlSidebar, setControlSidebar] = useState({
    mode: 'balanced',
    sources: true,
    prompt: true,
  })
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const nameSpaceHasChats = chatList.length > 0

  const updateTextDescription = (state) => {
    setEditorState(state)
  }

  useEffect(() => {
    const getDocu = async () => {
      const res = await fetch(`http://localhost:5000/api/getDocu`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      const res2 = await res.json()
      console.log(res2)
      if (res2.error) {
        toast({
          title: res2.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else {
        setDocs(res2.docs)
      }
    }
    getDocu()
  }, [])

  const saveEditorState = async () => {
    if (!title) {
      toast({
        title: 'Please give a title to this document!',
        status: 'warning',
        duration: 9000,
        isClosable: true,
      })
    } else {
      setDisabled(true)

      const contentState = editorState.getCurrentContent()
      const rawContentState = convertToRaw(contentState)

      const res = await fetch(`http://localhost:5000/api/saveDocu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
        body: JSON.stringify({ rawContentState, title }),
      })

      const res2 = await res.json()
      console.log(res2)
      if (res2.error) {
        toast({
          title: res2.error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (res2.message) {
        toast({
          title: 'Document saved!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setDocs([
          ...docs,
          { rawContentState: JSON.stringify(rawContentState), title },
        ])
      }
      setDisabled(false)
    }
  }
  const handleDelete = async (e, title) => {
    e.preventDefault()

    setDisabled(true)

    const res = await fetch(`http://localhost:5000/api/deleteDocu`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      body: JSON.stringify({ title }),
    })

    const res2 = await res.json()
    console.log(res2)
    if (res2.error) {
      toast({
        title: res2.error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (res2.message) {
      toast({
        title: 'Document deleted!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      const temp = docs.filter((el) => el.title !== title)
      setDocs(temp)
    }
    setDisabled(false)
  }

  const downloadPDF = () => {
    const content = editorState.getCurrentContent().getPlainText('\u0001')

    const element = document.createElement('div')
    element.innerHTML = content

    const options = {
      margin: [10, 10, 10, 10],
      filename: `${title}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    }

    html2pdf().set(options).from(element).save()
  }

  const resetEditorState = () => {
    Swal.fire({
      title: 'Are you sure you wanna reset this?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reset it!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('editorState')
        localStorage.removeItem('title')
        setEditorState(EditorState.createEmpty())
        setTitle('')
        Swal.fire('Reset!', 'Your document has been reset.', 'success')
      }
    })
  }

  // Function to handle mode change
  const handleModeChange = (mode) => {
    setControlSidebar((prevState) => ({
      ...prevState,
      mode: mode === 'balanced' ? 'strict' : 'balanced',
    }))
  }

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')

  return (
    <div>
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={1}
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
            {/* {selectedFolder ? ( */}
            <div className="flex flex-col items-stretch flex-grow w-[100%] md:w-[70%] m-auto p-8">
              <h1 className="text-lg font-semibold">Create a Document</h1>
              <p>
                You can create a text document with extracts from your chat or
                start new and export.
              </p>
              <div className="mt-8">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  variant="filled"
                  placeholder="Title"
                />
              </div>
              <div className="mt-4 border  overflow-y-scroll min-h-[20rem] max-h-[25rem] p-4">
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  onEditorStateChange={updateTextDescription}
                />
              </div>
              <div className="mt-4 rounded-lg flex gap-4">
                <Button
                  leftIcon={<DocumentArrowDownIcon className="w-5 h-5" />}
                  colorScheme="green"
                  onClick={downloadPDF}
                >
                  Download PDF
                </Button>
                <Button
                  leftIcon={<CloudIcon className="w-5 h-5" />}
                  colorScheme="green"
                  onClick={(e) => saveEditorState(e)}
                  isLoading={disabled}
                >
                  Save
                </Button>
                <Button
                  leftIcon={<ArrowUturnDownIcon className="w-5 h-5" />}
                  colorScheme="gray"
                  onClick={(e) => resetEditorState(e)}
                >
                  Reset
                </Button>
              </div>
              <div hidden={docs.length == 0} className="my-8 ">
                <h1 className="font-semibold my-2">Saved Documents:</h1>
                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 ">
                  {docs
                    ? docs.map((d, i) => (
                        <InputGroup key={i} size="md">
                          <Input
                            className="p-2 border"
                            value={d.title}
                            readOnly
                            onClick={() => {
                              console.log(d.rawContentState)
                              setTitle(d.title)
                              if (d.rawContentState) {
                                setEditorState(
                                  EditorState.createWithContent(
                                    convertFromRaw(
                                      JSON.parse(d.rawContentState),
                                    ),
                                  ),
                                )
                              }
                            }}
                          />
                          <InputRightElement className="gap-x-2">
                            <TrashIcon
                              color="red"
                              onClick={(e) =>
                                Swal.fire({
                                  title:
                                    'Are you sure you want to delete this document?',
                                  text: "You won't be able to revert this!",
                                  icon: 'warning',
                                  showCancelButton: true,
                                  confirmButtonColor: '#3085d6',
                                  cancelButtonColor: '#d33',
                                  confirmButtonText: 'Yes, delete it!',
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    console.log('DELTE')
                                    handleDelete(e, d.title)
                                  }
                                })
                              }
                              className="w-5 text-red cursor-pointer"
                            />
                          </InputRightElement>
                        </InputGroup>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default ContentPage
