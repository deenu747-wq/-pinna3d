import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const token = process.env.HF_TOKEN
    if (!token) throw new Error("HF_TOKEN missing")

    const formData = await req.formData()
    const file = formData.get("file") as Blob
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 })

    const buffer = await file.arrayBuffer()

    // Try models in order - 2.0 is new version, BiRefNet is backup
    const models = [
      "briaai/RMBG-2.0",
      "ZhengPeng7/BiRefNet",
      "not-lain/background-removal"
    ]

    let lastError = ""
    for (const model of models) {
      try {
        const hfRes = await fetch(
          `https://router.huggingface.co/hf-inference/models/${model}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: buffer,
          }
        )

        if (!hfRes.ok) {
          lastError = await hfRes.text()
          console.log(`Model ${model} failed:`, lastError)
          continue // try next model
        }

        const resultBlob = await hfRes.blob()
        // If model returns JSON with mask, handle it. If image, convert to base64
        const contentType = resultBlob.type
        if (contentType.includes("json")) {
          const json = JSON.parse(await resultBlob.text())
          lastError = JSON.stringify(json)
          continue
        }

        const arrayBuffer = await resultBlob.arrayBuffer()
        const base64 = Buffer.from(arrayBuffer).toString("base64")
        const dataUrl = `data:image/png;base64,${base64}`

        return NextResponse.json({ url: dataUrl, modelUsed: model })
      } catch (e: any) {
        lastError = e.message
        continue
      }
    }

    throw new Error(`All models failed. Last: ${lastError.slice(0,300)}`)
    
  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
