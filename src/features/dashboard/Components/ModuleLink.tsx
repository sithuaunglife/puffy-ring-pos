import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { ReactElement } from "react";

type Props = {
  icon: ReactElement;
  title: string;
  href: string;
};

function ModuleLink({ icon, title, href }: Props) {
  return (
    <Link href={href}>
      <Card>
        <CardContent className=" flex gap-3 items-center">
          <div className=" text-primary">{icon}</div>
          <p>{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ModuleLink;
