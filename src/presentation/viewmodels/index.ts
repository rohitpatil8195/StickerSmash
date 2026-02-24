/**
 * Presentation - View Models
 * Manages UI state and presentation logic
 */

export abstract class ViewModel {
  abstract init(): Promise<void>;
  abstract dispose(): void;
}
