import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Store',
    icon: 'fa fa-archive',
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
    title: 'Product',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/product/list',
      }
    ],
  },
  
];
