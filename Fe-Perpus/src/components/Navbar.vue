<template>
    <div class="navbar bg-base-100">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li>
                        <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                    </li>
                    <li>
                        <a>Buku</a>
                        <ul class="p-2">
                            <li><RouterLink :to="{name: 'allBook'}">Semua Buku</RouterLink></li>
                            <li><Routerlink :to="{name: 'borrowBook'}">Pinjaman</Routerlink></li>
                        </ul>
                    </li>
                    <li><a>Categori</a></li>
                </ul>
            </div>
            <RouterLink :to="{ name: 'home' }" class="btn btn-ghost text-xl cursor-pointer">Perpustakaan</RouterLink>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-2">
                <li>
                    <RouterLink :to="{ name: 'home' }">Home</RouterLink>
                </li>
                <li>
                    <details>
                        <summary>Buku</summary>
                        <ul class="p-2">
                            <li><RouterLink :to="{name: 'allBook'}">Semua Buku</RouterLink></li>
                            <li><RouterLink :to="{name: 'borrowBook'}">Pinjaman</RouterLink></li>
                        </ul>
                    </details>
                </li>
                <li><RouterLink :to="{name: 'allCategori'}">Kategori</RouterLink></li>
            </ul>
        </div>
        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component"
                            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li v-if="authStore.currentUser">
                        <RouterLink :to="{name: 'profile'}" class="justify-between">
                            Profile
                        </RouterLink>
                    </li>
                    <li v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'">
                        <RouterLink :to="{name: 'allRole'}" class="justify-between">
                            Role
                        </RouterLink>
                    </li>
                    <li v-if="!authStore.currentUser">
                        <RouterLink :to="{ name: 'register' }">Register</RouterLink>
                    </li>
                    <li v-if="!authStore.currentUser">
                        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
                    </li>
                    <li v-if="authStore.currentUser" @click="handleLogout"><p>Logout</p></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const handleLogout = () => {
    authStore.logoutUser()
}
</script>