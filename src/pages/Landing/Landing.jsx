import React from "react"
import styles from "./Landing.module.css"
import launchpadkerala from "./assets/launchpadkerala.svg"
import { useDisclosure } from "@chakra-ui/react"
import Questionaire from "../../components/questionaire/Questionaire"
import { useState } from "react"

const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [initalQuestions, setInitialQuestions] = useState(0)

  const startQuestions = [
    {
      id: 1,
      title: "Minimum Requirements",
      question: "Do you have at least one hour of uninterrupted internet?",
      type: "yn",
    },
    {
      id: 2,
      title: "Enter Key",
      question:
        "Enter the key which you just received in your mail to continue",
      type: "inp",
    },

    {
      id: 3,
      title: "Ready to Start?",
      question:
        "Are you sure you have at least one hour of uninterrupted internet?",
      type: "yn",
    },
  ]

  return (
    <div className={styles.background_container}>
      {initalQuestions === 0 && (
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
                Launchpad Kerala connects engineering students and graduates in
                Kerala with companies in the region. It's organized by IEEE
                Kerala Section and GTech MuLearn, sponsored by KKEM, and
                co-sponsored by NIELIT.
              </p>
              <button
                className={styles.start_button}
                onClick={() => {
                  onOpen()
                  setInitialQuestions(1)
                }}
              >
                Start
              </button>
            </p>
          </div>
        </div>
      )}
      {initalQuestions === 1 && (
        <Questionaire
          isOpen={isOpen}
          onClose={onClose}
          setInitialQuestions={setInitialQuestions}
          initalQuestions={initalQuestions}
          title="Minimum Requirements"
          message="Do you have atleast one hour of uninterupted internet?"
        />
      )}
      {initalQuestions === 2 && (
        <Questionaire
          isOpen={isOpen}
          onClose={onClose}
          setInitialQuestions={setInitialQuestions}
          initalQuestions={initalQuestions}
          title="Enter Key"
          message="Enter in the key which you just received in your mail to continue"
        />
      )}
      {initalQuestions === 3 && (
        <Questionaire
          isOpen={isOpen}
          onClose={onClose}
          setInitialQuestions={setInitialQuestions}
          initalQuestions={initalQuestions}
          title="Ready to Start?"
          message="Are you sure you have atleast one hour of uninterupted internet?"
        />
      )}
      {initalQuestions === -1 && <p>OK Bei</p>}
    </div>
  )
}

export default Landing
