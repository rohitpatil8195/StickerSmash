import { IStickerRepository } from "@/src/domain/repositories";
import { MockStickerRepository } from "@/src/infrastructure/repositories";
import { StickerViewModel } from "@/src/presentation/viewmodels";

/**
 * Service Container - Dependency Injection Container
 * Manages singleton instances and dependency injection
 */
class ServiceContainer {
  private static instance: ServiceContainer;
  private services: Map<string, any> = new Map();

  private constructor() {}

  /**
   * Get singleton instance of ServiceContainer
   */
  static getInstance(): ServiceContainer {
    if (!ServiceContainer.instance) {
      ServiceContainer.instance = new ServiceContainer();
    }
    return ServiceContainer.instance;
  }

  /**
   * Register a service in the container
   */
  register<T>(key: string, factory: () => T): void {
    this.services.set(key, { factory, instance: null, singleton: true });
  }

  /**
   * Register a singleton service
   */
  registerSingleton<T>(key: string, instance: T): void {
    this.services.set(key, { factory: null, instance, singleton: true });
  }

  /**
   * Resolve a service from the container
   */
  resolve<T>(key: string): T {
    const service = this.services.get(key);
    if (!service) {
      throw new Error(`Service not found: ${key}`);
    }

    if (service.singleton && service.instance) {
      return service.instance;
    }

    if (service.factory) {
      const instance = service.factory();
      if (service.singleton) {
        service.instance = instance;
      }
      return instance;
    }

    throw new Error(`Invalid service: ${key}`);
  }

  /**
   * Legacy method for backwards compatibility
   */
  get<T>(key: string): T {
    return this.resolve<T>(key);
  }

  /**
   * Legacy method for backwards compatibility
   */
  has(key: string): boolean {
    return this.services.has(key);
  }

  /**
   * Clear all services
   */
  clear(): void {
    this.services.clear();
  }
}

/**
 * Initialize Services - Setup all application services
 */
export function initializeServices(): void {
  const container = ServiceContainer.getInstance();

  // Register Repositories
  container.registerSingleton<IStickerRepository>(
    "StickerRepository",
    new MockStickerRepository(),
  );

  // Register ViewModels
  container.register("StickerViewModel", () => {
    const repository =
      container.resolve<IStickerRepository>("StickerRepository");
    return new StickerViewModel(repository);
  });
}

/**
 * Get Service Container
 */
export function getContainer(): ServiceContainer {
  return ServiceContainer.getInstance();
}

/**
 * Resolve Service Helper
 */
export function resolve<T>(key: string): T {
  return getContainer().resolve<T>(key);
}

/**
 * Service Keys - Constants for service resolution
 */
export const ServiceKeys = {
  STICKER_REPOSITORY: "StickerRepository",
  STICKER_VIEW_MODEL: "StickerViewModel",
} as const;

// Legacy export for backwards compatibility
export const container = ServiceContainer.getInstance();
