
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import PricingPage from '@/components/pricing/PricingPage' // Ensure default export or corrected import
import { Metadata } from 'next'
import { currentUser } from '@clerk/nextjs/server'

export const metadata: Metadata = {
    title: 'Pricing | Foundrr',
    description: 'Simple, transparent pricing. Pay per website, own the code forever.',
}

export default async function Pricing() {
    // We might not need database connection here if just passing user?
    // But Pricing content might use Supabase? Assuming just user prop for now.

    // Actually, PricingPage expects 'user'. If it's the Supabase user shape, we might have issues.
    // Let's pass null for now or adapt, but first auth fix.

    const user = await currentUser()

    // Mapping Clerk user to a simple object if needed, or update PricingPage component
    // For now, passing 'user' directly might crash if typing mismatch, but let's try.
    // Actually, PricingPage probably expects specific email/id fields.

    const userProp = user ? { id: user.id, email: user.emailAddresses[0]?.emailAddress } : null

    return <PricingPage user={userProp} />
}
