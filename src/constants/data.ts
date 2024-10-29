import { NavItem } from '@/types/nav-item';
export const navItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/admin',
        icon: 'dashboard',
        label: 'Dashboard'
    },
    {
        title: 'Users',
        href: '/admin/users',
        icon: 'user',
        label: 'users'
    },
    {
        title: 'Orders',
        href: '/admin/orders',
        icon: 'receipt',
        label: 'orders'
    },
    {
        title: 'Product',
        href: '/admin/products',
        icon: 'product',
        label: 'product'
    },
    {
        title: 'Brand',
        href: '/admin/brands',
        icon: 'brand',
        label: 'brand'
    },
    {
        title: 'Category',
        href: '/admin/categories',
        icon: 'category',
        label: 'category'
    },
    {
        title: 'Account',
        icon: 'user',
        label: 'account',
        children: [
            {
                title: 'Profile',
                href: '/admin/profile',
                icon: 'userPen',
                label: 'profile'
            },
            {
                title: 'Login',
                href: '/',
                icon: 'login',
                label: 'login'
            }
        ]
    },
    {
        title: 'Kanban',
        href: '/admin/kanban',
        icon: 'kanban',
        label: 'kanban'
    }
];

export const SUCCESS_MESSAGE = "Payment successful";
export const ERROR_MESSAGE = "Payment has an error"