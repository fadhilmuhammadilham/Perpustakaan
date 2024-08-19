<template>
    <div class="flex flex-col items-center mt-10">
        <div class="flex justify-end pr-10 w-full">
            <RouterLink :to="{ name: 'addBook' }"
                v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'"
                class="fill-white bg-teal-500 p-2 rounded-full hover:bg-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-5 current-fill">
                    <path
                        d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z" />
                </svg>
            </RouterLink>
        </div>
        <span v-if="loading" class="loading loading-dots loading-lg mt-40"></span>
        <div v-if="!loading" v-for="(books, category) in booksByCategory" :key="category"
            class="w-3/4 shadow-xl p-5 rounded-xl border mt-10">
            <p class="uppercase font-bold text-2xl flex justify-center">{{ category }}</p>
            <div v-for="book in books" :key="book.id" class="mt-3">
                <div v-if="book" class="flex flex-col sm:flex-row items-center justify-between border-b py-2">
                    <div class="flex flex-col sm:flex-row items-center">
                        <img :src="book.image" alt="Book Image"
                            class="w-20 h-30 object-cover mr-0 sm:mr-4 mb-4 sm:mb-0">
                        <div class="flex flex-col w-full">
                            <p class="font-bold text-start mt-2">{{ book.title }}</p>
                            <div class="flex gap-2">
                                <p class="font-semibold text-gray-500">Stok:</p>
                                <p class="font-semibold ">{{ book.stok }}</p>
                            </div>
                            <p class="text-gray-700 text-left">{{ book.summary }}</p>
                        </div>
                    </div>
                    <div class="flex flex-col-reverse sm:flex-col items-end gap-5 w-full sm:w-1/4 mt-3 sm:mt-0">
                        <div v-if="authStore.currentUser && authStore.currentUser.role.name === 'owner'"
                            class="flex gap-2">
                            <button @click="deleteBook(book.id)"
                                class="bg-red-500 p-2 rounded-full fill-white hover:bg-red-400 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 current-fill">
                                    <path
                                        d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z" />
                                </svg>
                            </button>
                            <RouterLink :to="{ name: 'updateBook', params: { id: book.id } }"
                                class="bg-yellow-500 p-2 rounded-full fill-white hover:bg-yellow-400 cursor-pointer flex justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="w-4 current-fill">
                                    <path
                                        d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                                </svg>
                            </RouterLink>
                        </div>
                        <div class="flex flex-col gap-2">
                            <div
                                class="cursor-pointer bg-teal-500 py-2 px-4 rounded-full font-semibold text-white hover:bg-teal-400 hover:font-bold text-nowrap">
                                <RouterLink :to="{ name: 'detailBook', params: { id: book.id } }">Detail Buku
                                </RouterLink>
                            </div>
                            <div v-if="authStore.currentUser">
                                <div
                                    class="cursor-pointer bg-teal-500 py-2 px-4 rounded-full font-semibold text-white hover:bg-teal-400 hover:font-bold text-nowrap">
                                    <button @click="borrowBook(book.id)">Pinjam Buku</button>
                                </div>
                            </div>
                            <div v-else>
                                <div
                                    class="cursor-pointer bg-teal-500 py-2 px-4 rounded-full font-semibold text-white hover:bg-teal-400 hover:font-bold text-nowrap">
                                    <button @click="noAuth()">Pinjam Buku</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { customApi } from '@/api';
import { ref, onMounted, computed } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { RouterLink } from 'vue-router';

const authStore = useAuthStore();
const books = ref([]);
const loading = ref(true);

const fetchBooks = async () => {
    try {
        const response = await customApi.get('/book');
        books.value = response.data.body;
    } catch (error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
};

const deleteBook = async (bookId) => {
    try {
        await customApi.post(`/book/${bookId}?_method=DELETE`, null, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`
            }
        });
        fetchBooks();
    } catch (error) {
        console.error(error);
    }
};

const borrowBook = async (bookId) => {
    try {
        const loadDate = new Date().toISOString();
        await customApi.post('/borrow', {
            load_date: loadDate,
            book_id: bookId
        }, {
            headers: {
                Authorization: `Bearer ${authStore.tokenUser}`
            }
        });
        alert('Buku berhasil dipinjam!');
        fetchBooks();
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    fetchBooks();
});

const booksByCategory = computed(() => {
    const map = {};
    books.value.forEach((book) => {
        const categoryName = book.categori?.name || 'Unknown';
        if (!map[categoryName]) {
            map[categoryName] = [];
        }
        map[categoryName].push(book);
    });
    return map;
});

const noAuth = () => {
    alert('Anda harus login terlebih dahulu')
}
</script>
