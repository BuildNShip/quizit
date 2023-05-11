import React, { useEffect, useState } from "react";
import styles from "./EndPage.module.css";
import { useParams } from "react-router-dom";
import apiGateway from "../../services/apiGateway";

const EndPage = ({ endPageText }) => {
    const { name } = useParams();
    const userKey = sessionStorage.getItem("userKey");
    const [endScreen, setEndScreen] = useState({});

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
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div className={styles.background_container}>
            <div className={styles.first_view_container}>
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
                            Thanks for taking our quiz! We'll review your
                            results and get back to you soon. Good luck with
                            your job search!
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
            </div>
        </div>
    );
};

export default EndPage;
