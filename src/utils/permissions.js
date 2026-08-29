// Maps each login role to the section of the app it's allowed to land on / use.
export const ROLE_HOME = {
  staff: "/warehouse",
  admin: "/admin",
  manager: "/purchasing",
  products: "/inventory",
};

export const ROLE_ALLOWED_PREFIX = {
  staff: ["/warehouse", "/picking"],
  admin: ["/admin"],
  manager: ["/purchasing"],
  products: ["/inventory"],
};

export function canAccess(role, pathname) {
  if (!role) return false;
  const allowed = ROLE_ALLOWED_PREFIX[role] || [];
  return allowed.some((prefix) => pathname.startsWith(prefix));
}

export function homeFor(role) {
  return ROLE_HOME[role] || "/";
}