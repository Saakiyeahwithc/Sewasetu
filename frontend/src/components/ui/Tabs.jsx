import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

// -----------------------------------------------------------------------------
// Internal context to share active value
// -----------------------------------------------------------------------------
const TabsContext = createContext({ value: undefined, setValue: () => {} });

// -----------------------------------------------------------------------------
// <Tabs /> — Provider component
// -----------------------------------------------------------------------------
export default function Tabs({
  defaultValue = undefined,
  value: controlledValue,
  onValueChange,
  className = "",
  orientation = "horizontal", // (future‑proof) but only horizontal styles provided
  children,
}) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const activeValue = isControlled ? controlledValue : internalValue;

  const setValue = (newVal) => {
    if (!isControlled) setInternalValue(newVal);
    onValueChange?.(newVal);
  };

  return (
    <TabsContext.Provider value={{ value: activeValue, setValue, orientation }}>
      <div className={`w-full ${className}`}>{children}</div>
    </TabsContext.Provider>
  );
}

// -----------------------------------------------------------------------------
// <TabsList /> — wraps tab triggers
// -----------------------------------------------------------------------------
export function TabsList({ className = "", children }) {
  const { orientation } = useContext(TabsContext);
  const base =
    orientation === "vertical"
      ? "flex flex-col border-r border-gray-200 dark:border-gray-700"
      : "flex space-x-6 border-b border-gray-200 dark:border-gray-700";
  return <div className={`${base} ${className}`}>{children}</div>;
}

// -----------------------------------------------------------------------------
// <TabsTrigger /> — each clickable tab button
// -----------------------------------------------------------------------------
export function TabsTrigger({
  value,
  className = "",
  children,
  disabled = false,
}) {
  const { value: activeValue, setValue, orientation } = useContext(TabsContext);
  const isActive = activeValue === value;

  const underlineStyle =
    orientation === "vertical"
      ? "absolute inset-y-0 -left-px w-0.5"
      : "absolute inset-x-0 -bottom-px h-0.5";

  return (
    <button
      type="button"
      className={`relative py-2 text-sm font-medium transition-colors duration-150 outline-none whitespace-nowrap disabled:opacity-50 disabled:pointer-events-none \
        ${
          isActive
            ? "text-blue-600 dark:text-blue-400"
            : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        } \
        ${className}`}
      onClick={() => !disabled && setValue(value)}
      disabled={disabled}
    >
      {children}
      {isActive && (
        <motion.span
          layoutId="underline"
          className={`${underlineStyle} bg-blue-600 dark:bg-blue-400`}
        />
      )}
    </button>
  );
}

// -----------------------------------------------------------------------------
// <TabsContent /> — renders active panel content
// -----------------------------------------------------------------------------
export function TabsContent({ value, className = "", children }) {
  const { value: activeValue } = useContext(TabsContext);
  return activeValue === value ? (
    <div className={className}>{children}</div>
  ) : null;
}
