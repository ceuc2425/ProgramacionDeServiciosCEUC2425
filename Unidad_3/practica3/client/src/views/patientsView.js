import {
    fetchAllPatients,
    fetchPatientById,
    fetchPatientsByFilters,
    savePatient,
    deletePatient,
  } from "../utils/patients.js";
  
  const patientsList = document.getElementById("patients-list");
  const patientForm = document.getElementById("patient-form");
  const searchForm = document.getElementById("search-form");
  const filterForm = document.getElementById("filter-form");
  const searchResult = document.getElementById("search-result");
  let editingPatientId = null;
  
  // Renderizar todos los pacientes
  export const renderPatients = async () => {
    const patients = await fetchAllPatients();
    patientsList.innerHTML = "";
  
    patients.forEach((patient) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span><strong>${patient.name}</strong> - ${patient.age} años - ${patient.weight} kg - Diagnóstico: ${patient.diagnosis}</span>
        <div>
          <button class="edit-btn" data-id="${patient._id}">Editar</button>
          <button class="delete-btn" data-id="${patient._id}">Eliminar</button>
        </div>
      `;
      patientsList.appendChild(li);
    });
  
    attachEventListeners();
  };
  
  // Adjuntar eventos a botones
  const attachEventListeners = () => {
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        const patient = await fetchPatientById(id);
  
        if (patient) {
          document.getElementById("name").value = patient.name;
          document.getElementById("age").value = patient.age;
          document.getElementById("weight").value = patient.weight;
          document.getElementById("diagnosis").value = patient.diagnosis;
          editingPatientId = id;
        }
      });
    });
  
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const id = event.target.dataset.id;
        await deletePatient(id);
        renderPatients();
      });
    });
  };
  
  // Manejar el envío del formulario
  export const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const diagnosis = document.getElementById("diagnosis").value;
  
    const patient = { name, age: Number(age), weight: Number(weight), diagnosis };
    await savePatient(editingPatientId, patient);
  
    patientForm.reset();
    editingPatientId = null;
    renderPatients();
  };
  
  // Manejar la búsqueda por ID
  export const handleSearchSubmit = async (event) => {
    event.preventDefault();
  
    const id = document.getElementById("search-id").value;
    const patient = await fetchPatientById(id);
  
    if (patient) {
      searchResult.innerHTML = `
        <span><strong>${patient.name}</strong> - ${patient.age} años - ${patient.weight} kg - Diagnóstico: ${patient.diagnosis}</span>
      `;
    } else {
      searchResult.innerHTML = "Paciente no encontrado.";
    }
  };
