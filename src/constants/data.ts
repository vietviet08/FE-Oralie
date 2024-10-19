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
