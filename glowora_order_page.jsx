export default function GloworaOrderPage() {
  const product = {
    name: "Hydrocolloid Acne Patch",
    price: 150,
    currency: "tk",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=900&q=80",
    description:
      "Cute acne patches in star and cartoon-inspired designs that help protect blemishes while adding a fun and aesthetic touch to your skincare routine.",
    details: [
      "Hydrocolloid material helps absorb impurities",
      "Gentle on skin and easy to remove",
      "Fun star-shaped designs in multiple colors",
      "Ideal for daily skincare use",
    ],
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Glowora
          </p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900 md:text-4xl">
            Product Order Page
          </h1>
          <p className="mt-2 max-w-2xl text-base text-neutral-600">
            A clean order page with product details, quantity selector, price summary,
            and add-to-cart button.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-neutral-200">
            <img
              src={product.image}
              alt={product.name}
              className="h-[420px] w-full object-cover"
            />
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-neutral-200 md:p-8">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  In Stock
                </span>
                <h2 className="mt-3 text-2xl font-bold text-neutral-900 md:text-3xl">
                  {product.name}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-500">Price</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {product.price} {product.currency}
                </p>
              </div>
            </div>

            <p className="mb-6 text-neutral-600">{product.description}</p>

            <div className="mb-6 grid gap-3 sm:grid-cols-2">
              {product.details.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl bg-neutral-50 p-4 text-sm text-neutral-700 ring-1 ring-neutral-200"
                >
                  {item}
                </div>
              ))}
            </div>

            <div className="mb-6 rounded-2xl bg-neutral-50 p-5 ring-1 ring-neutral-200">
              <h3 className="mb-4 text-lg font-semibold text-neutral-900">Order Details</h3>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Quantity
                  </label>
                  <div className="flex items-center rounded-2xl border border-neutral-300 bg-white">
                    <button className="px-4 py-3 text-lg font-semibold text-neutral-700">-</button>
                    <input
                      type="number"
                      defaultValue={1}
                      min={1}
                      className="w-full border-x border-neutral-300 px-4 py-3 text-center outline-none"
                    />
                    <button className="px-4 py-3 text-lg font-semibold text-neutral-700">+</button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-neutral-700">
                    Total Price
                  </label>
                  <div className="rounded-2xl border border-neutral-300 bg-white px-4 py-3 text-lg font-bold text-neutral-900">
                    150 tk
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700">
                Add to Cart
              </button>
              <button className="rounded-2xl border border-neutral-300 bg-white px-6 py-4 text-sm font-semibold text-neutral-800 transition hover:bg-neutral-50">
                Buy Now
              </button>
            </div>

            <div className="mt-6 border-t border-neutral-200 pt-6">
              <h3 className="text-lg font-semibold text-neutral-900">Product Details</h3>
              <ul className="mt-3 space-y-2 text-sm text-neutral-600">
                <li>• Category: Skincare</li>
                <li>• Brand: Glowora</li>
                <li>• Delivery: 2–4 business days</li>
                <li>• Payment: Cash on delivery / Online payment</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
