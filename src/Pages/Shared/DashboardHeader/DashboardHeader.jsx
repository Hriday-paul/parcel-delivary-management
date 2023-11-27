
const DashboardHeader = ({title}) => {
    return (
        <div className="p-5 md:p-7 bg-white">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-serif font-medium text-gray-800">{title}</h3>
        </div>
    );
};

export default DashboardHeader;