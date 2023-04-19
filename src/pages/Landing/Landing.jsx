import React from "react";
import styles from "./Landing.module.css";
import launchpadkerala from "./assets/launchpadkerala.svg";
import { useDisclosure } from "@chakra-ui/react";
import Questionaire from "../../components/questionaire/Questionaire";
import { useState, useEffect } from "react";
import questionsData from "../../components/questions/questionsData.json";
import Questions from "../../components/questions/Questions";
import apiGateway from "../../services/apiGateway";

const Landing = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [initialQuestions, setInitialQuestions] = useState(0);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [count, setCount] = useState(0);
    const [isMappingDone, setIsMappingDone] = useState(false);

    useEffect(() => {
        const userKey = sessionStorage.getItem("userKey");

        if (initialQuestions === 4) {
            apiGateway
                .get(`quizit/v1/questions/launchpad/${userKey}/`)
                .then(response =>
                    setQuizQuestions(response.data.response.questions)
                )
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
                                Welcome to LauchPad Kerala 2023
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
                    {quizQuestions.map((question, index) => {
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
                    {isMappingDone && <p>Mapping is done!</p>}
                </div>
            )}

            {initialQuestions === -1 && <p>OK Bei</p>}
        </div>
    );
};

export default Landing;
