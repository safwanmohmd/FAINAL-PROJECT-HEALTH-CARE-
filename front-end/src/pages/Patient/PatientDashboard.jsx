import Sidebar from "../../componants/common/Sidebar";

import PatientAppmnts from "../../componants/patient/PatientAppmnts";

const PatientDashboard = () => {
  return (
    <>

    <div className="flex h-screen"><Sidebar />
      <div className="w-full bg-gray-200 p-4">
        <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <h2 className="text-lg font-semibold">MyAppointments</h2>
        </div>
        <PatientAppmnts />
      </div>      
    </div>
    </>
  );
};

export default PatientDashboard;
