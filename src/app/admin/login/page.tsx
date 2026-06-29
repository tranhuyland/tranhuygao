"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function handleLogin() {
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) {
        alert("Sai tài khoản hoặc mật khẩu");
        return;
      }

      router.push("/admin/orders");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="py-20">
      <Container className="max-w-md">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Admin Login
        </h1>

        <div className="space-y-4">
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            className="w-full"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>
        </div>
      </Container>
    </main>
  );
}
