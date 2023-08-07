import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Cookies from 'js-cookie'
import { ColumnChart } from '../partials/ColumnChart'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'

export default function Rewards() {
  const router = useNavigate()

  const [showDrawer, setShowDrawer] = useState(false)
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    if (user && user.type === 'dom') {
      router('/404')
    }
  }, [])
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)
  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])

  // getRewardsStats
  useEffect(() => {
    const url = 'http://localhost:5000/api/getRewardsStats'
    const fetchTasks = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.monthlyRewards) {
        console.log(resData.monthlyRewards)
        setData(resData.monthlyRewards)
        setUser(resData.user)
      }
    }
    fetchTasks()
  }, [])
  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)

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
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-4 flex flex-row rounded-lg p-8`}>
            <div className="w-full m-auto">
              {' '}
              <h1 className="font-semibold mb-8">
                Your current Reward Point is : {user?.rewards}
              </h1>
              {data && data.length > 1 ? (
                <ColumnChart data={data} />
              ) : (
                "You haven't earned any reward points yet! Complete tasks to earn reward points!"
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
