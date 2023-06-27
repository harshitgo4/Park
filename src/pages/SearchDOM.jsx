import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import PieChart from '../partials/PieChart'
import { ColumnChart } from '../partials/ColumnChart'
import SearchDOM from '../partials/SearchDOM'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function Rewards() {
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
      title: 'DOM 1',
      imageUrl: 'https://source.unsplash.com/random/',
    },
    {
      id: 2,
      title: 'DOM 2',
      imageUrl: 'https://source.unsplash.com/random/',
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
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Connect with DOM</h1>
              <SearchDOM data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
