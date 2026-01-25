
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { redirect, notFound } from 'next/navigation'
import { Printer } from 'lucide-react'
import { PrintButton } from './PrintButton'
import { currentUser } from '@clerk/nextjs/server'

// Force dynamic rendering since we depend on route params and cookies
export const dynamic = 'force-dynamic'

export default async function InvoicePage(props: {
  params: Promise<{ id: string }>
}) {
  const params = await props.params;
  const siteId = params.id

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const user = await currentUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch website details to ensure it belongs to user and is paid
  const { data: site } = await supabase
    .from('websites')
    .select('*')
    .eq('id', siteId)
    .eq('user_id', user.id)
    .single()

  if (!site) {
    return notFound()
  }

  if (!site.paid) {
    return <div className="p-10 text-center">This website has not been paid for yet.</div>
  }

  const invoiceDate = new Date(site.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  // Mock invoice number based on ID
  const invoiceNumber = `INV-${site.id.substring(0, 8).toUpperCase()}`

  return (
    <div className="min-h-screen bg-white p-8 md:p-12 text-black font-sans print:p-0">
      <div id="invoice-container" className="max-w-3xl mx-auto bg-white border p-8 shadow-sm print:shadow-none print:border-none print:max-w-none">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-8 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">INVOICE</h1>
            <p className="text-sm text-gray-500">#{invoiceNumber}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center justify-end font-bold text-xl mb-1">
              <span className="w-6 h-6 bg-black rounded-full mr-2"></span>
              Foundry
            </div>
            <p className="text-sm text-gray-500">support@foundry.site</p>
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Bill To</h3>
            <p className="font-medium">{user.emailAddresses[0]?.emailAddress}</p>
          </div>
          <div className="text-right">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Date</h3>
            <p className="font-medium">{invoiceDate}</p>
          </div>
        </div>

        {/* Items */}
        <table className="w-full mb-12">
          <thead>
            <tr className="border-b-2 border-black">
              <th className="text-left py-3 font-semibold">Description</th>
              <th className="text-right py-3 font-semibold">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-4">
                <div className="font-medium">Webite Unlock: {site.subdomain}.foundry.site</div>
                <div className="text-sm text-gray-500">Lifetime license ownership</div>
                {site.payment_identifier && (
                  <div className="text-xs text-gray-400 mt-1">Payment Ref: {site.payment_identifier}</div>
                )}
              </td>
              <td className="text-right py-4">$99.00</td>
            </tr>
          </tbody>
        </table>

        {/* Total */}
        <div className="flex justify-end mb-12">
          <div className="w-1/2">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Subtotal</span>
              <span>$99.00</span>
            </div>
            <div className="flex justify-between py-2 border-b-2 border-black font-bold text-lg">
              <span>Total</span>
              <span>$99.00 USD</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-400 pt-8 border-t">
          <p className="mb-2">Thank you for your business.</p>
          <p>Authorized by Foundry Trust System™</p>
        </div>
      </div>

      {/* Print Button (Hidden in Print) */}
      {/* Use a client component for the print button behavior */}
      <PrintButton />
    </div>
  )
}
