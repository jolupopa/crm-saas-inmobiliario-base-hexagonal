# Guía de Migración: Single-Tenant → Multi-Tenant

> **Estado actual:** Single-Tenant ✅  
> **Este documento:** Referencia futura para cuando el proyecto necesite escalar.  
> **Prerequisito cumplido:** Todas las tablas ya tienen `company_id` UUID desde el inicio.

---

## Tabla de contenidos

1. [Comparativa de paquetes](#1-comparativa-de-paquetes)
2. [Opción recomendada: Stancl Tenancy](#2-opción-recomendada-stancl-tenancy)
3. [Opción alternativa: Spatie Multitenancy](#3-opción-alternativa-spatie-multitenancy)
4. [Pasos de migración paso a paso](#4-pasos-de-migración-paso-a-paso)
5. [Cambios en el código de la aplicación](#5-cambios-en-el-código-de-la-aplicación)
6. [Riesgos y plan de rollback](#6-riesgos-y-plan-de-rollback)

---

## 1. Comparativa de paquetes

| Característica | `stancl/tenancy` | `spatie/laravel-multitenancy` |
|---|---|---|
| **Modelo de datos** | Base de datos separada por tenant | Base de datos compartida (company_id) |
| **Aislamiento** | 100% — cada tenant tiene su propia DB | Parcial — depende de los Global Scopes |
| **Complejidad de migración** | Alta (requiere migrar datos a nuevas DBs) | **Baja** (ya tienes company_id en todas las tablas) |
| **Rendimiento** | Mejor aislamiento pero más recursos | Más eficiente en infraestructura |
| **Adecuado para tu proyecto** | ❌ Requeriría mover todos los datos | ✅ **Perfectamente compatible** |
| **Documentación** | Excelente | Excelente |
| **GitHub stars** | ~4k | ~1k |

### ✅ Recomendación: `spatie/laravel-multitenancy`

Tu proyecto ya usa `company_id` como columna en todas las tablas — exactamente el modelo que usa Spatie. La migración será mínima porque:
- Los datos **no se mueven** a ningún lado
- Solo se agrega middleware que inyecta el tenant automáticamente
- Los Global Scopes se configuran una sola vez en `BaseModel`

---

## 2. Opción recomendada: Stancl Tenancy

> Solo documentada como alternativa. **No recomendada** para este proyecto.

```bash
composer require stancl/tenancy
php artisan tenancy:install
php artisan migrate
```

**Problema con tu proyecto:** Stancl crea una base de datos separada por tenant. Todos tus datos actuales están en una sola DB — la migración requeriría mover registros manualmente y reconfigurar todo.

---

## 3. Opción alternativa: Spatie Multitenancy

### ¿Qué hace?
- Detecta el tenant actual (por subdominio, header, JWT, etc.)
- Inyecta automáticamente el `company_id` en todo el contexto de la request
- Compatible con tu modelo de `company_id` en tablas

---

## 4. Pasos de migración paso a paso

### Paso 1 — Activar el modo multi-tenant en `.env`

```env
# .env
TENANT_MODE=multi
```

```php
// config/app.php
'tenant_mode' => env('TENANT_MODE', 'single'),
```

---

### Paso 2 — Instalar Spatie Multitenancy

```bash
composer require spatie/laravel-multitenancy
```

```bash
php artisan vendor:publish --provider="Spatie\Multitenancy\MultitenancyServiceProvider" --tag="multitenancy-migrations"
php artisan vendor:publish --provider="Spatie\Multitenancy\MultitenancyServiceProvider" --tag="multitenancy-config"
```

Esto publicará:
- `database/migrations/landlord/create_tenants_table.php`
- `config/multitenancy.php`

---

### Paso 3 — Ejecutar las migraciones

```bash
php artisan migrate
```

La tabla `tenants` de Spatie mapea sobre tu tabla `companies` existente.

---

### Paso 4 — Configurar `config/multitenancy.php`

```php
// config/multitenancy.php
return [
    'tenant_finder' => Spatie\Multitenancy\TenantFinder\DomainTenantFinder::class,
    
    // Usar tu modelo Company existente como Tenant
    'tenant_model' => \App\Modules\Company\Domain\Models\Company::class,
    
    'tenant_database_connection_name' => null, // Null = misma DB (shared)
    
    'landlord_database_connection_name' => 'pgsql',
];
```

---

### Paso 5 — Adaptar el modelo Company como Tenant

```php
// app/Modules/Company/Domain/Models/Company.php
use Spatie\Multitenancy\Models\Concerns\UsesTenantModel;

class Company extends BaseModel implements \Spatie\Multitenancy\Models\Tenant
{
    use UsesTenantModel;
    
    // ... resto del modelo
}
```

---

### Paso 6 — Agregar Global Scope al BaseModel

```php
// app/Core/BaseModel.php
protected static function booted(): void
{
    if (config('app.tenant_mode') === 'multi') {
        static::addGlobalScope(new CompanyScope());
    }
}
```

```php
// app/Core/Scopes/CompanyScope.php
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Scope;

class CompanyScope implements Scope
{
    public function apply(Builder $builder, Model $model): void
    {
        if ($tenant = \Spatie\Multitenancy\Models\Tenant::current()) {
            $builder->where($model->getTable() . '.company_id', $tenant->id);
        }
    }
}
```

---

### Paso 7 — Configurar el Middleware en `routes/web.php`

```php
// routes/web.php

// Rutas que requieren resolver el tenant
Route::middleware([\Spatie\Multitenancy\Http\Middleware\NeedsTenant::class])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    // ... resto de rutas protegidas
});

// Rutas landlord (no necesitan tenant)
Route::get('/', HomeController::class)->name('home');
Route::get('/login', ...)->name('login');
```

---

### Paso 8 — Actualizar `CreateNewUser` Action

```php
// app/Domains/Auth/Actions/CreateNewUser.php

// CAMBIAR ESTO:
$company = Company::first() ?? Company::create([...]);

// POR ESTO:
$company = Company::create([
    'name' => $input['company_name'],
    // subdomain: Str::slug($input['company_name'])
]);
```

---

### Paso 9 — Routing por subdominio (opcional pero recomendado)

```env
# .env
APP_URL=http://tudominio.com
```

Cada empresa accede por su subdominio:
- `agencia1.tudominio.com`
- `agencia2.tudominio.com`

En `config/multitenancy.php`:
```php
'tenant_finder' => Spatie\Multitenancy\TenantFinder\DomainTenantFinder::class,
```

Agregar campo `domain` a la tabla `companies`:
```bash
php artisan make:migration add_domain_to_companies_table
```
```php
$table->string('domain')->nullable()->unique();
```

---

### Paso 10 — Verificación final

```bash
# Correr todos los tests
php artisan test

# Verificar que cada tenant solo ve sus datos
# Crear 2 companies de prueba y verificar aislamiento
```

---

## 5. Cambios en el código de la aplicación

| Archivo | Cambio necesario |
|---|---|
| `config/multitenancy.php` | Configurar finder, modelo tenant |
| `app/Core/BaseModel.php` | Agregar Global Scope condicional |
| `app/Core/Scopes/CompanyScope.php` | **Nuevo** — scope de aislamiento |
| `app/Modules/Company/Domain/Models/Company.php` | Implementar interfaz Tenant |
| `app/Domains/Auth/Actions/CreateNewUser.php` | Crear Company nueva en lugar de `Company::first()` |
| `routes/web.php` | Envolver con middleware `NeedsTenant` |
| `FrontLayout.tsx` | Mostrar selector de empresa/subdominio |
| `.env` | `TENANT_MODE=multi` |

**Total de archivos a modificar: ~8** — sin tocar la base de datos.

---

## 6. Riesgos y plan de rollback

### 🟢 Riesgos BAJOS (ya mitigados)

| Riesgo | Estado | Por qué |
|---|---|---|
| Datos mezclados entre tenants | ✅ Mitigado | `company_id` ya existe en todas las tablas desde el inicio |
| UUID inconsistentes | ✅ Mitigado | `BaseModel` con UUID en todos los modelos |
| Datos huérfanos | ✅ Mitigado | FK constraints con `cascadeOnDelete` |

### 🟡 Riesgos MEDIOS (gestionar con cuidado)

| Riesgo | Mitigación |
|---|---|
| Queries sin `company_id` (N+1 por scope) | Auditar con `php artisan db:monitor` en staging |
| Subdominios en desarrollo local | Usar `*.test` en Laragon/hosts |
| Sesiones compartidas entre tenants | Verificar configuración de `SESSION_DOMAIN` |

### 🔴 Riesgos ALTOS (no aplican a este proyecto)

| Riesgo | Por qué no aplica |
|---|---|
| Migración de datos entre DBs separadas | No usamos DB por tenant (Stancl) |
| Pérdida de datos sin `company_id` | Todas las tablas ya tienen `company_id` desde el inicio |

---

### Plan de rollback

Si algo falla durante la migración a multi-tenant:

```bash
# 1. Revertir .env
TENANT_MODE=single

# 2. Remover middleware de rutas (comentar NeedsTenant)

# 3. Los datos NO se tocan — rollback es seguro
# No hay migración de datos involucrada
```

> **⚠️ IMPORTANTE:** Hacer un backup completo de la base de datos ANTES de activar multi-tenant en producción.
```bash
pg_dump my_crm > backup_pre_multitenant_$(date +%Y%m%d).sql
```

---

*Documento creado: 2026-03-02 | Proyecto: EstateManager CRM*
