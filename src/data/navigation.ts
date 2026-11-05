import { industries, products, productGroups } from './content';

type NavigationLink = { href: string; label: string };
type NavigationGroup = { label?: string; links: NavigationLink[] };
type NavigationItem = NavigationLink & {
  overview?: string;
  groups?: NavigationGroup[];
};

export const navigation: NavigationItem[] = [
  {
    href: '/products/',
    label: '产品与平台',
    overview: '产品总览',
    groups: productGroups.map(({ title }) => ({
      label: title,
      links: products.filter((product) => product.group === title).map((product) => ({
        href: `/products/${product.slug}/`,
        label: product.title,
      })),
    })),
  },
  {
    href: '/industries/',
    label: '行业方案',
    overview: '行业总览',
    groups: [{ links: [
      ...industries.map(({ slug, title }) => ({ href: `/industries/${slug}/`, label: title })),
      { href: '/industries/#cases', label: '案例与成果' },
    ] }],
  },
  {
    href: '/architecture/',
    label: '技术架构',
    overview: '架构总览',
    groups: [{ links: [
      { href: '/architecture/#linux', label: 'Linux' },
      { href: '/architecture/#zephyr', label: 'Zephyr' },
      { href: '/architecture/#hypervisor', label: 'Hypervisor' },
    ] }],
  },
  {
    href: '/resources/',
    label: '资料与支持',
    overview: '资料与支持总览',
    groups: [{ links: [
      { href: '/resources/#product-materials', label: '产品资料' },
      { href: '/resources/#docs', label: '技术文档' },
      { href: '/resources/#videos', label: '视频演示' },
      { href: '/resources/#faq', label: '常见问题' },
      { href: '/resources/#support', label: '技术支持' },
    ] }],
  },
  {
    href: '/community/',
    label: '开源社区',
    overview: '社区总览',
    groups: [{ links: [
      { href: '/community/mfcp/', label: 'MFCP' },
    ] }],
  },
  {
    href: '/about/',
    label: '关于我们',
    overview: '公司介绍',
    groups: [{ links: [
      { href: '/about/#contact', label: '联系我们' },
      { href: '/about/#channels', label: '官方账号' },
      { href: '/about/#news', label: '公司动态' },
      { href: '/about/#careers', label: '加入我们' },
      { href: '/about/#partners', label: '合作伙伴' },
      { href: '/about/#qualifications', label: '资质信息' },
    ] }],
  },
];
