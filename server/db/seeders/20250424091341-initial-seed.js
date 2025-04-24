'use strict';

const { User, Product, Category } = require('../models');
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        name: 'Bob',
        email: 'bob@bob.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Joe',
        email: 'joe@joe.com',
        password: await bcrypt.hash('123', 10),
      },
      {
        name: 'Don',
        email: 'don@don.com',
        password: await bcrypt.hash('123', 10),
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
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
  },
};
