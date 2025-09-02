import React from "react";

export function Card({ children, className }) {
  return (
    <h2
      className={`text-xl font-semibold text-gray-900 leading-tight ${className}`}
      id="card-title"
    >
      {children}
    </h2>
  );
}
export function CardTitle({ children, className }) {
  return (
    <h2
      className={`text-xl font-semibold text-gray-900 leading-tight ${className}`}
      id="card-title"
    >
      {children}
    </h2>
  );
}

export function CardHeader({ children, className }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardContent({ children, className }) {
  return <div className={className}>{children}</div>;
}

export function CardDescription({ children, className }) {
  return <p className={`text-gray-600 mb-4 ${className}`}>{children}</p>;
}
