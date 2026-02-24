import {
    NotFoundException,
    ValidationException,
} from "@/src/domain/exceptions";
import { IStickerRepository } from "@/src/domain/repositories";
import {
    CreateStickerDTO,
    StickerDTO,
    UpdateStickerDTO,
} from "../dtos/sticker-dto";
import { StickerMapper } from "../mappers/sticker-mapper";

/**
 * Get All Stickers Use Case
 * Retrieves all stickers from the repository
 */
export class GetAllStickersUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(): Promise<StickerDTO[]> {
    const stickers = await this.stickerRepository.getAll();
    return StickerMapper.toDTOList(stickers);
  }
}

/**
 * Get Sticker By ID Use Case
 * Retrieves a single sticker by its ID
 */
export class GetStickerByIdUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(id: string): Promise<StickerDTO> {
    if (!id) {
      throw new ValidationException("Sticker ID is required");
    }

    const sticker = await this.stickerRepository.getById(id);
    if (!sticker) {
      throw new NotFoundException(`Sticker with ID ${id} not found`);
    }

    return StickerMapper.toDTO(sticker);
  }
}

/**
 * Get Stickers By Category Use Case
 * Retrieves all stickers in a specific category
 */
export class GetStickersByCategoryUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(category: string): Promise<StickerDTO[]> {
    if (!category) {
      throw new ValidationException("Category is required");
    }

    const stickers = await this.stickerRepository.getByCategory(category);
    return StickerMapper.toDTOList(stickers);
  }
}

/**
 * Create Sticker Use Case
 * Creates a new sticker
 */
export class CreateStickerUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(dto: CreateStickerDTO): Promise<StickerDTO> {
    this.validateCreateDTO(dto);

    const newSticker = {
      id: this.generateId(),
      ...StickerMapper.toDomainFromCreate(dto),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdSticker = await this.stickerRepository.create(newSticker);
    return StickerMapper.toDTO(createdSticker);
  }

  private validateCreateDTO(dto: CreateStickerDTO): void {
    if (!dto.name || dto.name.trim() === "") {
      throw new ValidationException("Sticker name is required");
    }
    if (!dto.imageUrl || dto.imageUrl.trim() === "") {
      throw new ValidationException("Sticker image URL is required");
    }
    if (!dto.category || dto.category.trim() === "") {
      throw new ValidationException("Sticker category is required");
    }
  }

  private generateId(): string {
    return `sticker_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

/**
 * Update Sticker Use Case
 * Updates an existing sticker
 */
export class UpdateStickerUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(id: string, dto: UpdateStickerDTO): Promise<StickerDTO> {
    if (!id) {
      throw new ValidationException("Sticker ID is required");
    }

    // Verify sticker exists
    const existingSticker = await this.stickerRepository.getById(id);
    if (!existingSticker) {
      throw new NotFoundException(`Sticker with ID ${id} not found`);
    }

    const updateData = StickerMapper.toDomainFromUpdate(dto);
    const updatedSticker = await this.stickerRepository.update(id, updateData);
    return StickerMapper.toDTO(updatedSticker);
  }
}

/**
 * Delete Sticker Use Case
 * Deletes a sticker
 */
export class DeleteStickerUseCase {
  constructor(private stickerRepository: IStickerRepository) {}

  async execute(id: string): Promise<void> {
    if (!id) {
      throw new ValidationException("Sticker ID is required");
    }

    // Verify sticker exists
    const sticker = await this.stickerRepository.getById(id);
    if (!sticker) {
      throw new NotFoundException(`Sticker with ID ${id} not found`);
    }

    await this.stickerRepository.delete(id);
  }
}
