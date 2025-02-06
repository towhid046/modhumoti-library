import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectDB";
export const GET = async () => {
  const db = await connectDB();
  try {
    const servicesCollection = db.collection("services");
    const services = await servicesCollection.find().toArray();
    return NextResponse.json(services);
  } catch (error) {
    return NextResponse.json(error);
  }
};