export type NavItem = {
  title: string;
  href: string;
};

export type NavGroup = {
  title: string;
  items: NavItem[];
  hidden?: boolean;
};

export const navigation: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { title: "Introduction", href: "/" },
      { title: "Principles", href: "/principles" },
    ],
  },
  {
    title: "Foundations",
    items: [
      { title: "Color", href: "/foundations/color" },
      { title: "Typography", href: "/foundations/typography" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Button", href: "/components/button" },
    ],
  },
  {
    title: "About the system",
    hidden: true,
    items: [
      { title: "Architecture", href: "/about/architecture" },
      { title: "Accessibility", href: "/about/accessibility" },
      { title: "Contribution", href: "/about/governance" },
    ],
  },
];

export const siteName = "Design System Showcase";

export function visibleNavigation(): NavGroup[] {
  return navigation.filter((group) => !group.hidden);
}

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href;
}

export function findNavItem(pathname: string): NavItem | undefined {
  return navigation.flatMap((group) => group.items).find((item) => item.href === pathname);
}

export function getAdjacentNav(pathname: string): {
  prev?: NavItem;
  next?: NavItem;
} {
  const items = visibleNavigation().flatMap((group) => group.items);
  const index = items.findIndex((item) => item.href === pathname);

  if (index === -1) {
    return {};
  }

  return {
    prev: items[index - 1],
    next: items[index + 1],
  };
}
