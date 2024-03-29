import bcrypt from 'bcryptjs';
const data = {
  users: [
    {
      name: 'QuanVinh',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('beovip123'),
      isAdmin: true,
    },
    {
      name: 'Customer',
      email: 'user@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      //_id: '1',
      name: 'Nike Slim shirt',
      slug: 'nike-slim-shirt',
      category: 'shirt',
      image: './images/p11.jpg',
      price: 120,
      countInstock: 0,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      //_id: '2',
      name: 'pants',
      slug: 'nike1-slim-shirt',
      category: 'pants',
      image: './images/p11.jpg',
      price: 100,
      countInstock: 10,
      brand: 'Nike',
      rating: 3.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      //_id: '3',
      name: 'Nike2 Slim shirt',
      slug: 'nike2-slim-shirt',
      category: 'shirt',
      image: './images/p11.jpg',
      price: 50,
      countInstock: 0,
      brand: 'Nike',
      rating: 3,
      numReviews: 10,
      description: 'high quality shirt',
    },
    {
      //_id: '4',
      name: 'Nike3 Slim shirt',
      slug: 'nike3-slim-shirt',
      category: 'shirt',
      image: './images/p22.jpg',
      price: 120,
      countInstock: 10,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 10,
      description: 'high quality shirt',
    },
  ],
};
export default data;
