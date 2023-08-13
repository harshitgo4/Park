import React, { useState, useEffect } from 'react'
import Header2 from './Header2'
import Cookies from 'js-cookie'
import { Form, Link } from 'react-router-dom'
import {
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormLabel,
  Input,
  Select,
} from '@chakra-ui/react'
import { ArrowUpTrayIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useDisclosure } from '@chakra-ui/react'
import {
  ArrowUturnLeftIcon,
  Bars3Icon,
  NoSymbolIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { Box, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import SideBar from './sidebar/Main'

function Settings() {
  const [user, setUser] = useState(null)
  const router = useNavigate()
  const [data, setData] = useState({
    fName: '',
    lName: '',
    phone: '',
    subscribed: null,
    email: '',
    isPrivate: null,
  })
  const [imageFile, setImageFile] = useState(null)

  const [isLoading, setIsLoading] = useState(false)
  const [isLoading2, setIsLoading2] = useState(false)
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(null)
  const { colorMode, toggleColorMode } = useColorMode()
  const toast = useToast()
  const [isModalOpen, setModalOpen] = useState(false)

  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const [isModalOpen2, setModalOpen2] = useState(false)
  const openModal2 = () => {
    setModalOpen2(true)
  }

  const closeModal2 = () => {
    setModalOpen2(false)
  }

  const [notifications, setNotifications] = useState(null)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setImageFile(file)
    console.log(file)
  }

  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])

  useEffect(() => {
    if (user) {
      setData({
        fName: user.fName,
        lName: user.lName,
        phone: user.phone,
        subscribed: user.subscribed,
        email: user.email,
        isPrivate: user.isPrivate,
      })

      setNotifications({
        receiving: user.notifications.receiving,
        method: user.notifications.method,
        reminderDueTime: user.notifications.reminderDueTime,
        types: {
          'New Sub request': user.notifications.types['New Sub request'],
          'Request Status': user.notifications.types['Request Status'],
          'New Task Assigned': user.notifications.types['New Task Assigned'],
          'New Task Submission':
            user.notifications.types['New Task Submission'],
          'Task Status update': user.notifications.types['Task Status update'],
          'Reward redemption request':
            user.notifications.types['Reward redemption request'],
          'Reward Status': user.notifications.types['Reward Status'],
          disconnects: user.notifications.types['disconnects'],
          'Reminder before due time':
            user.notifications.types['Reminder before due time'],
        },
      })
    }
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const token = Cookies.get('token') // Assuming you have a library like 'js-cookie' to retrieve the token from the cookie

    const formData = new FormData()
    formData.append('fName', data.fName)
    formData.append('lName', data.lName)
    formData.append('phone', data.phone)
    formData.append('subscribed', data.subscribed)
    formData.append('isPrivate', data.isPrivate)
    formData.append('image', imageFile)

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/updateUser`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res2) => {
        setIsLoading(false)
        console.log('res2', res2.user)
        setUser(res2.user)
        setSubscriptionDetails({ ...subscriptionDetails, user: res2.user })
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
      })
  }

  const updateNotifications = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const token = Cookies.get('token') // Assuming you have a library like 'js-cookie' to retrieve the token from the cookie

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/updateNotifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ notifications }),
    })
      .then((response) => response.json())
      .then((res2) => {
        setIsLoading(false)
        if (res2.message) {
          toast({
            title: 'Notifications Updated!',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setUser(res2.user)
          setSubscriptionDetails({ ...subscriptionDetails, user: res2.user })
          closeModal2()
        } else if (res2.error) {
          toast({
            title: res2.error,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setUser(user)
        } else {
          toast({
            title: 'Something went wrong!',
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        setIsLoading(false)
        console.error(error)
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }
  const handleDelete = async (e, keyword) => {
    e.preventDefault()
    closeModal()
    setIsLoading2(true)
    const token = Cookies.get('token') // Assuming you have a library like 'js-cookie' to retrieve the token from the cookie

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
      method: 'DELETE',
      body: JSON.stringify({
        keyword: keyword, // Make sure to include the keyword property with its value
      }),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res2) => {
        setIsLoading2(false)
        console.log(res2)
        Cookies.remove('token')
        localStorage.removeItem('subscriptionDetails')
        router('/signin')
      })
      .catch((error) => {
        setIsLoading2(false)
        console.error(error)
      })
  }
  // cancel-subscriptions
  const cancelSubscriptions = async (e) => {
    e.preventDefault()
    closeModal()
    setIsLoading2(true)
    const token = Cookies.get('token') // Assuming you have a library like 'js-cookie' to retrieve the token from the cookie

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cancel-subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((res2) => {
        setIsLoading2(false)
        setSubscriptionDetails({
          ...subscriptionDetails,
          status: 'Unpaid',
          planId: 'Free Plan',
        })
        Swal.fire('Canceled!', 'Subscriptions removed!', 'success')
      })
      .catch((error) => {
        setIsLoading2(false)
        console.error(error)
        toast({
          title: error,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#F2F2F2]', 'bg-slate-700')
  return (
    <div className="flex flex-col h-screen">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        user={user}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        subscriptionDetails={subscriptionDetails}
        setSubscriptionDetails={setSubscriptionDetails}
      />
      <div className={`flex pb-40 h-screen}`}>
        <SideBar
          showDrawer={showDrawer}
          user={user}
          email=""
          router={router}
          setShowDrawer={setShowDrawer}
          toggleColorMode={toggleColorMode}
        />
        <main className="md:pl-64 md:p-8 flex flex-col z-1 mt-6 mx-auto w-full">
          <Button onClick={() => router(-1)} className="m-2 w-[4rem] p-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} p-2 md:p-8 rounded-lg m-auto w-full `}>
            <div className="flex flex-col md:flex-row">
              <div>
                {' '}
                <h1 className="text-lg font-semibold">Personal Details</h1>
                <p>Setup your account according to your preferences.</p>
                <>
                  <Input
                    type="file"
                    display="none"
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload">
                    <Button
                      className="mt-6"
                      bg="brand"
                      textColor="white"
                      rightIcon={<ArrowUpTrayIcon className="w-5 h-5" />}
                      as="span"
                    >
                      {imageFile?.name || 'Upload Profile Image'}
                    </Button>
                  </label>
                </>
              </div>
              <div className="md:ml-auto">
                {user && user.avatar ? (
                  <img
                    className="rounded-full h-[10rem] w-[10rem]"
                    src={user.avatar}
                  />
                ) : (
                  <UserCircleIcon className="w-[10rem]  text-[#5D5DFF]" />
                )}
              </div>
            </div>
            <div className="mt-6 gap-4 grid grid-cols-1">
              <Input readOnly value={user?.type} placeholder="User type" />
            </div>
            <div className="mt-6 gap-4 grid grid-cols-2">
              <Input
                onChange={(e) => setData({ ...data, fName: e.target.value })}
                value={data.fName}
                placeholder="Name"
              />
              <Input
                onChange={(e) => setData({ ...data, lName: e.target.value })}
                value={data.lName}
                placeholder="Surname"
              />
            </div>
            <div className="mt-6 gap-4 grid grid-cols-2">
              <Input readOnly value={data.email} placeholder="email" />
              <Input
                onChange={(e) => setData({ ...data, phone: e.target.value })}
                value={data.phone}
                placeholder="Phone"
              />
            </div>
            <div className="mt-6 gap-4 grid grid-cols-2">
              <Input
                value={subscriptionDetails?.planId}
                placeholder="Plan"
                readOnly
              />
              <Button onClick={() => router('/pricing')}>Upgrade</Button>
            </div>

            <div className="mt-6 gap-4 grid grid-cols-2">
              <Checkbox
                onChange={() =>
                  setData({ ...data, subscribed: !data.subscribed })
                }
                isChecked={data.subscribed}
              >
                Subscribe to newsletter
              </Checkbox>
              <Checkbox
                onChange={() =>
                  setData({ ...data, isPrivate: !data.isPrivate })
                }
                isChecked={!data.isPrivate}
              >
                Profile Picture Public
              </Checkbox>
            </div>
            <div className="border p-2 mt-4">
              <h1 className=" text-md font-semibold">🟢 Making Changes</h1>
              <p className="text-sm pl-7">
                You can always make changes to your account whenevever you need.
                Please ensure this information is accurate.
              </p>
            </div>
            <div className="md:space-x-4 flex flex-col md:flex-row">
              {' '}
              <Button
                className="mt-6"
                bg="brand"
                textColor="white"
                size="sm"
                isLoading={isLoading}
                rightIcon={<CheckCircleIcon className="w-5" />}
                onClick={(e) => handleSubmit(e)}
              >
                Save Changes
              </Button>
              <Button
                className="mt-6"
                colorScheme="yellow"
                size="sm"
                isLoading={isLoading}
                rightIcon={<CheckCircleIcon className="w-5" />}
                onClick={openModal2}
              >
                Manage Notifications
              </Button>
              <Button
                className="mt-6"
                colorScheme="red"
                size="sm"
                isLoading={isLoading2}
                onClick={(e) =>
                  Swal.fire({
                    title: 'Are you sure you want to cancel subscription?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, cancel it!',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      cancelSubscriptions(e)
                    }
                  })
                }
                hidden={subscriptionDetails?.planId === 'Free Plan'}
                rightIcon={<TrashIcon className="w-5" />}
              >
                Cancel Subscription
              </Button>
              <Button
                className="mt-6"
                colorScheme="red"
                size="sm"
                isLoading={isLoading2}
                onClick={openModal}
                rightIcon={<TrashIcon className="w-5" />}
              >
                Delete Account
              </Button>
            </div>
          </div>
        </main>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode == 'light' ? 'white' : '#1A202C'}
          className="p-4"
        >
          <ModalHeader>
            <div className="text-xl">Deactivate Account</div>
            <div className="py-2 text-[#716868] text-sm">
              Setup your account according to your preferences.
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="text-md  font-semibold">
              Important information about deactivating or deleting account
            </div>
            <hr className="my-4 border-1" />
            <div>
              <div className="flex flex-row my-4">
                <NoSymbolIcon className="w-[3rem] m-2 mx-4" color="red" />
                <div>
                  <h1 className="text-sm font-semibold">Deactivate Account</h1>
                  <p className="py-1 text-[#716868] text-sm">
                    You can resume your account in the next 30 days after
                    deactivation. Simply login with your credentials.
                  </p>
                </div>
              </div>
              <div className="flex flex-row my-4">
                <TrashIcon className="w-[3rem] m-2 mx-4" color="red" />
                <div>
                  <h1 className="text-sm font-semibold">
                    Delete Account Permanently
                  </h1>
                  <p className="py-1 text-[#716868] text-sm">
                    You CANNOT reactivate your account after you have deleted.
                    You will need to create a new account.
                  </p>
                </div>
              </div>
            </div>
            <div className="my-8">
              <div className="text-md my-2  font-semibold">
                What are your reasons ? (Optional)
              </div>
              <Input placeholder="Please, provide us with a reason for deactivating or deleting." />
            </div>
            <div>
              <div className="text-md font-semibold">
                Deactivate and Delete Terms
              </div>{' '}
              <p className="py-1 text-[#716868] text-sm">
                I agree with the{' '}
                <a className="text-[#5D5DFF]" href="/terms">
                  terms and conditions
                </a>{' '}
                provided to deactivate or delete my account
              </p>
            </div>
            <div className="space-x-4">
              {' '}
              <Button
                className="mt-6"
                bg="brand"
                textColor="white"
                onClick={(e) => handleDelete(e, 'delete')}
              >
                Delete Account
              </Button>
              <Button
                className="mt-6"
                colorScheme="red"
                onClick={(e) => handleDelete(e, 'deactivate')}
              >
                Deactivate Account
              </Button>
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={closeModal}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalOpen2} onClose={closeModal2} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode == 'light' ? 'white' : '#1A202C'}
          className="p-4"
        >
          <ModalHeader>
            <div className="text-xl">Manage Notifications</div>
            <div className="py-2 text-[#716868] text-sm">
              Manage your account notifications according to your preferences.
            </div>
          </ModalHeader>
          <ModalBody className="space-y-4">
            <FormControl>
              <FormLabel>Do you want to receive notifications?</FormLabel>
              <Select
                value={notifications?.receiving}
                onChange={(e) =>
                  setNotifications({
                    ...notifications,
                    receiving: !notifications?.receiving,
                  })
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
            </FormControl>
            <br />
            <FormControl>
              <FormLabel>How do you want to receive notifications?</FormLabel>
              <Select
                value={notifications?.method}
                onChange={(e) =>
                  setNotifications({ ...notifications, method: e.target.value })
                }
                isDisabled={!notifications?.receiving}
              >
                <option value="">Select Notification Method</option>
                <option value="Email">Email</option>
                <option value="PWA Notification">PWA Notification</option>
                <option value="SMS">SMS</option>
              </Select>
            </FormControl>
            <br />
            <FormLabel>Notification Options:</FormLabel>
            <CheckboxGroup isDisabled={!notifications?.receiving}>
              <div className="flex flex-col">
                <Checkbox
                  hidden={user && user.type == 'sub'}
                  isChecked={notifications?.types['New Sub request']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'New Sub request': !notifications?.types[
                          'New Sub request'
                        ],
                      },
                    })
                  }
                >
                  New Sub request
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'dom'}
                  isChecked={notifications?.types['Request Status']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'Request Status': !notifications?.types[
                          'Request Status'
                        ],
                      },
                    })
                  }
                >
                  Request Status
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'dom'}
                  isChecked={notifications?.types['New Task Assigned']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'New Task Assigned': !notifications?.types[
                          'New Task Assigned'
                        ],
                      },
                    })
                  }
                >
                  New Task Assigned
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'sub'}
                  isChecked={notifications?.types['New Task Submission']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'New Task Submission': !notifications?.types[
                          'New Task Submission'
                        ],
                      },
                    })
                  }
                >
                  New Task Submission
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'dom'}
                  isChecked={notifications?.types['Task Status update']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'Task Status update': !notifications?.types[
                          'Task Status update'
                        ],
                      },
                    })
                  }
                >
                  Task Status update
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'sub'}
                  isChecked={notifications?.types['Reward redemption request']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'Reward redemption request': !notifications?.types[
                          'Reward redemption request'
                        ],
                      },
                    })
                  }
                >
                  Reward redemption request
                </Checkbox>
                <Checkbox
                  hidden={user && user.type == 'dom'}
                  isChecked={notifications?.types['Reward Status']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        'Reward Status': !notifications?.types[
                          'Reward Status'
                        ],
                      },
                    })
                  }
                >
                  Reward Status
                </Checkbox>

                <Checkbox
                  isChecked={notifications?.types['disconnects']}
                  onChange={(e) =>
                    setNotifications({
                      ...notifications,
                      types: {
                        ...notifications.types,
                        disconnects: !notifications?.types['disconnects'],
                      },
                    })
                  }
                >
                  {`${
                    user && user.type == 'sub' ? 'Dom' : 'Sub'
                  } disconnects from you`}
                </Checkbox>

                <FormControl hidden={user && user.type === 'dom'}>
                  <Checkbox
                    hidden={user && user.type === 'dom'}
                    isChecked={notifications?.types['Reminder before due time']}
                    onChange={(e) =>
                      setNotifications({
                        ...notifications,
                        types: {
                          ...notifications.types,
                          'Reminder before due time': !notifications?.types[
                            'Reminder before due time'
                          ],
                        },
                      })
                    }
                  >
                    Reminder {notifications?.reminderDueTime} hour
                    {notifications?.reminderDueTime === '1' ? '' : 's'} before
                    due time
                  </Checkbox>
                  <br />
                  <div className="pl-6">
                    <FormLabel
                      disabled={!notifications?.receiving}
                      hidden={user && user.type === 'dom'}
                    >
                      Customize Reminder Hours:
                    </FormLabel>
                    <Select
                      onChange={(e) =>
                        setNotifications({
                          ...notifications,
                          reminderDueTime: e.target.value,
                        })
                      }
                      value={notifications?.reminderDueTime}
                      hidden={user && user.type === 'dom'}
                      disabled={!notifications?.receiving}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      {/* Add more options as needed */}
                    </Select>
                  </div>
                </FormControl>
              </div>
            </CheckboxGroup>
          </ModalBody>
          <ModalFooter className="space-x-2">
            <Button
              className="mt-6"
              bg="brand"
              textColor="white"
              size="sm"
              isLoading={isLoading}
              rightIcon={<CheckCircleIcon className="w-5" />}
              onClick={(e) => updateNotifications(e)}
            >
              Save Changes
            </Button>
            <Button
              className="mt-6"
              colorScheme="red"
              size="sm"
              isLoading={isLoading}
              rightIcon={<TrashIcon className="w-5" />}
              onClick={closeModal2}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Settings
