import {
    CreateStickerDTO,
    StickerDTO,
    UpdateStickerDTO,
} from "@/src/application/dtos";
import {
    CreateStickerUseCase,
    DeleteStickerUseCase,
    GetAllStickersUseCase,
    GetStickerByIdUseCase,
    GetStickersByCategoryUseCase,
    UpdateStickerUseCase,
} from "@/src/application/usecases/sticker-usecases";
import { ApplicationException } from "@/src/domain/exceptions";
import { IStickerRepository } from "@/src/domain/repositories";
import { useCallback, useState } from "react";

/**
 * Sticker ViewModel - Manages UI state and business logic for stickers
 */
export class StickerViewModel {
  private getAllStickersUseCase: GetAllStickersUseCase;
  private getStickerByIdUseCase: GetStickerByIdUseCase;
  private getStickersByCategoryUseCase: GetStickersByCategoryUseCase;
  private createStickerUseCase: CreateStickerUseCase;
  private updateStickerUseCase: UpdateStickerUseCase;
  private deleteStickerUseCase: DeleteStickerUseCase;

  constructor(repository: IStickerRepository) {
    this.getAllStickersUseCase = new GetAllStickersUseCase(repository);
    this.getStickerByIdUseCase = new GetStickerByIdUseCase(repository);
    this.getStickersByCategoryUseCase = new GetStickersByCategoryUseCase(
      repository,
    );
    this.createStickerUseCase = new CreateStickerUseCase(repository);
    this.updateStickerUseCase = new UpdateStickerUseCase(repository);
    this.deleteStickerUseCase = new DeleteStickerUseCase(repository);
  }

  async getAllStickers(): Promise<StickerDTO[]> {
    return await this.getAllStickersUseCase.execute();
  }

  async getStickerById(id: string): Promise<StickerDTO> {
    return await this.getStickerByIdUseCase.execute(id);
  }

  async getStickersByCategory(category: string): Promise<StickerDTO[]> {
    return await this.getStickersByCategoryUseCase.execute(category);
  }

  async createSticker(dto: CreateStickerDTO): Promise<StickerDTO> {
    return await this.createStickerUseCase.execute(dto);
  }

  async updateSticker(id: string, dto: UpdateStickerDTO): Promise<StickerDTO> {
    return await this.updateStickerUseCase.execute(id, dto);
  }

  async deleteSticker(id: string): Promise<void> {
    return await this.deleteStickerUseCase.execute(id);
  }
}

/**
 * Hook for using Sticker ViewModel
 */
export function useStickerViewModel(viewModel: StickerViewModel) {
  const [stickers, setStickers] = useState<StickerDTO[]>([]);
  const [currentSticker, setCurrentSticker] = useState<StickerDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleError = useCallback((err: any) => {
    if (err instanceof ApplicationException) {
      setError(err.message);
    } else {
      setError("An unexpected error occurred");
    }
  }, []);

  const fetchAllStickers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await viewModel.getAllStickers();
      setStickers(data);
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [viewModel, handleError]);

  const fetchStickerById = useCallback(
    async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await viewModel.getStickerById(id);
        setCurrentSticker(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [viewModel, handleError],
  );

  const fetchStickersByCategory = useCallback(
    async (category: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await viewModel.getStickersByCategory(category);
        setStickers(data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
      }
    },
    [viewModel, handleError],
  );

  const addSticker = useCallback(
    async (dto: CreateStickerDTO) => {
      setError(null);
      try {
        const newSticker = await viewModel.createSticker(dto);
        setStickers([...stickers, newSticker]);
        return newSticker;
      } catch (err) {
        handleError(err);
        throw err;
      }
    },
    [viewModel, stickers, handleError],
  );

  const modifySticker = useCallback(
    async (id: string, dto: UpdateStickerDTO) => {
      setError(null);
      try {
        const updatedSticker = await viewModel.updateSticker(id, dto);
        setStickers(stickers.map((s) => (s.id === id ? updatedSticker : s)));
        return updatedSticker;
      } catch (err) {
        handleError(err);
        throw err;
      }
    },
    [viewModel, stickers, handleError],
  );

  const removeSticker = useCallback(
    async (id: string) => {
      setError(null);
      try {
        await viewModel.deleteSticker(id);
        setStickers(stickers.filter((s) => s.id !== id));
      } catch (err) {
        handleError(err);
        throw err;
      }
    },
    [viewModel, stickers, handleError],
  );

  return {
    stickers,
    currentSticker,
    loading,
    error,
    fetchAllStickers,
    fetchStickerById,
    fetchStickersByCategory,
    addSticker,
    modifySticker,
    removeSticker,
  };
}
