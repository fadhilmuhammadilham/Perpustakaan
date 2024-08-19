<template>
    <div>
        <div class="flex justify-center pt-20">
            <div class="w-3/4 p-x 20 flex flex-col  gap-2 p-5 rounded-badge shadow-lg shadow-teal-500">
                <p class="text-center font-bold text-2xl"> Edit Nama Anda </p>
                <form @submit.prevent="handleUpdate()" action="" >
                    <input type="text" placeholder="Masukan Nama" class="input input-bordered w-full" v-model="userInput.name"/>
                    <div class="flex justify-between items-center px-1">
                        <div>
                            <button >
                            </button>
                        </div>
                        <div class="rounded-full bg-teal-400 hover:bg-teal-300 hover:font-bold text-white py-2 px-5 mt-2">
                            <input type="submit">
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/AuthStore';
import { reactive } from 'vue';

const authStore = useAuthStore();


const userInput = reactive({
    name: ''
}); 

const handleUpdate = () => {
    authStore.updateUser(userInput)
}
</script>