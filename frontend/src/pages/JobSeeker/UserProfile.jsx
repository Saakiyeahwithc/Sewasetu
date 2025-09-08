import React, { useEffect, useState } from "react";
import { Save, X, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import uploadImage from "../../utils/uploadImage";
import JobNavbar from "../../components/layouts/JobNavbar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    resume: user?.resume || "",
  });

  const [formData, setFormData] = useState({ ...profileData });
  const [uploading, setUploading] = useState({ avatar: false, resume: false });
  const [saving, setSaving] = useState(false);
  const [previewUrls, setPreviewUrls] = useState({
    avatar: null,
    resume: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = async (file, type) => {
    setUploading((prev) => ({ ...prev, [type]: true }));

    try {
      const imgUploadRes = await uploadImage(file);
      const avatarUrl = imgUploadRes.imageUrl || "";

      // Clear preview URL and set actual uploaded URL
      setPreviewUrls((prev) => ({ ...prev, [type]: null }));
      handleInputChange(type, avatarUrl);
    } catch (error) {
      console.error("Image upload error: ", error);
      // Clear preview URL on error
      setPreviewUrls((prev) => ({ ...prev, [type]: null }));
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading((prev) => ({ ...prev, [type]: false }));
    }
  };

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL for immediate display
      const previewUrl = URL.createObjectURL(file);
      setPreviewUrls((prev) => ({ ...prev, [type]: previewUrl }));

      // Upload image
      handleImageUpload(file, type);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Validate required fields
      if (!formData.name || formData.name.trim() === "") {
        toast.error("Name is required");
        setSaving(false);
        return;
      }

      // Check if user is authenticated
      if (!user || !user._id) {
        toast.error("Please log in to update your profile");
        setSaving(false);
        return;
      }

      // Prepare clean data for submission
      const profilePayload = {
        name: formData.name.trim(),
        avatar: formData.avatar || "",
        resume: formData.resume || "",
      };

      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        profilePayload
      );

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
        setProfileData({ ...formData });
        updateUser({ ...formData });
      }
    } catch (error) {
      // Show user-friendly error message
      let errorMessage = "Failed to update profile. Please try again.";

      if (error.response?.status === 400) {
        errorMessage =
          error.response?.data?.message ||
          "Invalid profile data. Please check your input.";
      } else if (error.response?.status === 401) {
        errorMessage = "Please log in to update your profile.";
      } else if (error.response?.status === 403) {
        errorMessage = "You don't have permission to update this profile.";
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }

      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profileData });
    // Clear any preview URLs
    if (previewUrls.avatar) {
      URL.revokeObjectURL(previewUrls.avatar);
    }
    if (previewUrls.resume) {
      URL.revokeObjectURL(previewUrls.resume);
    }
    setPreviewUrls({ avatar: null, resume: null });
  };

  const DeleteResume = async () => {
    setSaving(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.DELETE_RESUME, {
        resumeUrl: formData.resume || "",
      });
      if (response.status === 200) {
        toast.success("Resume deleted successfully!");
        const updatedData = { ...formData, resume: "" };
        setProfileData(updatedData);
        setFormData(updatedData);
        updateUser(updatedData);
      }
    } catch (error) {
      toast.error("Failed to delete resume. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const userData = {
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || "",
      resume: user?.resume || "",
    };

    setProfileData({ ...userData });
    setFormData({ ...userData });

    // Cleanup function to revoke preview URLs
    return () => {
      if (previewUrls.avatar) {
        URL.revokeObjectURL(previewUrls.avatar);
      }
      if (previewUrls.resume) {
        URL.revokeObjectURL(previewUrls.resume);
      }
    };
  }, [user]);

  return (
    <div className="bg-gradient-to-br from-emerald-50 via-white to-purple-50">
      <JobNavbar />
      <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16 lg:m-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/*Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 flex justify-between items-center">
              <h1 className="text-xl font-medium text-white">Profile</h1>
            </div>

            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="relative ">
                    {previewUrls.avatar ||
                    (formData?.avatar && formData.avatar.trim() !== "") ? (
                      <img
                        src={previewUrls.avatar || formData.avatar}
                        alt="Avatar"
                        className="w-20 h-20 rounded-full object-cover border-4 border-gray-200"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center border-4 border-gray-200">
                        <span className="text-white font-semibold text-2xl">
                          {formData?.name
                            ? formData.name.charAt(0).toUpperCase()
                            : "U"}
                        </span>
                      </div>
                    )}
                    {uploading?.avatar && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block">
                      <span className="sr-only">Choose avatar</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, "avatar")}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                      />
                    </label>
                  </div>
                </div>
                {/* Name Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/*Email (Read-Only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="text"
                    value={formData.email}
                    disabled
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                  />
                </div>
                {/*Resume Section */}
                {formData?.resume && formData.resume.trim() !== "" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Resume
                    </label>

                    <div className="flex items-center gap-2">
                      <p className="text-sm text-gray-600">
                        Link:{" "}
                        <a
                          href={formData.resume}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline cursor-pointer "
                        >
                          {formData.resume}
                        </a>
                      </p>
                      <button
                        className="cursor-pointer"
                        onClick={DeleteResume}
                        disabled={saving}
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Resume
                    </label>
                    <div className="relative">
                      <label className="block">
                        <span className="sr-only">Choose File</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={(e) => handleImageChange(e, "resume")}
                          disabled={uploading.resume}
                          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors disabled:opacity-50"
                        />
                      </label>
                      {uploading.resume && (
                        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/*Action Buttons */}
              <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                <Link
                  onClick={handleCancel}
                  to="/find-jobs"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-centerm space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </Link>
                <button
                  onClick={handleSave}
                  disabled={saving || uploading.avatar || uploading.resume}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                >
                  {saving ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Save className="w-4 h-4 " />
                  )}
                  <span>{saving ? "Saving..." : "Save Changes"}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
