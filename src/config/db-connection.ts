import { Sequelize } from "sequelize";

const connectionString = process.env.DB_CONNECTION || ''
const environment = process.env.ENVIRONMENT || ''

const sequelize = new Sequelize(connectionString, {
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,           // obriga SSL
      rejectUnauthorized: false // Render usa certificado self-signed
    }
  },
})

export default sequelize

export async function DBconnectionTest() {
  try {
    await sequelize.authenticate({

    });
    console.log('Authenticate successfully.');
    if (environment === 'localhost') {
      await sequelize.sync({ alter: true });
    }
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.log('Unable to connect to the database:', error);
  }
}
