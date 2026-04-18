import API from "./axios";

/**
 * Get current user profile
 */
export const getProfile = async () => {
  try {
    const response = await API.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

/**
 * Update user profile
 */
export const updateProfile = async (profileData) => {
  try {
    const response = await API.put("/profile", profileData);
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

/**
 * Change user password
 */
export const changePassword = async (passwordData) => {
  try {
    const response = await API.post("/profile/change-password", passwordData);
    return response.data;
  } catch (error) {
    console.error("Error changing password:", error);
    throw error;
  }
};

/**
 * Update notification preferences
 */
export const updatePreferences = async (preferences) => {
  try {
    const response = await API.put("/profile/preferences", preferences);
    return response.data;
  } catch (error) {
    console.error("Error updating preferences:", error);
    throw error;
  }
};

/**
 * Delete user account
 */
export const deleteAccount = async (password) => {
  try {
    const response = await API.delete("/profile", {
      data: { password }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};
