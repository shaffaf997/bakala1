"use client";

import { type ReactNode, type UIEvent, useMemo, useRef, useState } from "react";

type TabName = "Customer" | "Grocery Store" | "Store Delivery" | "Admin";
type OrderStatus = "Placed" | "Accepted" | "Packed" | "Picked Up" | "Delivered";
type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
};

const tabs: TabName[] = [
  "Customer",
  "Grocery Store",
  "Store Delivery",
  "Admin",
];

const initialProducts: Product[] = [
  { id: "milk", name: "Baladna Milk 1L", price: 7.5, stock: 12 },
  { id: "bread", name: "Arabic Bread Pack", price: 3, stock: 12 },
  { id: "bananas", name: "Fresh Bananas 1kg", price: 6.75, stock: 18 },
  { id: "eggs", name: "Eggs 30 pcs", price: 18, stock: 8 },
  { id: "water", name: "Water 1.5L", price: 2, stock: 40 },
];

const productVisuals: Record<
  string,
  { emoji: string; text: string; tone: string; label: string }
> = {
  milk: {
    emoji: "🥛",
    text: "Milk",
    tone: "border-sky-100 bg-gradient-to-br from-sky-50 to-white text-sky-800",
    label: "Milk",
  },
  bread: {
    emoji: "🍞",
    text: "Bread",
    tone:
      "border-amber-100 bg-gradient-to-br from-amber-50 to-yellow-50 text-amber-800",
    label: "Bread",
  },
  bananas: {
    emoji: "🍌",
    text: "Banana",
    tone:
      "border-yellow-100 bg-gradient-to-br from-yellow-50 to-lime-50 text-yellow-800",
    label: "Bananas",
  },
  eggs: {
    emoji: "🥚",
    text: "Eggs",
    tone:
      "border-stone-200 bg-gradient-to-br from-stone-50 to-yellow-50 text-stone-700",
    label: "Eggs",
  },
  water: {
    emoji: "💧",
    text: "Water",
    tone:
      "border-cyan-100 bg-gradient-to-br from-cyan-50 to-sky-50 text-cyan-800",
    label: "Water",
  },
};

const timeline: OrderStatus[] = [
  "Placed",
  "Accepted",
  "Packed",
  "Picked Up",
  "Delivered",
];

const flowSteps = ["Cart", ...timeline];

const formatQar = (amount: number) => `QAR ${amount.toFixed(2)}`;

const initialActivity = [
  "Demo ready in Lusail",
  "Al Noor Grocery inventory synced",
];

const heroFeatures = [
  {
    icon: "01",
    title: "Live inventory",
    description: "See real-time stock from nearby stores.",
  },
  {
    icon: "02",
    title: "Store-owned delivery",
    description: "Stores deliver with their own riders first.",
  },
  {
    icon: "03",
    title: "Backup fulfillment",
    description: "If needed, backup drivers step in.",
  },
];

const workflowSteps = [
  "Customer orders",
  "Store confirms",
  "Store delivers / backup if needed",
];

const heroKpis = [
  ["25–40 stores", "Pilot target", "Pilot assumption"],
  ["90+ SKUs", "Demo catalog", "Prototype scope"],
  ["15–20 min", "Target ETA", "Short-radius pilot"],
];

const bakalaComparison = [
  "Stores control pricing",
  "Stores control inventory",
  "Stores own customer relationships",
  "Stores manage delivery",
];

const marketplaceComparison = [
  "Platform controls pricing",
  "Platform controls inventory view",
  "Platform owns customer relationship",
  "Platform controls fulfillment",
];

const snoonuFit = [
  "Expands grocery reach",
  "Supports independent merchants",
  "Creates low-cost neighborhood fulfillment",
  "Validates repeat local ordering",
];

const problemCards = [
  "Customers don't know what nearby stores actually have in stock.",
  "Baqalas lose digital orders because they are offline or rely on WhatsApp and phone calls.",
  "Traditional marketplaces are not optimized for low-value neighborhood orders.",
];

const solutionFlow = [
  "Store inventory",
  "Customer order",
  "Store confirmation",
  "Store rider delivery",
  "Backup if needed",
];

const storeBenefits = [
  "Keep pricing control",
  "Keep inventory control",
  "Keep customer relationship",
  "Use own delivery staff first",
];

const customerBenefits = [
  "See nearby live stock",
  "Lower delivery cost potential",
  "Faster neighborhood fulfillment",
  "Support local stores",
];

const deliveryRules = [
  ["Store rider available", "Store delivers"],
  ["Store rider not available", "Backup driver can be assigned"],
  ["Order too far or too small", "Minimum order, longer ETA, or unavailable"],
];

const revenueStreams = [
  "Potential store subscription: QAR 199–399/month after pilot validation",
  "Optional platform fee: QAR 1–2 per successful order",
  "Backup delivery margin only when third-party fulfillment is used",
  "No heavy commission model because baqala margins are small",
];

const pilotNeeds = [
  "Merchant onboarding support for 15–25 baqalas",
  "Guidance on payments, dispatch, and order flow",
  "Pilot support in one dense Qatar zone",
  "Data support to validate repeat orders and unit economics",
];

const pilotPlan = [
  "Start in one dense area such as Lusail, Najma, or Al Sadd",
  "Onboard 15–25 stores",
  "Start with 300–800 high-moving SKUs per store",
  "Keep delivery radius short",
  "Measure stock accuracy, order completion, delivery cost, and repeat orders",
];

const whyNow = [
  "Qatar customers are already used to ordering through apps.",
  "Many neighborhood stores are still under-digitized.",
  "Price-sensitive customers need lower-cost hyperlocal options.",
];

const currentProgress = [
  "Working clickable prototype deployed",
  "Customer, store, delivery, and admin flow designed",
  "Pilot model defined for Lusail-first launch",
  "Unit economics model prepared",
  "Demo catalog and order flow created",
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabName>("Customer");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [orderItems, setOrderItems] = useState<
    Array<Product & { quantity: number }>
  >([]);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [, setActivity] = useState<string[]>(initialActivity);
  const [isPhoneScrolling, setIsPhoneScrolling] = useState(false);
  const [phoneScrollIndicator, setPhoneScrollIndicator] = useState({
    height: 18,
    top: 0,
  });
  const phoneScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );

  const cartItems = useMemo(
    () =>
      products
        .map((product) => ({
          ...product,
          quantity: cart[product.id] ?? 0,
        }))
        .filter((product) => product.quantity > 0),
    [cart, products],
  );

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const orderTotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const orderCount = orderItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const totalOrders = orderStatus ? 1 : 0;
  const flowIndex = orderStatus
    ? flowSteps.indexOf(orderStatus)
    : cartCount > 0
      ? 0
      : -1;

  const addActivity = (message: string) => {
    setActivity((current) => [message, ...current].slice(0, 6));
  };

  const addToCart = (product: Product) => {
    const inCart = cart[product.id] ?? 0;

    if (inCart >= product.stock) {
      addActivity(`${product.name} reached available stock`);
      return;
    }

    setCart((current) => ({
      ...current,
      [product.id]: inCart + 1,
    }));
    addActivity(`Customer added ${product.name}`);
  };

  const updateCartQuantity = (product: Product, change: number) => {
    const currentQuantity = cart[product.id] ?? 0;
    const nextQuantity = Math.min(
      product.stock,
      Math.max(0, currentQuantity + change),
    );

    setCart((current) => {
      const nextCart = { ...current };

      if (nextQuantity === 0) {
        delete nextCart[product.id];
      } else {
        nextCart[product.id] = nextQuantity;
      }

      return nextCart;
    });

    if (nextQuantity === product.stock && change > 0) {
      addActivity(`${product.name} reached available stock`);
    }
  };

  const placeOrder = () => {
    if (cartCount === 0) {
      addActivity("Customer tried to place an empty cart");
      return;
    }

    setOrderStatus("Placed");
    setOrderItems(cartItems);
    setProducts((current) =>
      current.map((product) => ({
        ...product,
        stock: Math.max(0, product.stock - (cart[product.id] ?? 0)),
      })),
    );
    setCart({});
    addActivity(`Order placed for ${cartCount} items from Lusail`);
  };

  const updateStock = (productId: string, change: number) => {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, stock: Math.max(0, product.stock + change) }
          : product,
      ),
    );

    const product = products.find((item) => item.id === productId);
    if (product) {
      addActivity(
        `${product.name} stock ${change > 0 ? "increased" : "decreased"}`,
      );
    }
  };

  const setStatus = (status: OrderStatus) => {
    setOrderStatus(status);
    addActivity(`Order marked ${status}`);
  };

  const resetDemo = () => {
    setProducts(initialProducts);
    setCart({});
    setOrderItems([]);
    setOrderStatus(null);
    setActivity(initialActivity);
  };

  const handlePhoneScroll = (event: UIEvent<HTMLElement>) => {
    const { clientHeight, scrollHeight, scrollTop } = event.currentTarget;
    const canScroll = scrollHeight > clientHeight;

    if (!canScroll) {
      setIsPhoneScrolling(false);
      return;
    }

    const height = Math.max(12, (clientHeight / scrollHeight) * 100);
    const maxTop = 100 - height;
    const top =
      maxTop === 0
        ? 0
        : (scrollTop / (scrollHeight - clientHeight)) * maxTop;

    setPhoneScrollIndicator({ height, top });
    setIsPhoneScrolling(true);

    if (phoneScrollTimeoutRef.current) {
      clearTimeout(phoneScrollTimeoutRef.current);
    }

    phoneScrollTimeoutRef.current = setTimeout(() => {
      setIsPhoneScrolling(false);
    }, 850);
  };

  return (
    <main className="min-h-screen bg-[#fff9e8] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between gap-4 rounded-full border border-emerald-900/10 bg-white/75 px-4 py-3 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
              BC
            </div>
            <div>
              <p className="text-base font-bold tracking-tight">
                Bakala Connect
              </p>
              <p className="text-xs font-medium text-slate-500">
                Qatar hyperlocal grocery
              </p>
            </div>
          </div>
          <div className="rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1.5 text-xs font-black text-emerald-800 sm:px-4 sm:py-2 sm:text-sm">
            Live in Lusail
          </div>
        </header>

        <section className="relative grid gap-8 overflow-hidden rounded-[2rem] border border-white/75 bg-gradient-to-br from-[#fff5cf] via-[#fffaf0] to-[#e8f6df] px-4 py-6 shadow-xl shadow-amber-900/8 sm:px-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_430px] lg:items-start lg:px-8">
          <div className="pointer-events-none absolute left-1/3 top-4 hidden h-8 w-14 rounded-t-2xl border border-emerald-800/15 bg-white/20 opacity-45 sm:block" />
          <div className="pointer-events-none absolute left-[34%] top-10 hidden h-5 w-10 rounded-b-lg bg-emerald-700/10 opacity-45 sm:block" />
          <div className="pointer-events-none absolute right-10 top-8 hidden h-24 w-24 rounded-full bg-white/35 opacity-60 blur-2xl lg:block" />
          <div className="pointer-events-none absolute bottom-10 left-8 hidden h-28 w-28 rounded-full bg-emerald-300/20 opacity-70 blur-2xl lg:block" />
          <div className="relative max-w-3xl py-1 lg:py-3">
            <p className="inline-flex rounded-full border border-emerald-900/10 bg-white/80 px-3.5 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-emerald-800 shadow-sm">
              Qatar quick-commerce prototype
            </p>
            <h1 className="mt-5 max-w-3xl text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Digitizing Qatar’s neighborhood groceries with
              <span className="block text-emerald-800">
                live stock and store-owned delivery.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-slate-700 sm:text-lg">
              Bakala Connect helps independent baqalas receive online orders
              without losing pricing control, customer ownership, or delivery
              independence.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-3">
              {heroFeatures.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-2xl border border-white/70 bg-white/70 p-3 shadow-sm shadow-amber-900/5 backdrop-blur"
                >
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-yellow-300 text-[10px] font-black tracking-[0.08em] text-slate-950">
                    {feature.icon}
                  </div>
                  <p className="text-sm font-black leading-5 text-slate-950">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 max-w-2xl rounded-3xl border border-emerald-900/10 bg-white/80 p-2.5 shadow-sm shadow-amber-900/5 backdrop-blur">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-center">
                {workflowSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-black text-white">
                      {index + 1}
                    </div>
                    <p className="text-xs font-black leading-4 text-slate-800">
                      {step}
                    </p>
                    {index < workflowSteps.length - 1 && (
                      <span className="hidden text-sm font-black text-emerald-700/60 sm:block">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 grid max-w-2xl gap-2 sm:grid-cols-3">
              {heroKpis.map(([value, title, detail]) => (
                <div
                  key={title}
                  className="rounded-2xl border border-white/70 bg-white/80 px-3 py-2.5 shadow-sm shadow-amber-900/5"
                >
                  <p className="text-2xl font-black leading-none text-slate-950">
                    {value}
                  </p>
                  <p className="mt-1.5 text-xs font-black text-emerald-800">
                    {title}
                  </p>
                  <p className="mt-0.5 text-[11px] font-semibold leading-4 text-slate-500">
                    {detail}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-4 max-w-2xl rounded-3xl border border-emerald-900/10 bg-white/85 p-3 shadow-lg shadow-amber-900/10 backdrop-blur">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.14em] text-emerald-800">
                    Working prototype
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-5 text-slate-600">
                    Click through the live customer → store → delivery flow
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <div className="rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-black text-emerald-800 ring-1 ring-emerald-700/10">
                      Online
                  </div>
                  <OrderStatusBadge status={orderStatus} compact tone="soft" />
                  <button
                    onClick={resetDemo}
                    className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-black text-slate-700 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-900"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  ["Current cart total", formatQar(cartTotal)],
                  ["Demo orders", orderStatus ? "1" : "0"],
                ].map(([value, label]) => (
                  <div
                    key={value}
                    className="rounded-2xl border border-emerald-900/10 bg-emerald-50/60 px-3 py-2"
                  >
                    <p className="text-[10px] font-black uppercase tracking-[0.1em] text-emerald-800">
                      {value}
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-950">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl border border-slate-100 bg-white px-2 py-2 shadow-sm">
                <FlowTimeline currentIndex={flowIndex} variant="stepper" />
              </div>
            </section>

          </div>

          <div className="relative mx-auto w-full max-w-[430px] rounded-[2.35rem] border border-slate-900 bg-slate-950 p-1.5 shadow-2xl shadow-amber-950/25 lg:mx-0 lg:justify-self-end">
            <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-emerald-900/10 bg-white px-3 py-1 text-[11px] font-black text-emerald-800 shadow-sm">
              Live customer app demo
            </div>
            <div className="flex justify-center pb-1.5 pt-1">
              <div className="h-1.5 w-16 rounded-full bg-white/25" />
            </div>
            <div className="flex h-[780px] max-h-[calc(100vh-4rem)] flex-col overflow-hidden rounded-[1.9rem] bg-[#fffaf0] sm:h-[820px]">
              <div className="hidden">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-lg font-black">Bakala Connect</p>
                    <p className="mt-1 text-xs font-bold text-emerald-900">
                      Lusail
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-sm font-black shadow-sm">
                      🔎
                    </div>
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white shadow-sm">
                      🛒
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white">
                        {cartCount}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 rounded-3xl bg-white p-3 shadow-lg shadow-amber-900/10">
                  <p className="text-lg font-black">
                    Fresh picks from your neighborhood
                  </p>
                  <div className="mt-3 grid gap-2 text-xs font-black text-slate-600">
                    <span>Live stock from stores</span>
                    <span>Store-owned delivery</span>
                    <span>Support local businesses</span>
                  </div>
                </div>

                <div className="mt-3 flex items-start justify-between gap-3 rounded-3xl bg-slate-950 p-3 text-white">
                  <div>
                    <p className="text-xs font-semibold text-yellow-200">
                      Live demo status
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <div className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950">
                        Online
                      </div>
                      <OrderStatusBadge status={orderStatus} />
                    </div>
                  </div>
                <button
                  onClick={resetDemo}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white transition hover:bg-white/20"
                >
                  Reset
                </button>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2">
                {[
                  [formatQar(cartTotal), "current cart total"],
                  [orderStatus ? "1" : "0", "demo orders"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-2xl bg-white/80 p-3 shadow-sm">
                    <p className="text-lg font-black text-slate-950">{value}</p>
                    <p className="mt-1 text-xs font-bold text-slate-600">
                      {label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-2xl bg-white/70 p-1.5">
                <FlowTimeline currentIndex={flowIndex} dark />
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col p-3">
              <div className="mb-2 flex shrink-0 items-center justify-between gap-3 rounded-3xl bg-white px-3 py-2 shadow-sm">
                <div>
                  <p className="text-sm font-black text-slate-950">
                    Bakala Connect
                  </p>
                  <p className="text-xs font-bold text-emerald-800">Lusail</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 text-sm font-black text-slate-800">
                    🔎
                  </div>
                  <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-slate-950 text-sm font-black text-white">
                    🛒
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[10px] font-black text-white">
                      {cartCount}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid shrink-0 grid-cols-4 gap-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                    className={`rounded-2xl px-2 py-2.5 text-xs font-black transition ${
                      activeTab === tab
                        ? "bg-slate-950 text-yellow-200 shadow-sm"
                        : "bg-white text-slate-600 hover:bg-yellow-100 hover:text-slate-950"
                    }`}
                  >
                      {tab === "Grocery Store"
                        ? "Store"
                        : tab === "Store Delivery"
                          ? "Delivery"
                          : tab}
                    </button>
                  ))}
              </div>

              <div className="relative mt-2 min-h-0 flex-1">
                <section
                  onScroll={handlePhoneScroll}
                  className="h-full overflow-y-auto rounded-3xl bg-white p-2.5 shadow-lg shadow-amber-900/10 [scrollbar-width:none] [&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0"
                >
                  {activeTab === "Customer" && (
                    <CustomerPanel
                      cartCount={cartCount}
                      cartItems={cartItems}
                      cartTotal={cartTotal}
                      onAddToCart={addToCart}
                      onPlaceOrder={placeOrder}
                      onUpdateCartQuantity={updateCartQuantity}
                      orderItems={orderItems}
                      orderStatus={orderStatus}
                      orderTotal={orderTotal}
                      products={products}
                    />
                  )}

                  {activeTab === "Grocery Store" && (
                    <StorePanel
                      onSetStatus={setStatus}
                      onUpdateStock={updateStock}
                      orderItems={orderItems}
                      orderStatus={orderStatus}
                      orderTotal={orderTotal}
                      products={products}
                    />
                  )}

                  {activeTab === "Store Delivery" && (
                    <RiderPanel
                      onSetStatus={setStatus}
                      orderItems={orderItems}
                      orderStatus={orderStatus}
                      orderTotal={orderTotal}
                    />
                  )}

                  {activeTab === "Admin" && (
                    <AdminPanel
                      orderCount={orderCount}
                      orderStatus={orderStatus}
                      totalOrders={totalOrders}
                    />
                  )}
                </section>
                <div
                  className={`pointer-events-none absolute right-1.5 z-20 w-1 rounded-full bg-slate-900/25 transition-opacity duration-300 ${
                    isPhoneScrolling ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    height: `${phoneScrollIndicator.height}%`,
                    top: `${phoneScrollIndicator.top}%`,
                  }}
                />
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-5 py-5">
          <PitchSection
            eyebrow="The problem"
            title="Neighborhood grocery demand is still hard to capture online."
            description="The opportunity is local, frequent, and practical, but the current tools are fragmented."
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {problemCards.map((problem, index) => (
                <PitchCard key={problem} marker={`0${index + 1}`}>
                  {problem}
                </PitchCard>
              ))}
            </div>
          </PitchSection>

          <PitchSection
            eyebrow="The solution"
            title="Digital storefronts for independent baqalas."
            description="Bakala Connect turns neighborhood baqalas into digital storefronts. Stores publish their live available items, customers order from the nearest store, and fulfillment happens through the store's own rider first. If the store cannot deliver, backup fulfillment can step in."
          >
            <div className="rounded-3xl border border-white/70 bg-white/80 p-3 shadow-sm shadow-amber-900/5">
              <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                {solutionFlow.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[11px] font-black text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm font-black text-slate-800">{step}</p>
                    {index < solutionFlow.length - 1 && (
                      <span className="hidden text-sm font-black text-emerald-700/60 lg:block">
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </PitchSection>

          <PitchSection
            eyebrow="Snoonu Startup Factory fit"
            title="Why this fits Snoonu"
            description="Bakala Connect can help Snoonu extend deeper into neighborhood grocery demand without forcing every small store into a heavy marketplace model. The concept creates a lighter merchant layer where baqalas manage live stock, store-owned fulfillment, and nearby repeat customers, while Snoonu can support infrastructure, payments, dispatch, and scale."
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {snoonuFit.map((item, index) => (
                <PitchCard key={item} marker={`0${index + 1}`} compact>
                  {item}
                </PitchCard>
              ))}
            </div>
          </PitchSection>

          <div className="grid gap-5 lg:grid-cols-2">
            <PitchSection
              eyebrow="Built for stores"
              title="Baqalas stay the main operators."
              description="Stores are not just suppliers. They keep control of the commercial relationship."
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {storeBenefits.map((benefit) => (
                  <PitchCard key={benefit} marker="BC" compact>
                    {benefit}
                  </PitchCard>
                ))}
              </div>
            </PitchSection>

            <PitchSection
              eyebrow="Built for customers"
              title="Useful local ordering, not generic delivery."
              description="Customers get a clearer way to buy from nearby stores they already know."
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {customerBenefits.map((benefit) => (
                  <PitchCard key={benefit} marker="Q" compact>
                    {benefit}
                  </PitchCard>
                ))}
              </div>
            </PitchSection>
          </div>

          <PitchSection
            eyebrow="Hybrid delivery model"
            title="Store-first delivery, with practical limits."
            description="Bakala Connect is not building a central fleet. It lets stores fulfill independently, with backup delivery only when needed."
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {deliveryRules.map(([condition, outcome], index) => (
                <div
                  key={condition}
                  className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-sm shadow-amber-900/5"
                >
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-xs font-black text-slate-950">
                    {index + 1}
                  </div>
                  <p className="text-sm font-black text-slate-950">
                    If {condition.toLowerCase()}
                  </p>
                  <p className="mt-2 rounded-2xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-900">
                    {outcome}
                  </p>
                </div>
              ))}
            </div>
          </PitchSection>

          <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
            <PitchSection
              eyebrow="Business model"
              title="Practical revenue for small-margin grocery."
              description="The model avoids heavy percentage commission because baqala margins are small."
            >
              <div className="space-y-2">
                {revenueStreams.map((stream) => (
                  <PitchListItem key={stream}>{stream}</PitchListItem>
                ))}
              </div>
            </PitchSection>

            <PitchSection
              eyebrow="What we need to pilot"
              title="A focused launch with the right operating support."
              description="The concept is ready for a small controlled test with selected merchants, tight delivery radius, and clear measurement."
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {pilotNeeds.map((item) => (
                  <PitchListItem key={item}>{item}</PitchListItem>
                ))}
              </div>
            </PitchSection>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <PitchSection
              eyebrow="Pilot strategy"
              title="Launch dense, measure unit economics, then expand."
              description="The first pilot should prove stock accuracy, reliable fulfillment, and repeat ordering in a short-radius area."
            >
              <div className="grid gap-2 sm:grid-cols-2">
                {pilotPlan.map((item) => (
                  <PitchListItem key={item}>{item}</PitchListItem>
                ))}
              </div>
            </PitchSection>

            <PitchSection
              eyebrow="Current progress"
              title="Built enough to evaluate the pilot concept."
              description="The prototype is designed to show the core customer, merchant, delivery, and admin logic without claiming live market traction."
            >
              <div className="space-y-2">
                {currentProgress.map((item) => (
                  <PitchListItem key={item}>{item}</PitchListItem>
                ))}
              </div>
            </PitchSection>
          </div>

          <PitchSection
            eyebrow="Why now"
            title="The market behavior is ready, but local stores are still catching up."
          >
            <div className="grid gap-3 lg:grid-cols-3">
              {whyNow.map((point, index) => (
                <PitchCard key={point} marker={`0${index + 1}`}>
                  {point}
                </PitchCard>
              ))}
            </div>
          </PitchSection>

          <PitchSection
            eyebrow="Why this is different"
            title="Built around store ownership, not platform control."
          >
            <div className="relative grid gap-3 lg:grid-cols-2 lg:items-stretch">
              <ComparisonCard
                badge="BC"
                title="Bakala Connect"
                subtitle="Independent store-first model"
                items={bakalaComparison}
                positive
              />

              <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-slate-950 text-xs font-black text-yellow-200 shadow-lg lg:flex">
                VS
              </div>

              <ComparisonCard
                badge="TM"
                title="Standard marketplace model"
                subtitle="Stronger central control, higher operating complexity, and less flexibility for small independent stores."
                items={marketplaceComparison}
              />
            </div>
          </PitchSection>

          <section className="rounded-[1.75rem] border border-emerald-900/10 bg-slate-950 p-5 text-white shadow-xl shadow-amber-900/10 sm:p-6">
            <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-yellow-200">
                  Next step
                </p>
                <h2 className="mt-2 text-3xl font-black tracking-tight">
                  Ready for a focused pilot
                </h2>
                <p className="mt-2 max-w-3xl text-sm font-semibold leading-6 text-slate-300">
                  The next step is a small controlled pilot with selected
                  baqalas in one dense area, measuring stock accuracy, order
                  completion, fulfillment cost, repeat orders, and customer
                  satisfaction.
                </p>
              </div>
              <div className="w-fit rounded-full bg-yellow-300 px-4 py-2 text-sm font-black text-slate-950 shadow-sm">
                Pilot-ready concept demo
              </div>
            </div>
          </section>
        </section>

        <footer className="border-t border-slate-200 py-6 text-sm text-slate-600">
          <p className="font-black text-slate-950">
            Bakala Connect - Qatar hyperlocal grocery demo
          </p>
          <p className="mt-1">
            Built as a live concept demo for Lusail-first grocery commerce.
          </p>
        </footer>
      </div>
    </main>
  );
}

function PitchSection({
  children,
  description,
  eyebrow,
  title,
}: {
  children: ReactNode;
  description?: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/60 bg-white/35 p-4 shadow-sm shadow-amber-900/5 backdrop-blur sm:p-5">
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
            {eyebrow}
          </p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">
            {title}
          </h2>
        </div>
        {description && (
          <p className="max-w-xl text-sm font-semibold leading-6 text-slate-600">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

function PitchCard({
  children,
  compact = false,
  marker,
}: {
  children: ReactNode;
  compact?: boolean;
  marker: string;
}) {
  return (
    <div
      className={`rounded-3xl border border-white/70 bg-white/80 shadow-sm shadow-amber-900/5 ${
        compact ? "p-3" : "p-4"
      }`}
    >
      <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-300 text-[10px] font-black uppercase tracking-[0.08em] text-slate-950">
        {marker}
      </div>
      <p className="text-sm font-black leading-5 text-slate-950">{children}</p>
    </div>
  );
}

function PitchListItem({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-2 rounded-2xl border border-white/70 bg-white/80 px-3 py-2.5 text-sm font-bold leading-5 text-slate-700 shadow-sm shadow-amber-900/5">
      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-[10px] font-black text-white">
        ✓
      </span>
      {children}
    </div>
  );
}

function ComparisonCard({
  badge,
  items,
  positive = false,
  subtitle,
  title,
}: {
  badge: string;
  items: string[];
  positive?: boolean;
  subtitle: string;
  title: string;
}) {
  return (
    <div
      className={`rounded-3xl border p-5 shadow-sm shadow-amber-900/5 ${
        positive
          ? "border-emerald-900/10 bg-white/85"
          : "border-slate-200 bg-white/70"
      }`}
    >
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-black ${
            positive
              ? "bg-yellow-300 text-slate-950"
              : "bg-slate-100 text-slate-500"
          }`}
        >
          {badge}
        </div>
        <div>
          <p className="text-lg font-black text-slate-950">{title}</p>
          <p
            className={`text-xs font-bold ${
              positive ? "text-emerald-800" : "text-slate-500"
            }`}
          >
            {subtitle}
          </p>
        </div>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className={`flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold ${
              positive
                ? "bg-emerald-50 text-emerald-950"
                : "bg-slate-50 text-slate-600"
            }`}
          >
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-black ${
                positive
                  ? "bg-emerald-700 text-white"
                  : "bg-slate-200 text-slate-500"
              }`}
            >
              {positive ? "✓" : "-"}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function OrderStatusBadge({
  status,
  compact = false,
  tone = "default",
}: {
  status: OrderStatus | null;
  compact?: boolean;
  tone?: "default" | "soft";
}) {
  return (
    <div
      className={`rounded-full font-black shadow-sm ${
        compact ? "px-2.5 py-0.5 text-[11px]" : "px-4 py-2 text-sm"
      } ${
        tone === "soft"
          ? "border border-yellow-200 bg-yellow-50 text-slate-950"
          : "bg-white text-slate-950"
      }`}
    >
      Status: {status ?? "Cart"}
    </div>
  );
}

function FlowTimeline({
  currentIndex,
  dark = false,
  compact = false,
  variant = "pills",
}: {
  currentIndex: number;
  dark?: boolean;
  compact?: boolean;
  variant?: "pills" | "stepper";
}) {
  if (variant === "stepper") {
    return (
      <div className="flex min-w-0 overflow-x-auto px-1 py-1">
        {flowSteps.map((step, index) => {
          const isCurrent = index === currentIndex;
          const isDone = index <= currentIndex;

          return (
            <div key={step} className="flex shrink-0 items-center">
              <div className="flex min-w-[4.5rem] flex-col items-center gap-1">
                <div
                  className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-black transition ${
                    isCurrent
                      ? "border-yellow-300 bg-yellow-300 text-slate-950 ring-4 ring-yellow-100"
                      : isDone
                        ? "border-emerald-700 bg-emerald-700 text-white"
                        : "border-slate-200 bg-slate-50 text-slate-400"
                  }`}
                >
                  {index + 1}
                </div>
                <p
                  className={`text-center text-[10px] font-black leading-3 ${
                    isCurrent
                      ? "text-slate-950"
                      : isDone
                        ? "text-emerald-800"
                        : "text-slate-400"
                  }`}
                >
                  {step}
                </p>
              </div>
              {index < flowSteps.length - 1 && (
                <div
                  className={`mx-1 h-px w-7 ${
                    index < currentIndex ? "bg-emerald-600" : "bg-slate-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className={compact ? "flex gap-1 overflow-x-auto" : "flex gap-2 overflow-x-auto"}>
      {flowSteps.map((step, index) => {
        const isDone = index <= currentIndex;

        return (
          <div
            key={step}
            className={`shrink-0 rounded-full text-center font-black ${
              compact ? "px-2 py-1 text-[10px]" : "px-2.5 py-1.5 text-[11px]"
            } ${
              index === currentIndex
                ? "bg-yellow-300 text-slate-950 ring-2 ring-yellow-100/60"
                : isDone
                  ? "bg-emerald-500 text-emerald-950"
                : dark
                  ? "bg-white/10 text-slate-300"
                  : "bg-white text-slate-500"
            }`}
          >
            {step}
          </div>
        );
      })}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-emerald-700">
          {eyebrow}
        </p>
        <h2 className="mt-1 text-lg font-black leading-tight text-slate-950">
          {title}
        </h2>
        <p className="mt-1.5 max-w-2xl text-xs leading-5 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

function CustomerPanel({
  cartCount,
  cartItems,
  cartTotal,
  onAddToCart,
  onPlaceOrder,
  onUpdateCartQuantity,
  orderItems,
  orderStatus,
  orderTotal,
  products,
}: {
  cartCount: number;
  cartItems: Array<Product & { quantity: number }>;
  cartTotal: number;
  onAddToCart: (product: Product) => void;
  onPlaceOrder: () => void;
  onUpdateCartQuantity: (product: Product, change: number) => void;
  orderItems: Array<Product & { quantity: number }>;
  orderStatus: OrderStatus | null;
  orderTotal: number;
  products: Product[];
}) {
  return (
    <div>
      <SectionHeading
        eyebrow="Customer view"
        title="Order from Al Noor Grocery's live stock"
        description="Order from Al Noor Grocery's live stock. Delivered by the store's own team."
      />

      <div className="mt-2 rounded-2xl border border-yellow-200 bg-yellow-50 px-3 py-2">
        <div className="flex flex-col gap-1">
          <div>
            <p className="text-sm font-black text-emerald-950">
              Al Noor Grocery · Lusail
            </p>
            <p className="hidden">
              Independent neighborhood grocery
            </p>
            <p className="mt-1 text-xs font-black text-emerald-900">
              Independent store · Store-owned delivery · Live stock
            </p>
            <p className="hidden">
              Live inventory managed by the store.
            </p>
            <p className="hidden">
              Delivery fulfilled by Al Noor Grocery&apos;s own staff.
            </p>
            <p className="mt-1 text-xs font-semibold text-emerald-800">
              15–20 min · Delivered by store staff
            </p>
            <p className="hidden">
              Store-owned delivery · 15–20 min
            </p>
          </div>
          <div className="hidden">
            <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-black text-emerald-800">
              Independent store
            </span>
            <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-black text-emerald-800">
              Store-owned delivery
            </span>
            <span className="rounded-full bg-white px-2.5 py-1.5 text-xs font-black text-emerald-800">
              Live stock
            </span>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-base font-black text-slate-950">Fresh essentials</p>
        <p className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-slate-700">
          Live stock
        </p>
      </div>

      <div className="mt-1.5 grid gap-1.5">
        {products.map((product) => {
          const visual = productVisuals[product.id];

          return (
            <div
              key={product.id}
              className="rounded-2xl border border-yellow-100 bg-white px-3 py-2 shadow-md shadow-amber-900/5"
            >
              <div className="flex items-start justify-between gap-2.5">
                <div className="flex min-w-0 items-start gap-2.5">
                  <div
                    className={`flex h-[4.25rem] w-[4.75rem] shrink-0 flex-col items-center justify-center rounded-2xl border shadow-inner ${visual.tone}`}
                    aria-label={visual.label}
                  >
                    <span className="text-[1.7rem] leading-none">{visual.emoji}</span>
                    <span className="mt-1 text-[11px] font-black leading-none">
                      {visual.text}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-slate-950">
                      {product.name}
                    </p>
                    <p className="mt-1 text-lg font-black leading-tight text-emerald-700">
                      {formatQar(product.price)}
                    </p>
                  </div>
                </div>
                <p className="shrink-0 rounded-full border border-slate-100 bg-slate-50/70 px-1.5 py-0.5 text-[10px] font-bold text-slate-400">
                  {product.stock} left
                </p>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                disabled={
                  product.stock === 0 ||
                  (cartItems.find((item) => item.id === product.id)
                    ?.quantity ?? 0) >= product.stock ||
                  orderStatus !== null
                }
                className="mt-2 w-full rounded-xl bg-yellow-300 px-3 py-1.5 text-xs font-black text-slate-950 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
              >
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-2 shadow-sm">
        <p className="text-[11px] font-black leading-4 text-emerald-900">
          Store-owned delivery · 15–20 min · Delivered by Al Noor Grocery staff
        </p>
      </div>

      <div className="sticky bottom-0 z-10 mt-3 rounded-t-3xl border border-yellow-200 bg-yellow-50 px-3 py-2 shadow-2xl shadow-amber-900/20">
        <div className="mx-auto mb-1.5 h-1 w-10 rounded-full bg-amber-300" />
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-base font-black text-emerald-950">Cart</p>
            <p className="text-xs font-bold text-emerald-800">
              {cartCount} items · {formatQar(cartTotal)}
            </p>
          </div>
          <button
            onClick={onPlaceOrder}
            disabled={cartCount === 0 || orderStatus !== null}
            className="rounded-xl bg-slate-950 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-white disabled:text-slate-400 disabled:shadow-inner"
          >
            {cartCount === 0 ? "Add items to continue" : "Place Demo Order"}
          </button>
        </div>

        <div className="mt-1.5 max-h-36 space-y-1.5 overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:rgba(15,23,42,0.18)_transparent]">
          {cartItems.length === 0 ? (
            <p className="rounded-2xl bg-white px-3 py-1.5 text-xs font-semibold leading-5 text-emerald-800">
              Add items to begin your order.
            </p>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white px-3 py-2 text-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">
                      {item.quantity}x {item.name}
                    </p>
                    <p className="text-xs font-semibold text-slate-500">
                      {formatQar(item.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateCartQuantity(item, -1)}
                      className="h-7 w-7 rounded-full bg-slate-100 text-sm font-black text-slate-700 transition hover:bg-slate-200"
                      aria-label={`Decrease ${item.name} quantity`}
                    >
                      -
                    </button>
                    <span className="min-w-5 text-center text-sm font-black">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateCartQuantity(item, 1)}
                      disabled={item.quantity >= item.stock}
                      className="h-7 w-7 rounded-full bg-emerald-700 text-sm font-black text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                      aria-label={`Increase ${item.name} quantity`}
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="mt-1 text-right text-xs font-black text-slate-900">
                  {formatQar(item.price * item.quantity)}
                </p>
              </div>
            ))
          )}
        </div>

        {orderStatus === "Delivered" && (
          <div className="mt-4 rounded-2xl bg-white px-4 py-3">
            <p className="text-sm font-bold text-emerald-800">
              Demo order completed: Delivered
            </p>
            <div className="mt-3 space-y-2">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 text-sm"
                >
                  <span className="font-bold text-slate-950">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-black text-slate-900">
                    {formatQar(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-3 text-right text-sm font-black text-slate-950">
              Total {formatQar(orderTotal)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function StorePanel({
  onSetStatus,
  onUpdateStock,
  orderItems,
  orderStatus,
  products,
  orderTotal,
}: {
  onSetStatus: (status: OrderStatus) => void;
  onUpdateStock: (productId: string, change: number) => void;
  orderItems: Array<Product & { quantity: number }>;
  orderStatus: OrderStatus | null;
  products: Product[];
  orderTotal: number;
}) {
  const previewProducts = products.filter((product) =>
    ["milk", "bread", "eggs"].includes(product.id),
  );
  const ordersToday = orderStatus ? 1 : 0;

  return (
    <div>
      <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xl font-black text-slate-950">
              Al Noor Grocery
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">
              Manage live inventory, prepare customer orders, and assign
              delivery to store staff.
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-emerald-800">
            Independent store
          </span>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            ["90", "Live items"],
            [ordersToday.toString(), "Orders today"],
            ["Mohammed", "Store rider"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="rounded-2xl border border-yellow-100 bg-white p-2.5"
            >
              <p className="text-lg font-black text-slate-950">{value}</p>
              <p className="mt-1 text-[11px] font-bold leading-4 text-slate-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-slate-100 bg-white p-3 shadow-sm">
        <p className="text-sm font-black text-slate-950">Inventory preview</p>
        <div className="mt-3 space-y-2">
          {previewProducts.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-bold text-slate-950">
                  {product.name}
                </p>
                <p className="text-xs font-semibold text-slate-500">
                  {product.stock} in stock
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateStock(product.id, -1)}
                  className="h-8 w-8 rounded-full bg-white text-base font-black text-slate-700 shadow-sm transition hover:bg-slate-100"
                  aria-label={`Decrease ${product.name} stock`}
                >
                  -
                </button>
                <span className="min-w-8 text-center text-sm font-black">
                  {product.stock}
                </span>
                <button
                  onClick={() => onUpdateStock(product.id, 1)}
                  className="h-8 w-8 rounded-full bg-emerald-700 text-base font-black text-white shadow-sm transition hover:bg-emerald-800"
                  aria-label={`Increase ${product.name} stock`}
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>

        <details className="mt-2">
          <summary className="cursor-pointer text-xs font-black text-slate-500">
            Manage all inventory
          </summary>
          <div className="mt-2 space-y-2">
            {products
              .filter((product) => !["milk", "bread", "eggs"].includes(product.id))
              .map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-bold text-slate-950">
                    {product.name}
                  </p>
                  <p className="text-xs font-semibold text-slate-500">
                    {product.stock} in stock
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateStock(product.id, -1)}
                    className="h-8 w-8 rounded-full bg-white text-base font-black text-slate-700 shadow-sm transition hover:bg-slate-100"
                    aria-label={`Decrease ${product.name} stock`}
                  >
                    -
                  </button>
                  <span className="min-w-8 text-center text-sm font-black">
                    {product.stock}
                  </span>
                  <button
                    onClick={() => onUpdateStock(product.id, 1)}
                    className="h-8 w-8 rounded-full bg-emerald-700 text-base font-black text-white shadow-sm transition hover:bg-emerald-800"
                    aria-label={`Increase ${product.name} stock`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>

        <div className="mt-3 rounded-3xl border border-emerald-900/10 bg-emerald-50 p-3">
          <p className="text-lg font-black text-emerald-950">
            Incoming customer order
          </p>
          {orderStatus ? (
            <>
              <p className="mt-1 text-sm font-bold text-emerald-800">
                Status: {orderStatus}
              </p>
              <div className="mt-4 space-y-2">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-3 rounded-2xl bg-white px-4 py-3 text-sm"
                  >
                    <span className="font-bold">{item.name}</span>
                    <span className="shrink-0 font-black">x{item.quantity}</span>
                  </div>
                ))}
                <div className="flex justify-between rounded-2xl bg-white px-4 py-3 text-sm">
                  <span className="font-bold text-slate-600">Order total</span>
                  <span className="font-black text-slate-950">
                    {formatQar(orderTotal)}
                  </span>
                </div>
              </div>
              <div className="mt-4 grid gap-2">
                <button
                  onClick={() => onSetStatus("Accepted")}
                  disabled={orderStatus !== "Placed"}
                  className="rounded-2xl bg-yellow-300 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  Accept Order
                </button>
                <button
                  onClick={() => onSetStatus("Packed")}
                  disabled={orderStatus !== "Accepted"}
                  className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  Mark Packed
                </button>
                <button
                  onClick={() => onSetStatus("Packed")}
                  disabled={orderStatus !== "Packed"}
                  className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
                >
                  Assign to Store Delivery
                </button>
              </div>
              {orderStatus === "Packed" && (
                <p className="mt-3 rounded-2xl bg-white px-4 py-3 text-sm font-black text-emerald-800">
                  Ready for store delivery.
                </p>
              )}
            </>
          ) : (
            <div className="mt-3 rounded-2xl bg-white p-4">
              <p className="text-sm font-bold leading-6 text-emerald-800">
                No incoming orders yet. Place an order from the Customer tab.
              </p>
            </div>
          )}
        </div>
    </div>
  );
}

function RiderPanel({
  onSetStatus,
  orderItems,
  orderStatus,
  orderTotal,
}: {
  onSetStatus: (status: OrderStatus) => void;
  orderItems: Array<Product & { quantity: number }>;
  orderStatus: OrderStatus | null;
  orderTotal: number;
}) {
  const hasDeliveryTask =
    orderStatus === "Packed" ||
    orderStatus === "Picked Up" ||
    orderStatus === "Delivered";
  const riderStatus =
    orderStatus === "Picked Up" || orderStatus === "Delivered"
      ? "On delivery"
      : orderStatus === "Packed"
        ? "Waiting"
        : "Available / Waiting";

  return (
    <div>
      <div className="mb-3">
        <p className="text-xl font-black text-slate-950">Store Delivery</p>
        <p className="mt-1 text-sm leading-5 text-slate-600">
          This order is fulfilled by Al Noor Grocery&apos;s own delivery rider.
        </p>
      </div>

      <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-lg font-black text-slate-950">
              Store Delivery Rider: Mohammed
            </p>
            <p className="mt-1 text-sm font-semibold text-emerald-800">
              Assigned by Al Noor Grocery
            </p>
          </div>
          <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-700">
            Bike
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Vehicle
            </p>
            <p className="mt-1 text-sm font-black text-slate-950">Bike</p>
          </div>
          <div className="rounded-2xl bg-white p-3">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
              Status
            </p>
            <p className="mt-1 text-sm font-black text-slate-950">
              {riderStatus}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-3xl border border-slate-100 bg-slate-50 p-3">
        {hasDeliveryTask ? (
          <>
            <div className="rounded-3xl bg-white p-3 shadow-sm">
              <p className="text-sm font-black text-slate-950">
                Delivery task
              </p>
              <div className="mt-3 grid gap-2">
              {[
                ["Pickup", "Al Noor Grocery, Lusail"],
                ["Drop-off", "Customer, Lusail Marina"],
                ["ETA", "15–20 min"],
                ["Delivery type", "Store-owned delivery"],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 p-3">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-black text-slate-950">
                    {value}
                  </p>
                </div>
              ))}
              </div>
            </div>
            <div className="mt-3 rounded-2xl bg-white p-4">
              <p className="text-sm font-black text-slate-950">
                Delivery items
              </p>
              <div className="mt-3 space-y-2">
                {orderItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-sm"
                  >
                    <span className="font-bold text-slate-700">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-black text-slate-950">
                      {formatQar(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-right text-sm font-black text-slate-950">
                Total {formatQar(orderTotal)}
              </p>
            </div>
            <div className="mt-3 grid gap-2">
              <button
                onClick={() => onSetStatus("Picked Up")}
                disabled={orderStatus !== "Packed"}
                className="rounded-2xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Mark Picked Up
              </button>
              <button
                onClick={() => onSetStatus("Delivered")}
                disabled={orderStatus !== "Picked Up"}
                className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
              >
                Mark Delivered
              </button>
            </div>
          </>
        ) : (
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-lg font-black text-slate-950">
              Waiting for Al Noor Grocery to pack the order.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Once packed, Mohammed receives the delivery task.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({
  orderCount,
  orderStatus,
  totalOrders,
}: {
  orderCount: number;
  orderStatus: OrderStatus | null;
  totalOrders: number;
}) {
  const statusLabel = orderStatus ?? "Cart";
  const activityMessage =
    orderStatus === "Placed"
      ? "Customer placed an order"
      : orderStatus === "Accepted"
        ? "Al Noor Grocery accepted the order"
        : orderStatus === "Packed"
          ? "Store packed the order"
          : orderStatus === "Picked Up"
            ? "Mohammed picked up the order"
            : orderStatus === "Delivered"
              ? "Order delivered by store rider"
              : "Waiting for customer order";

  return (
    <div>
      <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-3">
        <p className="text-xl font-black text-slate-950">
          Platform Overview
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-600">
          Track independent stores, live inventory, and store-owned deliveries.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          ["Independent stores", "42"],
          ["Store riders", "16"],
          ["Live inventory items", "90"],
          ["Demo orders", totalOrders.toString()],
          ["Current status", statusLabel],
          ["Average fulfillment", "18 min"],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-2xl border border-yellow-100 bg-white p-3 shadow-sm"
          >
            <p className="text-xl font-black text-slate-950">{value}</p>
            <p className="mt-1 text-xs font-bold leading-4 text-slate-500">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-3xl border border-emerald-900/10 bg-emerald-50 p-3">
        <p className="text-lg font-black text-slate-950">Recent activity</p>
        <div className="mt-3 rounded-2xl bg-white px-3 py-3 text-sm font-bold text-slate-800 shadow-sm">
          {activityMessage}
        </div>
        <div className="mt-2 flex items-center justify-between gap-3 rounded-2xl bg-white/70 px-3 py-2">
          <span className="text-xs font-bold text-emerald-800">
            Current order items
          </span>
          <span className="text-xs font-black text-slate-700">
            {orderCount}
          </span>
        </div>
      </div>
    </div>
  );
}
