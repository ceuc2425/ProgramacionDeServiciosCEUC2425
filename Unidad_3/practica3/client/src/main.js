import './style.css'
import {
  renderPatients,
  handleFormSubmit,
  handleSearchSubmit,
  handleFilterSubmit,
} from "./views/patientsView.js";

const patientForm = document.getElementById("patient-form");
const searchForm = document.getElementById("search-form");
const filterForm = document.getElementById("filter-form");

if (patientForm) {
  patientForm.addEventListener("submit", handleFormSubmit);
  searchForm.addEventListener("submit", handleSearchSubmit);
  filterForm.addEventListener("submit", handleFilterSubmit);

  renderPatients();
}



