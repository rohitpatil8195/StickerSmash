/**
 * Screen Names - Constants for screen navigation
 */
export enum ScreenNames {
  HOME = "Home",
  STICKER_LIST = "StickerList",
  STICKER_DETAIL = "StickerDetail",
  CREATE_STICKER = "CreateSticker",
  SETTINGS = "Settings",
}

/**
 * Navigation Params - Type definitions for screen params
 */
export type RootStackParamList = {
  [ScreenNames.HOME]: undefined;
  [ScreenNames.STICKER_LIST]: { category?: string };
  [ScreenNames.STICKER_DETAIL]: { stickerId: string };
  [ScreenNames.CREATE_STICKER]: undefined;
  [ScreenNames.SETTINGS]: undefined;
};
