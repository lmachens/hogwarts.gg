export type NavItem = {
  name: string;
  slug: string;
  disabled?: boolean;
};

export const navItems: NavItem[] = [
  {
    name: 'Blog',
    slug: 'blog',
  },
  {
    name: 'Map',
    slug: 'map',
    disabled: true,
  },
];
