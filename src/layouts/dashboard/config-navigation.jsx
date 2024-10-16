import SvgColor from 'src/components/svg-color';


const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'Dashboard',
    path: '/',
    icon: icon('dashboard'),
  },
  {
    title: 'Medications',
    path: '/medications',
    icon: icon('medications'),
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: icon('customers'),
  },
  {
    title: 'Pharmacies',
    path: '/pharmacies',
    icon: icon('pharmacies'),
  },
  {
    title: 'Claims',
    path: '/claims',
    icon: icon('claims'),
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: icon('reports'),
  },
  {
    title: 'Help',
    path: 'mailto:Contact@lifelinrafrica.app',
    icon: icon('help'),
  },
];

export default navConfig;
