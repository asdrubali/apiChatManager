export const ROLES = Object.freeze({
  ADMIN: "super_admin",
  PARTNER: "partner",
  COMPANY: "company",
  AGENT: "agent",

  GLOBAL: "all",
} as const);

export type Roles = typeof ROLES[keyof typeof ROLES];
