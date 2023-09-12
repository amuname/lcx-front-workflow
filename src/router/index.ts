import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import HomeTriggersMenu from "@/views/HomeTriggersMenu.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
    children: [
      {
        path: "script_menu",
        name: "HomeScriptMenu",
        component: () => import("@/views/HomeScriptMenu.vue"),
      },
      {
        path: "testing_menu",
        name: "HomeTestingMenu",
        component: () => import("@/views/HomeTestingMenu.vue"),
      },
      {
        path: "triggers_menu",
        name: "HomeTriggersMenu",
        component: HomeTriggersMenu,
      },
    ],
  },
  {
    path: "/workflow",
    name: "WorkflowView",
    component: () => import("@/views/WorkflowView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem("access_token")) return next();
});

export default router;
