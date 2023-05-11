import React, { useEffect, useState } from "react";
import styles from "./EndPage.module.css";
import { useParams } from "react-router-dom";
import apiGateway from "../../services/apiGateway";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const EndPage = ({ endPageText }) => {
    const { name } = useParams();
    const userKey = sessionStorage.getItem("userKey");
    const [endScreen, setEndScreen] = useState({});
    const [responseType, setResponseType] = useState();
    const [chartData, setChartData] = useState({
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
            {
                label: "My First Dataset",
                data: [300, 50, 100],
                backgroundColor: [
                    "rgb(255, 99, 132)",
                    "rgb(54, 162, 235)",
                    "rgb(255, 205, 86)"
                ],
                hoverOffset: 4
            }
        ]
    });
    const [chartOptions, setChartOptions] = useState({
        responsive: false,
        maintainAspectRatio: false,
        // You can also set the size of the chart using the following properties:
        height: 1000,
        width: 1000
    });

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
                    setChartData({
                        labels: ["Correct", "Wrong"],
                        datasets: [
                            {
                                label: "Number of questions",
                                data: [
                                    response.data.response.noOfCorrects,
                                    response.data.response.noOfAttempts -
                                        response.data.response.noOfCorrects
                                ],
                                backgroundColor: [
                                    "rgb(247, 134, 43)",
                                    "rgb(63, 63, 63)"
                                ],
                                hoverOffset: 4
                            }
                        ]
                    });
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
                            <div className={styles.results_countainer}>
                                <div className={styles.doughnut_container}>
                                    <Doughnut data={chartData} />
                                </div>
                                <div className={styles.side_count_container}>
                                    <div className={styles.side_count}>
                                        <p className={styles.count}>
                                            {(
                                                (endScreen.noOfCorrects /
                                                    endScreen.noOfAttempts) *
                                                100
                                            ).toFixed(2)}
                                            %
                                        </p>
                                        <p className={styles.count_text}>
                                            Result Percentage
                                        </p>
                                    </div>
                                    <br />
                                    <div className={styles.side_count}>
                                        <p className={styles.count}>
                                            {endScreen.totalTimeTaken}
                                        </p>
                                        <p className={styles.count_text}>
                                            Time Taken(seconds)
                                        </p>
                                    </div>
                                </div>
                            </div>

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
