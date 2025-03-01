import Patient from "../models/Patient.js";

// Controlador para obtener todos los pacientes
export const getAllPatients = async (req, res) => {
    try {
        // Busca todos los documentos en la colección 'patients'
        const patients = await Patient.find();
        // Devuelve los datos como respuesta en formato JSON
        res.json(patients);
    } catch (error) {
        // Maneja errores devolviendo un estado 500 (Error del Servidor)
        res.status(500).json({ message: error.message });
    }
};

// Controlador para obtener un paciente por ID
export const getPatientById = async (req, res) => {
    try {
        // Busca un paciente por el ID proporcionado en la URL
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            // Si no se encuentra el paciente, devuelve un estado 404 (No Encontrado)
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Devuelve el paciente encontrado en formato JSON
        res.json(patient);
    } catch (error) {
        // Maneja errores devolviendo un estado 500
        res.status(500).json({ message: error.message });
    }
};

// Controlador para filtrar pacientes por edad y peso
export const getPatientsByAgeAndWeight = async (req, res) => {
    try {
        // Extrae los parámetros de consulta desde la URL
        const { age, weight } = req.query;
        // Busca pacientes cuya edad y peso sean mayores o iguales a los valores proporcionados
        const patients = await Patient.find({ age: { $gte: age }, weight: { $gte: weight } });
        // Devuelve los pacientes encontrados como respuesta en formato JSON
        res.json(patients);
    } catch (error) {
        // Maneja errores devolviendo un estado 500
        res.status(500).json({ message: error.message });
    }
};

// Controlador para crear un nuevo paciente
export const createPatient = async (req, res) => {
    try {
        const { name, age, weight } = req.body;
        if (!name || !age || !weight) {
          return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
        // Crea un nuevo documento 'Patient' con los datos del cuerpo de la solicitud
        const patient = new Patient(req.body);
        // Guarda el nuevo paciente en la base de datos
        await patient.save();
        // Devuelve el paciente creado con un estado 201 (Creado)
        res.status(201).json(patient);
    } catch (error) {
        // Maneja errores devolviendo un estado 400 (Solicitud Incorrecta)
        res.status(400).json({ message: error.message });
    }
};

// Controlador para actualizar un paciente por ID
export const updatePatient = async (req, res) => {
    try {
        // Busca y actualiza el paciente por ID; devuelve el documento actualizado
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            // Si no se encuentra el paciente, devuelve un estado 404
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Devuelve el paciente actualizado en formato JSON
        res.json(patient);
    } catch (error) {
        // Maneja errores devolviendo un estado 400
        res.status(400).json({ message: error.message });
    }
};

// Controlador para eliminar un paciente por ID
export const deletePatient = async (req, res) => {
    try {
        // Busca y elimina el paciente por ID
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            // Si no se encuentra el paciente, devuelve un estado 404
            return res.status(404).json({ message: 'Patient not found' });
        }
        // Devuelve un mensaje confirmando que el paciente fue eliminado
        res.json({ message: 'Patient deleted' });
    } catch (error) {
        // Maneja errores devolviendo un estado 500
        res.status(500).json({ message: error.message });
    }
};

