import express from 'express';
import cors from 'cors';

export class MyRouter {
    constructor() {
        this.app = express.Router();
    }
    
    init() {
        this.configureMiddleware();
        return this.app;
    }
    
    configureMiddleware() {
        // Middleware para parsear el cuerpo de las solicitudes en formato JSON
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(express.urlencoded({ extended: true }));
    }

}