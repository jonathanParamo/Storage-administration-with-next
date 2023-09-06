'use client'

import { useState, useMemo } from 'react'
import {
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter,
  Button, useDisclosure, Input
} from '@nextui-org/react'
import { useSnackbar } from 'notistack'

const Singup = () => {
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [resData, setResData] = useState([])
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { enqueueSnackbar } = useSnackbar()

  const validateEmail = (value) => value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i)

  const validationState = useMemo(() => {
    if (email === '') return undefined

    setLoading(false)
    return validateEmail(email) ? 'valid' : 'invalid'
  }, [email])

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    if (!email || !password || !name || !surname) {
      enqueueSnackbar('All camps is required', { variant: 'error' })
      setLoading(false)
      return
    }
    if (validationState === 'invalid') return

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, surname, email, password })
      })

      const data = await response.json()
      enqueueSnackbar('You have successfully registered.', { variant: 'success' })
      setResData(data)
      localStorage.setItem('token', resData.token)
      setLoading(false)
      clean()
    } catch (error) {
      enqueueSnackbar('Email or password invalid', { variant: 'error' })
      setLoading(false)
    }
  }

  const clean = () => {
    setName('')
    setSurname('')
    setEmail('')
    setPassword('')
  }

  return (
    <>
      <Button
        onPress={onOpen}
        color='success'
        className='w-36 h-12 text-lg rounded-full bg-black2 text-white text-center font-semibold
        hover:bg-black1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
      >
        Sing up
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClick={() => clean}
        className='flex items-center justify-center'
      >
        <ModalContent className='flex items-center justify-center w-3/4 md:w-3/5 mb-28'>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1 text-center text-3xl mt-3 mb-3'>Sing up</ModalHeader>
              <ModalBody className='w-full'>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  size='md'
                  color='secondary'
                  type='text'
                  label='Name'
                  radius='full'
                  className='w-full'
                />
                <Input
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  size='md'
                  color='secondary'
                  type='text'
                  label='surname'
                  radius='full'
                  className='w-full'
                />
                <Input
                  value={email}
                  validationState={validationState}
                  errorMessage={validationState === 'invalid' && 'Please enter a valid email'}
                  onChange={(e) => setEmail(e.target.value)}
                  size='md'
                  color='secondary'
                  type='email'
                  label='Email'
                  radius='full'
                  className='w-full'
                />
                <Input
                  value={password}
                  validationState={validationState}
                  errorMessage={validationState === 'invalid' && 'Please enter a valid email'}
                  onChange={(e) => setPassword(e.target.value)}
                  size='md'
                  color='secondary'
                  type='password'
                  label='Password'
                  radius='full'
                  className='w-full'
                />
              </ModalBody>
              <ModalFooter className='flex w-full flex-col lg:flex-row items-center justify-center mt-2 lg: p-4'>
                {loading && (
                  <Button
                    isLoading
                    color='primary'
                    radius='full'
                    variant='ghost'
                    className='p-1 m-2 w-4/5'
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
                          d='M4 12a8 8 0 018 8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042
                            1.135 5.824 3 7.938l3-2.647z'
                          fill='currentColor'
                        />
                      </svg>
                    }
                  >
                    Loading
                  </Button>
                )}
                {!loading && (
                  <Button
                    onClick={(e) => handleFormSubmit(e)}
                    color='primary'
                    radius='full'
                    variant='ghost'
                    className='m-2 w-4/5'
                  >
                    Sing up
                  </Button>
                )}
                <Button
                  color='warning'
                  variant='ghost'
                  radius='full'
                  onPress={onClose}
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

export default Singup
