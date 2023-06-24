import React, { useState, useEffect } from 'react'

function Countdown() {
  const [remainingTime, setRemainingTime] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const endOfDay = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
      )
      const timeDiff = endOfDay.getTime() - now.getTime()

      if (timeDiff > 0) {
        const hours = Math.floor(timeDiff / (1000 * 60 * 60))
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

        setRemainingTime(`${hours}h ${minutes}m ${seconds}s`)
      } else {
        setRemainingTime('Day has ended')
        clearInterval(interval)
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div>{remainingTime}</div>
}

export default Countdown
