import ProductItem from './ProductItem';
import styles from './Products.module.css';

const DUMMY_ITEMS = [
  {
    id: '1',
    price: 1299,
    title: 'iPhone 14 Pro',
    description:
      'Due to its high quality, this Super Good 1 will serve you for a very long time.',
  },
  {
    id: '2',
    price: 999,
    title: 'iPad Mini 6',
    description:
      'Due to its high quality, this Super Good 2 will serve you for a very long time.',
  },
  {
    id: '3',
    price: 2599,
    title: 'MacBook Pro 16',
    description:
      'Due to its high quality, this Super Good 3 will serve you for a very long time.',
  },
];

const Products = props => {
  return (
    <section className={styles.products}>
      <h2>Our store has the highest quality products.</h2>
      <ul>
        {DUMMY_ITEMS.map(item => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
