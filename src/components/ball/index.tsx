import React from "react";

interface BallProps {
  bgColor: string;
  label: string;
}

export const Ball: React.FC<BallProps> = ({ bgColor, label }) => {
  return (
    <div className="flex flex-row gap-3">
      <div
        style={{
          backgroundColor: bgColor,
          width: 15,
          height: 15,
          borderRadius: "50%",
        }}
      />
      <p className="text-sm">{label}</p>
    </div>
  );
};
