import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, Crown, Search, Shield, UserX } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Modal } from '@/components/ui/modal';
import { Spinner } from '@/components/ui/spinner';
import { adminApi, subjectsApi } from '@/services/api';
import type { BacUser } from '@/types';

const PREMIUM_DURATIONS = [
    { label: '1 mois', days: 30 },
    { label: '3 mois', days: 90 },
    { label: '6 mois', days: 180 },
    { label: '1 an', days: 365 },
    { label: 'Permanent', days: 36500 },
];

function premiumExpiryLabel(user: BacUser) {
    if (!user.is_premium) {
        return null;
    }

    if (!user.premium_expires_at) {
        return 'Permanent';
    }

    const exp = new Date(user.premium_expires_at);
    const now = new Date();

    if (exp < now) {
        return 'Expiré';
    }

    const diff = Math.ceil(
        (exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (diff <= 7) {
        return `${diff}j restants`;
    }

    return exp.toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });
}

export default function AdminUsers() {
    const queryClient = useQueryClient();
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [filterSerie, setFilterSerie] = useState('');
    const [filterRole, setFilterRole] = useState('');
    const [filterPremium, setFilterPremium] = useState('');
    const [premiumModal, setPremiumModal] = useState<BacUser | null>(null);
    const [selectedDays, setSelectedDays] = useState(30);

    const { data: seriesData = [] } = useQuery({
        queryKey: ['series'],
        queryFn: subjectsApi.series,
    });

    const { data, isLoading } = useQuery({
        queryKey: [
            'admin-users',
            page,
            search,
            filterSerie,
            filterRole,
            filterPremium,
        ],
        queryFn: () =>
            adminApi.users({
                page,
                limit: 20,
                search: search || undefined,
                serie: filterSerie || undefined,
                role: filterRole || undefined,
                is_premium:
                    filterPremium === '' ? undefined : filterPremium === 'true',
            }),
    });

    const updateMutation = useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: Record<string, unknown>;
        }) => adminApi.updateUser(id, payload),
        onSuccess: () => {
            toast.success('Utilisateur mis à jour');
            queryClient.invalidateQueries({ queryKey: ['admin-users'] });
            setPremiumModal(null);
        },
        onError: () => toast.error('Erreur lors de la mise à jour'),
    });

    const users: BacUser[] = data?.data ?? [];

    function handleGrantPremium() {
        if (!premiumModal) {
            return;
        }

        const expiresAt =
            selectedDays >= 36500
                ? null
                : new Date(Date.now() + selectedDays * 86400000).toISOString();
        updateMutation.mutate({
            id: premiumModal.id,
            payload: { is_premium: true, premium_expires_at: expiresAt },
        });
    }

    function handleRevokePremium(user: BacUser) {
        updateMutation.mutate({
            id: user.id,
            payload: { is_premium: false, premium_expires_at: null },
        });
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">Utilisateurs</h1>

            {/* Filtres */}
            <div className="flex flex-wrap gap-3">
                <div className="relative min-w-48 flex-1">
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" />
                    <input
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        placeholder="Rechercher par email, nom…"
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 py-2 pr-4 pl-9 text-sm text-white placeholder:text-slate-500 focus:border-green focus:outline-none"
                    />
                </div>
                <select
                    value={filterSerie}
                    onChange={(e) => {
                        setFilterSerie(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-green focus:outline-none"
                >
                    <option value="">Toutes les séries</option>
                    {seriesData.map((s) => (
                        <option key={s} value={s}>
                            {s}
                        </option>
                    ))}
                </select>
                <select
                    value={filterRole}
                    onChange={(e) => {
                        setFilterRole(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-green focus:outline-none"
                >
                    <option value="">Tous les rôles</option>
                    <option value="eleve">Élève</option>
                    <option value="professeur">Professeur</option>
                    <option value="admin">Admin</option>
                </select>
                <select
                    value={filterPremium}
                    onChange={(e) => {
                        setFilterPremium(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white focus:border-green focus:outline-none"
                >
                    <option value="">Tous les forfaits</option>
                    <option value="true">Premium</option>
                    <option value="false">Gratuit</option>
                </select>
            </div>

            {/* Table */}
            {isLoading ? (
                <div className="flex justify-center py-12">
                    <Spinner className="h-6 w-6 text-green" />
                </div>
            ) : (
                <div className="overflow-hidden rounded-2xl border border-slate-800">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-800 text-left text-xs text-slate-400">
                            <tr>
                                <th className="px-4 py-3">Utilisateur</th>
                                <th className="px-4 py-3">Série</th>
                                <th className="px-4 py-3">Rôle</th>
                                <th className="px-4 py-3">Forfait</th>
                                <th className="px-4 py-3">Expiration</th>
                                <th className="px-4 py-3">Points</th>
                                <th className="px-4 py-3">Inscrit le</th>
                                <th className="px-4 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 bg-slate-900">
                            {users.map((u) => {
                                const expLabel = premiumExpiryLabel(u);
                                const isExpired = expLabel === 'Expiré';

                                return (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-slate-800/50"
                                    >
                                        <td className="px-4 py-3">
                                            <div>
                                                <p className="font-medium text-white">
                                                    {u.prenom} {u.nom}
                                                </p>
                                                <p className="text-xs text-slate-500">
                                                    {u.email}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <Badge className="border-0 bg-slate-700 text-xs text-slate-300">
                                                {u.serie_code}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={u.role}
                                                onChange={(e) =>
                                                    updateMutation.mutate({
                                                        id: u.id,
                                                        payload: {
                                                            role: e.target
                                                                .value,
                                                        },
                                                    })
                                                }
                                                className="rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs text-white"
                                            >
                                                <option value="eleve">
                                                    Élève
                                                </option>
                                                <option value="professeur">
                                                    Professeur
                                                </option>
                                                <option value="admin">
                                                    Admin
                                                </option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => {
                                                    if (u.is_premium) {
                                                        handleRevokePremium(u);
                                                    } else {
                                                        setSelectedDays(30);
                                                        setPremiumModal(u);
                                                    }
                                                }}
                                                className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium transition-colors ${
                                                    u.is_premium && !isExpired
                                                        ? 'bg-amber-light text-amber hover:bg-red-100 hover:text-red-500'
                                                        : isExpired
                                                          ? 'bg-red-900/30 text-red-400 hover:bg-amber-light hover:text-amber'
                                                          : 'bg-slate-700 text-slate-400 hover:bg-amber-light hover:text-amber'
                                                }`}
                                            >
                                                <Crown className="h-3 w-3" />
                                                {u.is_premium && !isExpired
                                                    ? 'Premium'
                                                    : isExpired
                                                      ? 'Expiré'
                                                      : 'Gratuit'}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            {expLabel &&
                                            expLabel !== 'Expiré' ? (
                                                <span
                                                    className={`flex items-center gap-1 text-xs ${expLabel.includes('j restants') ? 'text-amber' : 'text-slate-400'}`}
                                                >
                                                    <Calendar className="h-3 w-3" />
                                                    {expLabel}
                                                </span>
                                            ) : expLabel === 'Expiré' ? (
                                                <span className="text-xs text-red-400">
                                                    Expiré
                                                </span>
                                            ) : (
                                                <span className="text-xs text-slate-600">
                                                    —
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-slate-300">
                                            {(
                                                u.total_points ?? 0
                                            ).toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3 text-xs text-slate-500">
                                            {u.created_at
                                                ? new Date(
                                                      u.created_at,
                                                  ).toLocaleDateString('fr-FR')
                                                : '—'}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1">
                                                <button
                                                    onClick={() => {
                                                        setSelectedDays(30);
                                                        setPremiumModal(u);
                                                    }}
                                                    className="rounded-lg p-1.5 text-slate-500 hover:bg-amber-light hover:text-amber"
                                                    title="Gérer le forfait"
                                                >
                                                    <Crown className="h-4 w-4" />
                                                </button>
                                                {u.role !== 'admin' && (
                                                    <button
                                                        onClick={() =>
                                                            updateMutation.mutate(
                                                                {
                                                                    id: u.id,
                                                                    payload: {
                                                                        role: 'admin',
                                                                    },
                                                                },
                                                            )
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-700 hover:text-white"
                                                        title="Promouvoir admin"
                                                    >
                                                        <Shield className="h-4 w-4" />
                                                    </button>
                                                )}
                                                {u.is_premium && (
                                                    <button
                                                        onClick={() =>
                                                            handleRevokePremium(
                                                                u,
                                                            )
                                                        }
                                                        className="rounded-lg p-1.5 text-slate-500 hover:bg-red-900/50 hover:text-red-400"
                                                        title="Révoquer le premium"
                                                    >
                                                        <UserX className="h-4 w-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                            {users.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-4 py-10 text-center text-slate-500"
                                    >
                                        Aucun utilisateur trouvé
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-40"
                >
                    Précédent
                </button>
                <span className="rounded-xl border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white">
                    Page {page}
                </span>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={users.length < 20}
                    className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-2 text-sm text-white disabled:opacity-40"
                >
                    Suivant
                </button>
            </div>

            {/* Modal gestion forfait */}
            <Modal
                open={!!premiumModal}
                onOpenChange={(open) => {
                    if (!open) {
                        setPremiumModal(null);
                    }
                }}
                title="Gérer le forfait Premium"
            >
                {premiumModal && (
                    <div className="space-y-5">
                        <div className="rounded-xl bg-slate-50 px-4 py-3">
                            <p className="font-medium text-slate-800">
                                {premiumModal.prenom} {premiumModal.nom}
                            </p>
                            <p className="text-sm text-slate-500">
                                {premiumModal.email}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                                Forfait actuel :{' '}
                                <span
                                    className={
                                        premiumModal.is_premium
                                            ? 'font-medium text-amber'
                                            : 'text-slate-500'
                                    }
                                >
                                    {premiumModal.is_premium
                                        ? `Premium (${premiumExpiryLabel(premiumModal)})`
                                        : 'Gratuit'}
                                </span>
                            </p>
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Durée du forfait Premium
                            </label>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {PREMIUM_DURATIONS.map((d) => (
                                    <button
                                        key={d.days}
                                        onClick={() => setSelectedDays(d.days)}
                                        className={`rounded-xl border-2 px-3 py-2.5 text-sm font-medium transition-all ${
                                            selectedDays === d.days
                                                ? 'border-amber bg-amber-light text-amber'
                                                : 'border-slate-200 text-slate-600 hover:border-amber/40'
                                        }`}
                                    >
                                        {d.label}
                                        {d.days < 36500 && (
                                            <p className="mt-0.5 text-xs font-normal text-slate-400">
                                                jusqu'au{' '}
                                                {new Date(
                                                    Date.now() +
                                                        d.days * 86400000,
                                                ).toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                })}
                                            </p>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button
                                variant="ghost"
                                onClick={() => setPremiumModal(null)}
                            >
                                Annuler
                            </Button>
                            {premiumModal.is_premium && (
                                <Button
                                    variant="outline"
                                    onClick={() =>
                                        handleRevokePremium(premiumModal)
                                    }
                                    className="border-red-300 text-red-500 hover:bg-red-50"
                                    disabled={updateMutation.isPending}
                                >
                                    Révoquer le Premium
                                </Button>
                            )}
                            <Button
                                onClick={handleGrantPremium}
                                disabled={updateMutation.isPending}
                                className="bg-amber text-slate-900 hover:bg-amber/90"
                            >
                                {updateMutation.isPending ? (
                                    <Spinner className="h-4 w-4" />
                                ) : (
                                    <>
                                        <Crown className="h-4 w-4" /> Accorder
                                        le Premium
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
