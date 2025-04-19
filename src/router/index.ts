import CustomersSettings from "@/outlets/CustomersSettings.vue";
import MetalsList from "@/outlets/MetalsList.vue";
import MetalsSettings from "@/outlets/MetalsSettings.vue";
import TypesList from "@/outlets/TypesList.vue";
import Drawings from "@/views/Drawings.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/drawings", component: Drawings, meta: { title: "Drawings" } },
  {
    path: "/settings",
    component: Settings,
    children: [
      {
        path: "",
        component: CustomersSettings,
        meta: { title: "Settings | Customers" },
      },
      {
        path: "metals",
        component: MetalsSettings,
        children: [
          {
            path: "",
            component: MetalsList,
            meta: { title: "Settings | Metals" },
          },
          {
            path: "types",
            component: TypesList,
            meta: { title: "Settings | Types" },
          },
        ],
      },
      {
        path: "customer/:id",
        component: CustomersSettings,
        meta: { title: "Settings | Customers" },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const title = (to.meta.title as string) || "Draft Master";
  document.title = title;
  next();
});
export default router;
