import Sidebar from "../../componants/common/Sidebar";
import PatientPrescriptionTable from "../../componants/patient/PatientPrescTable";

const PatientPrescriptions = () => {
  return (
    <>

    <div className="flex h-screen"><Sidebar />
      <div className="w-full bg-gray-200 p-4">
        <div className="mt-4 m-5 flex flex-col md:flex-row justify-between gap-3 md:gap-0">
          <h2 className="text-lg font-semibold">My Tasks</h2>
        </div>
        <PatientPrescriptionTable />
      </div>      
    </div>
    </>
  );
};

export default PatientPrescriptions;
