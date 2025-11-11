<template>
    <div>
        
    </div>
</template>
<script setup>
import { Line } from 'vue-chartjs'
import { ref, onMounted } from 'vue'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement
} from 'chart.js'

ChartJS.register([
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement
])

const lineChartKey = ref(0)

const lineChartData = ref({
    labels: []
})
</script>