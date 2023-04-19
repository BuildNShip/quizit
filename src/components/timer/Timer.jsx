import React from "react";
import { useState, useEffect } from "react";
import { Box, Button, Text } from "@chakra-ui/react";
import launchpadkerala from "./launchpadkerala.svg";
import styles from "./Timer.module.css";

const Timer = () => {
    const [timeLeft, setTimeLeft] = useState(3600); // 300 seconds = 5 minutes

    useEffect(() => {
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
        <Box paddingTop="1rem" display="flex" justifyContent="center" alignItems="center">
            <img
                src={launchpadkerala}
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
