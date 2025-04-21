import { useDispatch } from "react-redux";
import { setWishlistItems } from "../../store/slices/wishlistSlice";
import { useEffect } from "react";
const useLoadWishlist = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("movigoUser"));
        if (user?.id) {
            fetch(`http://localhost:5000/api/wishlist/${user.id}`)
                .then((res) => res.json())
                .then((data) => {
                    dispatch(setWishlistItems(data));
                })
                .catch((err) => {
                    console.error("Failed to load wishlist:", err);
                });
        }
    }, []);
};
export default useLoadWishlist;