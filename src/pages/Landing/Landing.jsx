import React, { useEffect, useState } from "react";
import styles from "./Landing.module.css";
import Footer from "../../components/footer/Footer";
import { useParams } from "react-router-dom";

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
    useToast,
    Stack,
    Checkbox,
    useDisclosure
} from "@chakra-ui/react";

const Landing = () => {
    const [clickAction, setClickAction] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [quizName, setQuizName] = useState("");

    const { eventName } = useParams();

    const [options, setOptions] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false
    });

    useEffect(() => {
        setClickAction(0);
        setQuizName(eventName);
    }, []);

    return (
        <div className={styles.background_container}>
            {clickAction === 0 && (
                <div className={styles.first_view_container}>
                    <div className={styles.first_view}>
                        <div className={styles.first_view_texts}>
                            <p className={styles.fv_heading}>
                                Introducing <span>QuizIt</span>, the new way to
                                learn and test your knowledge.
                            </p>

                            <p className={styles.fv_tagline}>
                                QuizIt is a platform that allows you to create
                                quizzes and test your knowledge. You can also
                                participate in quizzes created by others.
                            </p>

                            <div className={styles.fv_buttons}>
                                <button
                                    onClick={() => {
                                        setClickAction(2);
                                        onOpen();
                                    }}
                                    className={styles.start_button}
                                >
                                    Create Quiz
                                </button>
                                <button
                                    onClick={() => {
                                        setClickAction(1);
                                        onOpen();
                                    }}
                                    className={styles.fv_button}
                                >
                                    Participate
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {clickAction === 1 && (
                <Modal
                    isOpen={isOpen}
                    onClose={onClose}
                    isCentered
                    closeOnOverlayClick={false}
                >
                    <ModalBody>
                        <ModalContent
                            bg="#1f1f1f"
                            color="#ffffff"
                            fontFamily="Manrope, sans-serif"
                        >
                            <ModalHeader closeButton={false} fontWeight="600">
                                So, What is the Quiz Name?
                            </ModalHeader>
                            <FormControl marginX="1.75rem" marginY="1rem">
                                <FormLabel>Quiz Name</FormLabel>
                                <Input
                                    onChange={e => setQuizName(e.target.value)}
                                    width="85%"
                                />
                            </FormControl>

                            <ModalFooter>
                                <Button
                                    onClick={() => {
                                        if (quizName.length < 2) {
                                            toast({
                                                title: "Quiz Name is required. Please enter a valid quiz name.",
                                                variant: "toast",
                                                position: "bottom",
                                                duration: 1000,
                                                isClosable: true
                                            });
                                        } else {
                                            window.location.href = `/${quizName}`;
                                        }
                                    }}
                                    colorScheme="orange"
                                    rounded="10px"
                                >
                                    <span style={{ marginRight: "5px" }}>
                                        Submit
                                    </span>
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </ModalBody>
                </Modal>
            )}
            {clickAction === 2 && <p>Quiz Maker</p>}

            <Footer />
        </div>
    );
};

export default Landing;
