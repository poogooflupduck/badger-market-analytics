const StatsGrid = ({ title, children }) => {
  return (
    <div className="mx-4">
      <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">{children}</dl>
    </div>
  );
};

export default StatsGrid;
