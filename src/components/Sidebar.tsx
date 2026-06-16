"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Utensils,
  ChartBarStacked,
  Donut,
  UserPenIcon,
  Users2,
  Receipt,
  ClipboardMinus,
} from "lucide-react";

function Sidebar() {
  const pathname = usePathname();

  const moduleLinks = [
    {
      modules: [
        {
          icon: <Donut size={24} />,
          title: "Sale Screen",
          href: "/sale-screen",
        },
        {
          icon: <UserPenIcon size={24} />,
          title: "Profile",
          href: "/profile",
        },
        {
          icon: <Users2 size={24} />,
          title: "Customers",
          href: "/customers",
        },
        {
          icon: <ChartBarStacked size={24} />,
          title: "Category",
          href: "/categories",
        },
        {
          icon: <Utensils size={24} />,
          title: "Menu",
          href: "/menus",
        },
        {
          icon: <Receipt size={24} />,
          title: "Sale Voucher",
          href: "/vouchers",
        },
        {
          icon: <ClipboardMinus size={24} />,
          title: "Dual Screen",
          href: "/dual-screen",
        },
      ],
    },
  ];

  return (
    <div className="w-[260px] min-h-screen border-r bg-background px-4">
      <div className="flex flex-col gap-8">
        {moduleLinks.map(({ modules }, index) => (
          <div key={`module-group-${index}`}>
            <div className="flex flex-col">
              {modules.map(({ icon, title, href }, index) => {
                const isActive = pathname.startsWith(href.split("?")[0]);

                return (
                  <Link
                    key={`module-link-${index}`}
                    href={href}
                    className={`relative -mx-5
                  flex items-center gap-3 px-5 py-6 text-sm transition-all
               hover:bg-stone-100
            ${
              isActive
                ? "bg-gradient-to-r from-pink-500 via-pink-100 to-white font-medium text-foreground"
                : "text-muted-foreground"
            }
                  `}
                  >
                    {icon}
                    <span>{title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
