import { NextResponse } from "next/server";

// MongoDB/Prisma is no longer used — return empty list.
export const GET = async () => {
  return new NextResponse(JSON.stringify([]), { status: 200 });
};
