import { StickerDTO } from "@/src/application/dtos";
import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import {
    StickerViewModel,
    useStickerViewModel,
} from "../viewmodels/sticker-viewmodel";

interface StickerListScreenProps {
  viewModel: StickerViewModel;
  category?: string;
}

/**
 * Sticker List Screen - Displays list of stickers
 * Demonstrates using ViewModel in a React component
 */
export const StickerListScreen: React.FC<StickerListScreenProps> = ({
  viewModel,
  category,
}) => {
  const {
    stickers,
    loading,
    error,
    fetchAllStickers,
    fetchStickersByCategory,
  } = useStickerViewModel(viewModel);

  React.useEffect(() => {
    if (category) {
      fetchStickersByCategory(category);
    } else {
      fetchAllStickers();
    }
  }, [category, fetchAllStickers, fetchStickersByCategory]);

  return (
    <ScrollView style={{ flex: 1, padding: 16 }}>
      {loading && (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}

      {error && (
        <View
          style={{ backgroundColor: "#ffebee", padding: 16, borderRadius: 8 }}
        >
          <Text style={{ color: "#c62828" }}>Error: {error}</Text>
        </View>
      )}

      {!loading && stickers.length === 0 && (
        <Text style={{ textAlign: "center", marginTop: 32 }}>
          No stickers found
        </Text>
      )}

      {stickers.map((sticker) => (
        <StickerItemComponent key={sticker.id} sticker={sticker} />
      ))}
    </ScrollView>
  );
};

interface StickerItemComponentProps {
  sticker: StickerDTO;
}

/**
 * Sticker Item Component - Individual sticker item
 */
const StickerItemComponent: React.FC<StickerItemComponentProps> = ({
  sticker,
}) => {
  return (
    <View
      style={{
        marginBottom: 12,
        padding: 12,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
      }}
    >
      <Text style={{ fontSize: 16, fontWeight: "bold" }}>{sticker.name}</Text>
      <Text style={{ fontSize: 14, color: "#666", marginTop: 4 }}>
        Category: {sticker.category}
      </Text>
      <Text style={{ fontSize: 12, color: "#999", marginTop: 4 }}>
        ID: {sticker.id}
      </Text>
    </View>
  );
};
