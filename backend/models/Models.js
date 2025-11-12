import { DataTypes } from "sequelize";
import sequelize from "../config/Database.js";
// Users Model
const Users = sequelize.define('users', {
    username: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM('admin', 'user1', 'user2'),
        defaultValue: 'user2'
    }
})

// Admin Sensors Model
const AdminSensors = sequelize.define('admin_sensors',{
    sensor_name: {
        type: DataTypes.STRING(100),
        allowNull: 'false'
    },
    sensor_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING(20)
    }
})

// Admin Sensor Data Model
const AdminSensorData = sequelize.define('admin_sensor_data', {
    sensor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'AdminSensors',
            key: 'id'
        }
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
})

// User Sensors Model
const UserSensors = sequelize.define('user_sensors', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    sensor_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sensor_type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    unit: {
        type: DataTypes.STRING(20)
    }
})

// User Sensor Data Model
const UserSensorsData = sequelize.define('user_sensor_data', {
    sensor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: UserSensors,
            key: 'id'
        }
    },
    value: {
        type: DataTypes.FLOAT,
        defaultValue: false
    }
})

const Charts = sequelize.define('charts', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sensor_type: {
        type: DataTypes.STRING(50)
    },
    role: {
        type: DataTypes.ENUM('admin', 'user1'),
        allowNull: false
    },
    sensor_ref_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    chart_name: {
        type: DataTypes.STRING(100)
    },
    chart_type: {
        type: DataTypes.ENUM('line', 'bar')
    }
})

// Relationships (Associations)

// Users => UserSensors (One-to-Many)
Users.hasMany(UserSensors, { foreignKey: 'user_id', as: 'sensors' })
UserSensors.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })

// AdminSensors => AdminSensorData (One-to-Many)
AdminSensors.hasMany(AdminSensorData, { foreignKey: 'sensor_id', as: 'data' })
AdminSensorData.belongsTo(AdminSensors, { foreignKey: 'sensor_id', as: 'sensor' })

// UserSensors => UserSensorData (One-to-Many)
UserSensors.hasMany(UserSensorsData, { foreignKey: 'sensor_id', as: 'data' })
UserSensorsData.belongsTo(UserSensors, { foreignKey: 'sensor_id', as: 'sensor' })

// Users => Charts (One-to-Many)
Users.hasMany(Charts, { foreignKey: 'user_id', as: 'charts' })
Charts.belongsTo(Users, { foreignKey: 'user_id', as: 'user' })

// Sync Database
const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true })
    } catch (error) {   
        console.error('Error syncing Database:', error);
        
    }
}

export {
    Users,
    UserSensors,
    UserSensorsData,
    AdminSensors,
    AdminSensorData,
    Charts,
    syncDatabase
}