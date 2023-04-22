import React, { useState } from "react";
import styles from "./CreateModals.module.css";
import { Box, Flex } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, Button } from "@chakra-ui/react";

const CreateModals = ({ isOpen, onClose }) => {
    const [clickAction, setClickAction] = useState(0);
    const [formValues, setFormValues] = useState({
        name: "",
        title: "",
        description: "",
        reportPassword: null,
        showScore: true,
        showAnswerLog: false,
        showCorrectAnswer: false,
        questionsPerUser: null,
        totalTime: null,
        questionFile: null,
        testLogo: null
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No File Found");

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
                <>
                    <div className={styles.modal_container}>
                        <Box
                            className={styles.box_container}
                        >
                            <Box as="h2" fontWeight="bold" fontSize="lg" mb={4}>
                                Basic Information
                            </Box>
                            <FormControl mb={4}>
                                <FormLabel>Enter the Test Name*</FormLabel>
                                <Input
                                    name="name"
                                    value={formValues.name}
                                    onChange={handleInputChange}
                                />
                            </FormControl>
                            <FormControl mb={4}>
                                <FormLabel>Upload Questions File*</FormLabel>
                                <Flex alignItems="center">
                                    <Box
                                        borderWidth={1}
                                        borderColor="gray.300"
                                        borderRadius="md"
                                        p={2}
                                        w="full"
                                        fontSize="sm"
                                        color="gray.500"
                                        fontWeight="medium"
                                        textAlign="center"
                                    >
                                        {fileName}
                                    </Box>
                                    <Button
                                        ml={4}
                                        size="sm"
                                        colorScheme="blackAlpha"
                                        padding={6}
                                    >
                                        {file ? "Replace File" : "Choose File"}
                                        <Input
                                            type="file"
                                            opacity={0}
                                            position="absolute"
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                </Flex>
                            </FormControl>
                            <Link
                                color="orange"
                                href="/path/to/sample/file"
                                download
                            >
                                Download Sample File
                            </Link>
                            <Flex mt={4} justify="flex-end">
                                <Button
                                    variant="ghost"
                                    mr={3}
                                    onClick={onClose}
                                >
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
                            </Flex>
                        </Box>

                        <div className={styles.bottom_section}>
                            <p>Customize Landing Page?</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CreateModals;
