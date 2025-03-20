import { createSlice } from "@reduxjs/toolkit";


const loadWishlistFromStorage = () => {
    try {
        const data = localStorage.getItem("wishlistItems");
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error loading wishlist:", error);
        return [];
    }
};

const saveWishlistToStorage = (data) => {
    try {
        localStorage.setItem("wishlistItems", JSON.stringify(data));
    } catch (error) {
        console.error("Error saving wishlist:", error);
    }
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: loadWishlistFromStorage() || [],
    },
    reducers: {
        toggleItemInWishlist: (state, action) => {
            if (!Array.isArray(state.items)) {
                state.items = []; // ✅ Ensure `state.items` is always an array
            }
            const exists = state.items.some(item => item.id === action.payload.id);
            state.items = exists 
            ? state.items.filter(item => item.id !== action.payload.id)
            : [...state.items, action.payload];
            console.log("Updated Wishlist:", state.items);
            saveWishlistToStorage(state.items);  // ✅ Save to localStorage
        },
    },
});

export const {
    toggleItemInWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;