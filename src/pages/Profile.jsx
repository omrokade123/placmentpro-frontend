import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter, // ✅ FIX 3: Added missing AlertDialogFooter import
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Award,
  Calendar,
  Edit2,
  Save,
  X,
  Lock,
  Settings,
  Trophy,
  Zap,
  CheckCircle2,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  getProfile,
  updateProfile,
  changePassword,
  updatePreferences,
  deleteAccount,
} from "@/api/profile";
import { getAnalytics } from "@/api/analytics";

export default function Profile() {
  const { user: contextUser, login } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [maxAccuracy, setMaxAccuracy] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    bio: "",
    title: "",
    skills: [],
  });
  const [analytics, setAnalytics] = useState(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: false,
    weeklyDigest: false,
    marketingEmails: false,
  });

  function calculateCurrentStreak(attempts) {
    const uniqueDates = [...new Set(attempts.map((a) => a.date))].sort(
      (a, b) => new Date(b) - new Date(a),
    );

    let streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
      const prev = new Date(uniqueDates[i - 1]);
      const curr = new Date(uniqueDates[i]);

      const diff = (prev - curr) / (1000 * 60 * 60 * 24);

      if (diff === 1) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }
  const streak = calculateCurrentStreak(analytics?.trendData || []);
  
  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getProfile();
        const analyticsData = await getAnalytics();
        setUser(data.user);
        setFormData({
          firstName: data.user.firstName || "",
          lastName: data.user.lastName || "",
          email: data.user.email || "",
          phone: data.user.phone || "",
          location: data.user.location || "",
          bio: data.user.bio || "",
          title: data.user.title || "",
          skills: data.user.skills || [],
        });
        setAnalytics(analyticsData);
        if (!analytics?.trendData || analytics.trendData.length === 0) return 0;
        const d = Math.max(...analytics.trendData.map((d) => d.accuracy));
        setMaxAccuracy(d);
        setPreferences({
          emailNotifications:
            data.user.preferences?.emailNotifications || false,
          weeklyDigest: data.user.preferences?.weeklyDigest || false,
          marketingEmails: data.user.preferences?.marketingEmails || false,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (key) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const response = await updateProfile(formData);
      setUser(response.user);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
      login(contextUser.token || localStorage.getItem("token"), response.user);
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    setIsChangingPassword(true);
    try {
      await changePassword(passwordData);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      toast.success("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleUpdatePreferences = async () => {
    try {
      await updatePreferences(preferences);
      toast.success("Preferences updated successfully!");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      toast.error("Please enter your password");
      return;
    }
    setIsDeletingAccount(true);
    try {
      await deleteAccount(deletePassword);
      toast.success("Account deleted successfully");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteDialog(false);
      setDeletePassword("");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      location: user?.location || "",
      bio: user?.bio || "",
      title: user?.title || "",
      skills: user?.skills || [],
    });
    setIsEditing(false);
  };

  const getInitials = () => {
    return `${formData.firstName?.[0] || "U"}${formData.lastName?.[0] || ""}`.toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin h-12 w-12 text-purple-600 mb-4" />
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Loading profile...
        </p>
      </div>
    );
  }

  // ✅ FIX 2: Removed the entire DUPLICATE JSX block that was copy-pasted below the return
  return (
    <div className="space-y-8 max-w-7xl">
      {/* Profile Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-2xl blur-xl -z-10" />
        <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-lg">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-purple-500 to-indigo-500 text-white text-2xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Header Info */}
              <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-1">
                      {formData.firstName} {formData.lastName}
                    </h1>
                    <p className="text-lg text-purple-600 dark:text-purple-400 font-medium">
                      {formData.title || "Professional"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 flex items-center gap-2">
                      <MapPin size={16} />
                      {formData.location || "Location not set"}
                    </p>
                  </div>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "destructive" : "default"}
                    className={`gap-2 ${
                      isEditing
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                    }`}
                  >
                    {isEditing ? (
                      <>
                        <X size={18} /> Cancel
                      </>
                    ) : (
                      <>
                        <Edit2 size={18} /> Edit Profile
                      </>
                    )}
                  </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {analytics?.totalTests || 0}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Tests Taken
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analytics?.accuracy || 0}%
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Avg Score
                    </p>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 rounded-lg">
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {analytics?.weakTopics?.length || 0}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      Strong Area
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:w-fit">
          <TabsTrigger value="profile" className="gap-2">
            <User size={16} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="achievements" className="gap-2">
            <Trophy size={16} />
            <span className="hidden sm:inline">Achievements</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger>
        </TabsList>

        {/* ── PROFILE TAB ── */}
        <TabsContent value="profile" className="space-y-6">
          {isEditing && (
            <Alert className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40">
              <AlertCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-blue-800 dark:text-blue-200">
                Update your profile information below and click Save when done.
              </AlertDescription>
            </Alert>
          )}

          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
                Personal Information
              </CardTitle>
              <CardDescription>Manage your profile details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="John"
                    className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="Doe"
                    className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Software Engineer"
                  className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              {/* ✅ FIX 4: Email is always disabled (cannot be changed) */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled={true}
                  placeholder="john@example.com"
                  className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
                <p className="text-xs text-gray-500">Email cannot be changed</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="+1 (555) 123-4567"
                    className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    placeholder="San Francisco, CA"
                    className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="disabled:bg-gray-100 dark:disabled:bg-gray-800"
                />
              </div>

              {isEditing && (
                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 gap-2"
                  >
                    {/* ✅ FIX 5: Consistent loader + icon in save button */}
                    {isSaving ? (
                      <>
                        <Loader size={18} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={18} />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    disabled={isSaving}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
                Skills & Expertise
              </CardTitle>
              <CardDescription>Your technical skills</CardDescription>
            </CardHeader>
            <CardContent>
              {/* ✅ FIX 6: Null-safe check on skills array */}
              {formData.skills && formData.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-200 px-3 py-1.5"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No skills added yet
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── ACHIEVEMENTS TAB ── */}
        <TabsContent value="achievements" className="space-y-6">
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy
                  size={20}
                  className="text-yellow-600 dark:text-yellow-400"
                />
                Badges & Achievements
              </CardTitle>
              <CardDescription>
                Your earned badges and milestones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition ${
                    analytics?.totalTests >= 10
                      ? "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800"
                      : "bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 opacity-60"
                  }`}
                >
                  <Trophy
                    className={`mb-2 ${
                      user?.achievements?.quickLearner
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-gray-400"
                    }`}
                    size={32}
                  />
                  <p className="text-sm font-semibold text-center">
                    Quick Learner
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    {analytics?.totalTests || 0} tests completed
                  </p>
                </div>

                <div
                  className={`flex flex-col items-center justify-center p-4 rounded-lg border transition ${
                    user?.achievements?.perfectScore
                      ? "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800"
                      : "bg-gray-50 dark:bg-gray-900/50 border-gray-300 dark:border-gray-600 opacity-60"
                  }`}
                >
                  <CheckCircle2
                    className={`mb-2 ${
                      analytics?.accuracy >= 70
                        ? "text-green-600 dark:text-green-400"
                        : "text-gray-400"
                    }`}
                    size={32}
                  />
                  <p className="text-sm font-semibold text-center">
                    Perfect Score
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    {analytics?.accuracy || 0}% accuracy
                  </p>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-300 dark:border-gray-600 opacity-60">
                  <Award
                    className="text-gray-400 dark:text-gray-600 mb-2"
                    size={32}
                  />
                  <p className="text-sm font-semibold text-center">Locked</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
                    Coming soon
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Detailed Statistics */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award
                  size={20}
                  className="text-purple-600 dark:text-purple-400"
                />
                Detailed Statistics
              </CardTitle>
              <CardDescription>Your performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/40 dark:to-purple-900/40 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Total Tests
                  </p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1">
                    {analytics?.totalTests || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {analytics?.totalTests > 0
                      ? `Last test: ${analytics?.trendData?.date || "N/A"}`
                      : "No tests yet"}
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/40 dark:to-green-900/40 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Average Score
                  </p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-1">
                    {analytics?.accuracy || 0}%
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Based on all attempts
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/40 dark:to-blue-900/40 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Best Score
                  </p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">
                    {maxAccuracy}%
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Your highest achievement
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/40 dark:to-orange-900/40 rounded-lg">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Streak
                  </p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">
                    {streak} days
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Keep practicing! 🚀
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── SETTINGS TAB ── */}
        <TabsContent value="settings" className="space-y-6">
          {/* Change Password */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock size={20} className="text-red-600 dark:text-red-400" />
                Change Password
              </CardTitle>
              <CardDescription>Update your login password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  name="currentPassword"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                />
              </div>
              <Button
                onClick={handleChangePassword}
                disabled={isChangingPassword}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full gap-2"
              >
                {isChangingPassword ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Password"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Account Preferences */}
          <Card className="border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings
                  size={20}
                  className="text-blue-600 dark:text-blue-400"
                />
                Account Settings
              </CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive updates about your progress
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications}
                    onChange={() =>
                      handlePreferenceChange("emailNotifications")
                    }
                    className="w-5 h-5"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div>
                    <p className="font-medium">Weekly Digest</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Get a summary of your weekly activity
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.weeklyDigest}
                    onChange={() => handlePreferenceChange("weeklyDigest")}
                    className="w-5 h-5"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Receive news and special offers
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.marketingEmails}
                    onChange={() => handlePreferenceChange("marketingEmails")}
                    className="w-5 h-5"
                  />
                </div>
              </div>
              <Button
                onClick={handleUpdatePreferences}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 w-full mt-4"
              >
                Save Preferences
              </Button>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Alert className="border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40">
            <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
            <AlertDescription className="text-red-800 dark:text-red-200">
              Be careful! Actions in this section cannot be undone.
            </AlertDescription>
          </Alert>

          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-600 dark:text-red-400">
                Danger Zone
              </CardTitle>
              <CardDescription>Irreversible account actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => setShowDeleteDialog(true)}
                variant="destructive"
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Delete Account
              </Button>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This action will permanently delete your account and all
                associated data.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* ✅ FIX 3: Delete Account Dialog — uses AlertDialogFooter properly */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Please enter your password to
              confirm account deletion.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <Input
              type="password"
              placeholder="Enter your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletePassword("")}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount || !deletePassword}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeletingAccount ? "Deleting..." : "Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
