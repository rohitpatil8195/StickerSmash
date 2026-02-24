/\*\*

- Example Usage - How to use the Hexagonal Architecture
-
- STEP 1: Initialize Services (in your app entry point)
- ====================================================
- import { initializeServices } from "@/src/common/types/container";
-
- // Call once at app startup
- initializeServices();
-
-
- STEP 2: Resolve Services in Components
- =======================================
- import { resolve, ServiceKeys } from "@/src/common/types/container";
- import { StickerViewModel } from "@/src/presentation/viewmodels";
-
- const viewModel = resolve<StickerViewModel>(ServiceKeys.STICKER_VIEW_MODEL);
-
-
- STEP 3: Use ViewModel in Components
- ====================================
- import { useStickerViewModel } from "@/src/presentation/viewmodels";
- import { StickerListScreen } from "@/src/presentation/screens";
-
- export function MyScreen() {
- const viewModel = resolve<StickerViewModel>(ServiceKeys.STICKER_VIEW_MODEL);
- const { stickers, loading, error, fetchAllStickers } = useStickerViewModel(viewModel);
-
- useEffect(() => {
-     fetchAllStickers();
- }, []);
-
- return (
-     <View>
-       {loading && <ActivityIndicator />}
-       {stickers.map(sticker => <Text key={sticker.id}>{sticker.name}</Text>)}
-     </View>
- );
- }
-
-
- COMPLETE EXAMPLE IMPLEMENTATION
- ================================
- See app/index.tsx for example usage with Sticker data
  \*/

export const EXAMPLE_USAGE = "See comments in this file for implementation examples";
