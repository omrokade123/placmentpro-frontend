import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById,
  scheduleInterview,
  startInterview,
  submitInterviewAnswer,
  getInterviewSession,
  getTextFromSpeech

} from "../services/interview.api";

import { useContext } from "react";
import { InterviewContext } from "../interview.context.jsx";

export const useInterview = () => {

  const context = useContext(InterviewContext);

  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }

  const { loading, setLoading, report, setReport, reports, setReports } = context;

  const generateReport = async ({ jobDescription, selfDescription, resume }) => {

    setLoading(true);

    try {

      const response = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resume
      });

      const reportData = response.interviewReport || response;

      setReport(reportData);

      return reportData;

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getReportById = async (interviewId) => {

    setLoading(true);

    try {

      const response = await getInterviewReportById(interviewId);

      const reportData = response.interviewReport || response;

      setReport(reportData);

      return reportData;

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getReports = async () => {

    setLoading(true);

    try {

      const response = await getAllInterviewReports();

      // Handle both response structures: direct array or wrapped in property
      const reportsData = Array.isArray(response) ? response : (response.interviewReports || response);

      setReports(reportsData);

      return reportsData;

    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  const scheduleMockInterview = async (reportId) => {

    setLoading(true);

    try {

      const response = await scheduleInterview(reportId);

      return response;

    } catch (error) {
      console.error("Error scheduling interview:", error);
    } finally {
      setLoading(false);
    }

  };

  const startMockInterview = async (interviewId) => {

    setLoading(true);

    try {

      const response = await startInterview(interviewId);

      return response;

    } catch (error) {
      console.error("Error starting interview:", error);
    } finally {
      setLoading(false);
    }

  };

  const submitAnswer = async (interviewId, answer) => {

    setLoading(true);

    try {

      const response = await submitInterviewAnswer(interviewId, answer);

      return response;

    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setLoading(false);
    }

  };

  const checkInterviewSession = async (reportId) => {

    try {

      const response = await getInterviewSession(reportId);

      return response.interview;

    } catch (error) {
      console.error("Error checking interview session", error);
    }

  };

  const getSpeechToText = async (FormData) => {
    try{
      const response = await getTextFromSpeech(FormData);
      return response;
    }catch(err){
      console.error("Error while converting speech to text",err);
    }
  }

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports,
    scheduleMockInterview,
    startMockInterview,
    submitAnswer,
    checkInterviewSession,
    getSpeechToText
  };
};