/**
 * Sticker DTO - Data Transfer Object
 * Used for transferring sticker data between layers
 */
export class StickerDTO {
  id: string;
  name: string;
  imageUrl: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    imageUrl: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.category = data.category;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}

/**
 * Create Sticker DTO - DTO for creating new stickers
 */
export class CreateStickerDTO {
  name: string;
  imageUrl: string;
  category: string;

  constructor(data: { name: string; imageUrl: string; category: string }) {
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.category = data.category;
  }
}

/**
 * Update Sticker DTO - DTO for updating stickers
 */
export class UpdateStickerDTO {
  name?: string;
  imageUrl?: string;
  category?: string;

  constructor(
    data: Partial<{ name: string; imageUrl: string; category: string }> = {},
  ) {
    this.name = data.name;
    this.imageUrl = data.imageUrl;
    this.category = data.category;
  }
}
