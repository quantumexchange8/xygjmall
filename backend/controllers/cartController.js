import userModel from "../models/userModel.js"


// add products to user cart
const addToCart = async (req, res) => {
    try {

        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (cartData[itemId]) {
            cartData[itemId] += quantity

        } else {
            cartData[itemId] = {}
            cartData[itemId] = quantity
        }

        await userModel.findByIdAndUpdate(userId, { cartData })

        res.json({ success: true, message: "已加入购物车" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update user cart
const updateCart = async (req, res) => {
    try {

        const { userId, itemId, quantity } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        if (quantity === 0) {
            delete cartData[itemId];
        } else {
            cartData[itemId] = quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData })
        res.json({ success: true, message: "Cart Updated" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// get user cart data
const getUserCart = async (req, res) => {
    try {
        const { userId } = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData;

        res.json({ success: true, cartData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export { addToCart, updateCart, getUserCart }