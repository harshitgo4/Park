import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Input, useToast } from '@chakra-ui/react'
import Header2 from '../components/Header2'
import SideBar from '../components/sidebar/Main'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'

function SubPage() {
  const { id } = useParams()
  const toast = useToast()

  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  const [since, setSince] = useState(null)
  const [subDetails, setSubDetails] = useState(null)

  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])

  useEffect(() => {
    const fetchSub = async () => {
      const res = await fetch(
        `https://bdsm-backend.onrender.com/api/subDetails`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        },
      )

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.subDetails) {
        console.log(resData.subDetails)
        setSubDetails(resData.subDetails)

        const updatedAt = new Date(resData.since)
        const currentDate = new Date()

        const yearDiff = currentDate.getFullYear() - updatedAt.getFullYear()
        const monthDiff = currentDate.getMonth() - updatedAt.getMonth()
        const dayDiff = currentDate.getDate() - updatedAt.getDate()

        const formattedDuration = `${yearDiff}y ${monthDiff}m ${dayDiff}d`
        setSince(formattedDuration)
      }
    }
    fetchSub()
  }, [])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const [user, setUser] = useState(null)

  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  return (
    <div className="h-[100vh] overflow-y-auto overflow-x-hidden">
      <Header2
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        setUser={setUser}
        current={0}
        user={user}
        showDrawer={showDrawer}
        setShowDrawer={setShowDrawer}
        subscriptionDetails={subscriptionDetails}
        setSubscriptionDetails={setSubscriptionDetails}
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
        <main className="z-1 mx-auto w-full md:pl-64 p-4 overflow-y-auto">
          {' '}
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">Subs Details</h1>
              <Box className="space-y-4" p={4}>
                <div className="flex items-center">
                  <img
                    src={subDetails?.avatar}
                    className="rounded-lg mb-4 w-[12rem]"
                  />
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block text-white">
                    Sub Id:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {subDetails?._id}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block text-white">
                    Sub Name:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {subDetails?.fName + ' ' + subDetails?.lName}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-28 p-2 inline-block text-white">
                    Since:
                  </span>
                  <span className="font-semibold  p-2 rounded-lg bg-blue-500 ">
                    {since}
                  </span>
                </div>
              </Box>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default SubPage
