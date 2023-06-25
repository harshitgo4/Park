import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import CardsWithPagination from '../partials/CardsWithPagination'
export default function AssignedTask() {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')

  const data = [
    {
      id: 1,
      title: 'Card 1',
      description: 'Description 1',
      date: '2023-06-01',
      imageUrl: 'https://source.unsplash.com/random/'
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'Description 2',
      date: '2023-06-02',
      imageUrl: 'https://source.unsplash.com/random/'
    },
    // Add more data
  ]

  return (
    <div className="h-[100vh] overflow-y-auto">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
        user={user}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
      />
      <div className={`flex pb-40 h-screen}`}>
        <SideBar
          showDrawer={showDrawer}
          user={user}
          email={email}
          router={router}
          setShowDrawer={setShowDrawer}
          toggleColorMode={toggleColorMode}
        />
        <main className="z-1 mx-auto w-full md:pl-80 p-4 overflow-y-auto">
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Assigned Tasks Detail</h1>
              <Box p={4}>
                <CardsWithPagination data={data} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
