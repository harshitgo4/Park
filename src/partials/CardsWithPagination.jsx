import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Card = ({ id, title, desc, submissionDate, domName, status }) => {
  const router = useNavigate()
  return (
    <>
      <Box
        borderWidth="1px"
        className="m-auto text-center"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <h3 className="text-xl font-semibold">{title}</h3>
        <p>{desc}</p>
        <p>Submit Date : {submissionDate}</p>
        <p>Task by : {domName}</p>
        <Button
          onClick={() => router(`/task/${id}`)}
          className="mt-4"
          colorScheme="blue"
        >
          View
        </Button>
      </Box>
    </>
  )
}

export default function CardsWithPagination({ data }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const filteredData = useMemo(() => {
    let filtered = data

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedMonth) {
      filtered = filtered.filter(
        (item) => new Date(item.endDate).getMonth() + 1 === Number(selectedMonth),
      )
    }

    if (selectedYear) {
      filtered = filtered.filter(
        (item) => new Date(item.endDate).getFullYear() === Number(selectedYear),
      )
    }

    return filtered
  }, [data, searchTerm, selectedMonth, selectedYear])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value)
  }

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value)
  }

  // Pagination logic here
  const pageSize = 6
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
      <Box mb={4} className="flex flex-row space-x-4">
        <Input
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Select
          placeholder="Month"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Select>
        <Select
          placeholder="Year"
          value={selectedYear}
          onChange={handleYearChange}
        >
          <option value="2021">2021</option>
          <option value="2022">2022</option>
          <option value="2023">2023</option>
          {/* Add other years */}
        </Select>
      </Box>

      <SimpleGrid className="grid grid-cols-1 md:grid-cols-3" spacing={4}>
        {visibleData?.map((item) => (
          <Card
            key={item._id}
            id={item._id}
            title={item.taskName}
            desc={item.taskDesc}
            submissionDate={item.endDate?.split('T')[0]}
            domName={item.domName}
            status={item.status}
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
