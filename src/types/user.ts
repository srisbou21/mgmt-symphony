export interface UserPermissions {
  canManageUsers: boolean;
  canManageEquipment: boolean;
  canManageMaintenance: boolean;
  canViewReports: boolean;
}

export interface User {
  id: number;
  username: string;
  role: "admin" | "user";
  permissions: UserPermissions;
}

export interface AuthUser extends User {
  password: string;
}

export type UserFormValues = Omit<User, "id"> & {
  password: string;
};