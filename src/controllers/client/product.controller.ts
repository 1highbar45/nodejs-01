import { Request, Response } from "express";
import { deleteProductInCart, getOrderHistory, getProductById, getProductInCart, handlePlaceOrder, updateCartDetailBeforeCheckout } from "services/client/item.service";

const getProductPage = async (req: Request, res: Response) => {
    const { id } = req.params;
    const product = await getProductById(+id);
    return res.render('client/product/detail.ejs', {
        product
    })
};

const getCartPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0);

    return res.render('client/product/cart.ejs', {
        cartDetails, totalPrice
    })
};

const postDeleteProductInCart = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = req.user;

    if (user) {
        await deleteProductInCart(+id, user.id, user.sumCart);
    } else {
        return res.redirect("/login");
    }

    return res.redirect("/cart");
};

const getCheckOutPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const cartDetails = await getProductInCart(+user.id);

    const totalPrice = cartDetails?.map(item => +item.price * +item.quantity)?.reduce((a, b) => a + b, 0);

    return res.render('client/product/checkout.ejs', {
        cartDetails, totalPrice
    })
};

const postHandleCartToCheckOut = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const currentCartDetail: { id: string, quantity: string }[] = req.body?.cartDetails ?? [];

    await updateCartDetailBeforeCheckout(currentCartDetail);

    return res.redirect("/checkout");
};

const postPlaceOrder = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const { receiverName, receiverAddress, receiverPhone, totalPrice } = req.body;

    await handlePlaceOrder(user.id, receiverName, receiverAddress, receiverPhone, +totalPrice);

    return res.redirect("/thanks");
};

const getThanksPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    return res.render("client/product/thanks.ejs");
};

const getOrderHistoryPage = async (req: Request, res: Response) => {
    const user = req.user;
    if (!user) return res.redirect("/login");

    const orders = await getOrderHistory(user.id);

    return res.render("client/product/order.history.ejs", {
        orders
    });
};

export {
    getProductPage, getCartPage, postDeleteProductInCart, getCheckOutPage,
    postHandleCartToCheckOut, postPlaceOrder, getThanksPage, getOrderHistoryPage
}