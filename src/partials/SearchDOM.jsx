import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { useToast } from '@chakra-ui/react'

const Card = ({
  id,
  title,
  imageUrl,
  email,
  isConfirmed,
  isRequested,
  connections,
  setConnections,
}) => {
  const router = useNavigate()
  const toast = useToast()
  const connectDOM = async (e, email) => {
    e.preventDefault()
    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/connectDOM`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      },
    )

    const resData = await res.json()

    if (resData.error) {
      console.log('Error fetching users')
      toast({
        title: 'Something went wrong!',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    } else if (resData.message) {
      console.log('Request Sent!')

      setConnections([...connections, { domEmail: email, isConfirmed: false }])
      toast({
        title: 'Request Sent!',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <Box
        borderWidth="1px"
        className="m-auto text-center mx-2"
        borderRadius="md"
        p={2}
        shadow="md"
      >
        <img className="mb-4 w-[12rem] m-auto rounded-lg" src={imageUrl} />
        <h3 className="text-xl font-semibold">{title}</h3>
        <div className="space-x-2">
          <Button onClick={() => router(`/dom/${id}`)} className="mt-4">
            View
          </Button>
          <Button
            onClick={(e) => {
              isConfirmed ? '' : isRequested ? '' : connectDOM(e, email)
            }}
            className="mt-4"
            colorScheme="blue"
          >
            {isConfirmed ? 'Connected' : isRequested ? 'Pending' : 'Connect'}
          </Button>
        </div>
      </Box>
    </>
  )
}

export default function SearchDOM({ data, connections, setConnections }) {
  const [searchTerm, setSearchTerm] = useState('')
  const filteredData = useMemo(() => {
    let filtered = data

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.fName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.lName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    return filtered
  }, [data, searchTerm])

  console.log(connections)

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  // Pagination logic here
  const pageSize = 8
  const pageCount = Math.ceil(filteredData?.length / pageSize)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const visibleData = filteredData?.slice(startIndex, endIndex)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  return (
    <Box>
      <Box mb={4} spacing={4} className="flex flex-row space-x-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <SimpleGrid
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2"
        spacing={4}
      >
        {visibleData?.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.fName + ' ' + item.lName}
            imageUrl={!item.isPrivate ? item.avatar : ''}
            email={item.email}
            isConfirmed={connections.some(
              (el) => el.domEmail === item.email && el.isConfirmed,
            )}
            isRequested={connections.some(
              (el) => el.domEmail === item.email && !el.isConfirmed,
            )}
            connections={connections}
            setConnections={setConnections}
          />
        ))}
      </SimpleGrid>

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
    </Box>
  )
}
