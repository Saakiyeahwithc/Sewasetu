export const BASE_URL = "http://localhost:3000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register",
    LOGIN: "/api/auth/login",
    GET_PROFILE: "/api/auth/profile",
    UPDATE_PROFILE: "/api/user/profile",
    DELETE_RESUME: "/api/user/resume",
  },
  DASHBOARD: {
    OVERVIEW: "/api/analytics/overview",
  },

  JOBS: {
    GET_ALL_JOBS: "/api/job",
    GET_JOB_BY_ID: (id) => `/api/job/get/${id}`,
    POST_JOB: "/api/job/create",
    GET_JOBS_EMPLOYER: "/api/job/get-jobs-employer",
    UPDATE_JOB: (id) => `/api/job/toggle-close/${id}`,
    TOGGLE_CLOSE: (id) => `/api/job/toggle-close/${id}`,
    DELETE_JOB: (id) => `/api/job/delete/${id}`,

    SAVE_JOB: (id) => `/api/savedJob/${id}`,
    UNSAVE_JOB: (id) => `/api/savedJob/${id}`,
    GET_SAVED_JOBS: "/api/savedJob/my",
  },
  APPLICATIONS: {
    APPLY_TO_JOB: (id) => `/api/application/${id}`,
    GET_ALL_APPLICANTS: (id) => `/api/application/job/${id}`,
    UPDATE_STATUS: (id) => `/api/application/${id}/status`,
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image",
  },
};
