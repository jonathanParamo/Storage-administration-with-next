'use client'

import { useState, useMemo } from 'react'
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Input
} from '@nextui-org/react'
import { useSnackbar } from 'notistack'

const SingIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [resData, setResData] = useState([])
  const [loading, setLoading] = useState(false)
  const { enqueueSnackbar } = useSnackbar()
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const validationState = useMemo(() => {
    if (email === '') return undefined

    setLoading(false)
    return validateEmail(email) ? 'valid' : 'invalid'
  }, [email])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password) {
      enqueueSnackbar('Email and password is required', { variant: 'error' })
      setLoading(false)
      return
    }
    if (validationState === 'invalid') return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      enqueueSnackbar('Your wellcome', { variant: 'success' })
      setLoading(false)
      setResData(data)
      localStorage.setItem('token', resData.token)
      clean()
    } catch (error) {
      enqueueSnackbar('Email or password invalid', { variant: 'error' })
      setLoading(false)
    }
  }

  const clean = () => {
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color='success'
        className='w-36 h-12 text-lg rounded-full bg-blue-500 text-white text-center font-semibold
        hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
      >
        Sing in
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='flex items-center justify-center'
      >
        <ModalContent className='flex items-center justify-center w-3/4 md:w-3/5 mb-28'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-center text-3xl mt-3 mb-3'>Sing in</ModalHeader>
              <ModalBody className='w-full'>
                <div className='w-full flex flex-col gap-4'>
                  <div className='flex w-full flex-col md:flex-nowrap gap-4 pl-2 pr-2'>
                    <Input
                      value={email}
                      validationState={validationState}
                      errorMessage={validationState === 'invalid' && 'Please enter a valid email'}
                      onChange={(e) => setEmail(e.target.value)}
                      size='lg'
                      color='secondary'
                      type='email'
                      label='Email'
                      radius='full'
                      className='w-full'
                    />
                    <Input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      size='lg'
                      color='secondary'
                      type='password'
                      label='Password'
                      radius='full'
                    />
                  </div>
                  {/* ))} */}
                </div>
              </ModalBody>
              <ModalFooter className='flex w-full flex-col lg:flex-row items-center justify-center mt-2 lg: p-4'>
                {loading &&
                  <Button
                    isLoading
                    color='primary'
                    radius='full'
                    variant='ghost'
                    className='m-2 w-4/5'
                    spinner={
                      <svg
                        className='animate-spin h-5 w-5 text-current'
                        fill='none'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          fill='currentColor'
                        />
                      </svg>
                    }
                  >
                    Loading
                  </Button>}
                {!loading &&
                  <Button
                    onClick={(e) => handleFormSubmit(e)}
                    color='primary' radius='full' variant='ghost' className='m-2 w-4/5'
                  >
                    Sing in
                  </Button>}
                <Button
                  onPress={onClose}
                  color='warning' radius='full' variant='ghost'
                  className='m-2 w-4/5'
                >
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default SingIn
