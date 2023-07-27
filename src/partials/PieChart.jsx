import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

export default function PieChart({ data }) {
  const bg = useColorModeValue('bg-gray-100', '#1E293B')
  const textColor = useColorModeValue('#000', '#fff')

  const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {
      textStyle: { color: textColor },
    },
  }

  return (
    <div className="m-auto py-8">
      {data ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width="100%"
          height="20rem"
          style={{
            color: '#fff',
          }}
        />
      ) : (
        'No data yet!'
      )}
    </div>
  )
}
