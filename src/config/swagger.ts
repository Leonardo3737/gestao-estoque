import swaggerJsdoc from "swagger-jsdoc";
import { Options } from "swagger-jsdoc";

const PORT = process.env.PORT || 4000;

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestão de Estoque",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  // Caminho para suas rotas com JSDoc
  apis: ["./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
