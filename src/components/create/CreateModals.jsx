import React, { useState } from "react";
import styles from "./CreateModals.module.css";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import apiGateway from "../../services/apiGateway";

const CreateModals = ({ isOpen, onClose }) => {
    const [clickAction, setClickAction] = useState(0);
    const [formValues, setFormValues] = useState({
        testName: "",
        testTitle: "",
        testDescription: "",
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

    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState("No File Found");
    const toast = useToast();

    const handleFileChange = e => {
        const tempFile = e.target.files[0];
        setFile(tempFile);

        setFileName(e.target.files[0].name);
        setFormValues({ ...formValues, questionFile: tempFile });
    };

    const handleLogoChange = e => {
        if (e.target.files[0].size > 20000) {
            toast({
                title: "File size is too large. Please upload a logo less than 20Kb.",
                variant: "toast",
                position: "bottom",
                duration: 1000,
                isClosable: true
            });
            return;
        }

        const tempLogo = e.target.files[0];
        setLogo(tempLogo);
        setLogoName(e.target.files[0].name);
        setFormValues({ ...formValues, testLogo: tempLogo });
    };

    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = e => {
        const pattern = /^[a-z0-9\-]+$/;
        if (!pattern.test(formValues.testName)) {
            toast({
                title: "Quiz Name is required. Please enter a valid quiz name.",
                variant: "toast",
                position: "bottom",
                duration: 1000,
                isClosable: true
            });
        }
        if (!file) {
            toast({
                title: "Upload a File to Continue.",
                variant: "toast",
                position: "bottom",
                duration: 1000,
                isClosable: true
            });
        }

        if (pattern.test(formValues.testName) && file) {
            const testConfig = {
                testName: formValues.testName,
                testTitle: formValues.testTitle,
                testDescription: formValues.testDescription,
                reportPassword: formValues.reportPassword,
                showScore: formValues.showScore,
                showAnswerLog: formValues.showAnswerLog,
                showCorrectAnswers: formValues.showCorrectAnswer,
                questionsPerUser: formValues.questionsPerUser,
                totalTime: formValues.totalTime,
                testLogo: formValues.testLogo,
                questionFile: formValues.questionFile
            };

            const formData = new FormData();
            Object.keys(testConfig).forEach(key => {
                formData.append(key, testConfig[key]);
            });

            axios
                .post(
                    `${import.meta.env.VITE_BACKEND_URL}quizit/v1/create-test/`,
                    formData
                )
                .then(response => {
                    toast({
                        title: "Test Created Successfully",
                        variant: "toast",
                        status: "success",
                        duration: 5000,
                        isClosable: true
                    });
                })
                .catch(error => {
                    if (error.response.data.hasError) {
                        Object.keys(error.response.data.message).forEach(
                            key => {
                                error.response.data.message[key].forEach(
                                    message => {
                                        toast({
                                            title: "Error",
                                            description: message,
                                            status: "error",
                                            duration: 5000,
                                            isClosable: true
                                        });
                                    }
                                );
                            }
                        );
                    }
                });
        }

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
                        <Box className={styles.box_container}>
                            <Box as="h2" fontWeight="bold" fontSize="lg" mb={4}>
                                Basic Information
                            </Box>
                            <FormControl mb={4}>
                                <FormLabel>Enter the Test Name*</FormLabel>
                                <Input
                                    name="testName"
                                    value={formValues.testName}
                                    onChange={e => {
                                        handleInputChange(e);
                                    }}
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
                                            name="questionFile"
                                            opacity={0}
                                            position="absolute"
                                            accept=".json"
                                            onChange={e => {
                                                handleFileChange(e);
                                            }}
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
                                    onClick={() => {
                                        setClickAction(0);
                                        window.location.reload();
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="whiteAlpha"
                                    onClick={() => {
                                        setClickAction(1);
                                    }}
                                >
                                    Customize
                                </Button>
                            </Flex>
                        </Box>

                        <div className={styles.bottom_section}>
                            <Button
                                colorScheme="orange"
                                onClick={e => {
                                    handleSubmit(e);
                                }}
                            >
                                Create Test
                            </Button>
                        </div>
                    </div>
                </>
            )}
            {clickAction === 1 && (
                <div className={styles.modal_container}>
                    <Box className={styles.box_container}>
                        <Box as="h2" fontWeight="bold" fontSize="lg" mb={4}>
                            Landing Page Information
                        </Box>
                        <FormControl mb={4}>
                            <FormLabel>Enter the Test Title*</FormLabel>
                            <Input
                                name="testTitle"
                                value={formValues.testTitle}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Enter the Test Description*</FormLabel>
                            <Textarea
                                name="testDescription"
                                value={formValues.testDescription}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Upload Logo*</FormLabel>
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
                                    {logoName}
                                </Box>
                                <Button
                                    ml={4}
                                    size="sm"
                                    colorScheme="whiteAlpha"
                                    padding={6}
                                >
                                    {logo ? "Replace File" : "Choose File"}
                                    <Input
                                        type="file"
                                        name="questionFile"
                                        opacity={0}
                                        position="absolute"
                                        accept=".png, .jpg, .jpeg"
                                        onChange={e => {
                                            handleLogoChange(e);
                                        }}
                                    />
                                </Button>
                            </Flex>
                        </FormControl>
                        <Flex mt={4} justify="flex-end">
                            <Button
                                variant="ghost"
                                mr={3}
                                onClick={() => {
                                    onClose();
                                    setClickAction(0);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                colorScheme="orange"
                                onClick={e => {
                                    console.log("Hoi");
                                    if (formValues.testTitle.length > 50) {
                                        toast.closeAll();
                                        toast({
                                            title: "Title should be less than 50 characters",
                                            variant: "toast",
                                            position: "bottom",
                                            duration: 1000,
                                            isClosable: true
                                        });
                                    }
                                    if (
                                        formValues.testDescription.length > 500
                                    ) {
                                        toast({
                                            title: "Description should be less than 500 characters",
                                            variant: "toast",
                                            position: "bottom",
                                            duration: 1000,
                                            isClosable: true
                                        });
                                    }

                                    if (
                                        formValues.testTitle.length < 50 &&
                                        formValues.testDescription.length < 500
                                    ) {
                                        setClickAction(0);
                                        toast({
                                            title: "Landing Page Customized",
                                            variant: "toast",
                                            position: "bottom",
                                            duration: 1000,
                                            isClosable: true
                                        });
                                    }
                                }}
                            >
                                OK
                            </Button>
                        </Flex>
                    </Box>
                </div>
            )}
        </>
    );
};

export default CreateModals;
