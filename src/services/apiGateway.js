import axios from "axios"

const apiGateway = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/`,
  headers: {
    method: 'get',
    maxBodyLength: Infinity,
    userkey: "asdfhsadfjkh",
    event: "launchpad",
  },
})

export default apiGateway
