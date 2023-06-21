import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDownIcon, FolderOpenIcon } from '@heroicons/react/20/solid'
import { PlusIcon } from '@heroicons/react/24/solid'
import { FolderIcon } from '@heroicons/react/24/solid'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useToast } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

export const NamespaceList = ({
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
}) => {
  const [filteredNamespaces, setFilteredNamespaces] = useState(namespaces)

  useEffect(() => {
    if (user) {
      setFoldersList(user.folders)
    }
  }, [user])
  useEffect(() => {
    if (selectedFolder) {
      const temp = namespaces.filter((obj) => obj.folder === selectedFolder)
      setFilteredNamespaces(temp)
    } else {
      setFilteredNamespaces(namespaces)
    }
  }, [selectedFolder, namespaces])
  const toast = useToast()
  const handleMenuItemClick = (folder) => {
    setSelectedFolder(folder)
  }
  const router = useNavigate()
  const textColor = useColorModeValue('text-black', 'text-white')
  return (
    <>
      <div className="relative inline-block text-left text-[#767676] py-4">
        <div>
          <button
            onClick={() => {
              Swal.fire({
                title: 'Enter the folder name:',
                input: 'text',
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                preConfirm: async (folder) => {
                  return fetch(
                    `https://chatbot-backend-ihn7.onrender.com/api/create-folder`,
                    {
                      method: 'POST',
                      headers: {
                        Authorization: `Bearer ${await Cookies.get('token')}`,
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ folder }),
                    },
                  )
                    .then((response) => response.json())
                    .then((res) => {
                      console.log(res)
                      if (res.message) {
                        setFoldersList([...foldersList, folder])
                        toast({
                          title: res.message,
                          status: 'success',
                          duration: 9000,
                          isClosable: true,
                        })
                      } else if (res.error) {
                        toast({
                          title: res.error,
                          status: 'error',
                          duration: 9000,
                          isClosable: true,
                        })
                      }
                    })
                    .catch((error) => {
                      Swal.showValidationMessage(`Request failed: ${error}`)
                    })
                },
                allowOutsideClick: () => !Swal.isLoading(),
              })
            }}
            className="py-2 px-2 text-left flex text-sm w-full border-2 text-[#5D5DFF] "
          >
            <span>Create a file folder</span>
            <FolderIcon className={`flex-none ml-auto ${textColor} h-5`} />
          </button>
          <div className="mt-2">
            {' '}
            <Menu>
              <MenuButton className="py-2 px-2 text-left flex text-sm w-full border-2 text-[#5D5DFF] ">
                {selectedFolder || 'Choose an existing folder'}
                <FolderOpenIcon
                  className={`w-5 flex-none ml-auto -mt-5 ${textColor}`}
                />
              </MenuButton>
              <MenuList className="text-sm">
                {foldersList
                  ? foldersList.map((folder, i) => {
                      return (
                        <MenuItem
                          key={i}
                          onClick={() => handleMenuItemClick(folder)}
                        >
                          {folder}
                        </MenuItem>
                      )
                    })
                  : null}
              </MenuList>
            </Menu>
          </div>
          <div className="w-full text-right">
            <Menu>
              <MenuButton className="py-2 px-2 text-left text-sm w-56 mt-2 mb-2 border-2">
                <span className="">
                  {selectedNamespace || 'Choose a Document'}
                </span>
                <ChevronDownIcon
                  className={`w-6 flex-none ml-auto -mt-5 ${textColor}`}
                />
              </MenuButton>
              <MenuList className="text-sm">
                {filteredNamespaces
                  ? filteredNamespaces.map((namespace, i) => {
                      return (
                        <MenuItem
                          onClick={() => {
                            setSelectedNamespace(namespace.name)
                            router(
                              `/dashboard/${namespace.folder}/${namespace.name}`,
                            )
                          }}
                          key={i}
                        >
                          <button className={` text-sm w-full`}>
                            {namespace.name}
                          </button>
                        </MenuItem>
                      )
                    })
                  : null}
              </MenuList>
            </Menu>
            <button
              className="py-2 px-2 w-[85%] text-right  inline-flex gap-x-1.5 px-3 py-2 text-sm border-2 "
              onClick={async () => {
                const newChatId = await createChat()
                setChatId(newChatId)
                setSelectedChatId(newChatId)
              }}
            >
              Create New Chat
              <PlusIcon
                className={`flex-none ml-auto ${textColor} h-5`}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
