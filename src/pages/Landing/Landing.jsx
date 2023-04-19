import React from "react";
import styles from "./Landing.module.css";
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
    const [timerTime, setTimerTime] = useState(0);
    const toast = useToast();

    useEffect(() => {
        sessionStorage.removeItem("userKey");
    }, []);

    useEffect(() => {
        const userKey = sessionStorage.getItem("userKey");

        if (initialQuestions === 4) {
            apiGateway
                .get(`quizit/v1/questions/launchpad/${userKey}/`)
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
        }
    }, [quizQuestions, questionNumber]);

    const startQuestions = [
        {
            id: 1,
            title: "Minimum Requirements",
            question:
                "Do you have at least one hour of uninterrupted internet?",
            type: "yn"
        },
        {
            id: 2,
            title: "Enter Key",
            question:
                "Enter the key which you just received in your mail to continue",
            type: "input"
        },

        {
            id: 3,
            title: "Ready to Start?",
            question:
                "Are you sure you have at least one hour of uninterrupted internet?",
            type: "yn"
        }
    ];

    return (
        <div className={styles.background_container}>
            {initialQuestions === 0 && (
                <div className={styles.first_view_container}>
                    <div className={styles.first_view}>
                        <p className={styles.first_view_texts}>
                            <img
                                src={launchpadkerala}
                                alt=""
                                className={styles.first_view_image}
                            />
                            <p className={styles.fv_heading}>
                                Welcome to LaunchPad Kerala 2023
                            </p>
                            <p className={styles.fv_tagline}>
                                Launchpad Kerala connects engineering students
                                and graduates in Kerala with companies in the
                                region. It's organized by IEEE Kerala Section
                                and GTech MuLearn, sponsored by KKEM, and
                                co-sponsored by NIELIT.
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
                        </p>
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
                    {timerTime && timerTime > 0 ? (
                        <Timer
                            timerTime={timerTime}
                            setTimerTime={setTimerTime}
                        />
                    ) : (
                        <div className={styles.center}>
                            <ClipLoader
                                marginLeft="10px"
                                color="#f7862b"
                                size={70}
                                loading={true}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    )}

                    {quizQuestions &&
                        quizQuestions.map((question, index) => {
                            if (questionNumber === index) {
                                return (
                                    <Questions
                                        id={question.id}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        question={question.question}
                                        choices={question.choices}
                                        setQuestionNumber={setQuestionNumber}
                                        questionNumber={questionNumber}
                                        setCount={setCount}
                                        count={count}
                                    />
                                );
                            }
                        })}
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
                    {isMappingDone && <p>Mapping is done!</p>}
                </div>
            )}

            {initialQuestions === -1 && (
                <div className={styles.first_view_container}>
                    <div className={styles.first_view}>
                        <p className={styles.first_view_texts}>
                            <img
                                src={launchpadkerala}
                                alt=""
                                className={styles.first_view_image}
                            />
                            <p className={styles.fv_heading}>{endPageText}</p>
                            <p className={styles.fv_tagline}>
                                Thanks for taking our quiz! We'll review your
                                results and get back to you soon. Good luck with
                                your job search!
                            </p>
                        </p>
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
};

export default Landing;
