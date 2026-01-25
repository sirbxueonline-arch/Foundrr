import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { auth } from '@clerk/nextjs/server'

// Initialize lazily to avoid build errors
export async function POST(request: Request) {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    })
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )

        // Auth check
        const { userId } = await auth()

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { prompt } = await request.json()

        if (!prompt) {
            return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
        }

        console.log(`Generating image for prompt: ${prompt}`)

        // 1. Generate Image with DALL-E 3
        const response = await openai.images.generate({
            model: "dall-e-3",
            prompt: prompt,
            n: 1,
            size: "1024x1024",
            response_format: "b64_json",
            quality: "standard", // standard is faster/cheaper
        });

        const b64 = response.data?.[0]?.b64_json
        if (!b64) throw new Error("No image data returned from OpenAI")

        // 2. Upload to Supabase Storage
        const buffer = Buffer.from(b64, 'base64')
        const fileName = `${userId}/${Date.now()}_generated.png`

        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('websites')
            .upload(fileName, buffer, {
                contentType: 'image/png',
                upsert: true
            })

        if (uploadError) {
            console.error("Storage missing? Trying to upload to public bucket or returning b64 directly if fails.")
            throw uploadError
        }

        // 3. Get Public URL
        const { data: { publicUrl } } = supabase.storage
            .from('websites')
            .getPublicUrl(fileName)

        return NextResponse.json({ url: publicUrl })

    } catch (err: any) {
        console.error(err)
        return NextResponse.json(
            { error: err.message || 'Internal Server Error' },
            { status: 500 }
        )
    }
}
