import React from "react";
import styles from "./EndPage.module.css";
import { useParams } from "react-router-dom";

const EndPage = ({ endPageText }) => {
    const { name } = useParams();
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
                    </p>
                </div>
            </div>
        </div>
    );
};

export default EndPage;
