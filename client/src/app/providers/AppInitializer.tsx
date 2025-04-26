import { useEffect } from "react";
import { useAuth } from "../../entities/user/hooks/useAuth";
import { useAppDispatch } from "../../shared/lib/hooks";
import { getCart, transferGuestCartToServer } from "../../entities/cart/model/cartThunks";
import { loadFromLocalStorage } from "../../entities/cart/model/cartSlice";

export const AppInitializer = () => {
    const { isAuthenticated } = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (isAuthenticated) {
            void dispatch(getCart());
            void dispatch(transferGuestCartToServer());
        } else {
            dispatch(loadFromLocalStorage());
        }
    }, [isAuthenticated, dispatch]);


    return null;
};