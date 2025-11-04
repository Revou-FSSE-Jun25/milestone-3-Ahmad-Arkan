import { ProductResponse } from "@/types/product"
import { notFound } from "next/navigation";
const DATABASE_API = "https://api.escuelajs.co/api/v1"; // API Key
const paginations = {
  offset: 0,
  limit: 0
}

// Products Fetching API
export async function getProducts():Promise<ProductResponse[]> {
  try {
    const response = await fetch(`${DATABASE_API}/products?offset=${paginations.offset}&limit=${paginations.limit}`, {
      next: { revalidate: 60 }
    });
    return response.json();
  } catch(err) {
    console.error('Failed fetching data :', err)
    throw new Error('Failed fetching data')
  }
}

// Product Fetching API By ID
export async function getProduct(id:number):Promise<ProductResponse> {
  try {
    const response = await fetch(`${DATABASE_API}/products/${id}`, {
      next: { revalidate: 60 }
    });
    if (!response.ok) {
      notFound();
    }
    return response.json();
  } catch(err) {
    console.error('Failed fetching data :', err)
    throw new Error('Failed fetching data')
  }
}

// Login Helper
export async function login(email: string, password: string) {
  try {
    const res = await fetch(`${DATABASE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!res.ok) {
      throw new Error(res.status.toString());
    }

    return await res.json();
  } catch (err) {
    console.error('Failed log in :', err)
    throw new Error('Failed log in, please try again later')
  }
}