const readline = require('node:readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(prompt) {
  return new Promise((resolve) => rl.question(prompt, resolve));
}

function ticketPrice(category) {
  switch (category) {
    case 1:
      return 300;
    case 2:
      return 500;
    case 3:
      return 900;
    default:
      return 0;
  }
}

function maxTickets(budget, price) {
  if (price <= 0 || !Number.isFinite(budget)) {
    return 0;
  }

  let count = 0;
  while (budget >= price) {
    budget -= price;
    count++;
  }
  return count;
}

function printTicketResult(category, budget) {
  const price = ticketPrice(category);
  if (price === 0) {
    console.log('неизвестная категория');
    return;
  }

  const count = maxTickets(budget, price);
  console.log(
    `Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${count} шт.`
  );
}

function deliveryPrice(distance, total) {
  if (total >= 3000 || distance <= 3) {
    return 0;
  }
  if (distance <= 10) {
    return 200;
  }
  return 200 + (distance - 10) * 25;
}

function printDelivery(distance, total) {
  const price = deliveryPrice(distance, total);
  console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

function printSteps(height) {
  let count = 0;

  for (let step = 1; step <= height; step++) {
    if (step === 4) {
      continue;
    }
    if (step > 10) {
      console.log('Дальше лестница не построена');
      break;
    }

    console.log(`Ступень ${step}`);
    count++;
  }

  console.log(`Всего построено: ${count}`);
}

async function main() {
  try {
    console.log('Выберите задачу:');
    console.log('1 — билетная касса');
    console.log('2 — доставка заказа');
    console.log('3 — лестница');

    const choice = (await ask('Ваш выбор: ')).trim();

    switch (choice) {
      case '1': {
        const category = Number(await ask('Категория билета: '));
        const budget = Number(await ask('Бюджет: '));
        printTicketResult(category, budget);
        break;
      }
      case '2': {
        const distance = Number(await ask('Расстояние: '));
        const total = Number(await ask('Сумма заказа: '));
        printDelivery(distance, total);
        break;
      }
      case '3': {
        const height = Number(await ask('Высота лестницы: '));
        printSteps(height);
        break;
      }
      default:
        console.log('такой задачи нет');
    }
  } finally {
    rl.close();
  }
}

main();
