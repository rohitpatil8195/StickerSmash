import { Sticker } from "../entities/sticker";

/**
 * Sticker Repository Interface - Port for data access
 * Defines the contract for sticker data operations
 */
export interface IStickerRepository {
  /**
   * Get all stickers
   */
  getAll(): Promise<Sticker[]>;

  /**
   * Get sticker by ID
   */
  getById(id: string): Promise<Sticker | null>;

  /**
   * Get stickers by category
   */
  getByCategory(category: string): Promise<Sticker[]>;

  /**
   * Create a new sticker
   */
  create(sticker: Sticker): Promise<Sticker>;

  /**
   * Update an existing sticker
   */
  update(id: string, sticker: Partial<Sticker>): Promise<Sticker>;

  /**
   * Delete a sticker
   */
  delete(id: string): Promise<void>;
}
