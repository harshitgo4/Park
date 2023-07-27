import React from 'react'
import { Chart } from 'react-google-charts'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'

export function BarChart({ data }) {
  const bg = useColorModeValue('bg-gray-100', '#1E293B')
  const bg2 = useColorModeValue('#fff', '#000')
  const textColor = useColorModeValue('#000', '#fff')
  const options = {
    chart: {
      style: {
        background: {
          fillColor: bg2,
        },
      },
    },
    legend: {position: 'none'},
    hAxis: {
      textStyle: {
        color: textColor, // Set the color of the X-axis text
        fontSize: 12, // Adjust the font size of the X-axis text
      },
      gridlines: {
        color: textColor, // Set the color of the X-axis gridlines to transparent to hide them
      },
    },
    vAxis: {
      textStyle: {
        color: textColor, // Set the color of the Y-axis text
        fontSize: 12, // Adjust the font size of the Y-axis text
      },
      gridlines: {
        color: textColor, // Set the color of the Y-axis gridlines
      },
    },
  }

  return (
    <div>
      <Chart
        chartType="Bar"
        width="100%"
        height="265px"
        data={data}
        options={options}
      />
    </div>
  )
}
