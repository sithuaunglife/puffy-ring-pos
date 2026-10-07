"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { useMemo, useState, useEffect } from "react";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  placeholder?: string;
};

function SaleMenuSearchInput({ placeholder = "Search by name" }: Props) {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState("");

  const createQueryString = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    return params.toString();
  };

  // ✅ debounce search
  const debouncedChange = useMemo(() => {
    return debounce((searchValue: string) => {
      const queryString = createQueryString("q", searchValue);
      router.push(`${pathName}?${queryString}`);
    }, 500);
  }, [router, pathName, searchParams]); // include searchParams to avoid stale values

  // ✅ sync input with URL
  useEffect(() => {
    const query = searchParams.get("q") ?? "";
    setValue(query);
  }, [searchParams]);

  // ✅ cleanup debounce
  useEffect(() => {
    return () => {
      debouncedChange.cancel();
    };
  }, [debouncedChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedChange(newValue);
  };

  // ✅ clear search ONLY (preserve others like limit)
  const handleClear = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");

    router.push(`${pathName}?${params.toString()}`);
    setValue("");
  };

  return (
    <div className="relative">
      <Search className="absolute right-2 top-1/2 size-4 -translate-y-1/2" />

      <Input
        value={value}
        onChange={handleChange}
        className="py-4 h-7 w-48 placeholder:font-bold"
        placeholder={placeholder}
      />

      <Button
        onClick={handleClear}
        size={"xs"}
        className={`${
          value
            ? "scale-100 pointer-events-auto"
            : "scale-0 pointer-events-none"
        } duration-150 absolute rounded-full size-4 p-0 top-0 right-0 -translate-y-1/2 translate-x-1/2`}
      >
        <X className="size-2" />
      </Button>
    </div>
  );
}

export default SaleMenuSearchInput;
