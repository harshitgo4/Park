import React from 'react'
import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
export default function useNamespaces() {
  const [namespaces, setNamespaces] = useState([])
  const [namespaceSource, setNamespaceSource] = useState([])
  const [selectedNamespace, setSelectedNamespace] = useState('')
  const [namspaceData, setNamespaceData] = useState()
  React.useEffect(() => {
    fetchNamespaces()
  }, [])

  const fetchNamespaces = async () => {
    try {
      const authToken = await Cookies.get('token')
      const response = await fetch(
        'https://chatbot-backend-ihn7.onrender.com/api/getNamespaces',
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      )
      const data = await response.json()

      if (response.ok) {
        console.log(data)
        setNamespaces(data.userNamespaces)
        setNamespaceSource(data.namespaceSources)
        setNamespaceData(data.namespaceData)
      } else {
        console.error(data.error)
      }
    } catch (error) {
      console.error(error.message)
    }
  }

  return {
    namespaces,
    setNamespaces,
    selectedNamespace,
    setSelectedNamespace,
    namespaceSource,
    namspaceData,
  }
}
