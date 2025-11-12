import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.MARIADB_DATABASE || 'sensor_db', 
    process.env.MARIADB_USER || 'billy', 
    process.env.MARIADB_ROOT_PASSWORD || '123456asd', {
    host: 'localhost',
    dialect: 'mariadb'
})

const connection = async () => {
    try {
        await sequelize.authenticate()
        console.log('MariaDB Connected');
        
    } catch (error) {
        console.error('Unable to connect MariaDB');
        
    }
}

connection()

export default sequelize