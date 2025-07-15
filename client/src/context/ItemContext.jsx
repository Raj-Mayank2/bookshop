import { createContext, useEffect, useState } from "react";

const itemContext = createContext();

function CustomItemContext({ children }) {
	const [products, setProducts] = useState([]);
	const [cart, setCart] = useState([]);
	const [itemsInCart, setItemsinCart] = useState(0);
	const [totalPrice, setTotalPrice] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://bookshop-vb6z.onrender.com/api/books");
				const product = await response.json();
				console.log("Fetched products:", product);
				setProducts(product);
			} catch (err) {
				console.error("Fetch error:", err);
			}
		};
		fetchData();
	}, []);

	const addToCart = (product) => {
		setCart((prev) => [...prev, product]);
		setItemsinCart((prev) => prev + 1);
		setTotalPrice((prev) => prev + product.price);
	};

	const removeFromCart = (product) => {
		const index = cart.findIndex((prdt) => prdt._id === product._id);

		if (index !== -1) {
			const removedItem = cart[index];
			const updatedCart = [...cart];
			updatedCart.splice(index, 1);

			setCart(updatedCart);
			setItemsinCart((prev) => prev - 1);
			setTotalPrice((prev) => prev - removedItem.price);
		} else {
			console.log("Item not found in the cart");
		}
	};

	return (
		<itemContext.Provider
			value={{
				products,
				addToCart,
				removeFromCart,
				itemsInCart,
				totalPrice,
			}}
		>
			{children}
		</itemContext.Provider>
	);
}

export { itemContext };
export default CustomItemContext;
