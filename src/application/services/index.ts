/**
 * Application Services
 * Business logic and orchestration layer
 */

export abstract class ApplicationService {
  abstract initialize(): Promise<void>;
  abstract dispose(): Promise<void>;
}
