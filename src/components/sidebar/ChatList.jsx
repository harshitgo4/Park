import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid'
import { useColorModeValue } from '@chakra-ui/react'
import Swal from 'sweetalert2'

const ChatList = (props) => {
  const {
    chatList,
    chatNames,
    selectedChatId,
    setChatId,
    setSelectedChatId,
    createChat,
    updateChatName,
    deleteChat,
  } = props
  const textColor = useColorModeValue('gray.200', 'white')
  return (
    <li>
      <ul role="list" className="space-y-1">
        <p className="text-md  leading-6 font-bold">Chat History</p>
        {chatList.map((chatId, index) => (
          <li
            key={chatId}
            className={`py-2 px-2 text-left flex text-sm w-full border-2 text-[#5D5DFF]`}
            onClick={() => {
              setChatId(chatId)
              setSelectedChatId(chatId)
            }}
          >
            <p>{chatNames[chatId] || `Chat ${index}`}</p>

            {chatId === selectedChatId && (
              <div className="ml-auto">
                <button
                  className=" hover:text-gray-400 ml-2"
                  onClick={(e) => {
                    e.stopPropagation()

                    Swal.fire({
                      title: 'Enter a new name for this chat:',
                      input: 'text',
                      showCancelButton: true,
                      confirmButtonText: 'Update',
                      cancelButtonText: 'Cancel',
                    }).then((result) => {
                      if (result.isConfirmed && result.value) {
                        updateChatName(chatId, result.value)
                      }
                    })
                  }}
                >
                  <PencilIcon className="h-4 w-4" style={{ color: 'green' }} />
                </button>

                <button
                  className="text-red-500 hover:text-red-600 ml-2"
                  onClick={(e) => {
                    e.stopPropagation()
                    Swal.fire({
                      title: 'Are you sure you want to delete this chat?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        deleteChat(chatId)
                      }
                    })
                    
                  }}
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </li>
  )
}

export default ChatList
