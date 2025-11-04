"use client";

import { ProductResponse, ProductsType } from "@/types/product"
import { getProducts } from "@/libraries/api"
import { CartContext } from "@/contexts/CartProvider";
import styles from "@/styles/ProductsList.module.css";
import Icon from "@/components/Icons";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR, { mutate } from "swr";
import { getCookie } from "@/libraries/auth";
import { useRouter } from "next/navigation";

export default function Items ({title, searchParam}: ProductsType) {
  const [products, setProducts] = useState<any>([]);
  const { addToCart } = useContext(CartContext);
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const router = useRouter()
  const token = getCookie('accessToken')

  const { data: productsData, error, isLoading } = useSWR(
    'products',          // key unik
    getProducts,         // helper function
    {
      revalidateOnFocus: true,
    }
  );

  useEffect(() => {
    if (token) setIsAuth(true);
    if (!productsData) return;

    if (searchParam) {
      // misal filter produk sesuai keyword pencarian
      const filtered = productsData.filter(p =>
        p.title.toLowerCase().includes(searchParam.toLowerCase())
      );
      setProducts(filtered);
    } else {
      // kalau tidak ada pencarian, tampilkan semua
      setProducts(productsData);
    }
  }, [productsData, searchParam, token]);

  return (
    <section>
      <menu className={styles.menus}>
        <h1 className={styles.title}>
          {title
            ? title
            : searchParam
              ? products?.length > 0
                ? <>Result for: <span className="keyword">"{searchParam}"</span></>
                : <>Result not found for <span className="keyword">"{searchParam}"</span><br /><span className={styles.description}>Try different keyword</span></>
              : "All Products"}
        </h1>
        <h2></h2>
      </menu>
      <ul className={styles.parent}>
        {products.map((products: ProductResponse) => (
          <li className={styles.product} key={products.id}>
            <Link href={`/${products.id}`} prefetch={false}>
              <Image
                src={
                  products?.images?.[0]?.startsWith('https://placehold.co/')
                    ? '/images/default-product.webp'
                    : products.images[0]
                }
                alt={products.title}
                width={100}
                height={100}
                onError={(e) => {
                  e.currentTarget.src = "/images/default-product.webp";
                }}
                unoptimized
              />
            </Link>
            <div className={styles.details}>
              <Link className={`${styles.title}`} key={products.id} href={`/${products.id}`} prefetch={false}>
                {products.title || "Unnamed Item"}
              </Link>
              <div className={styles.detail}>
                <Link className={`${styles.price}`} key={products.id} href={`/${products.id}`} prefetch={false}>
                  ${products.price || "???"}
                </Link>
                <button
                  onClick={()=> {
                    if (!isAuth) {
                      router.push('/auth')
                      return
                    }
                    addToCart(products); 
                    alert('The product has added to cart.');
                  }}
                  className={styles.addCard}>
                    <Icon name="addCard" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}