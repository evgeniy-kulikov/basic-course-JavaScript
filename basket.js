"use strict";

/* отображение кол-ва товара в корзине */
const basketCountEl = document.querySelector(".cartIconWrap span");
/* отображение суммы покупки в корзине */
const basketTotalEl = document.querySelector(".basketTotal");
/* отображение стоимости товара в корзине */
const basketTotalValEl = document.querySelector(".basketTotalValue");
const basketEl = document.querySelector(".basket");

/* при клике открываем/закрываем меню корзины */
document.querySelector(".cartIconWrap").addEventListener("click", () => {
  basketEl.classList.toggle("hidden");
});

/* содержимое корзины со следующей стркутурой: 
  {id: numer, name: "string", price: numer, count: numer}*/
const basket = {};

/* Обрабатываем событие выбора карточки товара. Делигируем событие */
document.querySelector(".featuredItems").addEventListener("click", (event) => {
  if (!event.target.classList.contains("addToBasket")) {
    return;
  }

  /* возвращаем ближайший родительский элемент (или сам элемент), 
  который соответствует заданному селектору */
  const featuredItem = event.target.closest(".featuredItem");
  /* получаем из блока данные для расчета корзины */
  const id = Number(featuredItem.dataset.id);
  const name = featuredItem.dataset.name;
  const price = Number(featuredItem.dataset.price);
  /* Наполнение корзины товаром*/
  addToCard(id, name, price);
});

/**
 * Функция наполнение корзины товаром.
 * @param {number} id - Код продукта.
 * @param {string} name - Наименование продукта.
 * @param {number} price - Цена продукта.
 */
function addToCard(id, name, price) {
  // Если нет товара с ткаим кодом, то создем новую карточку товара
  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0,
    };
  }
  /* при последующих кликах увеличиваем кол-во данного товара в корзине */
  basket[id].count++;
  basketCountEl.textContent = getBasketCount();
  basketTotalValEl.textContent = getBasketPrice();
  // Отрисовываем продукт с данным кодом.
  showProductBasket(id);
}

/**
 * Считает и возвращает количество продуктов в корзине.
 * @return {string} - Количество товара в корзине.
 */
function getBasketCount() {
  const ArryProducts = Object.values(basket);
  let count = 0;
  for (const prod of ArryProducts) {
    count += prod.count;
  }
  return count.toString();
}

/**
 * Считает и возвращает итоговую цену по всем добавленным продуктам.
 * @return {number} - Общая сумма покупки.
 */
function getBasketPrice() {
  const PriceProducts = Object.values(basket);
  let TotalPrice = 0;
  for (const prod of PriceProducts) {
    TotalPrice += prod.count * prod.price;
  }
  return TotalPrice.toFixed(2);
}

/**
 * Отображение карточек товаров в корзине.
 * @param {number} productId - код продукта.
 */
function showProductBasket(productId) {
  // Получаем строку в корзине, которая отвечает за данный продукт.
  const basketRowEl = basketEl.querySelector(
    `.basketRow[data-id="${productId}"]`
  );
  // Если такой строки нет, то отрисовываем новую строку.
  if (!basketRowEl) {
    showNewProductInBasket(productId);
    return;
  }
  // Получаем данные о продукте из объекта корзины, где хранятся данные о всех
  // добавленных продуктах.
  const product = basket[productId];
  // Ставим новое количество в строке продукта корзины.
  basketRowEl.querySelector(".productCount").textContent = product.count;
  // Ставим нужную итоговую цену по данному продукту в строке продукта корзины.
  basketRowEl.querySelector(".productTotalRow").textContent = (
    product.price * product.count
  ).toFixed(2);
}

/**
 * Функция формирует HTML тег для отображения товара в корзине.
 * @param {number} productId - Код товара.
 */
function showNewProductInBasket(productId) {
  const productRow = `
    <div class="basketRow" data-id="${productId}">  
      <div>${basket[productId].name}</div>
      <div>
        <span class="productCount">${basket[productId].count}</span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="productTotalRow">${(
          basket[productId].price * basket[productId].count
        ).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productRow);
}
