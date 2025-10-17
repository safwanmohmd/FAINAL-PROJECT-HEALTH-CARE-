import Navbar from "../../componants/common/Navbar";
import Sidebar from "../../componants/common/Sidebar";

import PatientAppmnts from "../../componants/patient/PatientAppmnts";

const PatientDashboard = () => {
  return (
    <>
     <div className="bg-gray-200 min-h-screen flex justify-center items-start px-2 sm:px-4 overflow-x-hidden">
      
      {/* White card container */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-full md:max-w-[1600px] flex overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="hidden md:flex flex-shrink-0 w-48 sm:w-56 md:w-64 lg:w-72">
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex-1 bg-gray-200 p-4 min-w-0 overflow-visible relative">

          {/* Mobile Navbar with pure Tailwind toggle */}
          <div className="md:hidden relative">
            {/* Checkbox hack for toggle */}
            <input id="menu-toggle" type="checkbox" className="hidden peer" />
            <Navbar />
            
            {/* Dropdown menu */}
            <div className="peer-checked:block hidden absolute top-16 left-0 w-full bg-white shadow-lg rounded-b-lg z-50 overflow-auto max-h-[80vh]">
              <Sidebar />
            </div>
          </div>

          {/* Desktop content */}
          <div className="pr-4 sm:pr-6 md:pr-8 mb-28 overflow-visible">
           <PatientAppmnts />
          </div>

        </div>
      </div>
    </div>
    </>
  );
};

export default PatientDashboard;
