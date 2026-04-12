import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URI;
const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
})

api.interceptors.request.use((config) => {

  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})




/**
 * @description Service to generate interview report based on user self description, resume and job description.
 */
export const generateInterviewReport = async ({ jobDescription, selfDescription, resume }) => {

    const formData = new FormData()
    formData.append("jobDescription", jobDescription)
    formData.append("selfDescription", selfDescription)
    formData.append("resume", resume)

    const response = await api.post("/interview/", formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        },
    )

    return response.data

}


/**
 * @description Service to get interview report by interviewId.
 */
export const getInterviewReportById = async (interviewId) => {
    const userId = localStorage.getItem("userId")

    const response = await api.get(`/interview/report/${interviewId}`,
        {
            params: { userId }
        }
    )
    return response.data
}


/**
 * @description Service to get all interview reports of logged in user.
 */
export const getAllInterviewReports = async () => {
    const userId = localStorage.getItem("userId")
    const response = await api.get("/interview/",{
        params: { userId }
    })
    return response.data
}


/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */
// export const generateResumePdf = async ({ interviewReportId }) => {
//     const response = await api.post(`/interview/resume/pdf/${interviewReportId}`, null, {
//         responseType: "blob"
//     })

//     return response.data
// }