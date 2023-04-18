import { useState } from "react"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"

const Questions = ({
  question,
  choices,
  setQuestionNumber,
  questionNumber,
  isOpen,
  onClose,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        bg="#1f1f1f"
        color="#ffffff"
        fontFamily="Manrope, sans-serif"
      >
        <ModalHeader fontWeight="600">{question}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {choices.map((choice) => {
            return (
              <Button
                margin="0.25rem"
                className="choice"
                colorScheme="blackAlpha"
              >
                {choice.value}
              </Button>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              setQuestionNumber(questionNumber + 1)
            }}
            colorScheme="orange"
            rounded="10px"
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default Questions
