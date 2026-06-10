export const orders = [
  {
    name: "Максим Коваленко",
    phone: "+380991234567",
    address: "вул. Гетьмана Мазепи 15, Львів",
    comment: "Цікавить модель «Лофт Кортен», прошу передзвонити для уточнення монтажу.",
    productIndex: 0,
  },
  {
    name: "Олена Петренко",
    phone: "+380671112233",
    address: "просп. Перемоги 42, кв. 18, Київ",
    comment: "Замовлення на «Альпійська Скеля». Бажана доставка у вихідні.",
    productIndex: 1,
  },
  {
    name: "Андрій Савченко",
    phone: "+380501998877",
    address: "вул. Дерибасівська 7, Одеса",
    comment: "Потрібна консультація щодо вибору каміна для вітальні 35 м².",
    productIndex: null,
  },
];

export async function seedOrders(prisma) {
  if (orders.length === 0) {
    return 0;
  }

  const products = await prisma.product.findMany({
    orderBy: { id: "asc" },
    select: { id: true },
  });

  const data = orders.map(({ productIndex, ...order }) => ({
    ...order,
    productId: productIndex == null ? null : (products[productIndex]?.id ?? null),
  }));

  await prisma.order.createMany({ data });
  return data.length;
}
