/**
 * @file config/menu.js
 *  侧边栏菜单配置
 * @author maoquan(maoquan@htsc.com)
 */

const menus = [
  {
    key: 'example',
    name: 'Home',
    icon: 'laptop',
    default: true,
  },
  {
    key: 'charts',
    name: '图表',
    icon: 'book',
    clickable: false,
    child: [
      {
        key: 'charts1',
        name: '折线图',
        icon: 'line-chart',
      },
      {
        key: 'charts2',
        name: '柱状图',
        icon: 'bar-chart',
      },
      {
        key: 'charts3',
        name: '饼图',
        icon: 'pie-chart',
      },
    ],
  },
  {
    key: 'menu1',
    name: '测试菜单',
    icon: 'user',
  },
  {
    key: 'standalone',
    name: '独立模块',
    icon: 'user',
  },
  {
    key: 'standaloneDemo',
    name: '公共模块(华泰npm源)',
    icon: 'user',
  },
];

export default menus;
