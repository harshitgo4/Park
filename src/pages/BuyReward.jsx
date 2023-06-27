import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import CardsWithPagination from '../partials/CardsWithPagination'
import BuyRewardCard from '../partials/BuyRewardCard'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function BuyReward() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const data = [
    {
      id: 1,
      title: '100',
    },
    {
      id: 2,
      title: '200',
    },
    {
      id: 3,
      title: '300',
    },
    {
      id: 4,
      title: '400',
    },
    {
      id: 5,
      title: '500',
    },
    {
      id: 6,
      title: '600',
    },
    {
      id: 7,
      title: '800',
    },
    {
      id: 8,
      title: '1000',
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
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Buy Reward Points</h1>
              <Box p={4}>
                <BuyRewardCard data={data} />
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
