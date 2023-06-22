import React, { useState } from 'react'
import LoadingDots from '../other/LoadingDots'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { saveAs } from 'file-saver'
import jsPDF from 'jspdf'
import {
  ArrowDownIcon,
  ArrowDownOnSquareIcon,
  DocumentTextIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline'
import axios from 'axios'
import Cookies from 'js-cookie'
import {
  Button,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import Swal from 'sweetalert2'

const ChatForm = ({
  loading,
  error,
  query,
  textAreaRef,
  handleEnter,
  handleSubmit,
  setQuery,
  messages,
  source,
  selectedChatId,
  selectedNamespace,
  setMessageState,
}) => {
  const generatePdf = (data) => {
    const doc = new jsPDF()
    let y = 20

    doc.setFontSize(18)
    doc.setFont('helvetica', 'bold')
    doc.text('Chat', 10, y)

    y += 20

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')

    /*
    data.forEach(({ type, message }) => {
      const text = `${type}: ${message}`
      doc.text(text, 10, y)
      y += 10
    })
    */

    data.forEach(({ type, message }) => {
      const lines = doc.splitTextToSize(`${type}: ${message}`, 180)
      doc.text(lines, 10, y)
      y += lines.length * 10
    })

    doc.save('chat.pdf')
  }
  const generateSourcePdf = (data) => {
    const doc = new jsPDF()
    const text = data.toString()

    let lines = doc.splitTextToSize(text, doc.internal.pageSize.width - 20)
    let y = 20
    for (let i = 0; i < lines.length; i++) {
      if (y > doc.internal.pageSize.height - 20) {
        doc.addPage()
        y = 20
      }
      doc.text(10, y, lines[i])
      y += 7
    }

    doc.save('source.pdf')
  }
  const generateTxt = (data) => {
    const formattedData = data
      .map(({ type, message }) => `${type}: ${message}`)
      .join('\n')
    const blob = new Blob([formattedData], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, 'chat.txt')
  }
  const bg = useColorModeValue('bg-white', 'bg-slate-800')
  const deleteChat = async (e) => {
    e.preventDefault()
    try {
      // Delete chat from MongoDB
      await axios.delete(
        'https://bdsm-backend.onrender.com/api/clear-chat', // Update the API endpoint to delete chat data
        {
          headers: {
            Authorization: `Bearer ${await Cookies.get('token')}`,
          },
          data: {
            chatId: selectedChatId,
            namespace: selectedNamespace,
          },
        },
      )
      await setMessageState((state) => ({
        ...state,
        messages: [],
      }))
      Swal.fire('Cleared!', 'Your chat has been cleared.', 'success')
    } catch (error) {
      console.error('Failed to delete chat:', error)
    }
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="flex flex-col space-y-1 m-auto p-1 ">
      <Box display={{ base: 'none', md: 'block' }}>
        <div className="flex flex-row gap-x-2  text-gray-400">
          {' '}
          <Button
            size="xs"
            leftIcon={<ArrowDownOnSquareIcon className="w-5 h-5 " />}
            onClick={(e) => {
              e.preventDefault()
              generatePdf(messages)
            }}
          >
            Download PDF
          </Button>
          <Button
            size="xs"
            leftIcon={<DocumentTextIcon className="w-5 h-5 " />}
            onClick={(e) => {
              e.preventDefault()
              generateTxt(messages)
            }}
          >
            Download Text
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault()
              console.log(source[0])
              generateSourcePdf(source[0])
            }}
            size="xs"
            leftIcon={<ArrowDownIcon className="w-5 h-5 " />}
          >
            Download Source
          </Button>
          <Button
            className="ml-auto flex-none"
            size="xs"
            colorScheme="red"
            leftIcon={<XCircleIcon className="w-5 h-5 " />}
            onClick={(e) =>
              Swal.fire({
                title: 'Are you sure you want to clear this chat?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, clear it!',
              }).then((result) => {
                if (result.isConfirmed) {
                  deleteChat(e)
                }
              })
            }
          >
            Clear Chat
          </Button>
        </div>
      </Box>
      <div className="flex flex-row gap-4 text-[#585858]">
        <Menu>
          <MenuButton
            as={Button}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            display={{ base: 'block', md: 'none' }}
          >
            ...
          </MenuButton>
          <MenuList>
            <MenuItem
              onClick={(e) => {
                e.preventDefault()
                generatePdf(messages)
              }}
              icon={<ArrowDownOnSquareIcon className="w-5 h-5" />}
            >
              Download PDF
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault()
                generateTxt(messages)
              }}
              icon={<DocumentTextIcon className="w-5 h-5" />}
            >
              Download Text
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault()
                console.log(source[0])
                generateSourcePdf(source[0])
              }}
              icon={<ArrowDownIcon className="w-5 h-5" />}
            >
              Download Source
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                e.preventDefault()
                deleteChat(e)
              }}
              icon={<XCircleIcon className="w-5 h-5" />}
              colorScheme="red"
            >
              Clear Chat
            </MenuItem>
          </MenuList>
        </Menu>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex border rounded-lg ring-[0.5px] ring-black"
      >
        <textarea
          disabled={loading}
          onKeyDown={handleEnter}
          ref={textAreaRef}
          autoFocus={false}
          rows={1}
          maxLength={512}
          id="userInput"
          name="userInput"
          placeholder={
            loading
              ? 'Waiting for response...'
              : 'Give me a question to answer...'
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={`flex-1 p-1 md:p-2 border-none rounded-lg  focus:ring-0  resize-none h-[35px] md:h-[50px] ${bg}`}
        />

        <button
          type="submit"
          disabled={loading}
          className={`text-[#5D5DFF] py-2 px-4 rounded-lg ${bg}`}
        >
          {loading ? (
            <div>
              <LoadingDots color="#ff7900" />
            </div>
          ) : (
            <PaperAirplaneIcon className="h-6 w-6 -rotate-[35deg]" />
          )}
        </button>
      </form>
      {error && (
        <div className="border border-red-400 rounded-md p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </div>
  )
}

export default ChatForm
