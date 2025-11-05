"use client";

import React, { useState } from "react";
import styles from '@/styles/EditPage.module.css'
import { useRouter } from "next/navigation";

export default function addPage() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [images, setImages] = useState('')
  const [categoryId, setCategoryId] = useState<number | "">("")
  const [valid, setValid] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (pre: React.FormEvent)=> {
    pre.preventDefault();

    const imageArray = images
        .split(',')
        .map((img) => img.trim())
        .filter(Boolean);

    try {
      const res = await fetch(`https://api.escuelajs.co/api/v1/products/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title: title,
          price: Number(price),
          description: description,
          images: imageArray,
          categoryId: Number(categoryId),
        })
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error("Server responded:", res.status, errText)
        throw new Error("Create failed")
      }

      const created = await res.json()
      console.log("Created Product Successfully", created)
      alert(`Created Product Successfully`)
      router.push('/admin')
    } catch (err) {
      console.log("Failed Create Product", err)
      alert(`Failed Create Product\nTry Again Later`)
    }
  }

  return (
    <section>
      <h1>Create Page</h1>
      <form onSubmit={handleSubmit} className={`${styles.parent} ${valid ? styles.try : null}`}>
        <label htmlFor="name">
          <input
            name={title}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="name"
            type="text"
            required
            placeholder=" "
          />
          <span>Product Name</span>
        </label>
        <label htmlFor="price">
          $
          <input
            name={price}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="price"
            type="number"
            min={0}
            required
            placeholder=" "
          />
          <span>Price</span>
        </label>
        <label htmlFor="category">
          ID
          <input
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value === "" ? "" : Number(e.target.value))}
            id="category"
            type="number"
            min={1}
            required
            placeholder=" "
          />
          <span>Category ID</span>
        </label>
        <label htmlFor="description">
          <textarea
            name={description}
            value={description} onChange={(e) => setDescription(e.target.value)}
            id="description"
            required
            placeholder=" "
          />
          <span>Description</span>
        </label>
        <label htmlFor="images">
          <textarea
            name="images"
            value={images}
            onChange={(e) => setImages(e.target.value)}
            id="images"
            required
            placeholder=" "
          />
          <span>Images</span>
        </label>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button
            className={'button'}
            onClick={()=> setValid(true)}
          >
            Submit
          </button>
          <button
            type="button"
            className={'delete'}
            onClick={()=> {
              const confirmation = confirm('Are You Sure To Cancel?\nAll Changes Will Be Lost');
              if (!confirmation) return
              router.push('/admin')
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
