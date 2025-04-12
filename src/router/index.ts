import CustomersSettings from "@/outlets/CustomersSettings.vue";
import MetalsList from "@/outlets/MetalsList.vue";
import MetalsSettings from "@/outlets/MetalsSettings.vue";
import TypesList from "@/outlets/TypesList.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/drawings", component: Home },
  {
    path: "/settings",
    component: Settings,
    children: [
      { path: "", component: CustomersSettings },
      {
        path: "metals",
        component: MetalsSettings,
        children: [
          { path: "", component: MetalsList },
          { path: "types", component: TypesList },
        ],
      },
      { path: "customer/:id", component: CustomersSettings },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
