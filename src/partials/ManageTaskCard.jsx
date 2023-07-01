import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { GifIcon } from '@heroicons/react/20/solid'
import { GiftIcon } from '@heroicons/react/24/outline'
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
import { Checkbox, FormControl, FormLabel } from '@chakra-ui/react'

const Card = ({ id, taskName, points, submissionDate }) => {
  const [taskId, setTaskId] = useState()
  const router = useNavigate()
  const { colorMode, toggleColorMode } = useColorMode()
  const [data, setData] = useState({
    email: '',
    userName: '',
    taskName: '',
    rewardPoints: '',
    description: '',
    selectedFreq: 'Daily',
  })

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value
    setData({ ...data, selectedFreq: event.target.value })
    // Handle the selected value here
    console.log('Selected value:', selectedValue)
  }

  const [dueTime, setDueTime] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [isNoEndDate, setIsNoEndDate] = useState(false)

  const handleStartDateChange = (date) => {
    setStartDate(date)
  }

  const handleEndDateChange = (date) => {
    setEndDate(date)
  }

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
  return (
    <>
      <Box
        className="m-auto text-left"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <h3 className="text-xl font-semibold">Task Name : {taskName}</h3>
        <hr />
        <br />
        <p>Points: {points}</p>
        <p>Submission Date: {submissionDate}</p>
        <Button
          onClick={() => {
            setTaskId(id)
            openModal()
          }}
          className="mt-4"
        >
          Edit Task
        </Button>
      </Box>{' '}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="xl">
        <ModalOverlay />
        <ModalContent
          bg={colorMode == 'light' ? 'white' : '#1A202C'}
          className="p-4"
        >
          <ModalHeader>
            <div className="text-xl">Edit Task ID : {taskId}</div>
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
                <Input
                  onChange={(e) =>
                    setData({ ...data, userName: e.target.value })
                  }
                  value={data.userName}
                  placeholder="Username"
                />
                <Input
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  value={data.email}
                  placeholder="Email"
                  type="email"
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
                  <Select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormLabel className="text-[#6D7D86]">
                    Submission Text Required?
                  </FormLabel>
                  <Select>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </Select>
                </FormControl>
              </div>
              <div className="mt-6 flex gap-4 grid  grid-cols-2">
                <FormControl>
                  <FormLabel className="text-[#6D7D86]">Start Date:</FormLabel>
                  <Input
                    placeholder="Start Date"
                    size="md"
                    type="date"
                    selected={startDate}
                    onChange={handleStartDateChange}
                  />
                </FormControl>

                <FormControl className="flex flex-col">
                  <FormLabel className="text-[#6D7D86]">End Date:</FormLabel>
                  <Input
                    placeholder="End Date"
                    size="md"
                    type="date"
                    selected={isNoEndDate ? null : endDate}
                    onChange={handleEndDateChange}
                    disabled={isNoEndDate}
                  />
                  <Checkbox
                    checked={isNoEndDate}
                    onChange={handleNoEndDateChange}
                    className="mt-2"
                  >
                    No End Date
                  </Checkbox>
                </FormControl>
                <div className="mt-6 flex gap-4 grid  grid-cols-2">
                  <Button>Submit</Button>
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
export default function ManageTaskCard({ data }) {
  // Pagination logic here
  const pageSize = 8
  const pageCount = Math.ceil(data.length / pageSize)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const visibleData = data.slice(startIndex, endIndex)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  return (
    <>
      <Box>
        <SimpleGrid className="grid grid-cols-1 md:grid-cols-4" spacing={4}>
          {visibleData.map((item) => (
            <Card
              key={item.id}
              id={item.id}
              taskName={item.taskName}
              points={item.points}
              submissionDate={item.submissionDate}
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
