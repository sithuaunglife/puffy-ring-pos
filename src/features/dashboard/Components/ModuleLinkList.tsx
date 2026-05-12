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

function ModuleLinkList() {
  const pathname = usePathname();

  const moduleLinks = [
    {
      modules: [
        {
          icon: <Donut size={18} />,
          title: "Sale Screen",
          href: "/sale-screen",
        },
        {
          icon: <UserPenIcon size={18} />,
          title: "Profile",
          href: "/profile",
        },
        {
          icon: <Users2 size={18} />,
          title: "Customers",
          href: "/customers",
        },
        {
          icon: <ChartBarStacked size={18} />,
          title: "Category",
          href: "/categories",
        },
        {
          icon: <Utensils size={18} />,
          title: "Menu",
          href: "/menus",
        },
        {
          icon: <Receipt size={18} />,
          title: "Sale Voucher",
          href: "/vouchers",
        },
        {
          icon: <ClipboardMinus size={18} />,
          title: "Dual Screen",
          href: "/dual-screen",
        },
      ],
    },
  ];

  return (
    <div className="w-[260px] min-h-screen border-r bg-background px-4 py-6">
      <div className="flex flex-col gap-8">
        {moduleLinks.map(({ modules }, index) => (
          <div key={`module-group-${index}`}>
            <div className="flex flex-col gap-1">
              {modules.map(({ icon, title, href }, index) => {
                const isActive = pathname.startsWith(href.split("?")[0]);

                return (
                  <Link
                    key={`module-link-${index}`}
                    href={href}
                    className={`
                      flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
                      hover:bg-muted
                      ${
                        isActive
                          ? "bg-gradient-to-r from-pink-500 to-white font-medium text-foreground"
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

export default ModuleLinkList;
