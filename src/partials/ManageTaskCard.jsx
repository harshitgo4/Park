import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorMode,
} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import { Checkbox, FormControl, FormLabel, useToast } from '@chakra-ui/react'
import Swal from 'sweetalert2'
import { SingleDatepicker } from 'chakra-dayzed-datepicker'
import Cookies from 'js-cookie'

const Card = ({ id, data2, tasks, setTasks, email, connections }) => {
  const [taskId, setTaskId] = useState()
  const toast = useToast()
  const router = useNavigate()

  const { colorMode, toggleColorMode } = useColorMode()
  const [data, setData] = useState({
    email: '',
    userName: data2?.subEmail,
    taskName: data2?.taskName,
    rewardPoints: data2?.rewardPoints,
    description: data2?.taskDesc,
    selectedFreq: data2?.submissionFreq,
    isMediaReq: data2?.isMediaReq,
    isSubmissionReq: data2?.isSubmissionReq,
  })

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setData({ ...data, selectedFreq: event.target.value })
    // Handle the selected value here
    console.log('Selected value:', selectedValue)
  }

  const handleSelectChange2 = (event) => {
    const selectedValue = event.target.value
    setData({ ...data, userName: event.target.value })
    // Handle the selected value here
    console.log('Selected value:', selectedValue)
  }

  const [dueTime, setDueTime] = useState(data2?.dueTime)
  const [startDate, setStartDate] = useState(new Date(data2?.startDate))
  const [endDate, setEndDate] = useState(new Date(data2?.endDate))
  const [isNoEndDate, setIsNoEndDate] = useState(data2?.isNoEndDate)

  const handleNoEndDateChange = (event) => {
    setIsNoEndDate(event.target.checked)
  }
  const [isModalOpen, setModalOpen] = useState(false)
  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (
      data.taskName &&
      data.description &&
      data.rewardPoints &&
      data.userName &&
      dueTime
    ) {
      const res = await fetch(`http://localhost:5000/api/updateTask`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: data2._id,
          data,
          dueTime,
          startDate,
          endDate,
          isNoEndDate,
        }),
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error updating task')
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      } else if (resData.message) {
        closeModal()
        toast({
          title: 'Task Updated!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
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
    const res = await fetch(`http://localhost:5000/api/handlePause`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data2._id,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error updating task')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      closeModal()
      toast({
        title: `Task ${data2.isPaused ? 'Resumed' : 'Paused'}!`,
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
    const res = await fetch(`http://localhost:5000/api/deleteTask`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: data2._id,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error deleting task')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      closeModal()
      toast({
        title: `Task Deleted!`,
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
        className="m-auto text-left"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <h3 className="text-xl font-semibold">Task Name : {data2.taskName}</h3>
        <hr />
        <br />
        <p>Points: {data2.rewardPoints}</p>
        <p>Submission Date: {data2.endDate.split('T')[0]}</p>
        <div className="space-x-1 ">
          {' '}
          <Button
            size="sm"
            onClick={() => {
              setTaskId(id)
              openModal()
            }}
            className="mt-4"
          >
            Edit
          </Button>
          <Button onClick={handlePause} size="sm" className="mt-4">
            {data2.isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            onClick={(e) =>
              Swal.fire({
                title: 'Are you sure you want to delete this task?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDelete(e)
                }
              })
            }
            size="sm"
            colorScheme="red"
            className="mt-4"
          >
            Delete
          </Button>
        </div>
      </Box>{' '}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode == 'light' ? 'white' : '#1A202C'}
          className="p-4"
        >
          <ModalHeader>
            <div className="text-xl">Edit Task ID : {data2._id}</div>
            <div className="py-2 text-[#716868] text-sm">
              Edit details here.
            </div>
          </ModalHeader>
          <ModalBody>
            <div className="w-full">
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Input
                  onChange={(e) =>
                    setData({ ...data, taskName: e.target.value })
                  }
                  value={data.taskName}
                  placeholder="Task Name"
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
              <div className="mt-6 gap-4 grid grid-cols-2">
                <Select value={data.userName} onChange={handleSelectChange2}>
                  <option value={null}>Select Sub</option>
                  {connections?.map((d, i) => {
                    return (
                      <option key={i} value={d.subEmail}>
                        {d.subName}
                      </option>
                    )
                  })}
                </Select>
                <Input
                  value={email}
                  placeholder="Email"
                  type="email"
                  readOnly
                />
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Frequency
                  </FormLabel>
                  <Select
                    value={data.selectedFreq}
                    onChange={handleSelectChange}
                  >
                    <option value="Daily">Daily</option>
                    <option value="Every Other Day">Every Other Day</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </Select>
                </FormControl>
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Due time</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    size="md"
                    type="time"
                    value={dueTime}
                    onChange={(e) => setDueTime(e.target.value)}
                  />
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Media Required?
                  </FormLabel>
                  <Select
                    value={data.isMediaReq}
                    onChange={(e) => {
                      setData({ ...data, isMediaReq: e.target.value })
                    }}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Text Required?
                  </FormLabel>
                  <Select
                    value={data.isSubmissionReq}
                    onChange={(e) => {
                      setData({ ...data, isSubmissionReq: e.target.value })
                    }}
                  >
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Start Date:</FormLabel>
                  <SingleDatepicker
                    name="date-input"
                    date={startDate}
                    onDateChange={setStartDate}
                  />
                </FormControl>

                <FormControl className="flex flex-col">
                  <FormLabel className="text-[#6D7D86]">End Date:</FormLabel>
                  <SingleDatepicker
                    name="date-input"
                    date={isNoEndDate ? null : endDate}
                    onDateChange={setEndDate}
                    disabled={isNoEndDate}
                  />
                  <Checkbox
                    isChecked={isNoEndDate}
                    onChange={handleNoEndDateChange}
                    className="mt-2"
                  >
                    No End Date
                  </Checkbox>
                </FormControl>
                <div className="mt-6 flex gap-4 grid  grid-cols-2">
                  <Button onClick={handleSubmit}>Submit</Button>
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
export default function ManageTaskCard({ data, setTasks, email, connections }) {
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
              key={item._id}
              data2={item}
              tasks={data}
              setTasks={setTasks}
              email={email}
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
