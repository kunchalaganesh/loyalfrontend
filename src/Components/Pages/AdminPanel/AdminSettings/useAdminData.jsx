import { useSelector } from 'react-redux';

export const useAdminData = () => {
    const allStates = useSelector((state) => state);
    const adminLoggedIn = allStates.reducer1;


  console.log('checking all admindata ', adminLoggedIn)

  return {
    clientCode: adminLoggedIn.ClientCode,
    CompanyId: adminLoggedIn.CompanyId,
    CounterId: adminLoggedIn.CounterId,
    BranchId: adminLoggedIn.BranchId,
    EmployeId: adminLoggedIn.EmployeId,
    employeeCode: adminLoggedIn.EmployeeCode,
    rdPurchaseFormat: parseInt(adminLoggedIn.Clients?.RDPurchaseFormat),
    InvoiceFormat: parseInt(adminLoggedIn.Clients?.InvoiceFormat),
    employeename :adminLoggedIn.FirstName,
    employeid :adminLoggedIn.EmployeeId
  };
};
