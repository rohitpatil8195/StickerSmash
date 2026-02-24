import { Sticker } from "@/src/domain/entities";
import {
    CreateStickerDTO,
    StickerDTO,
    UpdateStickerDTO,
} from "../dtos/sticker-dto";

/**
 * Sticker Mapper - Converts between Domain Entity and DTO
 */
export class StickerMapper {
  /**
   * Convert Sticker Entity to DTO
   */
  static toDTO(sticker: Sticker): StickerDTO {
    return new StickerDTO({
      id: sticker.id,
      name: sticker.name,
      imageUrl: sticker.imageUrl,
      category: sticker.category,
      createdAt: sticker.createdAt,
      updatedAt: sticker.updatedAt,
    });
  }

  /**
   * Convert array of Sticker Entities to DTOs
   */
  static toDTOList(stickers: Sticker[]): StickerDTO[] {
    return stickers.map((sticker) => this.toDTO(sticker));
  }

  /**
   * Convert CreateStickerDTO to Sticker Entity
   */
  static toDomainFromCreate(
    dto: CreateStickerDTO,
  ): Omit<Sticker, "id" | "createdAt" | "updatedAt"> {
    return {
      name: dto.name,
      imageUrl: dto.imageUrl,
      category: dto.category,
    };
  }

  /**
   * Convert UpdateStickerDTO to partial Sticker Entity
   */
  static toDomainFromUpdate(dto: UpdateStickerDTO): Partial<Sticker> {
    return {
      name: dto.name,
      imageUrl: dto.imageUrl,
      category: dto.category,
    };
  }
}
