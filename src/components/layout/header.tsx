import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { navigation } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* LEFT: Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-teal-700" />
            <span className="text-base font-semibold text-gray-900">
              TranhuyGao
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden items-center gap-6 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm text-gray-600 transition-colors hover:text-gray-900"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2">
            <Button variant="outline" className="hidden md:inline-flex">
              Liên hệ
            </Button>

            <Button className="hidden md:inline-flex">
              Mua ngay
            </Button>

            {/* MOBILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 md:hidden"
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-gray-700" />
                <span className="block h-0.5 w-5 bg-gray-700" />
                <span className="block h-0.5 w-5 bg-gray-700" />
              </div>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden">
            <div className="flex flex-col gap-3 py-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-gray-700 hover:text-gray-900"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              <Separator />

              <Button variant="outline" className="w-full">
                Liên hệ
              </Button>

              <Button className="w-full">Mua ngay</Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
