import express from 'express';
import cors from 'cors';
import { PORT } from '../config/server.config.js';
import { MyRouter } from '../models/myRouter.js';
import { createPatient, deletePatient, getAllPatients, getPatientById, getPatientsByAgeAndWeight, updatePatient } from './PatientController.js';
import { connectToMongo } from '../models/MongoConnect.js';

export const MyRouterController = async () => {
    const app = express();
    const port = PORT;

    const router = new MyRouter();
    const apiRouter = router.init();

    // Middleware para parsear el cuerpo de las solicitudes en formato JSON
    app.use(express.json());

    // Middleware para manejar CORS
    app.use(cors());

    // Middleware para parsear el cuerpo de las solicitudes en formato URL-encoded
    app.use(express.urlencoded({ extended: true }));

    //user el enrutador
    app.use(apiRouter);

    //ruta de test
    apiRouter.post('/test', (req, res) => {
        console.log(req.body);
        const response = {
            message: "Test practicas ok!",
            status: "success"
        };
        res.json(response);
    });

    //rutas
    apiRouter.post('/patients', createPatient); // Crear un nuevo paciente
    apiRouter.get('/patients', getAllPatients); // Obtener todos los pacientes
    apiRouter.get('/patients/:id', getPatientById); // Obtener paciente por ID
    apiRouter.patch('/patients/:id', updatePatient); // Actualizar un paciente por ID
    apiRouter.delete('/patients/:id', deletePatient); // Eliminar paciente por ID

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

    await connectToMongo();
};

MyRouterController();
