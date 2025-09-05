import { Save, X } from "ucide-react";
import DashboardLayout from '../../components/layouts/DashboardLayout'

const EditProfileDetails = ({
  formData,
  handleInputChange,
  handleInputChange,
    handleSave,
  handleCancle,
  saving,
  uploading,
  ) => {
  return (
    <DashboardLayout activeMenu="company-profile">
    { formData && <div className="">
      <div className="">
        <div className="">
          {/* Header */}
          <div className="">
            <h1 className="">Edit Profile</h1>
            </div>

          { /* Edit Form */}
          <div className="">
            <div className="">
              { /* Personal Information */}
              <div className="">
                <h2 className="">
                  Personal Information
                  </h2>

                {/* Avatar upload */}
                <div className="">
                  <div className="">
                    <img
                      src={formData?.avatar}
                      alt="Avatar"
                      className="">
                      />
                      {uploading?.avatar && (
                        <div className="">
                          <div className=""></div>
                          </div>
                        )}
                      </div>
                    <div>
                      <label className="">
                        <span className="">Choose avatar</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e,"avatar")}
                          className=""
                          />
                        </label>
                      </div>
                    </div>

                  {/* Nmae input */}
                  <div>
                    <label className="">
                      Full Name
                      </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        handleInputChange("name",e.target.value)
                      }
                      className=""
                      placeholder="Enter your full name"
                      />
                    </div>

                  {/* Email(Read-only) */}
                  <div>
                    <label className="">
                      Email Address
                      </label>
                    <input
                      type="email"
                      value={formData.email}
                      disabled
                      className=""
                      />
                    </div>
                  </div>

                {/* company information */}
                <div className="">
                  <h2 className="">
                    Company Information
                    </h2>

                  {/* Company logo upload */}
                  <div className="">
                    <div className="">
                      <img
                        src={formData.companyLogo}
                        alt="Company Logo"
                        className=""
                        />
                      {uploadig.logo &&{
                       <div className="">
                         <div className=""></div>
                         </div>
                         )}
                        </div>
                        <div>
                        <label clssName="">
                          <span className="">Choose company logo</span>
                          <input 
                            type="file"
                            accept="image/*"
                            onChange={(e) => hanleImageChange(e,"logo")}
                          className=""
                            />
                          </label>
                        </div>
                        </div>

                        {/* Company Name */}
                      <div>
                        <label className="">
                          Company Name
                          </label>
                        <input
                        <input="text"
                        value={form.Data.companyName}
                        onChange={(e) =>
                          handleInputChange("companyName", e.target.value)
                        }
                        className=""
                        placeholer="Enter company Name"
                        />
                        </div>

                      { /* company description */}
                      <div>
                        <label className="">
                          Company Description
                          </label>
                        <textarea
                          value={formData.companyDescription}
                          onChange={(e) =>
                            hanleInputChange{
                            "companyDescription",
                        e.target.value
                        )
                        }
                        rows={4}
                        className=""
                        placeholder="Describe your company..."
                        />
                        </div>
                      </div>
                    </div>


                  </div>
                </div>
              </div>
            </div>                       
    </DashboardLayout>          
      
      
  );
};

export default EditProfileDetails;
