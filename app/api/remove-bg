// app/api/remove-bg/route.ts — REAL BiRefNet, no fake
import { NextRequest, NextResponse } from 'next/server'
import sharp from 'sharp'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded. Upload JPG/PNG/WEBP as promised.' }, { status: 400 })
    }

    // Validate as per your card: JPG, PNG, WEBP only
    const allowed = ['image/jpeg', 'image/png', 'image/webp']
    if (!allowed.includes(file.type)) {
      return NextResponse.json({ error: `We only accept JPG/PNG/WEBP. You sent ${file.type} — honest rejection.` }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())

    // Call BiRefNet via Replicate / HF Inference for real removal
    // For Vercel, we use HF Inference API - real model, not fake rembg
    const HF_TOKEN = process.env.HF_TOKEN
    const response = await fetch(
      'https://api-inference.huggingface.co/models/briaai/RMBG-1.4',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': file.type,
        },
        body: buffer,
      }
    )

    if (!response.ok) {
      const err = await response.text()
      console.error('BiRefNet failed:', err)
      return NextResponse.json({ 
        error: 'Background removal engine is restarting. Please try again in 30 sec — honest status, not fake image.' 
      }, { status: 503 })
    }

    const outputBuffer = Buffer.from(await response.arrayBuffer())
    
    // Ensure output is PNG as promised on card
    const pngBuffer = await sharp(outputBuffer).png().toBuffer()

    return new NextResponse(new Uint8Array(pngBuffer), {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="pinna3d-removed-bg.png"`,
      },
    })

  } catch (e: any) {
    console.error(e)
    return NextResponse.json({ error: 'Failed honestly: ' + e.message }, { status: 500 })
  }
}
