<template>
    <div v-if="isModal">
        <base-modal @close="isModal = false">
            <template #body>
                <h3>content</h3>
            </template>
            <template #footer>
                <base-button @click="isModal = false">
                    close
                </base-button>
                <base-button variants="danger" @click="handleLogout">
                    Logout
                </base-button>
            </template>
        </base-modal>
    </div>
    <aside :class="modalStatues.isStatus ? 'sidebar' : 'sidebar closed '">
        <div class="p-3 pt-5">
            <h6 class="text-uppercase text-secondary mb-3">Admin</h6>

            <ul class="nav nav-pills flex-column gap-1">
                <li class="nav-item">
                    <RouterLink class="nav-link active" to="/"> <i class="bi bi-speedometer me-2"></i>Dashboard
                    </RouterLink>
                </li>

                <li class="nav-item">
                    <a class="nav-link d-flex justify-content-between align-items-center" href="#articleCollapse"
                        data-bs-toggle="collapse" role="button" aria-expanded="false" aria-controls="articleCollapse">
                        My Article
                        <i class="bi bi-chevron-down"></i>
                    </a>

                    <div class="collapse" id="articleCollapse">
                        <ul class="nav flex-column ms-3 mt-1">
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/article">All Article</RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink class="nav-link" to="/article/create">Create Article</RouterLink>
                            </li>
                        </ul>
                    </div>
                </li>

                <!-- Logout -->
                <li class="nav-item mt-3">
                    <base-button type="button" @click="statusModal">Logout</base-button>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
import { useSideStatusStore } from '@/stores/sidebarStatus';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
let modalStatues = useSideStatusStore();
let isModal = ref(false);
const auth = useAuthStore();
const router = useRouter();
function statusModal() {
    isModal.value = !isModal.value
}
async function handleLogout() {
    try {
        await auth.logout()
        alert("logout success!!")
        router.push('/login');
    }
    catch (err) {
        console.log(err);
    }
    finally {

    }
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 56px;
    left: 0;
    width: 250px;
    height: calc(100vh - 56px);
    background-image: linear-gradient(#FFC0D6, #E0709F);
    color: #fff;
    transition: transform 0.3s ease;
    overflow-y: auto;
}

.sidebar.closed {
    transform: translateX(-250px);
}

.nav-link {
    color: #ffffff;
    font-weight: 500;
}

.nav-link.active,
.nav-link:hover {
    color: #fff;
    background-image: linear-gradient(#C850C0, #5772f9);
}

.sidebar .text-secondary {
    color: rgba(255, 255, 255, 0.75) !important;
}

/* Make buttons inside the sidebar show a filled blue background on hover/focus */
.sidebar .btn,
.sidebar button {
    color: #fff;
    background-color: transparent;
    border-color: rgba(255, 255, 255, 0.15);
    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.sidebar .btn:hover,
.sidebar button:hover,
.sidebar .btn:focus,
.sidebar button:focus,
.sidebar .btn:focus-visible,
.sidebar button:focus-visible {
    background-color: #0b5ed7;
    color: #fff;
    border-color: #0b5ed7;
}
</style>
