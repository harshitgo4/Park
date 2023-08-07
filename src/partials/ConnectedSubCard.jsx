import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const Card = ({
  id,
  subName,
  imageURL,
  duration,
  email,
  data,
  setConnections,
}) => {
  const router = useNavigate()
  const toast = useToast()

  const removeConn = async (e, email) => {
    e.preventDefault()
    const res = await fetch(`http://localhost:5000/api/removeReq`, {
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
      console.log('Error deleting connection')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      console.log('Connection removed!')
      const temp = data.filter((el) => el.subEmail != email)
      setConnections(temp)
      toast({
        title: 'Connection Deleted!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
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
        <img src={imageURL} className="rounded-lg mb-4 m-auto" />
        <h3 className="text-xl font-semibold">SUB Name : {subName}</h3>
        <hr />
        <div>
          <p>Since: {duration}</p>
        </div>
        <div className="my-4">
          <Button size="sm" onClick={() => router(`/sub/${id}`)}>
            View
          </Button>{' '}
          <Button
            size="sm"
            onClick={(e) => removeConn(e, email)}
            colorScheme="red"
          >
            Remove
          </Button>
        </div>
      </Box>
    </>
  )
}
export default function ConnectedSubCard({ data, setConnections }) {
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

  console.log(data)
  return (
    <>
      <Box>
        <SimpleGrid className="grid grid-cols-1 md:grid-cols-4" spacing={4}>
          {visibleData?.map((item) => {
            const updatedAt = new Date(item.updatedAt)
            const currentDate = new Date()

            const yearDiff = currentDate.getFullYear() - updatedAt.getFullYear()
            const monthDiff = currentDate.getMonth() - updatedAt.getMonth()
            const dayDiff = currentDate.getDate() - updatedAt.getDate()

            const formattedDuration = `${yearDiff}y ${monthDiff}m ${dayDiff}d`
            return (
              <Card
                key={item._id}
                id={item._id}
                subName={item.subName}
                imageURL={item.subAvatar}
                duration={formattedDuration}
                email={item.subEmail}
                data={data}
                setConnections={setConnections}
              />
            )
          })}
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
