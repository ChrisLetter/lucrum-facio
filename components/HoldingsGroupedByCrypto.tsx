import {
  Flex,
  Text,
  Box,
  Icon,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { v4 } from 'uuid';
import { BsCurrencyBitcoin } from 'react-icons/bs';
import { AiFillBank } from 'react-icons/ai';
import { FaArrowUp } from 'react-icons/fa';
import {
  IHoldingsProp,
  IHolding,
  IAddCryptoFormErrors,
  IAddCryptoFormInput,
  ILoginFormValues,
} from '../interfaces/interfaces';
import { Formik } from 'formik';
import { useMutation } from '@apollo/client';
import {
  DELETE_POSITION,
  UPDATE_POSITION,
} from '../graphql/apollo-client/mutations';
import { useDispatch } from 'react-redux';

function HoldingsGroupedByCrypto({ holdings }: IHoldingsProp) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  function openModal(holding: IHolding) {
    setCurrentSelection(holding);
    onOpen();
  }
  const [currentSelection, setCurrentSelection] = useState<IHolding>({
    quantity: 0,
    name: '',
    cryptoId: '',
    id: 0,
    location: '',
    apy: 0,
  });
  const finalRef = React.useRef(null);

  const [updatePositionMutation, { data, loading, error }] = useMutation(
    UPDATE_POSITION,
    {
      onCompleted({ editPosition }) {
        if ('holdings' in editPosition) {
          dispatch({
            type: 'UPDATE_HOLDINGS',
            payload: { holdings: editPosition.holdings },
          });
        }
      },
      onError(err: any) {
        console.log(err);
      },
    },
  );

  async function submit(values: IAddCryptoFormInput) {
    await updatePositionMutation({
      variables: {
        editPositionInput: {
          id: currentSelection.id,
          stakingProvider: values.stakingProvider,
          quantity: values.quantity,
          apy: values.apy,
        },
      },
    });
  }

  const [deletePositionMutation] = useMutation(DELETE_POSITION, {
    onCompleted({ deletePosition }) {
      if ('holdings' in deletePosition) {
        dispatch({
          type: 'UPDATE_HOLDINGS',
          payload: { holdings: deletePosition.holdings },
        });
      }
    },
    onError(err: any) {
      console.log(err);
    },
  });

  async function deletePosition() {
    await deletePositionMutation({
      variables: {
        positionId: currentSelection.id,
      },
    });
  }

  return (
    <>
      <Flex ref={finalRef} tabIndex={-1} direction="column">
        {holdings.map((holding) => (
          <Box
            key={v4()}
            boxShadow="md"
            rounded="md"
            width="40vw"
            align="center"
            p={3}
            m={1}
            backgroundColor="blue.400"
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              openModal(holding);
            }}
          >
            <Flex color="white" justifyContent="space-between" direction="row">
              <Flex ml={3} direction="row" alignItems="center">
                <Icon as={BsCurrencyBitcoin} />
                <Text pl={1}>{holding.quantity + ' ' + holding.cryptoId}</Text>
              </Flex>
              <Flex ml={3} direction="row" alignItems="center">
                <Icon as={AiFillBank} />
                <Text pl={1}>{holding.location}</Text>
              </Flex>
              <Flex ml={3} direction="row" alignItems="center">
                <Icon as={FaArrowUp} />
                <Text pl={1}>{holding.apy} %</Text>
              </Flex>
            </Flex>
          </Box>
        ))}
      </Flex>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader alignSelf="center">
            Edit your {currentSelection.cryptoId} position
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                stakingProvider: currentSelection.location,
                quantity: currentSelection.quantity,
                apy: currentSelection.apy,
              }}
              validate={(values) => {
                const errors: IAddCryptoFormErrors = {};
                if (!values.stakingProvider) {
                  errors.stakingProvider = 'Enter a staking provider';
                }
                if (!values.quantity) {
                  errors.quantity = 'Enter a quantity';
                }
                if (!values.apy) {
                  errors.apy = 'Enter an apy';
                }
                return errors;
              }}
              onSubmit={(values: any, { setSubmitting }) => {
                submit(values);
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Flex direction="column" align="center">
                    <Text alignSelf="flex-start" fontSize="xs" pl={2}>
                      Staking Provider
                    </Text>
                    <Input
                      backgroundColor="white"
                      mb="1vh"
                      color="black"
                      name="stakingProvider"
                      placeholder="Staking Provider"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.stakingProvider}
                      boxShadow="md"
                    />
                    {errors.stakingProvider &&
                      touched.stakingProvider &&
                      errors.stakingProvider}
                    <Text alignSelf="flex-start" pl={2} fontSize="xs">
                      Quantity
                    </Text>
                    <Input
                      backgroundColor="white"
                      mb="1vh"
                      color="black"
                      name="quantity"
                      placeholder="Quantity"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.quantity}
                      boxShadow="md"
                    />
                    {errors.quantity && touched.quantity && errors.quantity}
                    <Text alignSelf="flex-start" pl={2} fontSize="xs">
                      APY
                    </Text>
                    <Input
                      backgroundColor="white"
                      mb="1vh"
                      color="black"
                      placeholder="APY"
                      name="apy"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.apy}
                      border="2px solid #000"
                      boxShadow="md"
                    />
                    <Text mb="2vh">
                      {errors.apy && touched.apy && errors.apy}
                    </Text>
                    <Flex alignSelf="end" my={2}>
                      <Button
                        id="close-modal"
                        onClick={onClose}
                        border="1px solid gray"
                        colorScheme="gray"
                      >
                        Close
                      </Button>
                      <Button colorScheme="red" onClick={deletePosition} mx={1}>
                        Delete
                      </Button>
                      <Button colorScheme="blue" type="submit">
                        Edit
                      </Button>
                    </Flex>
                  </Flex>
                </form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default HoldingsGroupedByCrypto;
