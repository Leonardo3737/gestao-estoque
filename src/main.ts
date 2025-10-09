import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from 'express'
import responseError from "./middlewares/response-error";
import { DBconnectionTest } from "./config/db-connection";
import { controllersStartup } from "./config/controllers-startup";


const PORT = Number(process.env.PORT) || 4000;

const app = express()

app.use(express.json())
app.use(cors())

//app.use(authMiddleware)

controllersStartup(app)

app.use(responseError)

DBconnectionTest()

app.listen(PORT, ()=> console.log(`server is running | port: ${PORT}`))