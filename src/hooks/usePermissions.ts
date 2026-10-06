import { useAuthStore } from '../store/authStore';
import { ROLE_PERMISSIONS, hasPermission } from '../lib/auth/permissionsMap';
import { PermissionKey, PERMISSIONS } from '../constants/permissions';

export function usePermissions() {
  const user = useAuthStore((s) => s.user);

  const can = (permissionKey: PermissionKey | string): boolean => {
    if (!user) return false;
    if (user.role === 'owner') return true;

    const allowedList = ROLE_PERMISSIONS[user.role] || [];
    const permissionVal = (PERMISSIONS as any)[permissionKey] || permissionKey;
    return hasPermission(allowedList, permissionVal);
  };

  return {
    can,
    role: user?.role,
    isOwner: user?.role === 'owner',
    isAdmin: user?.role === 'admin' || user?.role === 'owner',
    isSupervisor: user?.role === 'supervisor' || user?.role === 'admin' || user?.role === 'owner',
  };
}
