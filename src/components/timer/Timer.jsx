import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import launchpadkerala from "./launchpadkerala.svg";
import styles from "./Timer.module.css";
import { useParams } from "react-router-dom";
import apiGateway from "../../services/apiGateway";

const Timer = ({ timerTime, setTimerTime }) => {
    const { name } = useParams();
    const [timeLeft, setTimeLeft] = useState(timerTime); // 300 seconds = 5 minutes

    useEffect(() => {
        console.log(timerTime);
        // Decrease time left every second
        const interval = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        // Cleanup
        return () => clearInterval(interval);
    }, []);

    // Convert remaining seconds to minutes and seconds
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <img
                src={`${
                    import.meta.env.VITE_BACKEND_URL
                }quizit/v1/get-logo/${name}/`}
                alt=""
                className={styles.first_view_image}
            />
            <Text colorScheme="orange" fontSize="3xl" fontWeight="bold" mb={4}>
                {minutes.toString().padStart(2, "0")}:
                {seconds.toString().padStart(2, "0")}
            </Text>
        </Box>
    );
};

export default Timer;
