/**
 * Infrastructure Adapters (Adapters)
 * Implementations of repository interfaces
 */

export abstract class Adapter {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}
