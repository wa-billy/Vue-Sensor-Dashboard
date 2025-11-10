import { defineStore } from "pinia";
import { ref, computed  } from 'vue'

export const navigate = defineStore('navigation', () => {
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

    const isSidebarOpen = ref(false)

    const openLinks = computed(() => {
        return links.value.filter(link => link.open)
    })

    function toggleSubMenu(index) {
        links.value[index].open = !links.value[index].open
    }

    function closeAllSubMenu() {
        links.value.forEach(link => {
            link.open = false
        })
    }

    function toggleSidebar() {
        isSidebarOpen.value = false
    }

    function closeSidebar() {
        isSidebarOpen.value = false
    }

    function saveState() {
        const state = links.value.map(link => ({
            name: link.name,
            open: link.open
        }))

        localStorage.setItem('navigaitonsState', JSON.stringify(state))
    }

    function loadState() {
        const saved = localStorage.getItem('navigationsState')
        if (saved) {
            const state = JSON.parse(saved)
            state.forEach((savedLink) => {
                const link = links.value.find(l => l.name === savedLink.name)
                if (link) {
                    link.open = savedLink.open
                }
            })
        }
    }

    return {
        links,
        isSidebarOpen,
        openLinks,
        toggleSubMenu,
        closeAllSubMenu,
        toggleSidebar,
        closeSidebar,
        saveState,
        loadState      
    }
})