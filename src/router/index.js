import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import App from '../App.vue'
import ImportPage from '../views/ImportPage.vue'
import ExportPage from '../views/ExportPage.vue'
import About from '../views/About.vue'
import ImportItemForm from '../views/ImportItemForm.vue'
import ExportItemForm from '../views/ExportItemForm.vue'
import Report from '../views/Report.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/import', component: ImportPage },
  { path: '/export', component: ExportPage },
  { path: '/report', component: Report },
  { path: '/import/form/:type/:name', component: ImportItemForm, props: true },
  { path: '/export/form/:type/:name', component: ExportItemForm, props: true },
  // Admin parent with nested tabs
  {
    path: '/admin',
    component: () => import('../views/admin/Admin.vue'),
    children: [
      { path: '', redirect: '/admin/attendance' },
      { path: 'attendance', component: () => import('../views/admin/AdminAttendance.vue') },
      { path: 'staff', component: () => import('../views/admin/AdminStaff.vue') },
      { path: 'report', component: () => import('../views/admin/AdminReport.vue') }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})