"use client";

import { useState, useEffect } from "react";

export type ViewMode = "card" | "list" | "table";

interface UseViewPreferenceOptions {
  defaultMode?: ViewMode;
  storageKey?: string;
}

// Custom event for view mode changes
export const VIEW_MODE_CHANGE_EVENT = "viewModeChange";

// Create a custom event for view mode changes
export const createViewModeChangeEvent = (mode: ViewMode, source: string) => {
  if (typeof window === "undefined") return null;
  
  return new CustomEvent<{ mode: ViewMode; source: string }>(VIEW_MODE_CHANGE_EVENT, {
    detail: { mode, source },
  });
};

export const useViewPreference = (options: UseViewPreferenceOptions = {}) => {
  const { defaultMode = "table", storageKey = "viewMode" } = options;
  
  // Initialize with defaultMode, will be updated in useEffect after mount
  const [viewMode, setViewMode] = useState<ViewMode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  // Set mounted state after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load saved preference from localStorage after mount
  useEffect(() => {
    if (!mounted) return;

    try {
      const savedMode = localStorage.getItem(storageKey) as ViewMode | null;
      if (savedMode && ["card", "list", "table"].includes(savedMode)) {
        setViewMode(savedMode);
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }
  }, [mounted, storageKey]);

  // Listen for view mode changes from other components
  useEffect(() => {
    if (!mounted) return;

    const handleViewModeChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ mode: ViewMode; source: string }>;
      // Only update if the event wasn't dispatched by this instance
      if (customEvent.detail.source !== storageKey) {
        setViewMode(customEvent.detail.mode);
      }
    };

    window.addEventListener(VIEW_MODE_CHANGE_EVENT, handleViewModeChange);
    
    return () => {
      window.removeEventListener(VIEW_MODE_CHANGE_EVENT, handleViewModeChange);
    };
  }, [mounted, storageKey]);

  // Function to change view mode
  const changeViewMode = (mode: ViewMode) => {
    if (!mounted) return;

    try {
      // Save to localStorage
      localStorage.setItem(storageKey, mode);
      
      // Update local state
      setViewMode(mode);
      
      // Dispatch event for other components
      const event = createViewModeChangeEvent(mode, storageKey);
      if (event) {
        window.dispatchEvent(event);
      }
    } catch (error) {
      console.error("Error saving view mode:", error);
    }
  };

  return {
    viewMode,
    changeViewMode,
    mounted,
  };
};
