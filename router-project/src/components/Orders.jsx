const Orders = () => {
    return (
        <div className="m-10">
            <h1 className="text-3xl font-bold mb-5">Your Orders</h1>
            <div className="bg-white p-8 rounded-lg">
                <p className="text-lg text-gray-500">No orders yet. <a href="/products" className="text-blue-600 hover:underline">Start shopping!</a></p>
            </div>
        </div>
    );
};

export default Orders;
