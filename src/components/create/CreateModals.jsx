import React, { useState } from "react";
import styles from "./CreateModals.module.css";
import { Box, Button, Checkbox, Flex, Link, Textarea } from "@chakra-ui/react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ClipLoader } from "react-spinners";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import apiGateway from "../../services/apiGateway";
import { useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom";

const CreateModals = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const [clickAction, setClickAction] = useState(0);
    const [formValues, setFormValues] = useState({
        testName: "",
        testTitle: "",
        testDescription: "",
        reportPassword: null,
        viewreportPassword: false,
        showScore: true,
        showAnswerLog: false,
        showCorrectAnswer: false,
        questionsPerUser: null,
        totalTime: null,
        questionFile: null,
        testLogo: null,
        showQuestionsPerUser: false,
        showTimer: false,
        privateReport: false,
        generateReport: false
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No File Found");

    const [logo, setLogo] = useState(null);
    const [logoName, setLogoName] = useState("No File Found");
    const [loading, setLoading] = useState(false);
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
                hasReportPassword: formValues.viewreportPassword,
                totalTime: formValues.totalTime,
                testLogo: formValues.testLogo,
                questionFile: formValues.questionFile
            };

            const formData = new FormData();
            Object.keys(testConfig).forEach(key => {
                formData.append(key, testConfig[key]);
            });

            apiGateway
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
                    navigate(`/${formValues.testName}`);
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
                })
                .finally(() => {
                    setLoading(false);
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
                            <FormControl>
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

                            <p className={styles.download_sample}>
                                To Download sample template file for questions.
                                <Link
                                    color="orange"
                                    href="https://drive.google.com/uc?export=download&id=11hiP5EGXwU-KuSezKCBx9VWpoFw3uUCA"
                                    download
                                    style={{ marginTop: "-3rem" }}
                                >
                                    <span> Click Here.</span>
                                </Link>
                            </p>

                            <Flex mt={4} justify="flex-end">
                                {/* <Button
                                    colorScheme="whiteAlpha"
                                    onClick={() => {
                                        setClickAction(1);
                                    }}
                                >
                                    Customize
                                </Button> */}
                            </Flex>
                        </Box>
                        <p
                            onClick={() => {
                                setClickAction(1);
                            }}
                            className={styles.customize_landing}
                        >
                            Customize Landing Page?
                        </p>
                        <p
                            onClick={() => {
                                setClickAction(2);
                            }}
                            className={styles.customize_landing}
                        >
                            Advanced Options
                        </p>
                        <div className={styles.button_container}>
                            <button
                                onClick={e => {
                                    setLoading(true);
                                    handleSubmit(e);
                                }}
                                className={styles.button}
                            >
                                <span>Create Test</span>
                                <ClipLoader
                                    color="#303030"
                                    size={25}
                                    loading={loading}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </button>
                            <button
                                onClick={() => {
                                    setClickAction(0);
                                    window.location.reload();
                                }}
                                className={styles.button_secondary}
                            >
                                Cancel
                            </button>
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
            {clickAction === 2 && (
                <div className={styles.modal_container}>
                    <Box className={styles.box_container}>
                        <FormControl mt={4}>
                            <Checkbox
                                defaultChecked={formValues.showTimer}
                                onChange={e => {
                                    if (formValues.showTimer) {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            totalTime: null
                                        }));
                                    }

                                    setFormValues(prevValues => {
                                        const updatedValues = {
                                            ...prevValues,
                                            showTimer: !prevValues.showTimer
                                        };
                                        return updatedValues;
                                    });
                                }}
                            >
                                How much time is required(ms)?
                            </Checkbox>
                        </FormControl>

                        {formValues.showTimer && (
                            <FormControl mt="1rem" ml={4}>
                                <Input
                                    value={formValues.totalTime}
                                    type="number"
                                    maxWidth={"20rem"}
                                    onChange={e => {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            totalTime: e.target.value
                                        }));
                                    }}
                                    placeholder="Enter Total Time(ms)"
                                />
                            </FormControl>
                        )}

                        <FormControl mt={4}>
                            <Checkbox
                                defaultChecked={formValues.showQuestionsPerUser}
                                onChange={e => {
                                    if (formValues.showQuestionsPerUser) {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            questionsPerUser: null
                                        }));
                                    }

                                    setFormValues(prevValues => {
                                        const updatedValues = {
                                            ...prevValues,
                                            showQuestionsPerUser:
                                                !prevValues.showQuestionsPerUser
                                        };
                                        return updatedValues;
                                    });
                                }}
                            >
                                Do you want to randomize questions?
                            </Checkbox>
                        </FormControl>

                        {formValues.showQuestionsPerUser && (
                            <FormControl mt="1rem" ml={4}>
                                <Input
                                    value={formValues.questionsPerUser}
                                    maxWidth={"20rem"}
                                    onChange={e => {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            questionsPerUser: e.target.value
                                        }));
                                    }}
                                    placeholder="Enter the number of questions to randomize"
                                />
                            </FormControl>
                        )}

                        <FormControl mt={4}>
                            <Checkbox
                                defaultChecked={formValues.showScore}
                                onChange={e => {
                                    setFormValues(prevValues => ({
                                        ...prevValues,
                                        showScore: !prevValues.showScore,
                                        showAnswerLog: false,
                                        showCorrectAnswer: false
                                    }));
                                }}
                            >
                                Show score in endscreen?
                            </Checkbox>
                        </FormControl>

                        {formValues.showScore && (
                            <FormControl mt={4} ml={4}>
                                <Checkbox
                                    defaultChecked={formValues.showAnswerLog}
                                    onChange={e => {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            showAnswerLog:
                                                !prevValues.showAnswerLog
                                        }));
                                        if (formValues.showAnswerLog) {
                                            setFormValues(prevValues => ({
                                                ...prevValues,
                                                showCorrectAnswer: false
                                            }));
                                        }
                                    }}
                                >
                                    Do you want to show answer log?
                                </Checkbox>
                            </FormControl>
                        )}

                        {formValues.showAnswerLog && (
                            <FormControl mt={4} ml={4}>
                                <Checkbox
                                    defaultChecked={
                                        formValues.showCorrectAnswer
                                    }
                                    onChange={e => {
                                        setFormValues(prevValues => ({
                                            ...prevValues,
                                            showCorrectAnswer:
                                                !prevValues.showCorrectAnswer
                                        }));
                                    }}
                                >
                                    Do you want to show correct answers?
                                </Checkbox>
                            </FormControl>
                        )}

                        <>
                            <FormControl mt={4}>
                                <Checkbox
                                    defaultChecked={formValues.generateReport}
                                    onChange={e => {
                                        setFormValues(prevValues => {
                                            const updatedValues = {
                                                ...prevValues,
                                                generateReport:
                                                    !prevValues.generateReport
                                            };
                                            return updatedValues;
                                        });

                                        if (formValues.generateReport) {
                                            setFormValues(prevValues => ({
                                                ...prevValues,
                                                viewreportPassword: false
                                            }));
                                        }
                                    }}
                                >
                                    Do you want to generate admin report?
                                </Checkbox>
                            </FormControl>

                            {formValues.generateReport && (
                                <>
                                    <FormControl mt={4} ml={4}>
                                        <Checkbox
                                            defaultChecked={
                                                formValues.viewreportPassword
                                            }
                                            onChange={e => {
                                                if (
                                                    formValues.viewreportPassword
                                                ) {
                                                    setFormValues(
                                                        prevValues => ({
                                                            ...prevValues,
                                                            reportPassword: null
                                                        })
                                                    );
                                                }

                                                setFormValues(prevValues => {
                                                    const updatedValues = {
                                                        ...prevValues,
                                                        viewreportPassword:
                                                            !prevValues.viewreportPassword
                                                    };
                                                    return updatedValues;
                                                });
                                            }}
                                        >
                                            Do you want to make the report
                                            private?
                                        </Checkbox>
                                    </FormControl>

                                    {formValues.viewreportPassword && (
                                        <FormControl mt="1rem" ml={4}>
                                            <Input
                                                value={
                                                    formValues.reportPassword
                                                }
                                                maxWidth={"20rem"}
                                                onChange={e => {
                                                    setFormValues(
                                                        prevValues => ({
                                                            ...prevValues,
                                                            reportPassword:
                                                                e.target.value
                                                        })
                                                    );
                                                }}
                                                placeholder="Enter Report Password"
                                            />
                                        </FormControl>
                                    )}
                                </>
                            )}
                        </>

                        <Button
                            onClick={() => {
                                if (
                                    formValues.showTimer &&
                                    (!formValues.totalTime ||
                                        formValues.totalTime <= 0 ||
                                        !Number.isInteger(
                                            Number(formValues.totalTime)
                                        ))
                                ) {
                                    toast({
                                        title: "Please Enter Valid Total Time",
                                        variant: "toast",
                                        position: "bottom",
                                        duration: 1000,
                                        isClosable: true
                                    });
                                    return;
                                }

                                if (
                                    formValues.showQuestionsPerUser &&
                                    (!formValues.questionsPerUser ||
                                        formValues.questionsPerUser <= 0 ||
                                        !Number.isInteger(
                                            Number(formValues.questionsPerUser)
                                        ))
                                ) {
                                    toast({
                                        title: "Please Enter Valid Number of Questions",
                                        variant: "toast",
                                        position: "bottom",
                                        duration: 1000,
                                        isClosable: true
                                    });
                                    return;
                                }

                                if (
                                    formValues.viewreportPassword &&
                                    (!formValues.reportPassword ||
                                        formValues.reportPassword.length < 3)
                                ) {
                                    toast({
                                        title: "Please Enter Valid Report Password",
                                        variant: "toast",
                                        position: "bottom",
                                        duration: 1000,
                                        isClosable: true
                                    });
                                    return;
                                }

                                onClose();
                                setClickAction(0);
                                console.log(formValues);
                            }}
                            mt="2rem"
                            colorScheme="orange"
                        >
                            Submit
                        </Button>
                    </Box>
                </div>
            )}
        </>
    );
};

export default CreateModals;
