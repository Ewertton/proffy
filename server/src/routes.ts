import express from 'express';
import ClassesControllers from './controllers/ClassesControllers';
import ConnectionsController from './controllers/ConnectionsControllers';

const routes = express.Router();
const classesControllers = new ClassesControllers();
const connectionsController = new ConnectionsController();

routes.post('/classes', classesControllers.create );
routes.get('/classes', classesControllers.index );

routes.post('/connections', connectionsController.create );
routes.get('/connections', connectionsController.index );

export default routes;