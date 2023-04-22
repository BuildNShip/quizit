import React, { useState } from "react";
import styles from "./CreateModals.module.css";
import { Box, Flex, Textarea } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Link, Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

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

    const [logo, setLogo] = useState(null)
    const [logoName, setLogoName] = useState("No File Found")
    const toast = useToast();

    const handleFileChange = e => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const handleLogoChange = e => {
        setLogo(e.target.files[0]);
        setLogoName(e.target.files[0].name);
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
        } else {
            setClickAction(1);
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
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    colorScheme="orange"
                                    onClick={e => {
                                        handleSubmit(e);
                                    }}
                                >
                                    Submit
                                </Button>
                            </Flex>
                        </Box>

                        <div className={styles.bottom_section}>
                            {formValues?.testTitle?.length > 0 &&
                            formValues?.testDescription?.length > 0 &&
                            formValues?.reportPassword?.length > 0 ? (
                                <p>Landing Page Cutomized!</p>
                            ) : (
                                <p
                                    onClick={() => {
                                        setClickAction(1);
                                    }}
                                >
                                    Customize Landing Page?
                                </p>
                            )}
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
                                    colorScheme="blackAlpha"
                                    padding={6}
                                >
                                    {logo ? "Replace File" : "Choose File"}
                                    <Input
                                        type="file"
                                        name="questionFile"
                                        opacity={0}
                                        position="absolute"
                                        onChange={e => {
                                            handleLogoChange(e);
                                        }}
                                    />
                                </Button>
                            </Flex>
                        </FormControl>
                        <Flex mt={4} justify="flex-end">
                            <Button variant="ghost" mr={3} onClick={onClose}>
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
                                        console.log("Hoi");
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
