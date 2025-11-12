import { Op } from 'sequelize'
import {
    Users,
    UserSensors,
    UserSensorData,
    AdminSensors,
    AdminSensorData,
    Charts
} from '../models/Models.js'

// Time line function for Line Chart
const getTimeRange = (timeLine) => {
    const now = new Date()
    let startDate

    switch (timeLine) {
        case 'day':
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
            break
        case 'week':
            startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
            break
        case 'month':
            startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        default:
            startDate = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }

    return { startDate, endDate: now }
}

// Line Chart Data
exports.getLineChartData = async (req, res) => {
    try {

        const { sensorId } = req.params
        const { role = 'admin', timeline = 'day' } = req.query

        // Choose Model
        const DataModel = role === 'admin' ? AdminSensorData : UserSensorData
        const SensorModel = role === 'admin' ? AdminSensors : UserSensors

        // Compute Time Range
        const { startDate, endDate } = getTimeRange(timeline)

        // Data Query
        const sensorData = await DataModel.findAll({
            where: {
                sensor_id: sensorId,
                timestamp: {
                    [Op.between]: [startDate, endDate]
                }
            },
            include: [{
                model: SensorModel,
                as: 'sensor',
                attributes: ['sensor_name', 'unit']
            }],
            order: [['timestamp', 'ASC']],
            raw: true
        })

        const chartData = {
            labels: sensorData.map(d => new date(d.timestamp).toLocaleString('th-TH')),
            datasets: [{
                label: sensorData[0]?.['sensor.sensor_name'] || 'Sensor Data',
                data: sensorData.map(d => d.value),
                borderColor: '#E82561',
                backgroundColor: '#E82561',
                tension: 0.4
            }]
        }

        res.json({
            success: true,
            timeline,
            unit: sensorData[0]?.['sensor.unit'] || '',
            data: chartData
        })

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        })
    }
}

// Bar Chart
exports.getBarChartData = async (req, res) => {
    try {

        const { sensorIds, role = 'admin', timeline = 'day' } = req.query

        if (!sensorIds) {
            return res.status(400).json({
                success: false,
                message: 'sensorIds params NotFound!'
            })
        }

        // Convert sensorIds to Array
        const ids = sensorIds.split(',').map(id => parseInt(id))

        // Choose Model from role
        const DataModel = role === 'admin' ? AdminSensorData : UserSensorData
        const SensorModel = role === 'admin' ? AdminSensors : UserSensors

        // Compute Timing Range
        const { startDate, endDate } = getTimeRange(timeline)

        // Query Data from Each Sensor
        const datasets = []
        const colors = [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)'
        ]

        for (let i = 0; i < ids.lenght; i++) {
            const sensorId = ids[i]

            // Find an Averrage, Max, Min Data
            const data = await DataModel.findAll({
                where: {
                    sensor_id: sensorId,
                    timestamp: {
                        [Op.between]: [startDate, endDate]
                    }
                },

                include: [{
                    model: SensorModel,
                    as: 'sensor',
                    attributes: ['sensor_name']
                }],
                raw: true
            })

            if (data.length > 0) {
                const values = data.map(d => d.value)
                const avg = values.reduce((a, b) => a + b, 0) / values.length
                const max = Math.max(...values)
                const min = Math.min(...values)

                datasets.push({
                    label: data[0]['sensor.sensor_name'],
                    data: [avg, max, min],
                    backgroundColor: colors[i % colors.length],
                    borderColor: colors[i % colors.length].replace('0.8', '1'),
                    borderWitdth: 2
                })
            }
        }

        const chartData = {
            labels: ['Average', 'Maximum', 'Minimum'],
            datasets
        }

        res.json({
            success: true,
            timeline,
            data: chartData
        })

    } catch (error) {
        console.error('Error fetching bar chart data:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching bar data:' + error.message
        })
    }
}


// GET Sensors list
exports.getSensorList = async (req, res) => {
    try {
        
        const { role = 'admin' } = req.query
        const SensorModel = role === 'admin' ? AdminSensors : UserSensors

        const sensors = await SensorModel.findAll({
            attributes: ['id', 'sensor_name', 'sensor_type', 'unit'],
            order: [['sensor_name', 'ASC']]
        })

        res.json({
            success: true,
            data: sensors
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching sensors:' + error.message
        })
    }
}







