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
  useToast,
} from "@chakra-ui/react"
import apiGateway from "../../services/apiGateway"

const Questions = ({
  id,
  question,
  choices,
  setQuestionNumber,
  questionNumber,
  isOpen,
  onClose,
}) => {
  const toast = useToast()
  const [userAnswer, setUserAnswer] = useState("")

  const handleSubmit = () => {
    console.log(userAnswer)

    if (userAnswer.length > 0) {
      const userKey = sessionStorage.getItem("userKey")
      apiGateway
        .post(`quizit/v1/answer-submit/launchpad/${userKey}/`, {
          questionId: id,
          question: question,
          answer: userAnswer,
        })
        .then((response) => {
          toast({
            title: "Answer Submitted",
            variant: "toast",
            position: "top-right",
            duration: 1000,
            isClosable: true,
          })
          setQuestionNumber(questionNumber + 1)
        })
        .catch((error) => {
          toast({
            title: "Something went wrong!",
            variant: "toast",
            position: "top-right",
            duration: 1000,
            isClosable: true,
          })
        })
    } else {
      toast({
        title: "Select a Option",
        variant: "toast",
        position: "top-right",
        duration: 1000,
        isClosable: true,
      })
    }
  }
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
                colorScheme={
                  userAnswer === choice.value ? "orange" : "blackAlpha"
                }
                onClick={() => {
                  setUserAnswer(choice.value)
                }}
              >
                {choice.value}
              </Button>
            )
          })}
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => {
              handleSubmit()
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
