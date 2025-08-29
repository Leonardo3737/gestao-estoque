import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import responseError from "./middlewares/response-error";
import { DBconnectionTest } from "./config/db-connection";
import { controllersStartup } from "./config/controllers-startup";
import { authMiddleware } from "./middlewares/auth.middleware";


const PORT = process.env.PORT || 4000;

const app = express()

app.use(express.json())

app.use(authMiddleware)

controllersStartup(app)

app.use(responseError)

DBconnectionTest()

app.listen(PORT, ()=> console.log(`server is running | port: ${PORT}`))