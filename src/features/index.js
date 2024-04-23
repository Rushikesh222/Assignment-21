import { hospitalSlice, updateHospitalStats, setTopWard } from "./hospital";

import {
  PatientDetail,
  PatientForm,
  PatientList,
  patientsSlice,
  fetchPatientsAsync,
  addPatientAsync,
  updatePatientAsync,
  deletePatientAsync
} from "./patient";

import {
  WardDetail,
  WardForm,
  WardList,
  wardsSlice,
  fetchWardsAsync,
  addWardAsync,
  updateWardAsync,
  deleteWardAsync
} from "./ward";

export { hospitalSlice, updateHospitalStats, setTopWard };

export {
  PatientDetail,
  PatientForm,
  PatientList,
  patientsSlice,
  fetchPatientsAsync,
  addPatientAsync,
  updatePatientAsync,
  deletePatientAsync
};

export {
  WardDetail,
  WardForm,
  WardList,
  wardsSlice,
  fetchWardsAsync,
  addWardAsync,
  updateWardAsync,
  deleteWardAsync
};
