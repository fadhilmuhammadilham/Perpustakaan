import { useAuthStore } from '@/stores/AuthStore'
import LoginView from '@/views/auth/LoginView.vue'
import RegisterView from '@/views/auth/RegisterView.vue'
import UpdateProfileView from '@/views/auth/UpdateProfileView.vue'
import UpdateUserView from '@/views/auth/UpdateUserView.vue'
import AddBookView from '@/views/buku/AddBookView.vue'
import AllBookView from '@/views/buku/AllBookView.vue'
import BorrowBookView from '@/views/buku/BorrowBookView.vue'
import DetailBookView from '@/views/buku/DetailBookView.vue'
import UpdateBookView from '@/views/buku/UpdateBookView.vue'
import AddCategoriView from '@/views/categori/AddCategoriView.vue'
import AllCategoriView from '@/views/categori/AllCategoriView.vue'
import DetailCategoriView from '@/views/categori/DetailCategoriView.vue'
import UpdateCategoriView from '@/views/categori/UpdateCategoriView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import AddroleView from '@/views/role/AddroleView.vue'
import AllroleView from '@/views/role/AllroleView.vue'
import UpdateRoleView from '@/views/role/UpdateRoleView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { isAuthTrue: true }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { isAuthTrue: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: { notAuth: true }
    },
    {
      path: '/update-user',
      name: 'updateUser',
      component: UpdateUserView,
      meta: { notAuth: true }
    },
    {
      path: '/update-profile',
      name: 'updateProfile',
      component: UpdateProfileView,
      meta: { notAuth: true }
    },
    {
      path: '/all-book',
      name: 'allBook',
      component: AllBookView
    },
    {
      path: '/add-book',
      name: 'addBook',
      component: AddBookView,
      meta: { isAdmin: true }
    },
    {
      path: '/detail-book/:id',
      name: 'detailBook',
      component: DetailBookView,
    },
    {
      path: '/update-book/:id',
      name: 'updateBook',
      component: UpdateBookView,
      meta: { isAdmin: true }
    },
    {
      path: '/borrow-book',
      name: 'borrowBook',
      component: BorrowBookView,
      meta: { notAuth: true }
    },
    {
      path: '/all-categori',
      name: 'allCategori',
      component: AllCategoriView
    },
    {
      path: '/add-categori',
      name: 'addCategori',
      component: AddCategoriView,
      meta: { isAdmin: true }
    },
    {
      path: '/detail-categori/:id',
      name: 'detailCategori',
      component: DetailCategoriView,
    },
    {
      path: '/update-categori/:id',
      name: 'updateCategori',
      component: UpdateCategoriView,
      meta: { isAdmin: true }
    },
    {
      path: '/all-role',
      name: 'allRole',
      component: AllroleView,
      meta: { isAdmin: true }
    },
    {
      path: '/add-role',
      name: 'addRole',
      component: AddroleView,
      meta: { isAdmin: true }
    },
    {
      path: '/update-role/:id',
      name: 'updateRole',
      component: UpdateRoleView,
      meta: { isAdmin: true }
    },
  ]
})

router.beforeEach(async (to, from) => {
  const authStore = await useAuthStore()
  if (to.meta.isAuthTrue && authStore.tokenUser) {
    alert('Anda sudah melakukan Login/Regiter')
    return {
      path: '/'
    }
  }
  if (to.meta.notAuth && !authStore.tokenUser) {
    alert('Anda blm melakukan Login/Regiter')
    return {
      path: '/login'
    }
  }
  if (to.meta.isAdmin && !authStore.currentUser.role.name === 'owner') {
    alert('Anda tidak bisa akses halaman ini')
    return {
      path: '/'
    }
  }
})

export default router
