'use client'

import { useState, useEffect, useMemo } from 'react'
import {
    Loader2, Check, X, ShieldAlert, CreditCard, Smartphone,
    RefreshCw, Search, Filter, ArrowUpRight, DollarSign, Users
} from 'lucide-react'
import { format } from 'date-fns'

interface PendingSite {
    id: string
    name: string
    created_at: string
    price: number
    payment_method: string
    payment_identifier: string
    payment_status: string
    user_id: string
}

export default function AdminPage() {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sites, setSites] = useState<PendingSite[]>([])
    const [processingId, setProcessingId] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid'>('all')

    useEffect(() => {
        fetchPending()
    }, [])

    const fetchPending = async () => {
        setLoading(true)
        try {
            const res = await fetch('/api/admin/pending')
            if (res.ok) {
                const data = await res.json()
                setSites(data.sites || [])
            } else {
                const err = await res.json()
                setError(err.error || 'Failed to load sites')
            }
        } catch (e) {
            console.error(e)
            setError('Connection error')
        } finally {
            setLoading(false)
        }
    }

    const handleAction = async (siteId: string, action: 'approve' | 'reject') => {
        if (!confirm(`Are you sure you want to ${action} this request?`)) return

        setProcessingId(siteId)
        try {
            const res = await fetch('/api/admin/approve', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ siteId, action })
            })

            if (res.ok) {
                setSites(prev => prev.filter(s => s.id !== siteId))
            } else {
                alert('Failed to process request')
            }
        } catch (e) {
            alert('Network error')
        } finally {
            setProcessingId(null)
        }
    }

    const filteredSites = useMemo(() => {
        return sites.filter(site => {
            const matchesSearch =
                site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                site.payment_identifier?.toLowerCase().includes(searchTerm.toLowerCase())

            // For now, the API only returns pending/paid mixed? 
            // The API name is 'pending', so standard logic might assume all are pending.
            // But let's check payment_status if available.
            const matchesFilter = statusFilter === 'all' || (site.payment_status || 'pending') === statusFilter

            return matchesSearch && matchesFilter
        })
    }, [sites, searchTerm, statusFilter])

    // Stats
    const totalPotentialRevenue = sites.length * 49.99
    const totalRequests = sites.length

    // Fallback UI for loading/error
    if (loading && sites.length === 0) return <LoadingState />
    if (error) return <ErrorState error={error} retry={fetchPending} />

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Top Navigation / Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                            <ShieldAlert size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-slate-900">Admin Dashboard</h1>
                            <p className="text-xs text-slate-500">Secure Payment Gateway</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-full text-sm font-medium border border-emerald-100">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            System Operational
                        </div>
                        <button onClick={fetchPending} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard
                        title="Pending Revenue"
                        value={`$${totalPotentialRevenue.toFixed(2)}`}
                        icon={<DollarSign className="text-emerald-500" />}
                        subtitle={`${sites.length} transactions waiting`}
                    />
                    <StatCard
                        title="Active Requests"
                        value={totalRequests.toString()}
                        icon={<Users className="text-blue-500" />}
                        subtitle="Requiring attention"
                    />
                    <StatCard
                        title="Processing Time"
                        value="< 24h"
                        icon={<RefreshCw className="text-purple-500" />}
                        subtitle="Average turnaround"
                    />
                </div>

                {/* Filters & Search */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm mb-6 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by name or reference ID..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-slate-900/10 transition-all font-medium text-slate-700"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                        <FilterButton active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} label="All Requests" />
                        <FilterButton active={statusFilter === 'pending'} onClick={() => setStatusFilter('pending')} label="Pending" />
                    </div>
                </div>

                {/* Main Table */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden min-h-[400px]">
                    {filteredSites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No requests found</h3>
                            <p className="text-slate-500">Try adjusting your search or filters</p>
                            <button onClick={fetchPending} className="mt-4 text-sm text-blue-600 hover:underline font-medium">Refresh Data</button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project / User</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Method</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {filteredSites.map((site) => (
                                        <tr key={site.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-900">{site.name || 'Untitled Project'}</span>
                                                    <span className="text-xs text-slate-500 font-mono mt-1">{site.id.substring(0, 8)}...</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-1.5 rounded-lg ${site.payment_method === 'm10' ? 'bg-indigo-50 text-indigo-600' : 'bg-pink-50 text-pink-600'}`}>
                                                        {site.payment_method === 'm10' ? <Smartphone size={16} /> : <CreditCard size={16} />}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-semibold capitalize text-slate-700">{site.payment_method || 'Wire'}</span>
                                                        <span className="text-xs text-slate-400 font-mono">{site.payment_identifier || 'No Ref'}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-bold text-emerald-600">$49.99</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-slate-500">{format(new Date(site.created_at), 'MMM d, HH:mm')}</span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleAction(site.id, 'reject')}
                                                        disabled={!!processingId}
                                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Reject"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleAction(site.id, 'approve')}
                                                        disabled={!!processingId}
                                                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 hover:-translate-y-0.5"
                                                    >
                                                        {processingId === site.id ? <Loader2 size={14} className="animate-spin" /> : <><Check size={14} /> Approve</>}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

function StatCard({ title, value, icon, subtitle }: { title: string, value: string, icon: React.ReactNode, subtitle: string }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex items-start justify-between hover:shadow-md transition-shadow">
            <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                <p className="text-xs text-gray-400 mt-2">{subtitle}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl">
                {icon}
            </div>
        </div>
    )
}

function FilterButton({ active, onClick, label }: { active: boolean, onClick: () => void, label: string }) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${active
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-900'
                }`}
        >
            {label}
        </button>
    )
}

function LoadingState() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <Loader2 className="w-8 h-8 animate-spin text-slate-900" />
        </div>
    )
}

function ErrorState({ error, retry }: { error: string, retry: () => void }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6">
                <ShieldAlert size={32} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Connection Blocked</h2>
            <p className="text-slate-500 mb-8 max-w-sm">{error}</p>
            <button onClick={retry} className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Retry Connection
            </button>
        </div>
    )
}
