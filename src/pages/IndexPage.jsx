import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import SideBar from '../components/sidebar/Main'
import { css } from '@emotion/react'

export default function Home({ folder, initialNamespace }) {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  
  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-[#FFF2F2]', 'bg-[#1E293B]')

  return (
    <div className="h-[100vh] overflow-y-hidden">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
        user={user}
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
        <main className="z-1 pb-20 flex-1 mx-auto w-full md:pl-72">
          <button
            className="z-50 md:hidden ml-auto px-3 py-2 rounded-md  focus:outline-none"
            onClick={() => setShowDrawer(!showDrawer)}
          >
            <Cog6ToothIcon className="h-6 w-6" />
          </button>
          {/* Mobile Drawer */}
          <button
            className="z-50 md:hidden px-3 py-2 rounded-md  focus:outline-none flex-none ml-auto"
            onClick={onOpen}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </main>
      </div>
    </div>
  )
}
