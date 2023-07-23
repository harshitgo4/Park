import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import {
  Box,
  Button,
  useColorModeValue,
  useColorMode,
  Input,
  Textarea,
  Select,
  useToast,
  SimpleGrid,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'

export default function CreateReward() {
  const router = useNavigate()
  const toast = useToast()

  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [connections, setConnections] = useState([])
  useEffect(() => {
    if (user && user.type === 'sub') {
      router('/404')
    }
  }, [])
  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])
  useEffect(() => {
    const fetchSubConnected = async () => {
      const res = await fetch(`http://localhost:5000/api/fetchSubConnected`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching users')
      } else if (resData.connections) {
        setConnections(resData.connections)
      }
    }
    fetchSubConnected()
  }, [])

  const { colorMode, toggleColorMode } = useColorMode()
  const [selectedOptions, setSelectedOptions] = useState([])
  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)
  const [data, setData] = useState({
    rewardName: '',
    rewardPoints: '',
    description: '',
  })

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.rewardName && data.rewardPoints) {
      const res = await fetch(`http://localhost:5000/api/createReward`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          selectedOptions,
        }),
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error creating reward')
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (resData.message) {
        setData({
          rewardName: '',
          rewardPoints: '',
          description: '',
        })
        toast({
          title: 'Reward Created!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    } else {
      toast({
        title: 'Please input all fields!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  const handleSelectChange = (event) => {
    const selectedValues = Array.from(
      event.target.selectedOptions,
      (option) => option.value,
    )

    // Filter out selected options that are already in the state
    const newSelectedOptions = connections.filter(
      (option) =>
        selectedValues.includes(option.subEmail) &&
        !selectedOptions.some(
          (selected) => selected.subEmail === option.subEmail,
        ),
    )

    setSelectedOptions((prevSelected) => [
      ...prevSelected,
      ...newSelectedOptions,
    ])
  }

  const handleRemoveOption = (optionValue) => {
    console.log(optionValue)
    setSelectedOptions((prevSelected) =>
      prevSelected.filter((option) => option.subEmail !== optionValue),
    )
  }

  return (
    <div className="h-[100vh] overflow-y-auto">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
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
          email={email}
          router={router}
          setShowDrawer={setShowDrawer}
          toggleColorMode={toggleColorMode}
        />
        <main className="z-1 mx-auto w-full md:pl-80 p-4 overflow-y-auto">
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Create Reward</h1>
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Input
                  onChange={(e) =>
                    setData({ ...data, rewardName: e.target.value })
                  }
                  value={data.rewardName}
                  placeholder="Reward Name"
                />
                <Input
                  onChange={(e) =>
                    setData({ ...data, rewardPoints: e.target.value })
                  }
                  value={data.rewardPoints}
                  type="number"
                  placeholder="Reward Points"
                />
              </div>
              <div className="mt-6 gap-4">
                {/* A select button where I can choose multiple from various options */}
                <SimpleGrid gap={4}>
                  <Select
                    isMulti
                    placeholder="Select SUBs"
                    size="md"
                    onChange={handleSelectChange}
                  >
                    {connections?.map((option) => (
                      <option key={option.subEmail} value={option.subEmail}>
                        {option.subName}
                      </option>
                    ))}
                  </Select>
                </SimpleGrid>

                {/* Display selected options as tags with a close button */}
                {selectedOptions?.map((d, i) => {
                  console.log('selectedOption', selectedOptions)
                  return (
                    <Tag
                      key={i + 1}
                      size="md"
                      variant="subtle"
                      colorScheme="blue"
                      className="m-2"
                    >
                      <TagLabel>{d.subName}</TagLabel>
                      <TagCloseButton
                        onClick={() => handleRemoveOption(d.subEmail)}
                      />
                    </Tag>
                  )
                })}
              </div>
              <div className="mt-6 gap-4 grid grid-cols-1">
                <Textarea
                  onChange={(e) =>
                    setData({ ...data, description: e.target.value })
                  }
                  value={data.description}
                  placeholder="Description (in max 200 chars)"
                  maxLength={200}
                />
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-3">
                <Button onClick={handleSubmit}>Create +</Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
