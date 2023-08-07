import { useState, useMemo } from 'react'
import { Box, Input, Select, Button, SimpleGrid } from '@chakra-ui/react'
import ReactImageVideoLightbox from 'react-image-video-lightbox'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import { Modal, ModalOverlay, ModalContent, ModalBody } from '@chakra-ui/react'

const Card = ({
  taskId,
  id,
  subName,
  domName,
  proofText,
  taskName,
  submissionDate,
  submissionTime,
  image,
  status,
  user,
}) => {
  const router = useNavigate()
  const toast = useToast()
  const [lightBox, setLightBox] = useState(false)

  const imageData = image.map((d, i) => {
    return {
      url: d,
      type: 'photo',
      altTag: 'some other image',
    }
  })

  const handleSubmit = async (e, id, status) => {
    e.preventDefault()
    const token = Cookies.get('token')
    console.log(id, status)

    fetch('http://localhost:5000/api/updateSubmittedTask', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        taskId,
        id,
        status,
      }),
    })
      .then((response) => response.json())
      .then((res2) => {
        console.log(res2.message)
        toast({
          title: 'Submitted!',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
        window.location.reload(true)
      })
      .catch((error) => {
        console.error(error)
        toast({
          title: 'Something went wrong!',
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      })
  }

  return (
    <>
      <Box
        className="m-auto text-left flex flex-col"
        borderWidth="1px"
        borderRadius="md"
        p={4}
        shadow="md"
      >
        <div className="h-[15rem] w-[12rem] m-auto justify-between">
          <img
            src={image[0]}
            alt=""
            className="rounded-lg mb-4 m-auto w-full"
            onClick={() => setLightBox(true)}
          />
        </div>
        <h3 className="text-xl font-semibold">
          {user.type == 'sub'
            ? `DOM Name : ${domName} `
            : `SUB Name : ${subName} `}
        </h3>
        <p>Task Details</p>
        <hr />
        <br />
        <p>Task Name: {taskName}</p>
        <p>Proof text: {proofText}</p>
        <p>Submission Date: {submissionDate}</p>
        <p>Submission Time: {submissionTime?.split('.')[0]}</p>
        <p>Status: {status}</p>
        <div className="flex flex-row gap-x-1">
          <Button
            size="xs"
            colorScheme="green"
            onClick={(e) => handleSubmit(e, id, 'Accepted')}
            className="mt-4"
            hidden={status != 'Pending' || user.type == 'sub'}
          >
            Accept
          </Button>{' '}
          <Button
            size="xs"
            colorScheme="red"
            onClick={(e) => handleSubmit(e, id, 'Denied')}
            className="mt-4"
            hidden={status != 'Pending' || user.type == 'sub'}
          >
            Deny
          </Button>{' '}
          <Button
            size="xs"
            onClick={() => router(`/task/${taskId}`)}
            className="mt-4"
          >
            View Task
          </Button>
        </div>
        <Modal isOpen={lightBox} onClose={() => setLightBox(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalBody>
              {/* Content for the lightbox, e.g., ReactImageVideoLightbox */}
              {lightBox ? (
                <ReactImageVideoLightbox
                  data={imageData}
                  startIndex={0}
                  showResourceCount={true}
                  onNavigationCallback={(currentIndex) =>
                    console.log(`Current index: ${currentIndex}`)
                  }
                  onCloseCallback={() => setLightBox(false)}
                />
              ) : null}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  )
}
export default function SubmittedTaskCards({ user, data }) {
  // Pagination logic here
  const pageSize = 8
  const pageCount = Math.ceil(data?.length / pageSize)
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * pageSize
  const endIndex = startIndex + pageSize
  const visibleData = data?.slice(startIndex, endIndex)

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex)
  }
  return (
    <>
      <Box>
        <SimpleGrid className="grid grid-cols-1 md:grid-cols-4" spacing={4}>
          {visibleData.map((item) => (
            <Card
              key={item.id}
              taskId={item.id}
              id={item._id}
              subName={item.subName}
              domName={item.domName}
              proofText={item.proofText}
              taskName={item.taskName}
              submissionDate={item.submissionDate}
              submissionTime={item.submissionTime}
              image={item.image}
              status={item.status}
              user={user}
            />
          ))}
        </SimpleGrid>
      </Box>

      <Box mt={4} className="space-x-2">
        <Button
          size="sm"
          disabled={currentPage === 0}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </Button>
        {Array.from({ length: pageCount }, (_, index) => (
          <Button
            key={index}
            size="sm"
            variant={index === currentPage ? 'solid' : 'outline'}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </Button>
        ))}
        <Button
          size="sm"
          disabled={currentPage === pageCount - 1}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Box>
    </>
  )
}
