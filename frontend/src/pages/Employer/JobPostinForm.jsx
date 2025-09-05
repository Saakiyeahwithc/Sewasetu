import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useState, useEffect } from "react";
import {
  AlertCircle,
  MapPin,
  DollarSign,
  Briefcase,
  Users,
  Eye,
  Send,
} from "lucide-react";
import { API_PATHS } from "../../utils/apiPaths";
import { useLocation, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { CATEGORIES, JOB_TYPES } from "../../utils/data";
import toast from "react-hot-toast";

const JobPostingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    category: "",
    jobType: "",
    description: "",
    requirements: "",
    salaryMin: "",
    salaryMax: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  //Form validation helper
  const validateForm = (formData) => {
    const errors = {};

    return errors;
  };

  const isFormValid = () => {
    const validationErrors = validateForm(formData);
    return Object.keys(validationErrors).length === 0;
  };

  return (
    <DashboardLayout activeMenu="post-job">
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div>
                <h2 className="">Post a New Job</h2>
                <p className="">Fill the form below to create your job posting.
                </p>
              </div>
              <div className="">
                <button onClick={()=>setIsPreview(true)}
                  disabled={!isFormValid}
                  className="">
                    <Eye/>
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobPostingForm;
