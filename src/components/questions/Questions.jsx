import { useState } from "react";
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
    useToast
} from "@chakra-ui/react";
import apiGateway from "../../services/apiGateway";

const Questions = ({
    id,
    question,
    choices,
    setQuestionNumber,
    questionNumber,
    isOpen,
    onClose,
    setCount,
    count
}) => {
    const toast = useToast();
    const [userAnswer, setUserAnswer] = useState("");
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(null);
    const [timeTaken, setTimeTaken] = useState(null);

    const handleSubmit = () => {
        console.log(userAnswer);

        if (userAnswer.length > 0) {
            const userKey = sessionStorage.getItem("userKey");
            const diffInMs = new Date().getTime() - startTime.getTime();
            const diffInSec = Math.round(diffInMs / 1000);
            setTimeTaken(diffInSec);

            apiGateway
                .post(`quizit/v1/answer-submit/launchpad/${userKey}/`, {
                    questionId: id,
                    question: question,
                    answer: userAnswer,
                    timeTaken: diffInSec
                })
                .then(response => {
                    toast({
                        title: "Answer Submitted",
                        variant: "toast",
                        position: "bottom",
                        duration: 1000,
                        isClosable: true
                    });
                    setQuestionNumber(questionNumber + 1);
                    setCount(count + 1);
                })
                .catch(error => {
                    toast({
                        title: error.response.data.message.general[0],
                        variant: "toast",
                        position: "bottom",
                        duration: 1000,
                        isClosable: true
                    });
                    setQuestionNumber(questionNumber + 1);
                    setCount(count + 1);
                });
        } else {
            toast({
                title: "Select a Option",
                variant: "toast",
                position: "bottom",
                duration: 1000,
                isClosable: true
            });
        }
    };
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            isCentered
            closeOnOverlayClick={false}
        >
            <ModalContent
                margin="1rem"
                bg="#1f1f1f"
                color="#ffffff"
                fontFamily="Manrope, sans-serif"
            >
                <ModalHeader closeButton={false} fontWeight="600">
                    {question}
                </ModalHeader>

                <ModalBody>
                    {choices.map(choice => {
                        return (
                            <Button
                                margin="0.25rem"
                                className="choice"
                                colorScheme={
                                    userAnswer === choice.value
                                        ? "orange"
                                        : "blackAlpha"
                                }
                                onClick={() => {
                                    setUserAnswer(choice.value);
                                }}
                            >
                                {choice.value}
                            </Button>
                        );
                    })}
                </ModalBody>
                <ModalFooter>
                    <Button
                        onClick={() => {
                            handleSubmit();
                        }}
                        colorScheme="orange"
                        rounded="10px"
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Questions;
