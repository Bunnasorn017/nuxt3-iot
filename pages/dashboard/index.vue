<!-- <template>
  <div class="grid gap-8 h-screen w-full">
    <header class="">
      <div class="grow">
        <h1>Dashboard</h1>
        <p>All information hydroponic management</p>
      </div>
      <div class="w-full h-[400px] bg-neutral-200">
        dftherh
      </div>
    </header>

    <main class="grid gap-2">
      <div class="flex items-center gap-4">
        <div v-for='(item, index) in 4' :key=index class="w-full h-[260px] bg-neutral-200"></div>
      </div>
      <section>
        Chart
      </section>
    </main>

    <footer>
      copyright
    </footer>
  </div>
</template>

<script setup lang="ts">
import { definePageMeta } from "~/node_modules/nuxt/dist/pages/runtime/composables";

definePageMeta({
  middleware: "auth",
  layout: "default",
});

function logout() {
  localStorage.removeItem("token");
  navigateTo("/");
}

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigateTo("/");
  }
});
</script> -->

<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-6">
    <header class="mb-8">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-gray-800">Hydroponic Dashboard</h1>
          <p class="text-gray-600 mt-1">Real-time IoT Device Monitoring</p>
        </div>
        <div class="flex items-center gap-3">
          <span :class="`px-2 py-1 rounded-full text-sm ${
            mqttConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`">
            {{ mqttConnected ? 'Connected' : 'Disconnected' }}
          </span>
          <button @click="logout" class="mt-4 md:mt-0 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2">
            <LogOut class="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      <!-- Main Status Card -->
      <div class="bg-white rounded-xl shadow-sm p-4 md:p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="bg-blue-50 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <Thermometer class="w-5 h-5 text-blue-600" />
              <h3 class="text-blue-800 font-semibold">Temperature</h3>
            </div>
            <div class="mt-2 flex items-baseline">
              <span class="text-2xl font-bold text-blue-600">{{ sensorData.temperature }}°C</span>
              <span class="ml-2 text-sm text-blue-500 flex items-center">
                <TrendingUp class="w-4 h-4 mr-1" />
                {{ sensorData.temperatureChange }}%
              </span>
            </div>
          </div>
          <div class="bg-green-50 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <Droplets class="w-5 h-5 text-green-600" />
              <h3 class="text-green-800 font-semibold">Humidity</h3>
            </div>
            <div class="mt-2 flex items-baseline">
              <span class="text-2xl font-bold text-green-600">{{ sensorData.humidity }}%</span>
              <span class="ml-2 text-sm text-green-500 flex items-center">
                <CheckCircle class="w-4 h-4 mr-1" />
                {{ getHumidityStatus }}
              </span>
            </div>
          </div>
          <div class="bg-purple-50 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <FlaskConical class="w-5 h-5 text-purple-600" />
              <h3 class="text-purple-800 font-semibold">pH Level</h3>
            </div>
            <div class="mt-2 flex items-baseline">
              <span class="text-2xl font-bold text-purple-600">{{ sensorData.ph }}</span>
              <span class="ml-2 text-sm text-purple-500 flex items-center">
                <Check class="w-4 h-4 mr-1" />
                {{ getPhStatus }}
              </span>
            </div>
          </div>
          <div class="bg-orange-50 p-4 rounded-lg">
            <div class="flex items-center gap-2">
              <Beaker class="w-5 h-5 text-orange-600" />
              <h3 class="text-orange-800 font-semibold">Nutrient Level</h3>
            </div>
            <div class="mt-2 flex items-baseline">
              <span class="text-2xl font-bold text-orange-600">{{ sensorData.nutrientPpm }} PPM</span>
              <span class="ml-2 text-sm text-orange-500 flex items-center">
                <ThumbsUp class="w-4 h-4 mr-1" />
                {{ getNutrientStatus }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main class="grid gap-6">
      <!-- Device Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(device, index) in devices" :key="index" 
             class="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-2">
              <Cpu class="w-5 h-5 text-gray-600" />
              <h3 class="font-semibold text-gray-800">Device {{ index + 1 }}</h3>
            </div>
            <span :class="`px-2 py-1 text-sm rounded-full flex items-center gap-1 ${
              device.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`">
              <Activity class="w-3 h-3" />
              {{ device.isActive ? 'Active' : 'Inactive' }}
            </span>
          </div>
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 flex items-center gap-1">
                <Info class="w-4 h-4" />
                Status
              </span>
              <span class="text-gray-800">{{ device.isActive ? 'Operating' : 'Standby' }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-600 flex items-center gap-1">
                <Clock class="w-4 h-4" />
                Last Update
              </span>
              <span class="text-gray-800">{{ device.lastUpdate }}</span>
            </div>
            <div class="pt-2 mt-2 border-t">
              <button
                @click="toggleDevice(index)"
                :class="`w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                  device.isActive 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`"
              >
                <Power class="w-4 h-4" />
                {{ device.isActive ? 'Turn Off' : 'Turn On' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Chart Section -->
      <section class="bg-white p-4 md:p-6 rounded-xl shadow-sm">
        <div class="flex items-center gap-2 mb-4">
          <LineChart class="w-6 h-6 text-gray-700" />
          <h2 class="text-xl font-semibold text-gray-800">Performance Metrics</h2>
        </div>
        <div class="h-[300px]">
          <LineChart :data="chartData" />
        </div>
      </section>
    </main>

    <footer class="mt-8 py-4 text-center text-gray-600 border-t">
      <p>&copy; {{ new Date().getFullYear() }} Hydroponic Management System. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { definePageMeta } from '#imports'
import { useRouter } from 'vue-router'
import mqtt from 'mqtt'
import { 
  Thermometer, 
  Droplets, 
  FlaskConical, 
  Beaker, 
  CheckCircle, 
  Check, 
  ThumbsUp, 
  TrendingUp,
  Cpu,
  Activity,
  Info,
  Clock,
  LineChart,
  LogOut,
  Power
} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const router = useRouter()
const mqttClient = ref<any>(null)
const mqttConnected = ref(false)

// Sensor data state
const sensorData = ref({
  temperature: 25.6,
  temperatureChange: 2.1,
  humidity: 68,
  ph: 6.5,
  nutrientPpm: 820,
  history: [] as any[]
})

// Devices state
const devices = ref([
  { isActive: true, lastUpdate: '2 min ago' },
  { isActive: true, lastUpdate: '2 min ago' },
  { isActive: true, lastUpdate: '2 min ago' },
  { isActive: true, lastUpdate: '2 min ago' }
])

// Computed properties for status messages
const getHumidityStatus = computed(() => {
  const humidity = sensorData.value.humidity
  if (humidity >= 60 && humidity <= 70) return 'Optimal'
  if (humidity < 60) return 'Low'
  return 'High'
})

const getPhStatus = computed(() => {
  const ph = sensorData.value.ph
  if (ph >= 6.0 && ph <= 7.0) return 'Normal'
  if (ph < 6.0) return 'Low'
  return 'High'
})

const getNutrientStatus = computed(() => {
  const ppm = sensorData.value.nutrientPpm
  if (ppm >= 700 && ppm <= 1000) return 'Good'
  if (ppm < 700) return 'Low'
  return 'High'
})

// Chart data computed property
const chartData = computed(() => {
  return {
    labels: sensorData.value.history.map(h => h.time),
    datasets: [
      {
        label: 'Temperature',
        data: sensorData.value.history.map(h => h.temperature),
        borderColor: 'rgb(59, 130, 246)',
        tension: 0.1
      },
      {
        label: 'Humidity',
        data: sensorData.value.history.map(h => h.humidity),
        borderColor: 'rgb(34, 197, 94)',
        tension: 0.1
      }
    ]
  }
})

// MQTT setup
function setupMQTT() {
  const brokerUrl = 'ws://your-mqtt-broker:port' // Replace with your MQTT broker
  
  mqttClient.value = mqtt.connect(brokerUrl, {
    clientId: `hydroponic_dashboard_${Math.random().toString(16).substr(2, 8)}`,
    username: 'your_username', // Replace with your credentials
    password: 'your_password'
  })

  mqttClient.value.on('connect', () => {
    console.log('Connected to MQTT broker')
    mqttConnected.value = true
    subscribeToPics()
  })

  mqttClient.value.on('message', (topic: string, message: Buffer) => {
    const payload = JSON.parse(message.toString())
    handleMQTTMessage(topic, payload)
  })

  mqttClient.value.on('error', (error: Error) => {
    console.error('MQTT Error:', error)
    mqttConnected.value = false
  })
}

function subscribeToPics() {
  const topics = [
    'hydroponics/sensors/temperature',
    'hydroponics/sensors/humidity',
    'hydroponics/sensors/ph',
    'hydroponics/sensors/nutrients',
    'hydroponics/devices/+/status'
  ]
  
  topics.forEach(topic => {
    mqttClient.value.subscribe(topic, (err: Error) => {
      if (err) console.error('Subscription error:', err)
    })
  })
}

function handleMQTTMessage(topic: string, payload: any) {
  if (topic.startsWith('hydroponics/sensors/')) {
    updateSensorData(topic, payload)
  } else if (topic.startsWith('hydroponics/devices/')) {
    updateDeviceStatus(topic, payload)
  }
}

function updateSensorData(topic: string, payload: any) {
  const sensorType = topic.split('/').pop()
  if (!sensorType) return

  switch (sensorType) {
    case 'temperature':
      sensorData.value.temperature = payload.value
      sensorData.value.temperatureChange = payload.change
      break
    case 'humidity':
      sensorData.value.humidity = payload.value
      break
    case 'ph':
      sensorData.value.ph = payload.value
      break
    case 'nutrients':
      sensorData.value.nutrientPpm = payload.value
      break
  }

  // Update history for charts
  sensorData.value.history.push({
    time: new Date().toLocaleTimeString(),
    temperature: sensorData.value.temperature,
    humidity: sensorData.value.humidity
  })

  // Keep last 10 readings
  if (sensorData.value.history.length > 10) {
    sensorData.value.history.shift()
  }
}

function updateDeviceStatus(topic: string, payload: any) {
  const deviceId = parseInt(topic.split('/')[2]) - 1
  if (deviceId >= 0 && deviceId < devices.value.length) {
    devices.value[deviceId].isActive = payload.active
    devices.value[deviceId].lastUpdate = 'Just now'
  }
}

function toggleDevice(index: number) {
  devices.value[index].isActive = !devices.value[index].isActive
  devices.value[index].lastUpdate = 'Just now'
  
  // Publish device state change
  if (mqttClient.value && mqttConnected.value) {
    mqttClient.value.publish(
      `hydroponics/devices/${index + 1}/control`,
      JSON.stringify({ active: devices.value[index].isActive })
    )
  }
}

function logout() {
  if (mqttClient.value) {
    mqttClient.value.end()
  }
  localStorage.removeItem('token')
  router.push('/')
}

// Lifecycle hooks
onMounted(() => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/')
    return
  }
  setupMQTT()
})

onUnmounted(() => {
  if (mqttClient.value) {
    mqttClient.value.end()
  }
})
</script>