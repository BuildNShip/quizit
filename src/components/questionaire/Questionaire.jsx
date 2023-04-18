import React from "react"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react"

const Questionaire = ({
  isOpen,
  onClose,
  title,
  message,
  setInitialQuestions,
  initalQuestions,
  type,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#1f1f1f"
        color="#ffffff"
        fontFamily="Manrope, sans-serif"
      >
        <ModalHeader fontWeight="600">{title}</ModalHeader>
        <ModalBody>
          {type === "input" ? (
            <FormControl>
              <FormLabel>{message}</FormLabel>
              <Input />
              <ModalFooter margin="0">
                <Button
                  onClick={() => {
                    onClose()
                    setInitialQuestions(-1)
                  }}
                  rounded="10px"
                  colorScheme="black"
                >
                  No
                </Button>
                <Button
                  onClick={() => {
                    setInitialQuestions(initalQuestions + 1)
                  }}
                  colorScheme="orange"
                  rounded="10px"
                >
                  Yes
                </Button>
              </ModalFooter>
            </FormControl>
          ) : (
            message
          )}
        </ModalBody>
        {type === "yn" && (
          <ModalFooter>
            <Button
              onClick={() => {
                onClose()
                setInitialQuestions(-1)
              }}
              rounded="10px"
              colorScheme="black"
            >
              No
            </Button>
            <Button
              onClick={() => {
                setInitialQuestions(initalQuestions + 1)
              }}
              colorScheme="orange"
              rounded="10px"
            >
              Yes
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Questionaire
