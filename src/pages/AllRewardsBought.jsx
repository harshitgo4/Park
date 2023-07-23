import React from 'react'
import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Header2 from '../components/Header2'
import { Box, Button, useColorModeValue, useColorMode } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import SideBar from '../components/sidebar/Main'
import Table from '../partials/DataGrid'
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline'
import Cookies from 'js-cookie'
export default function AllRewardsBought() {
  const router = useNavigate()
  const [showDrawer, setShowDrawer] = useState(false)
  const [user, setUser] = useState(null)
  const [data, setData] = useState([
    {
      rewardId: null,
      date: null,
      rewardName: null,
      description: null,
      rewardPoints: null,
      subName: null,
      domName: null,
      status: null,
    },
  ])
  const [subscriptionDetails, setSubscriptionDetails] = useState(false)

  useEffect(() => {
    if (subscriptionDetails) {
      localStorage.setItem(
        'subscriptionDetails',
        JSON.stringify(subscriptionDetails),
      )
    }
  }, [subscriptionDetails])

  useEffect(() => {
    const url =
      user?.type == 'sub'
        ? 'http://localhost:5000/api/getSubBoughtRewards'
        : 'http://localhost:5000/api/getBoughtRewards'
    const fetchRewardsBought = async () => {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      })

      const resData = await res.json()

      if (resData.error) {
        console.log('Error fetching user')
      } else if (resData.rewardBought) {
        console.log(resData.rewardBought)
        const temp = resData.rewardBought.filter((d) => {
          d.updatedAt = d.updatedAt.split('T')[0]
          return true
        })
        setData(temp)
      }
    }
    fetchRewardsBought()
  }, [user])

  const { colorMode, toggleColorMode } = useColorMode()

  const [email, setEmail] = useState(null)
  const textColor = useColorModeValue('gray.200', 'white')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bg = useColorModeValue('bg-gray-100', 'bg-[#1E293B]')

  const columns = useMemo(
    () => [
      { Header: 'Date', accessor: 'updatedAt' },
      { Header: 'Reward Name', accessor: 'rewardName' },
      { Header: 'Reward Description', accessor: 'description' },
      { Header: 'Reward Points', accessor: 'rewardPoints' },
      { Header: 'Redeemed By', accessor: 'subName' },
      { Header: 'Created By', accessor: 'domName' },
      { Header: 'Status', accessor: 'status' },
    ],
    [],
  )

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
        <main className="z-1 mx-auto w-full md:pl-80 p-4 overflow-y-auto">
          <Button onClick={() => router(-1)} className="m-2">
            <ArrowUturnLeftIcon className="w-5" />{' '}
          </Button>
          <div className={`${bg} m-2 flex flex-row rounded-lg p-8`}>
            <div className="w-full">
              {' '}
              <h1 className="font-semibold mb-8">All Rewards Redeemed</h1>
              <Table columns={columns} data={data} />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
