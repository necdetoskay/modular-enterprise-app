"use client";

import React from "react";
import { useViewPreference, type ViewMode } from "@/hooks/useViewPreference";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutGrid, List, Table2 } from "lucide-react";

interface ViewSwitcherProps {
  storageKey?: string;
  defaultMode?: ViewMode;
  className?: string;
}

export function ViewSwitcher({
  storageKey,
  defaultMode = "table",
  className,
}: ViewSwitcherProps) {
  const { viewMode, changeViewMode, mounted } = useViewPreference({
    defaultMode,
    storageKey,
  });

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={cn("flex items-center space-x-1 rounded-md border p-1", className)}>
      <ViewModeButton
        mode="card"
        currentMode={viewMode}
        onClick={() => changeViewMode("card")}
        icon={<LayoutGrid className="h-4 w-4" />}
        label="Kart Görünümü"
      />
      <ViewModeButton
        mode="list"
        currentMode={viewMode}
        onClick={() => changeViewMode("list")}
        icon={<List className="h-4 w-4" />}
        label="Liste Görünümü"
      />
      <ViewModeButton
        mode="table"
        currentMode={viewMode}
        onClick={() => changeViewMode("table")}
        icon={<Table2 className="h-4 w-4" />}
        label="Tablo Görünümü"
      />
    </div>
  );
}

interface ViewModeButtonProps {
  mode: ViewMode;
  currentMode: ViewMode;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function ViewModeButton({
  mode,
  currentMode,
  onClick,
  icon,
  label,
}: ViewModeButtonProps) {
  const isActive = mode === currentMode;

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      className={cn(
        "px-3",
        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
      )}
    >
      {icon}
      <span className="ml-2 hidden sm:inline-block">{label}</span>
      <span className="sr-only">{label}</span>
    </Button>
  );
}
