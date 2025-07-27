"use client";

import { usePathname } from "next/navigation";
import { NavigationItem, NavigationItemSkeleton } from "./navigation-item";
import { useUser } from "@clerk/nextjs";

export const Navigation = () => {
  const { user } = useUser();
  const pathname = usePathname();

  const routes = [
    {
      label: "Overview",
      href: `/u/${user?.username}`,
      icon: "🏠",
    },
    {
      label: "Stream Keys",
      href: `/u/${user?.username}/keys`,
      icon: "🔑",
    },
    {
      label: "Party Chat",
      href: `/u/${user?.username}/chat`,
      icon: "💬",
    },
    {
      label: "Manage Party",
      href: `/u/${user?.username}/party`,
      icon: "👥",
    },
    {
      label: "Quest Analytics",
      href: `/u/${user?.username}/analytics`,
      icon: "📊",
    },
    {
      label: "Quest Settings",
      href: `/u/${user?.username}/settings`,
      icon: "⚙️",
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(6)].map((_, i) => (
          <NavigationItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavigationItem
          key={route.href}
          label={route.label}
          href={route.href}
          icon={route.icon}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
