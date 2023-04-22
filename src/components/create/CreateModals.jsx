import React, { useState } from "react";
import styles from "./CreateModals.module.css";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button
} from "@chakra-ui/react";

const CreateModals = ({ isOpen, onClose }) => {
    const [clickAction, setClickAction] = useState(0);
    const [formValues, setFormValues] = useState({
        name: "",
        title: "",
        description: "",
        reportPassword: "",
        showScore: true,
        showAnswerLog: false,
        showCorrectAnswer: true,
        questionsPerUser: 20,
        totalTime: 60,
        questionFile: null,
        testLogo: null
    });

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        // Do something with the form values
        console.log(formValues);
        // Close the modal
        onClose();
    };

    return (
        <>
            {clickAction === 0 && (
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalContent
                        bg="#1f1f1f"
                        color="#ffffff"
                        fontFamily="Manrope, sans-serif"
                        closeOnOverlayClick={false}
                    >
                        <ModalHeader>Add a new item</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Test Name</FormLabel>
                                <Input
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Test Title</FormLabel>
                                <Input
                                    name="title"
                                    value={formValues.title}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Test Description</FormLabel>
                                <Textarea
                                    name="description"
                                    value={formValues.description}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="orange"
                                onClick={e => {
                                    setClickAction(1);
                                    handleSubmit(e);
                                }}
                            >
                                Submit
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
            {clickAction === 1 && (
                <Modal isCentered isOpen={isOpen} onClose={onClose}>
                    <ModalContent
                        bg="#1f1f1f"
                        color="#ffffff"
                        fontFamily="Manrope, sans-serif"
                        closeOnOverlayClick={false}
                    >
                        <ModalHeader>Test Settings</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Report Password</FormLabel>
                                <Input
                                    name="reportPassword"
                                    value={formValues.reportPassword}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Show Score</FormLabel>
                                <Input
                                    name="showScore"
                                    value={formValues.showScore}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Show Answer Log</FormLabel>
                                <Input
                                    name="showAnswerLog"
                                    value={formValues.showAnswerLog}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Show Correct Answer</FormLabel>
                                <Input
                                    name="showCorrectAnswer"
                                    value={formValues.showCorrectAnswer}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                        </ModalBody>
                        <ModalFooter>
                            <Button variant="ghost" mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme="orange" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

export default CreateModals;
