import React, { useState } from "react";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    useToast
} from "@chakra-ui/react";

const Questionaire = ({
    isOpen,
    onClose,
    title,
    message,
    setInitialQuestions,
    initialQuestions,
    type
}) => {
    const toast = useToast();
    const [userKey, setUserKey] = useState("");
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered closeOnOverlayClick={false}>
          
            <ModalContent
                margin="1rem"
                bg="#1f1f1f"
                color="#ffffff"
                fontFamily="Manrope, sans-serif"
            >
                <ModalHeader  closeButton={false} fontWeight="600">{title}</ModalHeader>
                <ModalBody>
                    {type === "input" ? (
                        <FormControl marginRight="0">
                            <FormLabel>{message}</FormLabel>
                            <Input onChange={e => setUserKey(e.target.value)} />
                            <ModalFooter paddingRight="0">
                                <Button
                                    onClick={() => {
                                        if (userKey.length < 2) {
                                            toast({
                                                title: "User Key is required. Please enter a valid user key.",
                                                variant: "toast",
                                                position: "bottom",
                                                duration: 1000,
                                                isClosable: true
                                            });
                                        } else {
                                            setInitialQuestions(
                                                initialQuestions + 1
                                            );
                                            sessionStorage.setItem(
                                                "userKey",
                                                userKey
                                            );
                                        }
                                    }}
                                    colorScheme="orange"
                                    rounded="10px"
                                >
                                    Submit
                                </Button>
                            </ModalFooter>
                        </FormControl>
                    ) : (
                        message
                    )}
                </ModalBody>
                {type === "yn" && (
                    <ModalFooter>
                        <Button
                            onClick={() => {
                                onClose();
                                setInitialQuestions(-1);
                            }}
                            rounded="10px"
                            colorScheme="black"
                        >
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setInitialQuestions(initialQuestions + 1);
                            }}
                            colorScheme="orange"
                            rounded="10px"
                        >
                            Yes
                        </Button>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};

export default Questionaire;
