import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file") as Blob
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const buffer = await file.arrayBuffer()

    const hfRes = await fetch(
      "https://api-inference.huggingface.co/models/briaai/RMBG-1.4",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
        },
        body: buffer,
      }
    )

    if (!hfRes.ok) {
      const err = await hfRes.text()
      throw new Error(err)
    }

    const resultBlob = await hfRes.blob()
    const arrayBuffer = await resultBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({ url: dataUrl })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
