import * as React from "react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Separator } from "@/components/ui/separator";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <Container>
        <div className="py-10">
          <div className="grid gap-8 md:grid-cols-3">
            {/* BRAND */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-teal-700" />
                <span className="text-base font-semibold">
                  {siteConfig.name}
                </span>
              </div>

              <p className="text-sm text-gray-600">
                {siteConfig.description}
              </p>
            </div>

            {/* NAVIGATION */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Danh mục
              </h3>

              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CONTACT */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">
                Liên hệ
              </h3>

              <ul className="space-y-2 text-sm text-gray-600">
                {siteConfig.phone && (
                  <li>📞 {siteConfig.phone}</li>
                )}

                {siteConfig.email && (
                  <li>✉️ {siteConfig.email}</li>
                )}

                {siteConfig.facebook && (
                  <li>📘 Facebook</li>
                )}

                {siteConfig.zalo && (
                  <li>💬 Zalo</li>
                )}
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          {/* BOTTOM BAR */}
          <div className="flex flex-col gap-2 text-center text-xs text-gray-500 md:flex-row md:justify-between">
            <span>
              © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
            </span>

            <span>
              Made with Next.js 15 + TypeScript
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
