import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Store',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'list',
        link: '/store/list',
      },
      {
        title: 'Register',
        link: '/auth/register',
      },
      {
        title: 'Request Password',
        link: '/auth/request-password',
      },
      {
        title: 'Reset Password',
        link: '/auth/reset-password',
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
];
