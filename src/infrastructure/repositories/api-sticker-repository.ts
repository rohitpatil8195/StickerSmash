import { Sticker, StickerEntity } from "@/src/domain/entities";
import { InternalServerException } from "@/src/domain/exceptions";
import { IStickerRepository } from "@/src/domain/repositories";

/**
 * API Sticker Repository - Implementation using REST API
 * For production use with backend API
 */
export class ApiStickerRepository implements IStickerRepository {
  private baseUrl: string;

  constructor(baseUrl: string = "https://api.example.com") {
    this.baseUrl = baseUrl;
  }

  async getAll(): Promise<Sticker[]> {
    try {
      const response = await fetch(`${this.baseUrl}/stickers`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((item: any) => this.mapToEntity(item));
    } catch (error) {
      throw new InternalServerException(`Failed to fetch stickers: ${error}`);
    }
  }

  async getById(id: string): Promise<Sticker | null> {
    try {
      const response = await fetch(`${this.baseUrl}/stickers/${id}`);
      if (response.status === 404) {
        return null;
      }
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.mapToEntity(data);
    } catch (error) {
      throw new InternalServerException(`Failed to fetch sticker: ${error}`);
    }
  }

  async getByCategory(category: string): Promise<Sticker[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/stickers?category=${encodeURIComponent(category)}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map((item: any) => this.mapToEntity(item));
    } catch (error) {
      throw new InternalServerException(
        `Failed to fetch stickers by category: ${error}`,
      );
    }
  }

  async create(sticker: Sticker): Promise<Sticker> {
    try {
      const response = await fetch(`${this.baseUrl}/stickers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.mapToJSON(sticker)),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.mapToEntity(data);
    } catch (error) {
      throw new InternalServerException(`Failed to create sticker: ${error}`);
    }
  }

  async update(id: string, sticker: Partial<Sticker>): Promise<Sticker> {
    try {
      const response = await fetch(`${this.baseUrl}/stickers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(this.mapToJSON(sticker as Sticker)),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return this.mapToEntity(data);
    } catch (error) {
      throw new InternalServerException(`Failed to update sticker: ${error}`);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/stickers/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      throw new InternalServerException(`Failed to delete sticker: ${error}`);
    }
  }

  private mapToEntity(data: any): Sticker {
    return new StickerEntity({
      id: data.id,
      name: data.name,
      imageUrl: data.imageUrl,
      category: data.category,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    });
  }

  private mapToJSON(sticker: Partial<Sticker>): any {
    return {
      id: sticker.id,
      name: sticker.name,
      imageUrl: sticker.imageUrl,
      category: sticker.category,
      createdAt: sticker.createdAt?.toISOString(),
      updatedAt: sticker.updatedAt?.toISOString(),
    };
  }
}
