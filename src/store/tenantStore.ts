import { create } from 'zustand';
import { Tenant, TenantSettings } from '../types/tenant';
import { MOCK_TENANT } from '../lib/api/mockData';

interface TenantStore {
  tenant: Tenant | null;
  isLoading: boolean;
  updateSettings: (settings: Partial<TenantSettings>) => void;
  updatePlan: (plan: Tenant['plan']) => void;
}

export const useTenantStore = create<TenantStore>((set) => ({
  tenant: MOCK_TENANT,
  isLoading: false,

  updateSettings: (newSettings) =>
    set((state) => ({
      tenant: state.tenant
        ? {
            ...state.tenant,
            settings: { ...state.tenant.settings, ...newSettings },
          }
        : null,
    })),

  updatePlan: (plan) =>
    set((state) => ({
      tenant: state.tenant
        ? {
            ...state.tenant,
            plan,
          }
        : null,
    })),
}));
