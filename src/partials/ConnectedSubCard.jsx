import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { GifIcon } from '@heroicons/react/20/solid'
import { GiftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'

const Card = ({ id, subName, duration }) => {
  const router = useNavigate()
  return (
    <>
      <Box
        className="m-auto text-left"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
      <img src="https://source.unsplash.com/random/" className='rounded-lg p-4' />
        <h3 className="text-xl font-semibold">SUB Name : {subName}</h3>
        <hr />
        <div>
          <p>Since: {duration}</p>
        </div>
        <div className="my-4">
          <Button size="sm" onClick={() => router(`/sub/${id}`)}>
            View
          </Button>{' '}
          <Button size="sm" colorScheme="red">
            Remove
          </Button>
        </div>
      </Box>
    </>
  )
}
export default function ConnectedSubCard({ data }) {
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
              subName={item.subName}
              duration={item.duration}
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
