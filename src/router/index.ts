import { createRouter, createWebHashHistory, } from 'vue-router';

const routes = [
    {
        path: '/model',
        component: () => import('@/views/model/index.vue')
    },{
        path: '/agent',
        component: () => import('@/views/agent/edit.vue')
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
