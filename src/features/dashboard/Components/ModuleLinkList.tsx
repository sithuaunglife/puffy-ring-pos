import {
  ShoppingCart,
  UserCircle,
  Utensils,
  ChartBarStacked,
  Users,
  Receipt,
  Settings,
} from "lucide-react";
import ModuleLink from "./ModuleLink";

function ModuleLinkList() {
  const moduleLinks = [
    {
      groupTitle: "Sale Module",
      modules: [
        {
          icon: <ShoppingCart />,
          title: "Sale",
          href: "/dashboard/sale?limit=100",
        },
        {
          icon: <Receipt />,
          title: "Sale Voucher",
          href: "/dashboard/sale-voucher",
        },
        {
          icon: <Receipt />,
          title: "Banner",
          href: "/dashboard/banner-management",
        },
      ],
    },
    {
      groupTitle: "Management",
      modules: [
        {
          icon: <ChartBarStacked />,
          title: "Category",
          href: "/dashboard/categories",
        },
        {
          icon: <Utensils />,
          title: "Menu",
          href: "/dashboard/menus",
        },
        {
          icon: <Users />,
          title: "Customers",
          href: "/dashboard/customers",
        },
      ],
    },
    {
      groupTitle: "User Information",
      modules: [
        {
          icon: <UserCircle />,
          title: "Profile  Information",
          href: "/dashboard/profile-information",
        },
      ],
    },
    {
      groupTitle: "Setting",
      modules: [
        {
          icon: <Settings />,
          title: "Setting",
          href: "/dashboard/setting",
        },
      ],
    },
  ];

  return (
    <section className=" flex flex-col gap-8 container mx-auto">
      {moduleLinks.map(({ groupTitle, modules }, index) => (
        <div key={`module-group-${index}`}>
          <h4 className=" mb-3">{groupTitle}</h4>
          <div className=" grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {modules.map(({ icon, title, href }, index) => (
              <ModuleLink
                key={`module-link-${index}`}
                icon={icon}
                title={title}
                href={href}
              />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

export default ModuleLinkList;
