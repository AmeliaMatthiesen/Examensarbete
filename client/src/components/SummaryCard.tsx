import React from "react";

interface SummaryCardProps {
  title: string;
  count: number;
  icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-start">
      <span className="text-2xl">{icon}</span>
      <p className="text-sm text-gray-500 mt-2">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{count}</p>
    </div>
  );
};

export default SummaryCard;
