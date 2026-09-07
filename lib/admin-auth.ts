import { createHmac } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "paradise_admin";

function tokenFor(password: string) {
  return createHmac("sha256", password).update("paradise-cafe-admin-v1").digest("hex");
}

export function configuredAdmin() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function validPassword(password: string) {
  return Boolean(password && process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD);
}

export function expectedToken() {
  return process.env.ADMIN_PASSWORD ? tokenFor(process.env.ADMIN_PASSWORD) : "";
}

export async function isAdminAuthenticated() {
  const store = await cookies();
  const value = store.get(COOKIE_NAME)?.value;
  return Boolean(value && expectedToken() && value === expectedToken());
}

export async function setAdminCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, expectedToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", { httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/", maxAge: 0 });
}
