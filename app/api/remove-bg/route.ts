import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = process.env.HF_TOKEN
    if (!token) throw new Error("HF_TOKEN missing in Vercel Env")

    const formData = await req.formData()
    const file = formData.get("file") as Blob
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const buffer = await file.arrayBuffer()

    // NEW HF Router URL (old api-inference is dead)
    const hfRes = await fetch(
      "https://router.huggingface.co/hf-inference/models/briaai/RMBG-1.4",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/octet-stream",
        },
        body: buffer,
      }
    )

    if (!hfRes.ok) {
      const txt = await hfRes.text()
      console.log("HF Error:", txt)
      throw new Error(`HF API Error ${hfRes.status}: ${txt.slice(0,200)}`)
    }

    const resultBlob = await hfRes.blob()
    const arrayBuffer = await resultBlob.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString("base64")
    const dataUrl = `data:image/png;base64,${base64}`

    return NextResponse.json({ url: dataUrl })
    
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
