import UserProfile from "../../components/auth/UserProfile";

export const metadata = {
  title: "My Profile | Diabetes Carb Calculator",
  description: "View and edit your Diabetes Carb Calculator profile",
};

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <UserProfile />
    </div>
  );
}
