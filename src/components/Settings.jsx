import React, { useState, useEffect } from 'react'
import Header2 from './Header2'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { Button, Checkbox, Input } from '@chakra-ui/react'
import { ArrowUpTrayIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon, NoSymbolIcon, TrashIcon } from '@heroicons/react/24/outline'
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
      console.log(user)
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

    fetch('https://bdsm-backend.onrender.com/api/updateUser', {
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
  const handleDelete = async (e, keyword) => {
    e.preventDefault()
    closeModal()
    setIsLoading2(true)
    const token = Cookies.get('token') // Assuming you have a library like 'js-cookie' to retrieve the token from the cookie

    fetch('https://bdsm-backend.onrender.com/api/user', {
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

    fetch('https://bdsm-backend.onrender.com/api/cancel-subscriptions', {
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
        user={user}
        setUser={setUser}
        subscriptionDetails={subscriptionDetails}
        setSubscriptionDetails={setSubscriptionDetails}
      />
      <button
        className="z-50 md:hidden px-3 py-2 rounded-md  focus:outline-none flex-none ml-auto"
        onClick={onOpen}
      >
        <Bars3Icon className="h-6 w-6" />
      </button>
      <div className={`w-[100%] md:w-[60%] ${bg} p-8 rounded-lg m-auto `}>
        <div className="w-full flex flex-row">
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
          <div className="ml-auto">
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
            onChange={() => setData({ ...data, subscribed: !data.subscribed })}
            isChecked={data.subscribed}
          >
            Subscribe to newsletter
          </Checkbox>
          <Checkbox
            onChange={() => setData({ ...data, isPrivate: !data.isPrivate })}
            isChecked={!data.isPrivate}
          >
            Profile Picture Public
          </Checkbox>
        </div>
        <div className="border p-2 mt-4">
          <h1 className=" text-md font-semibold">🟢 Making Changes</h1>
          <p className="text-sm pl-8">
            Remember that you can make changes to your account whenever
            necessary and suitable. Make sure your initials correspond to your
            present title e.g., student, researcher, business.{' '}
          </p>
        </div>
        <div className="space-x-4">
          {' '}
          <Button
            className="mt-6"
            bg="brand"
            textColor="white"
            isLoading={isLoading}
            rightIcon={<CheckCircleIcon className="w-5" />}
            onClick={(e) => handleSubmit(e)}
          >
            Save Changes
          </Button>
          <Button
            className="mt-6"
            colorScheme="red"
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
            isLoading={isLoading2}
            onClick={openModal}
            rightIcon={<TrashIcon className="w-5" />}
          >
            Delete Account
          </Button>
        </div>
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
    </div>
  )
}

export default Settings
