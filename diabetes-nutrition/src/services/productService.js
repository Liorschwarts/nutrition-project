const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getProductByName = async (name) => {
  const res = await fetch(`${BASE_URL}/api/products?name=${name}`);
  if (!res.ok) {
    throw new Error("המוצר לא נמצא");
  }
  return res.json();
};
