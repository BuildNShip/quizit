import React from "react";
import styles from "./TestLanding.module.css";
import launchpadkerala from "./assets/launchpadkerala.svg";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import Questionaire from "../../components/questionaire/Questionaire";
import { useState, useEffect } from "react";
import Questions from "../../components/questions/Questions";
import apiGateway from "../../services/apiGateway";
import Timer from "../../components/timer/Timer";
import { Progress } from "@chakra-ui/react";
import Footer from "../../components/footer/Footer";
import { ClipLoader } from "react-spinners";
import { Link, useParams, Navigate } from "react-router-dom";
import EndPage from "../../components/endpage/EndPage";

const Landing = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [initialQuestions, setInitialQuestions] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [isMappingDone, setIsMappingDone] = useState(false);
    const [endPageText, setEndPageText] = useState(
        "Thanks For Your Participation"
    );
    const [eventName, setEventName] = useState("");
    const [timerTime, setTimerTime] = useState(3600);
    const [statusCode, setStatusCode] = useState(0);
    const { name } = useParams();
    const toast = useToast();

    const [landingData, setLandingData] = useState({
        testTitle: "",
        testDescription: "",
        testLogo: null
    });

    useEffect(() => {
        sessionStorage.removeItem("userKey");
        setEventName(name);

        if (eventName.length > 0) {
            apiGateway
                .get(`/quizit/v1/test/${eventName}/`)
                .then(response => {
                    setLandingData({
                        ...landingData,
                        testTitle: response.data.response.testTitle,
                        testDescription: response.data.response.testDescription
                    });
                    console.log(landingData);
                    setStatusCode(response.data.statusCode);
                })
                .catch(error => {
                    toast({
                        title: error.response.data.message.general[0],
                        variant: "toast",
                        status: "error",
                        position: "top",
                        duration: 2500,
                        isClosable: true
                    });
                    setStatusCode(error.response.data.statusCode);
                    console.log(statusCode);
                });
        }
    }, [eventName]);

    useEffect(() => {
        const userKey = sessionStorage.getItem("userKey");

        if (initialQuestions === 4) {
            apiGateway
                .get(`/quizit/v1/test/questions/${eventName}/${userKey}/`)
                .then(response => {
                    setQuizQuestions(response.data.response.questions);
                    const timeleft = response.data.response.timeRemaining;
                    console.log(timeleft);
                    setTimerTime(timeleft);
                    if (response.data.response.questions.length === 0) {
                        setInitialQuestions(-1);
                        setEndPageText("You have Already Completed the Quiz");
                        toast({
                            title: "You have already completed the quiz",
                            variant: "toast",
                            status: "error",
                            position: "bottom",
                            duration: 1000,
                            isClosable: true
                        });
                    }
                })
                .catch(error => console.log(error));
        }
    }, [initialQuestions]);

    useEffect(() => {
        if (count === quizQuestions.length && quizQuestions.length > 0) {
            setIsMappingDone(true);
            setInitialQuestions(-1);
            console.log("mapping done");
        }
    }, [quizQuestions, questionNumber]);

    const startQuestions = [
        {
            id: 1,
            title: "Minimum Requirements",
            question: "Do you have uninterrupted internet?",
            type: "yn"
        },
        {
            id: 2,
            title: "Enter Key",
            question:
                "Enter in a unqiue key to start the quiz, this key will be used to identify you.",
            type: "input"
        },

        {
            id: 3,
            title: "Ready to Start?",
            question: "Are you sure you have uninterrupted internet?",
            type: "yn"
        }
    ];

    return statusCode === 200 ? (
        <div className={styles.background_container}>
            {initialQuestions === 0 && (
                <div className={styles.first_view_container}>
                    <div className={styles.first_view}>
                        <div className={styles.first_view_texts}>
                            <img
                                src={`${
                                    import.meta.env.VITE_BACKEND_URL
                                }quizit/v1/get-logo/${eventName}/`}
                                alt=""
                                className={styles.first_view_image}
                            />
                            <p className={styles.fv_heading}>
                                {landingData.testTitle.length > 0
                                    ? landingData.testTitle
                                    : `Welcome to the ${eventName} Quiz`}
                            </p>
                            <p className={styles.fv_tagline}>
                                {landingData.testDescription.length > 0
                                    ? landingData.testDescription
                                    : `This is a quiz for ${eventName}, please read the instructions carefully before starting the quiz. You must have at least one hour of uninterrupted internet to take this quiz.`}
                            </p>
                            <button
                                className={styles.start_button}
                                onClick={() => {
                                    onOpen();
                                    setInitialQuestions(1);
                                }}
                            >
                                Start
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {startQuestions.map(question => {
                if (initialQuestions === question.id) {
                    return (
                        <Questionaire
                            isOpen={isOpen}
                            onClose={onClose}
                            setInitialQuestions={setInitialQuestions}
                            initialQuestions={initialQuestions}
                            title={question.title}
                            message={question.question}
                            type={question.type}
                        />
                    );
                }
            })}
            {initialQuestions === 4 && quizQuestions && (
                <div>
                   
                        <Timer
                            timerTime={timerTime}
                            setTimerTime={setTimerTime}
                        />
                    
                    {quizQuestions && quizQuestions.length !== 0 && (
                        <Box>
                            <Progress
                                size="sm"
                                hasStripe
                                colorScheme="orange"
                                value={(count / quizQuestions.length) * 100}
                            />
                            <Box marginTop="1rem" textAlign="center">
                                <p>
                                    Question {count} of {quizQuestions.length}
                                </p>
                            </Box>
                        </Box>
                    )}
                    <div className={styles.questions_container}>
                        {quizQuestions &&
                            quizQuestions.map((question, index) => {
                                if (questionNumber === index) {
                                    return (
                                        <Questions
                                            eventName={eventName}
                                            id={question.id}
                                            isOpen={isOpen}
                                            onClose={onClose}
                                            question={question.question}
                                            choices={question.choices}
                                            setQuestionNumber={
                                                setQuestionNumber
                                            }
                                            questionNumber={questionNumber}
                                            setCount={setCount}
                                            count={count}
                                        />
                                    );
                                }
                            })}

                        {isMappingDone && <p>Mapping is done!</p>}
                    </div>
                </div>
            )}
            {initialQuestions === -1 && <EndPage endPageText={endPageText} />}
            <Footer />
        </div>
    ) : (
        <>
            {statusCode === 400 && <Navigate to="/" replace={true} />}
            <div className={styles.background_container}>
                <div className={styles.first_view_container}>
                    <ClipLoader
                        color="#f7862b"
                        size={70}
                        loading={true}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default Landing;
