import React, { useState } from "react";

export function Textarea({ label, value, onChange, placeholder }) {
  return (
    <div className="textarea-container">
      {label && <label className="textarea-label">{label}</label>}
      <textarea
        className="textarea-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
