import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { GifIcon } from '@heroicons/react/20/solid'
import { GiftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'

const Card = ({
  taskId,
  id,
  subName,
  proofText,
  taskName,
  submissionDate,
  image,
}) => {
  const router = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e, id, status) => {
    e.preventDefault()
    const token = Cookies.get('token')
    console.log(id, status)

    fetch('https://bdsm-backend.onrender.com/api/updateSubmittedTask', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        id,
        status,
      }),
    })
      .then((response) => response.json())
      .then((res2) => {
        console.log(res2.message)
        toast({
          title: 'Submitted!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <Box
        className="m-auto text-left flex flex-col"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <div className="h-[15rem] w-[12rem] m-auto justify-between">
          <img src={image} alt="" className="rounded-lg mb-4 m-auto w-full" />
        </div>
        <h3 className="text-xl font-semibold">SUB Name : {subName}</h3>
        <p>Task Details</p>
        <hr />
        <br />
        <p>Task Name: {taskName}</p>
        <p>Proof text: {proofText}</p>
        <p>Submission Date: {submissionDate}</p>
        <div className="flex flex-row gap-x-1">
          <Button
            size="xs"
            colorScheme="green"
            onClick={(e) => handleSubmit(e, id, 'Accepted')}
            className="mt-4"
          >
            Accept
          </Button>{' '}
          <Button
            size="xs"
            colorScheme="red"
            onClick={(e) => handleSubmit(e, id, 'Denied')}
            className="mt-4"
          >
            Deny
          </Button>{' '}
          <Button
            size="xs"
            onClick={() => router(`/task/${taskId}`)}
            className="mt-4"
          >
            View Task
          </Button>
        </div>
      </Box>
    </>
  )
}
export default function SubmittedTaskCards({ data }) {
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
          {visibleData.map((item) => (
            <Card
              key={item.id}
              taskId={item.id}
              id={item._id}
              subName={item.subName}
              proofText={item.proofText}
              taskName={item.taskName}
              submissionDate={item.submissionDate}
              image={item.image}
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
