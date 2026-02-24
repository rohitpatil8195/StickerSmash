/**
 * Repository Interfaces (Ports)
 * Define contracts for data access without implementation details
 */

export interface IRepository<T> {
  save(entity: T): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  delete(id: string): Promise<void>;
}
