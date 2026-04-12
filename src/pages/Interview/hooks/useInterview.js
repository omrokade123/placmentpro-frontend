import {
  getAllInterviewReports,
  generateInterviewReport,
  getInterviewReportById
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

  return {
    loading,
    report,
    reports,
    generateReport,
    getReportById,
    getReports
  };
};