import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import App from '../App.vue'
import ImportPage from '../views/ImportPage.vue'
import ExportPage from '../views/ExportPage.vue'
import About from '../views/About.vue'
import ExportAnimalDetail from '../views/ExportAnimalDetail.vue'
import ExportFruitDetail from '../views/ExportFruitDetail.vue'
import ExportFertilizerDetail from '../views/ExportFertilizerDetail.vue'
import ImportItemForm from '../views/ImportItemForm.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/about', component: About },
  { path: '/import', component: ImportPage },
  { path: '/export', component: ExportPage },
  { path: '/export/:animal', component: ExportAnimalDetail, props: true },
  { path: '/export-fruit/:fruit', component: ExportFruitDetail, props: true },
  { path: '/export-fertilizer/:fertilizer', component: ExportFertilizerDetail, props: true },
  { path: '/import/form/:type/:name', component: ImportItemForm, props: true },
]

export default createRouter({
  history: createWebHistory(),
  routes
})