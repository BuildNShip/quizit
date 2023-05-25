import { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import remarkGfm from "remark-gfm";

import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Box,
    Text,
    useToast,
    FormControl,
    Radio
} from "@chakra-ui/react";
import apiGateway from "../../services/apiGateway";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const Questions = ({
    eventName,
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
                .post(`quizit/v1/answer-submit/${eventName}/${userKey}/`, {
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
        <Box bg="rgba(0, 0, 0, 0.6)" zIndex={100}>
            <Box
                bg="#1f1f1f"
                color="#ffffff"
                borderRadius="md"
                p="1rem"
                minWidth="300px"
                maxWidth="500px"
                textAlign="center"
            >
                <Box
                    color="#d463fe"
                    textAlign="left"
                    ml="1rem"
                    fontWeight="600"
                    mb="1rem"
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {question}
                    </ReactMarkdown>
                </Box>
                <Box fontWeight="600" mb="1rem">
                    {choices.map(choice => (
                        <FormControl
                            display="flex"
                            key={choice.id}
                            textAlign="left"
                            marginBottom="0.5rem"
                        >
                            <Radio
                                textAlign="left"
                                value={choice.value}
                                isChecked={userAnswer === choice.value}
                                onChange={() => setUserAnswer(choice.value)}
                                colorScheme="orange"
                            >
                                {choice.value}
                            </Radio>
                        </FormControl>
                    ))}
                </Box>
                <Button
                    mt="1rem"
                    onClick={() => {
                        handleSubmit();
                    }}
                    colorScheme="orange"
                    rounded="10px"
                    disabled={!userAnswer || loading}
                >
                    <span style={{ marginRight: "5px" }}>Submit</span>
                </Button>
            </Box>
        </Box>
    );
};

export default Questions;
