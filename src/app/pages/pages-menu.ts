import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'FEATURES',
    group: true,
  },
  {
    title: 'Store',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'list',
        link: '/store/list',
      },
    ],
  },
  {
    title: 'Buyer',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/buyer/list',
      }
    ],
  },
  {
    title: 'Brand',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/brand/list',
      }
    ],
  },
];
