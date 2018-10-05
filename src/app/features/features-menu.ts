import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
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
    title: 'Product',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/product/list',
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
      },
      {
        title: 'Approval Brand',
        link: '/brand/manage-brand',
      },
    ],
  },
  {
    title: 'Spec',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/spec/value',
      },
      // {
      //   title: 'Value',
      //   link: '/spec/list',
      // }
    ],
  },
  {
    title: 'Category',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/category/list',
      }
    ],
  },
  {
    title: 'Order',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'list',
        link: '/order/list',
      }
    ],
  },
  {
    title: 'Master Produk',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'listing',
        link: '/master-product/listing',
      }
    ],
  },
  {
    title: 'Courier',
    icon: 'nb-layout-default',
    children: [
      {
        title: 'List',
        link: '/courier/list',
      },
    ],
  },

  

];
