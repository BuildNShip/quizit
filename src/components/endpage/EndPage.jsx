import React, { useEffect, useState } from "react";
import styles from "./EndPage.module.css";
import { useParams } from "react-router-dom";
import apiGateway from "../../services/apiGateway";

const EndPage = ({ endPageText }) => {
    const { name } = useParams();
    const userKey = sessionStorage.getItem("userKey");
    const [endScreen, setEndScreen] = useState({});
    const [responseType, setResponseType] = useState();

    useEffect(() => {
        console.log(localStorage.getItem("userKey"));
        console.log("Reached Here!");
        apiGateway
            .get(
                `/quizit/v1/end-screen/${name}/${sessionStorage.getItem(
                    "userKey"
                )}/`
            )
            .then(response => {
                setEndScreen(response.data.response);
                console.log(response.data);
                if (!response.data.response.noOfAttempts) {
                    setResponseType(0);
                } else if (
                    !response.data.response.answerLog ||
                    response.data.response.answerLog.length === 0
                ) {
                    setResponseType(1);
                } else if (!response.data.response.answerLog[0].correctAnswer) {
                    setResponseType(2);
                } else {
                    setResponseType(3);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className={styles.background_container}>
            <div className={styles.first_view_container}>
                {responseType === 0 && (
                    <div className={styles.first_view}>
                        <p className={styles.first_view_texts}>
                            {name && (
                                <img
                                    src={`${
                                        import.meta.env.VITE_BACKEND_URL
                                    }quizit/v1/get-logo/${name}/`}
                                    alt="Logo of the quiz"
                                    className={styles.first_view_image}
                                />
                            )}
                            <p className={styles.fv_heading}>{endPageText}</p>
                            <p className={styles.fv_tagline}>
                                Thanks for taking our quiz! We hope you enjoyed
                                it. We will be back with more quizzes soon. Stay
                                tuned!
                            </p>
                        </p>
                    </div>
                )}
                {responseType == 1 && (
                    <div className={styles.first_view}>
                        <p className={styles.first_view_texts}>
                            {name && (
                                <img
                                    src={`${
                                        import.meta.env.VITE_BACKEND_URL
                                    }quizit/v1/get-logo/${name}/`}
                                    alt="Logo of the quiz"
                                    className={styles.first_view_image}
                                />
                            )}
                            <p className={styles.fv_heading}>
                                {" "}
                                <span>{name}</span> - Result
                            </p>

                            <div className={styles.results_container}>
                                <div className={styles.results}>
                                    <div className={styles.result}>
                                        <p className={styles.count}>
                                            {endScreen.noOfAttempts}
                                        </p>
                                        <p className={styles.count_text}>
                                            Questions Answered
                                        </p>
                                    </div>
                                    <div className={styles.result}>
                                        <p className={styles.count}>
                                            {" "}
                                            {endScreen.noOfCorrects}
                                        </p>
                                        <p className={styles.noOfCorrects}>
                                            Correct Answers
                                        </p>
                                    </div>
                                    <div className={styles.result}>
                                        <p className={styles.count}>
                                            {endScreen.noOfAttempts -
                                                endScreen.noOfCorrects}
                                        </p>
                                        <p className={styles.count_text}>
                                            Wrong Answers
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EndPage;
