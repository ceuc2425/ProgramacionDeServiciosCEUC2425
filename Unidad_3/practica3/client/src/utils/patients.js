import { API_URL } from "../config/server.js";

// Obtener todos los pacientes
export const fetchAllPatients = async () => {
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error al obtener pacientes:", error);
    return [];
  }
};

// Obtener un paciente por ID
export const fetchPatientById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error al buscar paciente:", error);
    throw error;
  }
};

// Crear o actualizar un paciente
export const savePatient = async (id, patient) => {
  const method = id ? "PUT" : "POST";
  const url = id ? `${API_URL}/${id}` : API_URL;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });
    return await response.json();
  } catch (error) {
    console.error("Error al guardar paciente:", error);
    throw error;
  }
};

// Eliminar un paciente
export const deletePatient = async (id) => {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error("Error al eliminar paciente:", error);
  }
};
