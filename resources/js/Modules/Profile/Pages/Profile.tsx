import React, { useState, useRef } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import userProfileInformation from '@/routes/user-profile-information';
import userPassword from '@/routes/user-password';
import twoFactor from '@/routes/two-factor';
import profile from '@/routes/profile';

interface ProfileUser {
    id: string;
    name: string;
    email: string;
    company_name: string | null;
    avatar_url: string | null;
    initials: string;
    two_factor_enabled: boolean;
}

interface Props {
    user: ProfileUser;
}

// ── Avatar con iniciales ──────────────────────────────────────────────────────
function UserAvatar({ user, size = 'md' }: { user: any; size?: 'sm' | 'md' | 'lg' }) {
    const dim = size === 'lg' ? 'h-32 w-32 text-4xl' : size === 'md' ? 'h-10 w-10 text-sm' : 'h-8 w-8 text-xs';

    if (user?.avatar_url) {
        return (
            <img
                key={user.avatar_url}
                src={user.avatar_url}
                alt={user.name}
                className={`${dim} rounded-full object-cover border-2 border-[#333333] shadow-lg`}
            />
        );
    }

    // Colores de marca: variaciones de oro, ámbar y grises profundos
    const colors = ['#FACC15', '#EAB308', '#CA8A04', '#A16207', '#333333', '#242424'];
    const initials = user?.initials || 'U';
    const charCode = initials.charCodeAt(0);
    const color = colors[charCode % colors.length];
    const textColor = color === '#FACC15' || color === '#EAB308' ? '#121212' : '#FFFFFF';

    return (
        <div
            className={`${dim} rounded-full flex items-center justify-center font-bold ring-2 ring-[#FACC15]/30`}
            style={{ backgroundColor: color, color: textColor }}
        >
            {initials}
        </div>
    );
}

// ── Tab types ────────────────────────────────────────────────────────────────
type Tab = 'info' | 'password' | 'security';

export default function Profile({ user: userWrapper }: { user: { data: ProfileUser } }) {
    const user = userWrapper.data;
    const [activeTab, setActiveTab] = useState<Tab>('info');
    const [isTabsMenuOpen, setIsTabsMenuOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [qrSvg, setQrSvg] = useState<string | null>(null);
    const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
    const [twoFaEnabled, setTwoFaEnabled] = useState(user.two_factor_enabled);
    const fileRef = useRef<HTMLInputElement>(null);

    // ── Forms ────────────────────────────────────────────────────────────────
    const infoForm = useForm({
        name: user.name,
        email: user.email,
        company_name: user.company_name ?? '',
    });

    const pwdForm = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const otpForm = useForm({ code: '' });
    const avatarForm = useForm<{ avatar: File | null }>({ avatar: null });

    // ── Handlers ─────────────────────────────────────────────────────────────
    const submitInfo = (e: React.FormEvent) => {
        e.preventDefault();
        infoForm.put(profile.update.url());
    };

    const submitPassword = (e: React.FormEvent) => {
        e.preventDefault();
        pwdForm.put(userPassword.update.url(), {
            onSuccess: () => pwdForm.reset(),
        });
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        router.post(profile.avatar.url(), {
            avatar: file,
            _method: 'POST'
        }, {
            forceFormData: true,
            preserveScroll: true,
            onStart: () => setIsUploading(true),
            onFinish: () => setIsUploading(false),
            onSuccess: () => {
                if (fileRef.current) fileRef.current.value = '';
            }
        });
    };

    const enable2FA = async () => {
        await fetch(twoFactor.enable.url(), { method: 'POST', headers: { 'X-XSRF-TOKEN': getCsrf() } });
        const qrRes = await fetch(twoFactor.qrCode.url(), { headers: { Accept: 'application/json' } });
        const { svg } = await qrRes.json();
        setQrSvg(svg);
        setTwoFaEnabled(true);
    };

    const confirm2FA = (e: React.FormEvent) => {
        e.preventDefault();
        otpForm.post(twoFactor.confirm.url(), {
            onSuccess: async () => {
                const res = await fetch(twoFactor.recoveryCodes.url(), { headers: { Accept: 'application/json' } });
                const codes = await res.json();
                setRecoveryCodes(codes);
                setQrSvg(null);
            },
        });
    };

    const disable2FA = () => {
        router.delete(twoFactor.disable.url(), {
            onSuccess: () => { setTwoFaEnabled(false); setRecoveryCodes([]); },
        });
    };

    return (
        <AdminLayout>
            <Head title="Mi Perfil — EstateManager" />

            <div className="max-w-3xl mx-auto space-y-8">
                {/* Hero del perfil */}
                <div className="flex items-center gap-6 rounded-2xl border border-[#333333] bg-[#1a1a1a] p-6">
                    <div className="relative group">
                        <div className="relative">
                            <UserAvatar user={user} size="lg" />
                            {isUploading && (
                                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-[2px] z-10">
                                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#FACC15] border-t-transparent"></div>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={() => !isUploading && fileRef.current?.click()}
                            className={`absolute inset-0 flex items-center justify-center rounded-full bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity z-20 ${isUploading ? 'cursor-wait' : ''}`}
                            title="Cambiar foto"
                            disabled={isUploading}
                        >
                            {!isUploading && (
                                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            )}
                        </button>
                        <input
                            ref={fileRef}
                            type="file"
                            accept="image/png,image/jpeg,image/webp"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                        <p className="text-[#A0A0A0] text-sm">{user.email}</p>
                        {user.company_name && (
                            <span className="mt-2 inline-block rounded-full border border-[#FACC15]/30 bg-[#FACC15]/10 px-3 py-0.5 text-xs font-semibold text-[#FACC15]">
                                {user.company_name}
                            </span>
                        )}
                    </div>
                </div>

                {/* Tabs Responsivos */}
                <div className="relative">
                    {/* Desktop Tabs */}
                    <div className="hidden sm:flex gap-1 rounded-xl bg-[#1a1a1a] border border-[#333333] p-1">
                        {([
                            { id: 'info', label: 'Información' },
                            { id: 'password', label: 'Contraseña' },
                            { id: 'security', label: '2FA' },
                        ] as { id: Tab; label: string }[]).map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex-1 rounded-lg py-2.5 text-sm font-semibold transition-all ${activeTab === tab.id
                                    ? 'bg-[#FACC15] text-[#121212] shadow'
                                    : 'text-[#A0A0A0] hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Tabs (Collapsible) */}
                    <div className="sm:hidden relative">
                        <button
                            onClick={() => setIsTabsMenuOpen(!isTabsMenuOpen)}
                            className="flex w-full items-center justify-between rounded-xl border border-[#333333] bg-[#1a1a1a] p-4 text-sm font-bold text-white transition-all active:scale-[0.98]"
                        >
                            <span>
                                {activeTab === 'info' && 'Información'}
                                {activeTab === 'password' && 'Contraseña'}
                                {activeTab === 'security' && '2FA / Seguridad'}
                            </span>
                            <svg
                                className={`h-5 w-5 text-[#FACC15] transition-transform ${isTabsMenuOpen ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isTabsMenuOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 z-30 overflow-hidden rounded-xl border border-[#333333] bg-[#1a1a1a] shadow-2xl">
                                {([
                                    { id: 'info', label: 'Información' },
                                    { id: 'password', label: 'Contraseña' },
                                    { id: 'security', label: '2FA / Seguridad' },
                                ] as { id: Tab; label: string }[]).map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => {
                                            setActiveTab(tab.id);
                                            setIsTabsMenuOpen(false);
                                        }}
                                        className={`flex w-full items-center px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab.id
                                            ? 'bg-[#FACC15]/10 text-[#FACC15]'
                                            : 'text-[#A0A0A0] hover:bg-white/5 hover:text-white border-t border-[#333333]/30'
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Tab: Información ─────────────────────────────────────── */}
                {activeTab === 'info' && (
                    <form onSubmit={submitInfo} className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-8 space-y-6">
                        <h2 className="text-lg font-bold text-white">Información Personal</h2>

                        {[
                            { label: 'Nombre completo', key: 'name', type: 'text', placeholder: 'Juan Pérez' },
                            { label: 'Email', key: 'email', type: 'email', placeholder: 'tu@empresa.com' },
                            { label: 'Nombre de empresa', key: 'company_name', type: 'text', placeholder: 'Agencia Inmobiliaria S.A.' },
                        ].map(({ label, key, type, placeholder }) => (
                            <div key={key}>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">{label}</label>
                                <input
                                    id={`profile-${key}`}
                                    type={type}
                                    value={(infoForm.data as any)[key]}
                                    onChange={e => infoForm.setData(key as any, e.target.value)}
                                    placeholder={placeholder}
                                    className="w-full rounded-lg border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white placeholder-[#555555] transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                />
                                {(infoForm.errors as any)[key] && (
                                    <p className="mt-1 text-xs text-red-400">{(infoForm.errors as any)[key]}</p>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={infoForm.processing}
                                id="save-profile-btn"
                                className="rounded-full bg-[#FACC15] px-8 py-3 text-sm font-bold text-[#121212] shadow-lg transition-all hover:brightness-110 disabled:opacity-60"
                            >
                                {infoForm.processing ? 'Guardando...' : 'Guardar Cambios'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Tab: Contraseña ──────────────────────────────────────── */}
                {activeTab === 'password' && (
                    <form onSubmit={submitPassword} className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-8 space-y-6">
                        <h2 className="text-lg font-bold text-white">Cambiar Contraseña</h2>

                        {[
                            { label: 'Contraseña actual', key: 'current_password' },
                            { label: 'Nueva contraseña', key: 'password' },
                            { label: 'Confirmar nueva contraseña', key: 'password_confirmation' },
                        ].map(({ label, key }) => (
                            <div key={key}>
                                <label className="block text-xs font-semibold uppercase tracking-widest text-[#A0A0A0] mb-2">{label}</label>
                                <input
                                    id={`pwd-${key}`}
                                    type="password"
                                    value={(pwdForm.data as any)[key]}
                                    onChange={e => pwdForm.setData(key as any, e.target.value)}
                                    className="w-full rounded-lg border border-[#333333] bg-[#121212] px-4 py-3 text-sm text-white transition-all focus:border-[#FACC15] focus:ring-2 focus:ring-[#FACC15]/20 focus:outline-none"
                                    autoComplete="off"
                                />
                                {(pwdForm.errors as any)[key] && (
                                    <p className="mt-1 text-xs text-red-400">{(pwdForm.errors as any)[key]}</p>
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={pwdForm.processing}
                                id="save-password-btn"
                                className="rounded-full bg-[#FACC15] px-8 py-3 text-sm font-bold text-[#121212] shadow-lg transition-all hover:brightness-110 disabled:opacity-60"
                            >
                                {pwdForm.processing ? 'Actualizando...' : 'Actualizar Contraseña'}
                            </button>
                        </div>
                    </form>
                )}

                {/* ── Tab: 2FA ─────────────────────────────────────────────── */}
                {activeTab === 'security' && (
                    <div className="rounded-2xl border border-[#333333] bg-[#1a1a1a] p-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-white">Autenticación en Dos Factores</h2>
                                <p className="text-sm text-[#A0A0A0] mt-1">
                                    Añade una capa extra de seguridad a tu cuenta.
                                </p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-bold ${twoFaEnabled
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-[#333333] text-[#A0A0A0]'
                                }`}>
                                {twoFaEnabled ? '✓ Activo' : 'Inactivo'}
                            </span>
                        </div>

                        {!twoFaEnabled && !qrSvg && (
                            <button
                                onClick={enable2FA}
                                id="enable-2fa-btn"
                                className="w-full rounded-xl border border-[#FACC15]/40 bg-[#FACC15]/10 py-3 text-sm font-bold text-[#FACC15] transition-all hover:bg-[#FACC15]/20"
                            >
                                Activar 2FA con Google Authenticator
                            </button>
                        )}

                        {qrSvg && (
                            <div className="space-y-4">
                                <p className="text-sm text-[#A0A0A0]">
                                    Escanea este código QR con tu aplicación de autenticación y luego ingresa el código de 6 dígitos.
                                </p>
                                <div
                                    className="flex justify-center rounded-xl bg-white p-4"
                                    dangerouslySetInnerHTML={{ __html: qrSvg }}
                                />
                                <form onSubmit={confirm2FA} className="flex gap-3">
                                    <input
                                        id="otp-confirm-code"
                                        type="text"
                                        inputMode="numeric"
                                        value={otpForm.data.code}
                                        onChange={e => otpForm.setData('code', e.target.value)}
                                        maxLength={6}
                                        placeholder="000000"
                                        className="flex-1 rounded-lg border border-[#333333] bg-[#121212] px-4 py-3 text-center font-mono text-white tracking-widest focus:border-[#FACC15] focus:outline-none"
                                    />
                                    <button
                                        type="submit"
                                        disabled={otpForm.processing}
                                        className="rounded-xl bg-[#FACC15] px-6 py-3 text-sm font-bold text-[#121212] transition-all hover:brightness-110"
                                    >
                                        Confirmar
                                    </button>
                                </form>
                                {otpForm.errors.code && <p className="text-xs text-red-400">{otpForm.errors.code}</p>}
                            </div>
                        )}

                        {recoveryCodes.length > 0 && (
                            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 space-y-2">
                                <p className="text-sm font-bold text-emerald-400">✓ 2FA activado ¡Guarda tus códigos de recuperación!</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {recoveryCodes.map(code => (
                                        <code key={code} className="rounded bg-[#121212] px-3 py-1 text-xs font-mono text-[#A0A0A0]">{code}</code>
                                    ))}
                                </div>
                            </div>
                        )}

                        {twoFaEnabled && !qrSvg && (
                            <button
                                onClick={disable2FA}
                                id="disable-2fa-btn"
                                className="w-full rounded-xl border border-red-500/20 bg-red-500/5 py-3 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10"
                            >
                                Desactivar 2FA
                            </button>
                        )}
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}

// Helper para CSRF token
function getCsrf(): string {
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1] ?? '';
}
