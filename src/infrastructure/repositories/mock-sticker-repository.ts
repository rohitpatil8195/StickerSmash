import { Sticker, StickerEntity } from "@/src/domain/entities";
import { IStickerRepository } from "@/src/domain/repositories";

/**
 * Mock Sticker Repository - In-memory implementation
 * For development and testing purposes
 */
export class MockStickerRepository implements IStickerRepository {
  private stickers: Map<string, Sticker> = new Map();

  constructor() {
    this.initializeMockData();
  }

  private initializeMockData(): void {
    const mockStickers: Sticker[] = [
      new StickerEntity({
        id: "sticker_1",
        name: "Smile",
        imageUrl: "https://example.com/smile.png",
        category: "Faces",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new StickerEntity({
        id: "sticker_2",
        name: "Heart",
        imageUrl: "https://example.com/heart.png",
        category: "Symbols",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      new StickerEntity({
        id: "sticker_3",
        name: "Star",
        imageUrl: "https://example.com/star.png",
        category: "Symbols",
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    ];

    mockStickers.forEach((sticker) => {
      this.stickers.set(sticker.id, sticker);
    });
  }

  async getAll(): Promise<Sticker[]> {
    return Array.from(this.stickers.values());
  }

  async getById(id: string): Promise<Sticker | null> {
    return this.stickers.get(id) || null;
  }

  async getByCategory(category: string): Promise<Sticker[]> {
    return Array.from(this.stickers.values()).filter(
      (sticker) => sticker.category === category,
    );
  }

  async create(sticker: Sticker): Promise<Sticker> {
    const newSticker = new StickerEntity(sticker);
    this.stickers.set(newSticker.id, newSticker);
    return newSticker;
  }

  async update(id: string, updates: Partial<Sticker>): Promise<Sticker> {
    const sticker = this.stickers.get(id);
    if (!sticker) {
      throw new Error(`Sticker with ID ${id} not found`);
    }

    const updatedSticker = new StickerEntity({
      ...sticker,
      ...updates,
      id: sticker.id,
      createdAt: sticker.createdAt,
      updatedAt: new Date(),
    });

    this.stickers.set(id, updatedSticker);
    return updatedSticker;
  }

  async delete(id: string): Promise<void> {
    this.stickers.delete(id);
  }
}
