import React from "react";
import styles from "./Landing.module.css";
import Footer from "../../components/footer/Footer";

const Landing = () => {
    return (
        <div className={styles.background_container}>
            <div className={styles.first_view_container}>
                <div className={styles.first_view}>
                    <div className={styles.first_view_texts}>
                        <p className={styles.fv_heading}>
                            Introducing <span>QuizIt</span>, the new way to learn and test
                            your knowledge.
                        </p>
                        <p className={styles.fv_tagline}>
                            QuizIt is a platform that allows you to create
                            quizzes and test your knowledge. You can also
                            participate in quizzes created by others.
                        </p>

                        <div className={styles.fv_buttons}>
                            <button className={styles.start_button}>
                                Create Quiz
                            </button>
                            <button className={styles.fv_button}>
                                Participate
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Landing;
