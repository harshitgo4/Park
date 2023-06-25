import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'

const Card = ({ title, description, imageUrl, date }) => (
  <>
    <Box borderWidth="1px" className='m-auto text-center' borderRadius="md" p={4} shadow="md">
      <img className="mb-4" src={imageUrl} />
      <h3 className='text-xl font-semibold'>{title}</h3>
      <Button className='mt-4' colorScheme='blue'>Connected</Button>
    </Box>
  </>
)

export default function SearchDOM({ data }) {

  const filteredData = data

  // Pagination logic here
  const pageSize = 8
  const pageCount = Math.ceil(filteredData.length / pageSize)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const visibleData = filteredData.slice(startIndex, endIndex)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }

  return (
    <Box>
      <SimpleGrid className='grid grid-cols-1 md:grid-cols-4' spacing={4}>
        {visibleData.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            description={item.description}
            imageUrl={item.imageUrl}
            date={item.date}
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
