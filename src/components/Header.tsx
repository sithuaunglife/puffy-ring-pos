"use client";
import { Button } from "@/components/ui/button";

import { ButtonGroup } from "@/components/ui/button-group";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type LinkType = {
  title: string;
  href: string;
};

type Props = {
  links?: LinkType[];
  currentPage: string;
};

function Header({ links = [], currentPage }: Props) {
  const router = useRouter();

  return (
    <header className=" bg-card flex justify-between border border-gray-300 ">
      <Image
        src="/puffyRing.png"
        alt="Puffy Ring Logo"
        width={75}
        height={60}
      />

      <div className="container py-2 mx-auto flex justify-end items-center">
        <ButtonGroup className="hidden sm:flex">
          <Button
            onClick={() => router.back()}
            className=" size-8"
            variant="outline"
            size="icon"
            aria-label="Go Back"
          >
            <ArrowLeftIcon className=" size-2" />
          </Button>
          <Button
            onClick={() => router.forward()}
            className=" size-8"
            variant="outline"
            size="icon"
            aria-label="Go Back"
          >
            <ArrowRightIcon className=" size-2" />
          </Button>
        </ButtonGroup>
      </div>
    </header>
  );
}

export default Header;
