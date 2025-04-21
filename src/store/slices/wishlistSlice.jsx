import { createSlice } from "@reduxjs/toolkit";

const getUserEmail = () => localStorage.getItem("userEmail");
const getUserWishlist = () => {
    const email = getUserEmail();
    if(email){
        const stored = localStorage.getItem(`wishlist${email}`);
        return stored ? JSON.parse(stored) : [];
    }
    return [];
};

const loadWishlistFromStorage = () => {
    try {
        const data = getUserWishlist();
        return data;
    } catch (error) {
        console.error("Error loading wishlist:", error);
        return [];
    }
};

const saveWishlistToStorage = (data) => {
    const email = getUserEmail();
    if(email){
        try {
            localStorage.setItem(`wishlist-${email}`, JSON.stringify(data));
        } catch (error) {
            console.error("Error saving wishlist:", error);
        }
    }
    
};
const initialState = {
    items: loadWishlistFromStorage(),
}

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        items: [],
    },
    reducers: {
        setWishlistItems: (state, action) => {
            state.items = action.payload;
        },
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
    setWishlistItems,
    toggleItemInWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;