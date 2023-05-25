import React, { useEffect } from "react";
import styles from "./TestReport.module.css";
import { useParams } from "react-router-dom";
import apiGateway from "../../services/apiGateway";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Heading,
    Text,
    Box
} from "@chakra-ui/react";
import {
    Button,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure
} from "@chakra-ui/react";
import Footer from "../../components/footer/Footer";

const TestReport = () => {
    const { name } = useParams();
    const [quizPassword, setquizPassword] = React.useState("");
    const [report, setReport] = React.useState({});
    const [hasPassword, setHasPassword] = React.useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        setquizPassword(name);

        apiGateway
            .get(`/quizit/v1/report/has-password/${name}/`)

            .then(response => {
                const value = response.data.response.hasReportPassword;

                setHasPassword(value);
                onOpen();

                if (!hasPassword) {
                    getReport();
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const getReport = () => {
        apiGateway
            .post(`/quizit/v1/report/${name}/`, { password: quizPassword })

            .then(response => {
                const value = response.data.response.datas;
                setReport(value);
                console.log(value);
                setHasPassword(false);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className={styles.background_container}>
            {hasPassword ? (
                <>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        isCentered
                        closeOnOverlayClick={false}
                    >
                        <ModalBody>
                            <ModalContent
                                bg="#1f1f1f"
                                color="#ffffff"
                                fontFamily="Manrope, sans-serif"
                            >
                                <ModalHeader
                                    closeButton={false}
                                    fontWeight="600"
                                >
                                    Enter the Password
                                </ModalHeader>
                                <FormControl marginX="1.75rem" marginY="1rem">
                                    <FormLabel>Report Password</FormLabel>
                                    <Input
                                        onChange={e =>
                                            setquizPassword(e.target.value)
                                        }
                                        width="85%"
                                    />
                                </FormControl>

                                <ModalFooter>
                                    <Button
                                        onClick={() => getReport()}
                                        colorScheme="orange"
                                        rounded="10px"
                                    >
                                        <span style={{ marginRight: "5px" }}>
                                            Submit
                                        </span>
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </ModalBody>
                    </Modal>
                </>
            ) : (
                <Box maxW="1300px" mx="auto" my="2rem">
                    <Heading color="orange" as="h1" mb={2}>
                        Quiz Report Table
                    </Heading>

                    <Text fontSize="sm" mb={4}>
                        The participants of the quiz are listed below, alongside
                        their count.
                    </Text>
                    <Text fontSize="lg" mb={4}>
                        Total Participants: {report.length}
                    </Text>
                    <Table variant="striped" colorScheme="whiteAlpha">
                        <Thead>
                            <Tr>
                                <Th>User Key</Th>
                                <Th>No. of Corrects</Th>
                                <Th>No. of Attempts</Th>
                                <Th>Total Time Taken</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {report &&
                                Array.isArray(report) &&
                                report.length > 0 &&
                                report.map((item, index) => (
                                    <Tr key={index}>
                                        <Td>{item.userKey}</Td>
                                        <Td>{item.noOfCorrects}</Td>
                                        <Td>{item.noOfAttempts}</Td>
                                        <Td>{item.totalTimeTaken}</Td>
                                    </Tr>
                                ))}
                        </Tbody>
                    </Table>
                </Box>
            )}
            <Footer />
        </div>
    );
};

export default TestReport;
