import axios from "axios"

const apiGateway = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
  header: {
    "Content-Type": "application/json",
  }
})

export default apiGateway
