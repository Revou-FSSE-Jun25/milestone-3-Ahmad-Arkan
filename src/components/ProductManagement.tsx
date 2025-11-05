'use client';

import { ProductResponse } from "@/types/product"
import { getProducts } from "@/libraries/api"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/ProductManagement.module.css"

export default function ProductManagement() {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleDelete = async (productId: number)=> {
    const confirmDelete = confirm(`Are You Sure To Delete This Product With ID ${productId}?\nThis Action Is Immutable`);
    if (!confirmDelete) return;
    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: "DELETE"
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error("Server responded:", res.status, errText)
        throw new Error("Failed Delete Product")
      }

      alert(`Deleted Product With ID ${productId} Successfully`)
      await getProducts().then((data) => setProducts(data));
    } catch (err) {
      console.error("Failed Delete Product", err)
    }
  }

  useEffect(()=> {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    })
  }, [])

  return (
    <section>
      <h1 className={styles.title}>Product Management List</h1>
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
              <Link className={`${styles.details} ${styles.title}`} key={products.id} href={`/${products.id}`} prefetch={false}>
                {products.title || "Unnamed Item"}
              </Link>
              <div className={styles.detail}>
                <Link className={`${styles.price}`} key={products.id} href={`/${products.id}`} prefetch={false}>
                  ${products.price || "???"}
                </Link>
              </div>
            </div>
            <Link href={`/admin/edit/${products.id}`} prefetch={false}><button className={'button'}>Edit</button></Link>
            <button onClick={()=>handleDelete(products.id)} className={'delete'}>Delete</button>
          </li>
        ))}
      </ul>
    </section>
  )
}