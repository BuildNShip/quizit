import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider, extendTheme, useToast, Button } from "@chakra-ui/react"
import App from "./App"
import "./index.css"

const customTheme = extendTheme({
  components: {
    Alert: {
      variants: {
        // define own toast variant
        toast: {
          container: {
            color: "#000",
            bg: "#f7862b",
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={customTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
)
