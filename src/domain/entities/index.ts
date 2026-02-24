/**
 * Domain Entities - Core business objects
 * These are independent of any external framework
 */

export interface Entity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
