import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import swaggerSpec from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import responseError from "./middlewares/response-error";
import { DBconnectionTest } from "./config/db-connection";
import { controllersStartup } from "./config/controllers-startup";


const PORT = process.env.PORT || 4000;

const app = express()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));


controllersStartup(app)

app.use(responseError)

DBconnectionTest()

app.listen(PORT, ()=> console.log(`server is running | port: ${PORT}`))