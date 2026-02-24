/**
 * Sticker Entity - Core business object in the domain layer
 * Represents a sticker in the application
 */
export interface Sticker {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create a new Sticker entity
 */
export class StickerEntity implements Sticker {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Sticker) {
    this.id = data.id;
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.category = data.category;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  /**
   * Validate if sticker has required fields
   */
  isValid(): boolean {
    return !!(this.id && this.name && this.imageUrl);
  }
}
