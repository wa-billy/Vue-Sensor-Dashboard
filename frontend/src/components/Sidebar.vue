<template>
    <aside class="drawer-side bg-white dark:bg-backgroundDark border-r 
    border-gray-200 dark:border-primary/10">
        <label for="my-drawer" aria-label="Close sidebar" class="drawer-overlay">
            <nav class="menu p-4 w-60 min-h-full text-gray-800 dark:text-gray-200" aria-label="Main navigation">
                <header>
                    <h1 class="text-xl ml-5 font-bold dark:text-white">Sensor Dashboard</h1>
                </header>

                <ul role="menu" class="mt-5">
                    <li role="none" class="p-2" v-for="(link, index) in links" :key="index">
                        <button role="menuItem" 
                            :aria-expanded="!!link.children && link.open"
                            :aria-haspopup="!!link.children" 
                            :class="{ 'active': link.active }" 
                            @click="handleMenuClick(link, index)"
                            class="flex items-center w-full text-left hover:bg-gray-100
                        dark:hover:bg-white dark:hover:text-black dark:text-white">
                            <Icon :icon="link.icon" class="h-5 w-5" />
                            <span class="ml-2">{{ link.name }}</span>
                            <span v-if="link.children" class="ml-auto dropdown-icon">
                                <Icon :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'" />
                            </span>
                        </button>
                        <ul v-if="link.children && link.open"
                            class="ml-4 pl-4 border-l border-gray-200 dark:border-white/10">
                            <li v-for="(child, childIndex) in link.children" :key="childIndex">
                                <RouterLink :to="child.path" class="block py-1 hover:bg-gray-100 dark:hover:bg-white/10
                               text-black dark:text-white">
                                    {{ child.name }}
                                </RouterLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </label>
    </aside>
</template>
<script setup>
import { Icon } from '@iconify/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    console.log();

})

const links = ref([
    {
        name: 'Home',
        icon: 'line-md:home',
        active: false,
        open: false,
        path: '/'
    },
    {
        name: 'My Sensors',
        icon: 'icon-park-outline:chart-line',
        active: false,
        open: false,
        path: '/mysensor'
    },
    {
        name: 'Reports',
        icon: 'line-md:document-list',
        active: false,
        open: false,
        path: ''
    },
    {
        name: 'Contact',
        icon: 'line-md:email-alert',
        active: false,
        open: false,
        path: '/contact'
    },
    {
        name: 'About us',
        icon: 'line-md:person-search',
        active: false,
        open: false,
        path: '/about'
    },
    {
        name: 'Settings',
        icon: 'line-md:cog-filled',
        active: false,
        open: false,
        path: '/setting'
    },
])

const handleMenuClick = (link, index) => {
    if (link.children) {
        links.value[index].open = !links.value[index].open
    } else if (link.path) {
        router.push(link.path)
    }

    links.value.forEach((link, i) => {
        link.active = i === index
    })
}

const setActive = (index) => {
    // Toggle open state for items Children
    // if (links.value[index].children) {
    //     links.value[index].open = !links.value[index].open
    // }

    // Set active state
    links.value.forEach((link, i) => {
        link.active = i === index
    })

}

const toggleDropdown = (index) => {
    if (links.value[index].children) {
        links.value[index].open = !links.value[index].open
    }
}

const navigate = (path) => {
    if (path) {
        router.push(path)
    }
}
</script>
