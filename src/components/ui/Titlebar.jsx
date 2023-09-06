import React from "react";

export const Titlebar = ({ title }) => {
  return (
    <div className="min-h-6 px-6 py-3 border-t-2">
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
};
