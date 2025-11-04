"use client";

import React, { useEffect, useState } from "react";
import { getProduct } from "@/libraries/api";
import { ProductResponse } from '@/types/product'
import styles from '@/styles/EditPage.module.css'
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function addPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState('')
  const [categoryId, setCategoryId] = useState<number>(1)
  const router = useRouter()

  const handleSubmit = async (pre: React.FormEvent)=> {
      pre.preventDefault();
  
      const imageArray = images
         .split(',')
         .map((img) => img.trim())
         .filter(Boolean);
  
      alert('submitted')
      try {
        const res = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            title: title,
            price: Number(price),
            description: description,
            images: imageArray,
          categoryId: categoryId,
          })
        })
  
        console.log(res)
  
        if (!res.ok) {
          const errText = await res.text()
          console.error("Server responded:", res.status, errText)
          throw new Error("Update failed")
        }
  
        const updated = await res.json()
        console.log("updated",updated)
        router.push('/admin')
      } catch (err) {
        console.error("Error", err)
      }
    }

  return (
    <section>
      <h1>Create Page</h1>
      <form onSubmit={handleSubmit} className={styles.parent}>
        <label htmlFor="name">
          <input name={title} value={title} onChange={(e) => setTitle(e.target.value)} id="name" type="text" placeholder=" " />
          <span>Product Name</span>
        </label>
        <label htmlFor="price">
          $
          <input name={price} value={price} onChange={(e) => setPrice(e.target.value)} id="price" type="number" min={0} placeholder=" " />
          <span>Price</span>
        </label>
        <label htmlFor="category">
          ID
          <input name="categoryId" value={categoryId} onChange={(e) => setCategoryId(e.target.value ? Number(e.target.value) : 1)} id="category" type="number" min={1} placeholder=" " />
          <span>Category ID</span>
        </label>
        <label htmlFor="description">
          <textarea name={description} value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder=" " />
          <span>Description</span>
        </label>
        <label htmlFor="images">
          <textarea
            name="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            id="images"
            placeholder="Pisahkan URL dengan koma"
          />
          <span>Images</span>
        </label>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button className={'button'}>Submit</button>
          <Link href={'/admin'}><button className={'delete'}>Cancel</button></Link>
        </div>
      </form>
    </section>
  )
}
