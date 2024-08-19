<template>
    <div class="flex flex-col items-center mt-5 w-full">
        <div class="w-full flex justify-end mr-10"
            v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'">
            <RouterLink :to="{ name: 'addCategori' }" class="fill-white bg-teal-500 p-2 rounded-full hover:bg-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 current-fill">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
            </RouterLink>
        </div>
        <span v-if="loading" class="loading loading-dots loading-lg mt-40 "></span>
        <div v-if="!loading"class="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            <div v-for="categori in categoris" :key="categori.id" class="card w-96 shadow-xl">
                <div class="card-body rounded">
                    <div class="flex justify-between">
                        <h2 class="card-title text-2xl">{{ categori.name }}</h2>
                        <div class="card-actions justify-end">
                            <RouterLink :to="{ name: 'updateCategori', params: { id: categori.id } }"
                                v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'"
                                class="flex items-center justify-center bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-400 fill-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-3 current-fill">
                                    <path
                                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                            </RouterLink>
                            <button v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'"
                                @click="deleteCategori(categori.id)"
                                class="flex items-center justify-center bg-red-500 text-white p-2 rounded-full hover:bg-red-400 fill-white">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-3 current-fill">
                                    <path
                                        d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex justify-end gap-1 mt-5">
                        <div class="card-actions justify-center">
                            <RouterLink :to="{ name: 'detailCategori', params: { id: categori.id } }"
                                class="btn bg-teal-500 hover:bg-teal-400 hover:font-bold text-white">Detail
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { customApi } from '@/api';
import { RouterLink } from 'vue-router';
import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();
const categoris = ref([]);
const loading = ref(true);

const fetchCategories = async () => {
    try {
        const { data } = await customApi.get('/categori')

        categoris.value = data.data
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
}

const deleteCategori = async (dataId) => {
    try {
        await customApi.post(`/categori/${dataId}?_method=DELETE`, null, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`
            }
        });
        fetchCategories();
    } catch (error) {
        console.log(error);

    }
}

onMounted(() => {
    fetchCategories()
})
</script>
