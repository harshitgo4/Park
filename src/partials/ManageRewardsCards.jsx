import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'

const Card = ({ id, rewardName, desc, rewardPoints, subEmail, subName }) => {
  const router = useNavigate()
  const toast = useToast()

  const handleSubmit = async (e, status) => {
    e.preventDefault()
    const token = Cookies.get('token')
    console.log(id, status)

    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/updateRewardsStatus`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        subEmail,
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
        className="m-auto text-left"
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
        <p>Requested By: {subName}</p>
        <div className="space-x-1">
          {' '}
          <Button
            onClick={(e) => handleSubmit(e, 'Accepted')}
            colorScheme="green"
            className="mt-4"
            size="sm"
          >
            Approve
          </Button>
          <Button
            onClick={(e) => handleSubmit(e, 'Denied')}
            colorScheme="red"
            className="mt-4"
            size="sm"
          >
            Deny
          </Button>
        </div>
      </Box>
    </>
  )
}
export default function ManageRewardsCards({ data }) {
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
              subName={item.subName}
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
