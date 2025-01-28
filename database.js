import { Sequelize } from "sequelize";

const sequelize = new Sequelize('postgresql://imf_db_45ra_user:PS7Ckf2FpfafwaknWX41jFyjIItTTfTo@dpg-cucadkbqf0us73c897q0-a.oregon-postgres.render.com/imf_db_45ra', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true, // This is required for SSL connections
      rejectUnauthorized: false, // This is required for Render
    },
  },
});

// const sequelize = new Sequelize("postgres://postgres:201030@localhost:5432/imf_db");

const dbConnect = async() =>{

  try {
    await sequelize.authenticate(); // Test connection
    console.log("Connection established successfully.");

    await sequelize.sync(); // Sync models to the database
    console.log("Models synced successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

}


export {dbConnect, sequelize};
