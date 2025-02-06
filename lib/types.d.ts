export interface Employee {
  name: string;
  email: string;
  position?: string;
  department?: string;
  salary?: number;
  dateOfJoining: string; // ISO date string format (e.g., "2024-01-10")
}
