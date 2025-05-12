import React from "react";

interface SummaryCardProps {
  title: string;
  count: number;
  icon: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, count, icon }) => {
  return (
    <div className="bg-white rounded-xl px-4 py-3 shadow-sm flex items-center justify-between">
      <p className="text-sm text-gray-600">{title}</p>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-800">{count}</span>
        <span className="text-xl">{icon}</span>
      </div>
    </div>
  );
};

export default SummaryCard;
