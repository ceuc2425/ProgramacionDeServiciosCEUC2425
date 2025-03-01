import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    weight: { type: Number, required: true },
    diagnosis: { type: String, required: true },
});

export default mongoose.model('Patient', patientSchema);

