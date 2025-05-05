"use client";
import { useState, useEffect } from "react";

const DEFAULT_SETTINGS = {
  insulinCarbRatio: "15", // 1 unit per 15g carbs
  targetGlucose: "100", // Target: 100 mg/dL
  correctionFactor: "50", // 1 unit reduces 50 mg/dL
};

export function useSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // Load settings from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSettings = localStorage.getItem("insulinSettings");
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("insulinSettings", JSON.stringify(settings));
    }
  }, [settings]);

  // Function to update a single setting
  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Function to reset settings to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    if (typeof window !== "undefined") {
      localStorage.setItem("insulinSettings", JSON.stringify(DEFAULT_SETTINGS));
    }
  };

  return {
    settings,
    updateSetting,
    resetSettings,
  };
}
