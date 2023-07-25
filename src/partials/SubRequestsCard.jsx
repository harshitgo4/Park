import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'

const Card = ({ id, email, subName, imageURL, data, setRequests }) => {
  const router = useNavigate()
  const toast = useToast()
  const removeReq = async (e, email) => {
    e.preventDefault()
    const res = await fetch(`https://bdsm-backend.onrender.com/api/removeReq`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error deleting request')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      console.log('Request removed!')
      const temp = data.filter((el) => el.subEmail != email)
      setRequests(temp)
      toast({
        title: 'Request Deleted!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }
  const acceptReq = async (e, email) => {
    e.preventDefault()
    const res = await fetch(`https://bdsm-backend.onrender.com/api/acceptReq`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    })

    const resData = await res.json()

    if (resData.error) {
      console.log('Error accepting request')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      console.log('Request accepted!')
      const temp = data.filter((el) => el.subEmail != email)
      setRequests(temp)
      toast({
        title: 'Request accepted!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      setTimeout(() => {
        router('/ConnectedSub')
      }, 1000)
    }
  }

  return (
    <>
      <Box
        className="m-auto text-left mx-4"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <img
          src={imageURL ? imageURL : ''}
          className="rounded-lg mb-4 m-auto w-[12rem]"
        />
        <h3 className="text-xl font-semibold">SUB Name : {subName}</h3>
        <hr />
        <div className="my-4">
          {' '}
          <Button
            colorScheme="red"
            onClick={(e) => removeReq(e, email)}
            className="mx-2"
            size="xs"
          >
            Remove
          </Button>
          <Button
            colorScheme="green"
            onClick={(e) => acceptReq(e, email)}
            className="mx-2"
            size="xs"
          >
            Accept
          </Button>
        </div>
      </Box>
    </>
  )
}
export default function SubRequestsCard({ data, setRequests }) {
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
        <SimpleGrid
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-2"
          spacing={4}
        >
          {visibleData?.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              email={item.subEmail}
              subName={item.subName}
              imageURL={item.subAvatar}
              data={data}
              setRequests={setRequests}
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
      <