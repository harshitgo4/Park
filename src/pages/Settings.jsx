import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { DocumentArrowUpIcon } from '@heroicons/react/24/outline'
import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/20/solid'
import {
  DocumentTextIcon,
  ChatBubbleBottomCenterTextIcon,
  FolderPlusIcon,
  TableCellsIcon,
} from '@heroicons/react/24/outline'
import { Menu as Menu2, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useColorMode, useColorModeValue } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
const Settings = ({
  user,
  setModalOpen,
  selectedFolder,
  setSelectedFolder,
  namespaces,
  setNamespaces,
  foldersList,
  setFoldersList,
  selectedNamespace,
  setSelectedNamespace,
}) => {
  const [selectedFiles, setSelectedFiles] = useState(null)
  const [namespaceName, setNamespaceName] = useState('')
  const [deleteMessage, setDeleteMessage] = useState('')
  const [documentData, setDocumentData] = useState({})
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectButton, setSelectButton] = useState(0)
  const { colorMode, toggleColorMode } = useColorMode()
  useEffect(() => {
    if (foldersList && namespaces) {
      var temp = {}
      for (var i = 0; i < foldersList.length; i++) {
        temp[foldersList[i]] = namespaces.filter((obj) => {
          return obj.folder === foldersList[i]
        })
      }

      setDocumentData(temp)
    } else {
      setDocumentData({})
    }
  }, [namespaces, foldersList])

  const router = useNavigate()

  const handleDelete = async (e, folderName, namespace) => {
    e.preventDefault()
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/deleteNamespace?namespace=${namespace}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      const res2 = await response.json()
      if (res2.message) {
        const newNamespaces = namespaces.filter(
          (item) => item.name !== namespace,
        )
        setNamespaces(newNamespaces)
        setDeleteMessage(`${namespace} has been successfully deleted.`)
        if (selectedNamespace == namespace) {
          setSelectedNamespace(null)
          router('/dashboard')
        }
        Swal.fire('Deleted!', 'Your file has been deleted.', 'success')
      } else {
        console.log(res2.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleNamespaceUpdate = async (e, namespace, updatedName) => {
    e.preventDefault()
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/updateNamespace`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            namespace,
            updatedName,
          }),
        },
      )
      const res2 = await response.json()
      if (res2.message) {
        const newNamespaces = namespaces.map((element) => {
          if (element.name === namespace) {
            const temp = element
            temp.name = updatedName
            return temp
          } else {
            return element
          }
        })
        console.log(newNamespaces)
        setNamespaces(newNamespaces)
        setDeleteMessage(`${namespace} has been successfully deleted.`)
        Swal.fire('Renamed!', 'Your file has been renamed.', 'success')
      } else {
        console.log(res2.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleFolderDelete = async (e, folderName) => {
    e.preventDefault()
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/deleteFolder?folderName=${folderName}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      if (response.ok) {
        const newNamespaces = namespaces
        const newNamespaces2 = newNamespaces.filter(
          (item) => item.folder !== folderName,
        )
        setNamespaces(newNamespaces2)
        const temp = foldersList.filter((obj) => obj !== folderName)
        setFoldersList(temp)
        if (selectedFolder == folderName) {
          setSelectedFolder(null)
          router('/dashboard')
        }
        Swal.fire('Deleted!', 'Your folder has been deleted.', 'success')
      } else {
        const data = await response.json()
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleFolderUpdate = async (e, folderName, updatedName) => {
    e.preventDefault()
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/updateFolder`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folderName,
            updatedName,
          }),
        },
      )

      if (response.ok) {
        const newNamespaces = namespaces.map((element) => {
          if (element.folder === folderName) {
            const temp = element
            temp.folder = updatedName
            return temp
          } else {
            return element
          }
        })
        setNamespaces(newNamespaces)
        const temp = foldersList.map((element) => {
          if (element === folderName) {
            return updatedName
          } else {
            return element
          }
        })
        setFoldersList(temp)

        Swal.fire('Renamed!', 'Your folder has been renamed.', 'success')
      } else {
        const data = await response.json()
        console.log(data.error)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFiles(event.target.files)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const droppedFiles = event.dataTransfer.files
    setSelectedFiles(droppedFiles)
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0 || !namespaceName) return

    setIsLoading(true)
    const formData = new FormData()
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`myfile${i}`, selectedFiles[i])
    }

    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/upload?namespaceName=${namespaceName}`,
        {
          method: 'POST',
          body: formData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )

      if (response.ok) {
        setMessage('Files uploaded successfully!')
        handleIngest()
      } else {
        setIsLoading(false)
        const errorData = await response.json()
        setError(errorData.error)
      }
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  }

  const handleIngest = async () => {
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        `https://chatbot-backend-ihn7.onrender.com/api/consume?namespaceName=${namespaceName}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ folder: selectedFolder }),
        },
      )

      if (response.ok) {
        const data = await response.json()
        setMessage(data.message)
        setNamespaces([data.newNamespace])
        setModalOpen(false)
      } else {
        const errorData = await response.json()
        setError(errorData.error)
      }
    } catch (error) {
      setError(error.message)
    }

    setIsLoading(false)
  }

  const handleMenuItemClick = (folder) => {
    setSelectedFolder(folder)
  }

  return (
    <>
      <div className="mx-auto overflow-y-auto px-4 sm:px-6 lg:px-8">
        <div className="z-1 mt-8 mb-4 flex flex-row gap-4 text-[#585858]">
          <Button
            size="sm"
            onClick={() => setSelectButton(0)}
            colorScheme={selectButton === 0 ? 'purple' : 'gray'}
            leftIcon={<FolderPlusIcon className="w-5 h-5 z-1" />}
          >
            PDFs
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectButton(1)}
            colorScheme={selectButton === 1 ? 'purple' : 'gray'}
            leftIcon={<DocumentTextIcon className="w-5 h-5 " />}
          >
            Text
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectButton(2)}
            colorScheme={selectButton === 2 ? 'purple' : 'gray'}
            leftIcon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5 " />}
          >
            PowerPoint
          </Button>
          <Button
            size="sm"
            onClick={() => setSelectButton(3)}
            colorScheme={selectButton === 3 ? 'purple' : 'gray'}
            leftIcon={<TableCellsIcon className="w-5 h-5 " />}
          >
            Excel Sheets
          </Button>
        </div>
        <div
          className="flex justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label className="w-full flex flex-col items-center px-4 py-12 text-blue rounded-lg tracking-wide border-2 border-dashed border-blue hover:bg-blue hover:text-blue-900 cursor-pointer">
            <DocumentArrowUpIcon className="w-[4rem]" />
            <span className="mt-2 text-base leading-normal text-center text-gray-500">
              {selectedFiles
                ? Array.from(selectedFiles)
                    .map((file) => file.name)
                    .join(', ')
                : 'Upload or drag and drop here'}
            </span>
            <input
              type="file"
              name="myfile"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
          </label>
        </div>
        <div className="mt-6 mb-2">
          {' '}
          <Menu2>
            <MenuButton className="py-2 px-2 text-left flex text-sm w-full border-2 text-[#5D5DFF]">
              {selectedFolder || 'Choose an existing folder'}
              <ChevronDownIcon className="w-6 flex-none ml-auto -mt-5" />
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
          </Menu2>
        </div>
        <div className="flex flex-row gap-4">
          <InputGroup width="20rem" size="md">
            <Input
              value={namespaceName}
              onChange={(e) => setNamespaceName(e.target.value)}
              variant="filled"
              placeholder="Title"
            />
            <InputRightElement>
              <PencilIcon className="w-5" />
            </InputRightElement>
          </InputGroup>
          <Button
            className="px-8"
            leftIcon={<ChatBubbleLeftEllipsisIcon className="w-4" />}
            onClick={handleUpload}
            colorScheme="green"
            isLoading={isLoading}
            loadingText="Submitting"
          >
            Start Chat
          </Button>
        </div>

        {error && (
          <p className="mt-8 text-center text-red-500">
            {error.includes('Upgrade') ? (
              <span dangerouslySetInnerHTML={{ __html: error }} />
            ) : (
              error
            )}
          </p>
        )}

        {message && (
          <p className="mt-8 text-center text-xl text-bold text-green-500">
            {message}
          </p>
        )}

        <div className="mt-8 max-w-xl mx-auto">
          <hr className="mb-8 border-2 border-dashed" />

          <div className=" m-auto m-2 ">
            {documentData
              ? Object.entries(documentData).map(([folderName, namespaces]) => (
                  <div className="mb-4" key={folderName}>
                    <InputGroup key={folderName} className="mb-2" size="md">
                      <Input
                        value={folderName}
                        readOnly
                        color="blue"
                        variant="filled"
                      />
                      <InputRightElement className="gap-x-2 mr-2">
                        <PencilIcon
                          color="green"
                          onClick={(e) => {
                            Swal.fire({
                              title: 'Enter a new name for this folder:',
                              input: 'text',
                              showCancelButton: true,
                              confirmButtonText: 'Update',
                              cancelButtonText: 'Cancel',
                            }).then((result) => {
                              if (result.isConfirmed && result.value) {
                                handleFolderUpdate(e, folderName, result.value)
                              }
                            })
                          }}
                          className="w-5 text-red cursor-pointer"
                        />
                        <TrashIcon
                          color="red"
                          onClick={(e) =>
                            Swal.fire({
                              title:
                                'Are you sure you want to delete this folder and all its content?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                            }).then((result) => {
                              if (result.isConfirmed) {
                                handleFolderDelete(e, folderName)
                              }
                            })
                          }
                          className="w-5 text-red cursor-pointer"
                        />
                      </InputRightElement>
                    </InputGroup>
                    <ul>
                      {namespaces
                        ? namespaces.map((namespace, index) => (
                            <InputGroup
                              key={namespace}
                              className="mb-2 pl-6"
                              size="md"
                            >
                              <Input
                                value={namespace.name}
                                readOnly
                                variant="filled"
                              />
                              <InputRightElement className="gap-x-2 mr-2">
                                <PencilIcon
                                  color="green"
                                  onClick={(e) => {
                                    Swal.fire({
                                      title: 'Enter a new name for this file:',
                                      input: 'text',
                                      showCancelButton: true,
                                      confirmButtonText: 'Update',
                                      cancelButtonText: 'Cancel',
                                    }).then((result) => {
                                      if (result.isConfirmed && result.value) {
                                        handleNamespaceUpdate(
                                          e,
                                          namespace.name,
                                          result.value,
                                        )
                                      }
                                    })
                                  }}
                                  className="w-5 text-red cursor-pointer"
                                />
                                <TrashIcon
                                  color="red"
                                  onClick={(e) =>
                                    Swal.fire({
                                      title:
                                        'Are you sure you want to delete this file?',
                                      text: "You won't be able to revert this!",
                                      icon: 'warning',
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes, delete it!',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        handleDelete(
                                          e,
                                          folderName,
                                          namespace.name,
                                        )
                                      }
                                    })
                                  }
                                  className="w-5 text-red cursor-pointer"
                                />
                              </InputRightElement>
                            </InputGroup>
                          ))
                        : null}
                    </ul>
                  </div>
                ))
              : null}
          </div>
          {deleteMessage && (
            <p className="text-green-600 text-bold mt-8 text-center ">
              {deleteMessage}
            </p>
          )}
        </div>
      </div>
    </>
  )
}

export default Settings
