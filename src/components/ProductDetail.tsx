"use client";
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/ProductDetail.module.css'
import { CartContext } from "@/contexts/CartProvider";
import { useRouter } from 'next/navigation';
import { getCookie } from '@/libraries/auth';

function ProductDetail({product}) {
  const { addToCart } = useContext(CartContext);
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const token = getCookie('accessToken')
  
  useEffect(()=> {
    if (token) setIsAuth(true);
  }, [token])

  return (
    <section className={styles.parent}>
      <Image
        src={
          product?.images?.[0]?.startsWith('https://placehold.co/')
            ? '/images/default-product.webp'
            : product.images[0]
        }
        alt={product.title}
        width={100}
        height={100}
        onError={(e) => {
          e.currentTarget.src = "/images/default-product.webp";
        }}
        unoptimized
      />
      <div className={styles.details}>
        <h1 className={styles.title}>{product.title}</h1>
        <h2 className={styles.description}>{product.description}</h2>
        <p className={styles.category}>Category : <span>{product.category.name}</span></p>
        <h1 className={styles.price}>${product.price}</h1>
      </div>
      <div className={styles.actions}>
        <button onClick={() => alert('Sorry, this feature is not available yet.')}>Buy Now</button>
        <button
          onClick={() => {
            if (!isAuth) {
              router.push('/auth')
              return
            }
            addToCart(product);
            alert('The product has added to cart.');
          }}>
          Add to Cart
        </button>
      </div>
    </section>
  )
}

export default ProductDetail