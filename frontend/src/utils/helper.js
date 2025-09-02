export const validateAvatar = (file) => {
  if (!file) return ""; //optional avatar icon
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedTypes.includes(file.type)) {
    return "Avatar must be a JPG or PNG file";
  }

  const maxSize = 5 * 1024 * 1024; //5MB
  if (file.size > maxSize) {
    return "Avatar must be less than 5MB";
  }

  return "";
};
