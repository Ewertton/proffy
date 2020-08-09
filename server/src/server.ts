import express from 'express';
import routes from './routes';
import cors from 'cors';


const app = express();


app.use(cors());
app.use(express.json());
app.use(routes)

//Corpo(Request body): Dados para criação ou atualização de um registro
//Route Params: Identificar qual recurso atualizar ou deletar
//Query Params: Paginação, filtros, ordenação


//localhost:3333/users


//localhost:3333
app.listen(3333);
