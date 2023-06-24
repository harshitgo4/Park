import React from 'react'
import { Badge, Box, Flex, Text } from '@chakra-ui/react'

function VerticalBarChart() {
  const data = [
    { label: 'A', values: [70, 40, 90] },
    { label: 'B', values: [60, 80, 50] },
    { label: 'C', values: [30, 60, 75] },
    { label: 'D', values: [70, 40, 90] },
    { label: 'E', values: [60, 80, 50] },
    { label: 'F', values: [30, 60, 75] },
    { label: 'G', values: [70, 40, 90] },
  ]

  const maxBarHeight = 205

  return (
    <>
      <Box className="flex flex-row p-2 m-auto">
        {data.map((item) => (
          <div className="flex items-center justify-end flex-col mx-2">
            <Flex key={item.label} alignItems="flex-end">
              {item.values.map((value, index) => (
                <Box
                  key={index}
                  w="4px"
                  h={`${(value / 100) * maxBarHeight}px`}
                  bg={['green.400', 'red.400', 'orange.400'][index]}
                  mx={0.5}
                  className="rounded-lg"
                ></Box>
              ))}
            </Flex>
            <div className="">{item.label}</div>
          </div>
        ))}
      </Box>{' '}
      <div className="pl-2 space-x-2 m-auto">
        <Badge colorScheme="green">Approved</Badge>
        <Badge colorScheme="red">
          Failed
        </Badge>
        <Badge colorScheme="orange">
          Incomplete
        </Badge>
      </div>
    </>
  )
}

export default VerticalBarChart
