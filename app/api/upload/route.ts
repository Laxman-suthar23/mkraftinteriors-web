// app/api/upload/route.ts
// Image uploads are now handled directly from the frontend to Cloudinary
// using an unsigned upload preset. This route is no longer used for uploads.

import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      error:
        "This upload route is deprecated. Images are now uploaded directly to Cloudinary from the frontend.",
    },
    { status: 410 }
  );
}
