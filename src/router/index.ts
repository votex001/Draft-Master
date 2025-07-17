import CustomersSettings from "@/outlets/CustomersSettings.vue";
import MetalsList from "@/outlets/MetalsList.vue";
import MetalsSettings from "@/outlets/MetalsSettings.vue";
import TypesList from "@/outlets/TypesList.vue";
import { langService } from "@/translate/lang-service";
import Draft from "@/views/Draft.vue";
import Drafts from "@/views/Drafts.vue";
import Home from "@/views/Home.vue";
import Settings from "@/views/Settings.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  { path: "/drafts", component: Drafts, meta: { title: "drafts" } },
  {
    path: "/settings",
    component: Settings,
    children: [
      {
        path: "",
        component: CustomersSettings,
        meta: { title: "customersSettings" },
      },
      {
        path: "metals",
        component: MetalsSettings,
        children: [
          {
            path: "",
            component: MetalsList,
            meta: { title: "metalsSettings" },
          },
          {
            path: "types",
            component: TypesList,
            meta: { title: "typesSettings" },
          },
        ],
      },
      {
        path: "customer/:id",
        component: CustomersSettings,
        meta: { title: "customerSettings" },
      },
    ],
  },
  {
    path: "/draft",
    children: [
      { path: "new-draft", component: Draft, meta: { title: "newDraft" } },
      { path: ":id", component: Draft },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  const t = langService.translate.value;

  const metaTitleKey = to.meta.title as keyof typeof t.documentTitles;
  document.title = t.documentTitles?.[metaTitleKey] || "Draft Master";
  next();
});
export default router;
