"use client";
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Card } from "../ui/FormElements";

export default function UserProfile() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  if (!user) {
    return (
      <div className="text-center p-4">
        <p>You need to be logged in to view this page.</p>
        <a href="/login" className="btn btn-primary inline-block mt-2">
          Log In
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Account</h1>
        <button onClick={logout} className="text-red-500 hover:text-red-700">
          Log Out
        </button>
      </div>

      <div className="flex border-b border-gray-200">
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "profile"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "settings"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("settings")}
        >
          Calculator Settings
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            activeTab === "foods"
              ? "text-blue-600 border-b-2 border-blue-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("foods")}
        >
          My Foods
        </button>
      </div>

      {activeTab === "profile" && <ProfileTab user={user} />}

      {activeTab === "settings" && <SettingsTab settings={user.settings} />}

      {activeTab === "foods" && <FoodsTab />}
    </div>
  );
}

function ProfileTab({ user }) {
  return (
    <Card>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">Name</h3>
          <p className="mt-1">{user.name}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Email</h3>
          <p className="mt-1">{user.email}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
          <p className="mt-1">
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Card>
  );
}

function SettingsTab({ settings }) {
  return (
    <Card title="Calculator Settings">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Insulin to Carb Ratio
          </h3>
          <p className="mt-1">
            1 unit for every {settings?.insulinCarbRatio || 10} grams of carbs
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Target Blood Glucose
          </h3>
          <p className="mt-1">{settings?.targetGlucose || 120} mg/dL</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500">
            Correction Factor
          </h3>
          <p className="mt-1">
            1 unit reduces blood glucose by {settings?.correctionFactor || 50}{" "}
            mg/dL
          </p>
        </div>

        <button className="btn btn-primary mt-4">Edit Settings</button>
      </div>
    </Card>
  );
}

function FoodsTab() {
  return (
    <Card title="My Custom Foods">
      <p className="text-gray-500">You haven't added any custom foods yet.</p>
      <button className="btn btn-primary mt-4">Add Custom Food</button>
    </Card>
  );
}
