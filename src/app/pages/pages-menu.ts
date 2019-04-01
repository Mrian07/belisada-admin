import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-bar-chart',
    link: '/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  // {
  //   title: 'Event',
  //   icon: 'nb-layout-default',
  //   link: '/event'
  // },
  {
    title: 'Brand',
    icon: 'nb-grid-a-outline',
    children: [
      {
        title: 'List',
        link: '/brand',
      },
      {
        title: 'Approval Brand',
        link: '/brand/manage-brand',
      },
    ],
  },
  {
    title: 'Buyer',
    icon: 'nb-person',
    link: '/buyer',
  },
  {
    title: 'Category',
    icon: 'nb-grid-b-outline',
    link: '/category'
  },
  {
    title: 'Courier',
    icon: 'nb-location',
    link: '/courier'
  },
  {
    title: 'Master Produk',
    icon: 'nb-compose',
    children: [
      {
        title: 'List',
        link: '/master-product',
      },
      {
        title: 'Propose',
        link: '/master-product/propose',
      }
    ],
  },
  {
    title: 'Orders',
    icon: 'nb-roller-shades',
    link: '/orders'
  },
  {
    title: 'Product',
    icon: 'nb-coffee-maker',
    link: '/product'
  },
  {
    title: 'Spec',
    icon: 'nb-list',
    link: '/spec/value'
  },
  {
    title: 'Store',
    icon: 'nb-e-commerce',
    link: '/store'
  },
  {
    title: 'Withdrawal',
    icon: 'nb-loop',
    children: [
      {
        title: 'List',
        link: '/withdrawal',
      },
      {
        title: 'History',
        link: '/withdrawal/history',
      },
    ],
  },

];
