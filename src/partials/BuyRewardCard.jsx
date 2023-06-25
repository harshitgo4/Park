import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import { GifIcon } from '@heroicons/react/20/solid'
import { GiftIcon } from '@heroicons/react/24/outline'

const Card = ({ title}) => (
  <>
    <Box className='m-auto text-center' borderWidth="1px" borderRadius="md" p={4} shadow="md">
      <GiftIcon className='w-full' />
      <h3 className='text-xl font-semibold'>{title}</h3>
      <p>DOM</p>
      <Button className="mt-6" colorScheme="blue">
        Buy now
      </Button>
    </Box>
  </>
)

export default function BuyRewardCard({ data }) {
  // Pagination logic here
  return (
    <Box>
      <SimpleGrid className="grid grid-cols-1 md:grid-cols-4" spacing={4}>
        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
          />
        ))}
      </SimpleGrid>
    </Box>
  )
}
