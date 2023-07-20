import { useState, useMemo } from 'react'
import {
  Box,
  Input,
  Select,
  Button,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react'
import { GifIcon } from '@heroicons/react/20/solid'
import { GiftIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const Card = ({ id, title, points, dom, boughtBy, user }) => {
  const toast = useToast()
  const router = useNavigate()
  return (
    <>
      <Box
        className="m-auto text-center"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <GiftIcon className="w-full" />
        <h3 className="text-xl font-semibold">{title}</h3>
        <h3 className="text-xl font-semibold">{points}</h3>
        <p>{dom}</p>
        <Button
          isDisabled={user.rewards < points}
          onClick={() => {
            boughtBy.some((obj) => obj.subEmail === user?.email)
              ? boughtBy.some((obj2) => obj2.status === 'Pending')
                ? null
                : null
              : Swal.fire({
                  title: `Are you sure you want to use ${points} on this`,
                  text: "You won't be able to revert this!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Yes, buy it!',
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    const res = await fetch(
                      `https://bdsm-backend.onrender.com/api/BuyReward`,
                      {
                        method: 'POST',
                        headers: {
                          Authorization: `Bearer ${Cookies.get('token')}`,
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id,
                          points,
                        }),
                      },
                    )

                    const resData = await res.json()

                    if (resData.error) {
                      console.log('Error creating reward')
                      toast({
                        title: 'Something went wrong!',
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
                    } else if (resData.message) {
                      toast({
                        title: 'Reward awaiting approval!',
                        status: 'success',
                        duration: 9000,
                        isClosable: true,
                      })
                      router('/BuyReward')
                    }
                  }
                })
          }}
          className="mt-6"
          colorScheme="blue"
        >
          {boughtBy.some((obj) => obj.subEmail === user?.email)
            ? boughtBy.some((obj2) => obj2.status === 'Pending')
              ? 'Pending'
              : 'Bought'
            : 'Buy now'}
        </Button>
      </Box>
    </>
  )
}

export default function BuyRewardCard({ data, user }) {
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
              title={item.name}
              points={item.rewardPoints}
              dom={item.domName}
              boughtBy={item.boughtBy}
              user={user}
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
