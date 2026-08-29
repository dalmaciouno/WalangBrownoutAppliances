// Lightweight mock "API" layer. In a real deployment these functions would
// call a backend over fetch/axios; here they resolve local mock data after a
// short delay so components can already be written against an async API.
import { initialProducts, movementLog, movementRows, batches } from "../data/products.js";
import { initialUsers, auditLog } from "../data/users.js";
import { initialPurchaseOrders, initialAlerts, purchaseRequests } from "../data/orders.js";
import { initialSuppliers } from "../data/suppliers.js";

const delay = (ms = 250) => new Promise((resolve) => setTimeout(resolve, ms));

export const api = {
  async login(role, username, password) {
    await delay(200);
    if (!role) throw new Error("Please choose a role to continue.");
    if (!username?.trim() || !password?.trim()) throw new Error("Enter a username and password.");
    return { role, name: username.trim() };
  },

  async getProducts() {
    await delay();
    return initialProducts;
  },

  async getBatches() {
    await delay();
    return batches;
  },

  async getMovementLog() {
    await delay();
    return movementLog;
  },

  async getMovementRows() {
    await delay();
    return movementRows;
  },

  async getUsers() {
    await delay();
    return initialUsers;
  },

  async getAuditLog() {
    await delay();
    return auditLog;
  },

  async getPurchaseOrders() {
    await delay();
    return initialPurchaseOrders;
  },

  async getAlerts() {
    await delay();
    return initialAlerts;
  },

  async getSuppliers() {
    await delay();
    return initialSuppliers;
  },

  async getPurchaseRequests() {
    await delay();
    return purchaseRequests;
  },
};