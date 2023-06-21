import { useState, useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'

export function useChats(namespace) {
  const [chatList, setChatList] = useState([])
  const [chatNames, setChatNames] = useState({})
  const [chatDates, setChatDates] = useState({})
  const [selectedChatId, setSelectedChatId] = useState('')

  useEffect(() => {
    // Fetch chat list and chat names from MongoDB
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://chatbot-backend-ihn7.onrender.com/api/getChats', // Update the API endpoint to fetch chat data
          {
            headers: {
              Authorization: `Bearer ${await Cookies.get('token')}`,
            },
            params: {
              namespace: namespace,
            },
          },
        )

        const { chatIds, chatNames, chatDates: date } = response.data
        setChatList(chatIds)
        setChatNames(chatNames)
        setChatDates(date)
      } catch (error) {
        console.error('Failed to fetch chat data:', error)
      }
    }

    fetchData()
  }, [namespace])

  function updateChatName(chatId, newChatName) {
    const updatedChatNames = { ...chatNames, [chatId]: newChatName }
    setChatNames(updatedChatNames)

    axios
      .put(
        `https://chatbot-backend-ihn7.onrender.com/api/update-chat/${chatId}`,
        { chatName: newChatName }, // Include 'chatName' field in the request body
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
          },
        },
      )
      .catch((error) => {
        console.error('Failed to update chat name:', error)
      })
  }

  async function createChat() {
    const newChatId = uuidv4()

    // Add new chat to the chat list
    const updatedChatList = [...chatList, newChatId]
    setChatList(updatedChatList)

    try {
      // Create chat in MongoDB
      await axios.post(
        'https://chatbot-backend-ihn7.onrender.com/api/create-chat', // Update the API endpoint to create chat data
        {
          chatId: newChatId,
          chatName: 'Untitled', // Add an empty chatName field
          namespace,
        },
        {
          headers: {
            Authorization: `Bearer ${await Cookies.get('token')}`,
          },
        },
      )
    } catch (error) {
      console.error('Failed to create new chat:', error)
    }

    return newChatId
  }

  async function deleteChat(chatIdToDelete) {
    // Remove chat from the chat list
    const updatedChatList = chatList.filter(
      (chatId) => chatId !== chatIdToDelete,
    )
    setChatList(updatedChatList)

    try {
      // Delete chat from MongoDB
      await axios.delete(
        'https://chatbot-backend-ihn7.onrender.com/api/delete-chat', // Update the API endpoint to delete chat data
        {
          headers: {
            Authorization: `Bearer ${await Cookies.get('token')}`,
          },
          data: {
            chatId: chatIdToDelete,
            namespace: namespace,
          },
        },
      )
    } catch (error) {
      console.error('Failed to delete chat:', error)
    }

    if (chatIdToDelete === selectedChatId) {
      const newSelectedChatId =
        updatedChatList.length > 0 ? updatedChatList[0] : ''
      setSelectedChatId(newSelectedChatId)
    }
    Swal.fire('Deleted!', 'Your chat has been deleted.', 'success')
  }

  return {
    chatList,
    selectedChatId,
    setSelectedChatId,
    createChat,
    deleteChat,
    chatNames,
    chatDates,
    updateChatName,
  }
}
