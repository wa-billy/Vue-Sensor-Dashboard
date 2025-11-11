<template>
    <div>
        <div class="drawer lg:drawer-open font-display relative">
            <!-- Background Layer with Transition -->
             <div class="fixed inset-0 z-10">
                <!-- Light Background -->
                 <div
                 class="absolute inset-0 bg-[url('./light.png')] bg-auto 
                 transition-opacity duaration-300 ease-in-out"
                 :class="isDark ? 'opacity-0' : 'opacity-100'">
                 </div>
                 <!-- Dark Background -->
                  <div 
                  class="absolute inset-0 bg-[url('./bgImage.svg')] bg-auto
                  transition-opacity duration-300 ease-in-out"
                  :class="isDark ? 'opacity-100' : 'opacity-0'">
                  </div>
             </div>
            <input type="checkbox" id="my-drawer" class="drawer-toggle">
            <!-- Page Content -->
            <div class="drawer-content flex flex-col">
                <Navbar :isDark="isDark" @toggle-drawer="toggleDrawer" @toggle-theme="toggleTheme"/>
                <!-- Main Content -->
                <main class="flex-1 p-6 bg-base-200 dark:bg-backgroundDark">
                    <RouterView />
                </main>
            </div>
            
            <Sidebar />
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Navbar from './components/Navbar.vue';
import Sidebar from './components/Sidebar.vue';

const isDark = ref(true)

onMounted(() => {
    const savedtheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia("(prefers-color-scheme:dark)").matches

    if (savedtheme) {
        isDark.value = savedtheme === 'dark' 
    } else if (systemDark) {
        isDark.value = true 
    }
});

watchEffect(() => {
    const html = document.documentElement
    if (isDark.value) {
        html.setAttribute('data-theme', 'dark')
        localStorage.setItem('theme', 'dark')
    } else {
        html.setAttribute('data-theme', 'light')
        localStorage.setItem('theme', 'light')
    }
})

const toggleTheme = () => {
    isDark.value = !isDark.value
}
const toggleDrawer = () => {
    const drawer = document.getElementById('my-drawer')
    if (drawer) {
        drawer.checked = !drawer.checked
    }
}

</script>
