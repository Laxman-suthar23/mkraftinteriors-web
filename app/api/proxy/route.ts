import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url);
    const arrayBuffer = await res.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": res.headers.get("content-type") || "application/octet-stream",
      },
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch image" }, { status: 500 });
  }
}
