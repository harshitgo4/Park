import { useState, useMemo, useEffect } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
  useColorModeValue,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Checkbox, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Swal from 'sweetalert2'

const Card = ({
  id,
  rewardName,
  desc,
  rewardPoints,
  subEmail,
  createdAt,
  isPaused,
  connections,
}) => {
  const router = useNavigate()
  const toast = useToast()
  const { colorMode } = useColorMode()

  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const [isModalOpen, setModalOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [data, setData] = useState({
    rewardName: rewardName,
    rewardPoints: rewardPoints,
    description: desc,
  })

  useEffect(() => {
    const temp =
      subEmail.length > 0
        ? subEmail.map((d, i) => {
            return connections?.filter((el) => el.subEmail === d)
          })
        : [[]]
    console.log(temp)
    setSelectedOptions(...temp)
  }, [isModalOpen])

  const openModal = () => {
    setModalOpen(true)
  }
  const closeModal = () => {
    Swal.fire({
      title: 'Are you sure you want to cancel these unsaved changes?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, discard it!',
    }).then((result) => {
      if (result.isConfirmed) {
        setModalOpen(false)
      }
    })
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.rewardName && data.rewardPoints) {
      const res = await fetch(`http://localhost:5000/api/updateReward`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
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
          title: 'Reward Updated!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        setModalOpen(false)
        setTimeout(() => {
          window.location.reload(true)
        }, 1000)
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
  const handlePause = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:5000/api/pauseReward`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error updating reward')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      toast({
        title: `Reward ${isPaused ? 'Resumed' : 'Paused'}!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    }
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:5000/api/deleteReward`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error deleting reward')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      toast({
        title: `Reward Deleted!`,
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        window.location.reload(true)
      }, 1000)
    }
  }

  return (
    <>
      <Box
        className={`m-auto text-left ${isPaused ? 'opacity-80' : ''}`}
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <h3 className="text-xl font-semibold">Reward Name : {rewardName}</h3>
        <p>Reward Description : {desc}</p>
        <hr />
        <br />
        <p>Reward Points: {rewardPoints}</p>
        <p>Created On: {createdAt.split('T')[0]}</p>
        <div className="space-x-1">
          {' '}
          <Button
            onClick={() => {
              openModal()
            }}
            colorScheme="green"
            className="mt-4"
            size="sm"
          >
            Edit
          </Button>
          <Button
            onClick={(e) => handlePause(e)}
            colorScheme="yellow"
            className="mt-4"
            size="sm"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={(e) => handleDelete(e)}
            colorScheme="red"
            className="mt-4"
            size="sm"
          >
            Delete
          </Button>
        </div>
      </Box>
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode == 'light' ? 'white' : '#1A202C'}
          className="p-4"
        >
          <ModalHeader>
            <div className="text-xl">Edit Reward ID : {id}</div>
            <div className="py-2 text-[#716868] text-sm">
              Edit details here.
            </div>
          </ModalHeader>
          <ModalBody>
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
                  <Button colorScheme="green" onClick={handleSubmit}>
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={closeModal}>Close</button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
export default function ManageRewardsCards2({ data, connections }) {
  // Pagination logic here
  const pageSize = 8
  const pageCount = Math.ceil(data?.length / pageSize)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const visibleData = data?.slice(startIndex, endIndex)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  return (
    <>
      <Box>
        <SimpleGrid className="grid grid-cols-1 md:grid-cols-4" spacing={4}>
          {visibleData?.map((item) => (
            <Card
              key={item.id}
              id={item._id}
              rewardName={item.rewardName}
              desc={item.description}
              rewardPoints={item.rewardPoints}
              subEmail={item.subEmail}
              isPaused={item.isPaused}
              createdAt={item.createdAt}
              connections={connections}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={4} className="space-x-2">
        <Button
          size="sm"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            size="sm"
            variant={index === currentPage ? 'solid' : 'outline'}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size="sm"
          disabled={currentPage === pageCount - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
