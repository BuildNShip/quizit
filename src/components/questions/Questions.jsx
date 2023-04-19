import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

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
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        console.log(userAnswer);
        
        if (userAnswer.length > 0) {
            setLoading(true);
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
                        status: "error",
                        position: "bottom",
                        duration: 1000,
                        isClosable: true
                    });
                    setQuestionNumber(questionNumber + 1);
                    setCount(count + 1);
                });

                setLoading(false);
        } else {
            toast({
                title: "Select a Option",
                status: "error",
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
                        <span style={{marginRight:"5px"}}>Submit</span>
                        <ClipLoader
                            marginLeft="10px"
                            color="#ffffff"
                            loading={loading}
                            size={20}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default Questions;
