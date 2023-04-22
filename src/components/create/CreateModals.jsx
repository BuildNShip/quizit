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
    Button,
    Flex,
    Box
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

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
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

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
                    <ModalOverlay />
                    <ModalContent
                        bg="#1f1f1f"
                        color="#ffffff"
                        fontFamily="Manrope, sans-serif"
                        closeOnOverlayClick={false}
                    >
                        <ModalHeader>What is the Name of the Test?</ModalHeader>
                        <ModalBody>
                            <FormControl mb={4}>
                                <FormLabel>Enter the Test Name*</FormLabel>
                                <Input
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Upload a File</FormLabel>
                                <Flex alignItems="center">
                                    <Box
                                        borderWidth={1}
                                        borderColor="gray.300"
                                        borderRadius="md"
                                        p={2}
                                        w="full"
                                    >
                                        <Text
                                            fontSize="sm"
                                            color="gray.500"
                                            fontWeight="medium"
                                            textAlign="center"
                                        >
                                            {fileName || "No file selected"}
                                        </Text>
                                    </Box>
                                    <Button
                                        ml={4}
                                        size="sm"
                                        colorScheme="orange"
                                    >
                                        {file ? "Replace File" : "Choose File"}
                                        <Input
                                            type="file"
                                            opacity={0}
                                            position="absolute"
                                            zIndex={-1}
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </Flex>
                            </FormControl>

                            <Link href="/path/to/sample/file" download>
                                Download Sample File
                            </Link>
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
           
        </>
    );
};

export default CreateModals;
