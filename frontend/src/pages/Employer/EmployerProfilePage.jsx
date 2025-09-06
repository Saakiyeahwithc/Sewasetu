import { useState, useEffect } from "react";
import { Building2, Mail, Edit } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import EditProfileDetails from "./EditProfileDetails";

import DashboardLayout from "../../components/layouts/DashboardLayout";

const EmployerProfilePage = () => {
  const { user, updateUser } = useAuth();

  // Helper function to check if URL is valid
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== "string" || url.trim() === "") return false;
    try {
      const validUrl = new URL(url);
      return validUrl.protocol === "http:" || validUrl.protocol === "https:";
    } catch {
      return false;
    }
  };

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    avatar: "",
    companyName: "",
    companyDescription: "",
    companyLogo: "",
  });

  // Update profile data when user changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        avatar: user.avatar || "",
        companyName: user.companyName || "",
        companyDescription: user.companyDescription || "",
        companyLogo: user.companyLogo || "",
      });
      setLoading(false);
    }
  }, [user]);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, logo: false });
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Update formData when profileData changes
  useEffect(() => {
    setFormData({ ...profileData });
  }, [profileData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = imgUploadRes.imageUrl || "";

      // Update form data with new image URL
      const field = type === "avatar" ? "avatar" : "companyLogo";
      handleInputChange(field, avatarUrl);
    } catch (error) {
      toast.error("Image upload failed");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      const field = type === "avatar" ? "avatar" : "companyLogo";

      // Set preview first
      handleInputChange(field, previewUrl);

      // Upload image
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      if (response.status === 200) {
        toast.success("Profile Details Updated Successfully!!");
        // Update profile data and exit edit mode
        setProfileData({ ...formData });
        updateUser({ ...formData });
        setEditMode(false);
      }
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    setEditMode(false);
  };

  if (loading) {
    return (
      <DashboardLayout activeMenu="company-profile">
        <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (editMode) {
    return (
      <EditProfileDetails
        formData={formData}
        handleImageChange={handleImageChange}
        handleInputChange={handleInputChange}
        handleSave={handleSave}
        handleCancel={handleCancel}
        saving={saving}
        uploading={uploading}
      />
    );
  }

  return (
    <DashboardLayout activeMenu="company-profile">
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">
                Employer Profile
              </h1>
              <button
                onClick={() => setEditMode(true)}
                className="bg-white/10 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
            </div>
            {/* Profile Content */}
            <div className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Informatio */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Personal Information
                  </h2>
                  {/* Avatar and Name */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      {isValidImageUrl(profileData.avatar) ? (
                        <img
                          src={profileData.avatar}
                          alt="Avatar"
                          className="w-20 h-20 rounded-full object-cover border-4 border-blue-50"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback =
                              e.target.parentElement.querySelector(
                                ".avatar-fallback"
                              );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="avatar-fallback w-20 h-20 rounded-full bg-blue-100 border-4 border-blue-50 flex items-center justify-center absolute top-0 left-0"
                        style={{
                          display: isValidImageUrl(profileData.avatar)
                            ? "none"
                            : "flex",
                        }}
                      >
                        <span className="text-blue-600 font-semibold text-lg">
                          {profileData.name
                            ? profileData.name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{profileData.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                    Company Information
                  </h2>

                  {/* Company Logo and Name */}
                  <div className="flex items-center space-x-4">
                    <div className="relative w-20 h-20">
                      {isValidImageUrl(profileData.companyLogo) ? (
                        <img
                          src={profileData.companyLogo}
                          alt="Company Logo"
                          className="w-20 h-20 rounded-lg object-cover border-4 border-blue-50"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const fallback =
                              e.target.parentElement.querySelector(
                                ".logo-fallback"
                              );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="logo-fallback w-20 h-20 rounded-lg bg-gray-100 border-4 border-blue-50 flex items-center justify-center absolute top-0 left-0"
                        style={{
                          display: isValidImageUrl(profileData.companyLogo)
                            ? "none"
                            : "flex",
                        }}
                      >
                        <Building2 className="w-8 h-8 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {profileData.companyName}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <Building2 className="w-4 h-4 mr-2" />
                        <span>Company</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Company Description */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
                  About Company
                </h2>
                <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-6 rounded-lg">
                  {profileData.companyDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployerProfilePage;
