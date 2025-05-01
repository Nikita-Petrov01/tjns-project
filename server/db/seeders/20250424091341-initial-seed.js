'use strict';

const { User, Product, Category, Review } = require('../models');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    await User.bulkCreate([
      {
        name: 'Bob',
        email: 'bob@bob.com',
        password: await bcrypt.hash('123', 10),
        status: 'superadmin',
      },
      {
        name: 'Joe',
        email: 'joe@joe.com',
        password: await bcrypt.hash('123', 10),
        status: 'admin',
      },
      {
        name: 'Don',
        email: 'don@don.com',
        password: await bcrypt.hash('123', 10),
        status: 'user',
      },
    ]);

    await Category.bulkCreate([
      {
        name: 'Холодильники',
      },
      {
        name: 'Ноутбуки',
      },
      {
        name: 'Смартфоны',
      },
      {
        name: 'Фототехника',
      },
      { name: 'Телевизоры' },
      { name: 'Игровые консоли' },
      { name: 'Аудиотехника' },
      { name: 'Умные часы' },
      { name: 'Бытовая техника' },
      { name: 'Кухонные приборы' },
    ]);

    await Product.bulkCreate([
      {
        name: 'Холодильник BOSCH Serie 6',
        description: 'Двухкамерный холодильник с NoFrost и зоной свежести.',
        images: [
          'https://bosch-centre.ru/upload/resize_cache/iblock/a19/rc5mypdb606n7isfo1qq8bf5vabl9cvq/1106_880_1/Bosch-KGN39LB30U_photo_1.webp',
          'https://bosch-centre.ru/upload/resize_cache/iblock/369/ehnjevgopq18ly6zn17u3tuiw2kuisyi/1106_880_1/Bosch-KGN39LB30U_photo_2.webp',
        ],
        price: 64990,
        categoryId: 1,
        brand: 'Bosch',
        stock: 20,
      },
      {
        name: 'Холодильник LG DoorCooling+',
        description: 'Большой холодильник с инверторным компрессором и льдогенератором.',
        images: [
          'https://vsya-tehnika24.ru/image/cache/catalog/product/product_LG/oad-resize_cache-iblock-83f-1900_563_1-4-720x720-500x500.jpg',
          'https://vsya-tehnika24.ru/image/cache/catalog/product/product_LG/oad-resize_cache-iblock-4bf-1900_563_1-fffdcadb8b3a5a1736e89c9da09642a3-720x720-500x500-product_popup.jpg',
        ],
        price: 89990,
        categoryId: 1,
        brand: 'LG',
        stock: 20,
      },
      {
        name: 'Ноутбук Apple MacBook Pro 14',
        description: 'Мощный ноутбук с чипом M2 Pro и экраном Retina XDR.',
        images: [
          'https://ir.ozone.ru/s3/multimedia-1-z/wc1000/7196986547.jpg',
          'https://ir.ozone.ru/s3/multimedia-1-w/wc1000/7196986544.jpg',
        ],
        price: 149990,
        categoryId: 2,
        brand: 'Apple',
        stock: 20,
      },
      {
        name: 'Ноутбук ASUS ROG Zephyrus G14',
        description: 'Игровой ноутбук с процессором Ryzen 9 и видеокартой RTX 4060.',
        images: [
          'https://cdn.citilink.ru/jsFHr3NRFRRjZTWvBEaEhw02-l9kZOyA3UNd4R_Ryjo/resizing_type:fit/gravity:sm/width:400/height:400/plain/product-images/7096ae48-e8e4-4e23-b45e-0108a5cb5c2e.jpg',
          'https://cdn.citilink.ru/_kRInsl3-N3gs1pVB9XKBbNFO6D2wFsgoSMXzig5WfQ/resizing_type:fit/gravity:sm/width:400/height:400/plain/product-images/28072990-a092-4f52-83a3-138ce0e91c79.jpg',
        ],
        price: 129990,
        categoryId: 2,
        brand: 'ASUS',
        stock: 20,
      },
      {
        name: 'iPhone 15 Pro',
        description: 'Флагманский смартфон Apple с титановым корпусом и камерой 48 МП.',
        images: [
          'https://c.dns-shop.ru/thumb/st1/fit/500/500/31b28373068528817401be1fa0f72ff2/57c3fa75db8745654a371cbec253d141e7b1ac632f61e9dce6b5bd421941132e.jpg.webp',
          'https://c.dns-shop.ru/thumb/st1/fit/0/0/a455f35b61fc177697bafb5401842e6c/7bdb36c6ef4755a8b1fd4fc4e1d0a028e722402827660ed56f0c8d5d65b043fa.jpg.webp',
        ],
        price: 99990,
        categoryId: 3,
        brand: 'Apple',
        stock: 20,
      },
      {
        name: 'Samsung Galaxy S23 Ultra',
        description: 'Смартфон с экраном AMOLED 120 Гц и стилусом S Pen.',
        images: [
          'https://img.mvideo.ru/Pdb/400289209b.jpg',
          'https://img.mvideo.ru/Pdb/400289209b2.jpg',
        ],
        price: 89990,
        categoryId: 3,
        brand: 'Samsung',
        stock: 20,
      },
      {
        name: 'Фотоаппарат Sony Alpha A7 IV',
        description: 'Зеркальная камера с полнокадровой матрицей 33 МП.',
        images: [
          'https://g-pro.ru/img/work/nomencl/m_6676.jpg',
          'https://g-pro.ru/img/work/nomencl/a_6676_11168.jpg',
        ],
        price: 199990,
        categoryId: 4,
        brand: 'Sony',
        stock: 20,
      },
      {
        name: 'Объектив Canon RF 50mm f/1.2',
        description: 'Светосильный фикс-объектив для профессиональной съемки.',
        images: [
          'https://photogora.ru/img/product/thumb/14349/6022b2e9c75a06002838219258226857.jpg',
          'https://photogora.ru/img/product/big/14349/6022b2e98300d6785286609809095986.jpg',
        ],
        price: 89990,
        categoryId: 4,
        brand: 'Canon',
        stock: 20,
      },
      {
        name: 'Телевизор Samsung Neo QLED',
        description: 'Телевизор с поддержкой 8K и технологией Quantum Matrix.',
        images: [
          'https://example.com/samsung-tv1.jpg',
          'https://example.com/samsung-tv2.jpg',
        ],
        price: 299990,
        categoryId: 5,
        brand: 'Samsung',
        stock: 15,
      },
      {
        name: 'Игровая консоль PlayStation 5',
        description: 'Консоль нового поколения с поддержкой 4K и SSD.',
        images: ['https://example.com/ps5-1.jpg', 'https://example.com/ps5-2.jpg'],
        price: 49990,
        categoryId: 6,
        brand: 'Sony',
        stock: 30,
      },
      {
        name: 'Наушники Bose 700',
        description: 'Беспроводные наушники с шумоподавлением.',
        images: ['https://example.com/bose-1.jpg', 'https://example.com/bose-2.jpg'],
        price: 29990,
        categoryId: 7,
        brand: 'Bose',
        stock: 50,
      },
      {
        name: 'Умные часы Apple Watch Series 8',
        description: 'Умные часы с функцией измерения кислорода в крови.',
        images: [
          'https://example.com/apple-watch1.jpg',
          'https://example.com/apple-watch2.jpg',
        ],
        price: 39990,
        categoryId: 8,
        brand: 'Apple',
        stock: 40,
      },
      {
        name: 'Робот-пылесос Xiaomi Mi Robot Vacuum',
        description: 'Умный пылесос с функцией влажной уборки.',
        images: [
          'https://example.com/xiaomi-vacuum1.jpg',
          'https://example.com/xiaomi-vacuum2.jpg',
        ],
        price: 19990,
        categoryId: 9,
        brand: 'Xiaomi',
        stock: 25,
      },
      {
        name: 'Ноутбук Lenovo ThinkPad X1 Carbon',
        description: 'Ультрабук с процессором Intel Core i7 и экраном 14 дюймов.',
        images: [
          'https://example.com/lenovo-x1-1.jpg',
          'https://example.com/lenovo-x1-2.jpg',
        ],
        price: 129990,
        categoryId: 2,
        brand: 'Lenovo',
        stock: 15,
      },
      {
        name: 'Смартфон Google Pixel 7 Pro',
        description: 'Смартфон с чистым Android и камерой 50 МП.',
        images: ['https://example.com/pixel7-1.jpg', 'https://example.com/pixel7-2.jpg'],
        price: 79990,
        categoryId: 3,
        brand: 'Google',
        stock: 25,
      },
      {
        name: 'Фотоаппарат Nikon Z6 II',
        description: 'Беззеркальная камера с матрицей 24.5 МП.',
        images: [
          'https://example.com/nikon-z6-1.jpg',
          'https://example.com/nikon-z6-2.jpg',
        ],
        price: 159990,
        categoryId: 4,
        brand: 'Nikon',
        stock: 10,
      },
      {
        name: 'Телевизор LG OLED C1',
        description: 'Телевизор с OLED-экраном и поддержкой Dolby Vision.',
        images: [
          'https://example.com/lg-oled-1.jpg',
          'https://example.com/lg-oled-2.jpg',
        ],
        price: 199990,
        categoryId: 5,
        brand: 'LG',
        stock: 20,
      },
      {
        name: 'Игровая консоль Xbox Series X',
        description: 'Консоль нового поколения с поддержкой 4K и HDR.',
        images: ['https://example.com/xbox-x-1.jpg', 'https://example.com/xbox-x-2.jpg'],
        price: 49990,
        categoryId: 6,
        brand: 'Microsoft',
        stock: 30,
      },
      {
        name: 'Наушники Sony WH-1000XM5',
        description: 'Беспроводные наушники с лучшим шумоподавлением.',
        images: [
          'https://example.com/sony-wh1000xm5-1.jpg',
          'https://example.com/sony-wh1000xm5-2.jpg',
        ],
        price: 34990,
        categoryId: 7,
        brand: 'Sony',
        stock: 40,
      },
      {
        name: 'Умные часы Samsung Galaxy Watch 6',
        description: 'Умные часы с функцией ЭКГ и мониторингом сна.',
        images: [
          'https://example.com/galaxy-watch6-1.jpg',
          'https://example.com/galaxy-watch6-2.jpg',
        ],
        price: 29990,
        categoryId: 8,
        brand: 'Samsung',
        stock: 35,
      },
      {
        name: 'Робот-пылесос iRobot Roomba i7+',
        description: 'Пылесос с автоматической очисткой контейнера.',
        images: [
          'https://example.com/roomba-i7-1.jpg',
          'https://example.com/roomba-i7-2.jpg',
        ],
        price: 59990,
        categoryId: 9,
        brand: 'iRobot',
        stock: 20,
      },
      {
        name: 'Ноутбук Dell XPS 13',
        description: 'Компактный ноутбук с экраном InfinityEdge.',
        images: [
          'https://example.com/dell-xps13-1.jpg',
          'https://example.com/dell-xps13-2.jpg',
        ],
        price: 119990,
        categoryId: 2,
        brand: 'Dell',
        stock: 15,
      },
      {
        name: 'Смартфон OnePlus 11',
        description: 'Флагманский смартфон с быстрой зарядкой 100 Вт.',
        images: [
          'https://example.com/oneplus11-1.jpg',
          'https://example.com/oneplus11-2.jpg',
        ],
        price: 69990,
        categoryId: 3,
        brand: 'OnePlus',
        stock: 25,
      },
      {
        name: 'Фотоаппарат Fujifilm X-T5',
        description: 'Камера с ретро-дизайном и матрицей 40 МП.',
        images: [
          'https://example.com/fuji-xt5-1.jpg',
          'https://example.com/fuji-xt5-2.jpg',
        ],
        price: 139990,
        categoryId: 4,
        brand: 'Fujifilm',
        stock: 10,
      },
      {
        name: 'Телевизор Sony Bravia XR',
        description: 'Телевизор с когнитивным процессором и 4K HDR.',
        images: [
          'https://example.com/sony-bravia-1.jpg',
          'https://example.com/sony-bravia-2.jpg',
        ],
        price: 249990,
        categoryId: 5,
        brand: 'Sony',
        stock: 15,
      },
      {
        name: 'Игровая консоль Nintendo Switch OLED',
        description: 'Консоль с OLED-экраном и поддержкой портативного режима.',
        images: [
          'https://example.com/switch-oled-1.jpg',
          'https://example.com/switch-oled-2.jpg',
        ],
        price: 34990,
        categoryId: 6,
        brand: 'Nintendo',
        stock: 30,
      },
      {
        name: 'Наушники Sennheiser Momentum 4',
        description: 'Наушники с высоким качеством звука и автономностью 60 часов.',
        images: [
          'https://example.com/sennheiser-m4-1.jpg',
          'https://example.com/sennheiser-m4-2.jpg',
        ],
        price: 39990,
        categoryId: 7,
        brand: 'Sennheiser',
        stock: 40,
      },
      {
        name: 'Умные часы Garmin Fenix 7',
        description: 'Часы для активного отдыха с GPS и солнечной зарядкой.',
        images: [
          'https://example.com/garmin-fenix7-1.jpg',
          'https://example.com/garmin-fenix7-2.jpg',
        ],
        price: 69990,
        categoryId: 8,
        brand: 'Garmin',
        stock: 20,
      },
      {
        name: 'Робот-пылесос Roborock S7 MaxV',
        description: 'Пылесос с функцией распознавания препятствий.',
        images: [
          'https://example.com/roborock-s7-1.jpg',
          'https://example.com/roborock-s7-2.jpg',
        ],
        price: 49990,
        categoryId: 9,
        brand: 'Roborock',
        stock: 25,
      },
      {
        name: 'Ноутбук HP Spectre x360',
        description: 'Трансформируемый ноутбук с сенсорным экраном.',
        images: [
          'https://example.com/hp-spectre-1.jpg',
          'https://example.com/hp-spectre-2.jpg',
        ],
        price: 139990,
        categoryId: 2,
        brand: 'HP',
        stock: 10,
      },
      {
        name: 'Смартфон Xiaomi 13 Pro',
        description: 'Смартфон с камерой Leica и быстрой зарядкой.',
        images: [
          'https://example.com/xiaomi13pro-1.jpg',
          'https://example.com/xiaomi13pro-2.jpg',
        ],
        price: 59990,
        categoryId: 3,
        brand: 'Xiaomi',
        stock: 30,
      },
      {
        name: 'Фотоаппарат Panasonic Lumix S5 II',
        description: 'Камера с поддержкой 6K видео и стабилизацией.',
        images: [
          'https://example.com/panasonic-s5-1.jpg',
          'https://example.com/panasonic-s5-2.jpg',
        ],
        price: 179990,
        categoryId: 4,
        brand: 'Panasonic',
        stock: 15,
      },
    ]);

    await Review.bulkCreate([
      { rating: 1, text: 'Хороший товар', productId: 1, userId: 1 },
      { rating: 1, text: 'Плохой товар', productId: 1, userId: 1 },
      { rating: 4, text: 'Хороший товар', productId: 2, userId: 1 },
      { rating: 4, text: 'Плохой товар', productId: 2, userId: 1 },
      { rating: 3, text: 'Хороший товар', productId: 3, userId: 1 },
      { rating: 3, text: 'Плохой товар', productId: 3, userId: 1 },
      { rating: 2, text: 'Хороший товар', productId: 4, userId: 1 },
      { rating: 1, text: 'Хороший товар', productId: 5, userId: 1 },
      { rating: 5, text: 'Отличный телевизор!', productId: 7, userId: 1 },
      { rating: 4, text: 'Консоль супер!', productId: 8, userId: 1 },
      { rating: 3, text: 'Хорошие наушники.', productId: 9, userId: 1 },
      { rating: 5, text: 'Часы просто огонь!', productId: 10, userId: 1 },
      { rating: 4, text: 'Пылесос справляется на ура.', productId: 11, userId: 1 },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
