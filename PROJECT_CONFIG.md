# 🗺️ PROJECT CONTEXT — Routing, Wayfinder & Vite

Este documento describe las convenciones y decisiones de arquitectura que deben respetarse para que el sistema de rutas, Wayfinder e Inertia funcionen correctamente.

---

## 1. Manejo de Rutas — Solo Wayfinder

> **⚠️ Regla absoluta**: Nunca usar Ziggy (`@routes` / `route()`). El único sistema de rutas en el frontend es **Wayfinder**.

Wayfinder genera automáticamente bindings tipados (TypeScript) para cada controlador y ruta registrada en `web.php`.

```ts
// ✅ Correcto — Wayfinder
import { IndexUserController } from '@/actions/App/Modules/Admin/Presentation/Controllers/Users/IndexUserController';
href={route(IndexUserController)}

// ❌ Prohibido — strings planos o Ziggy
href="/admin/usuarios"
route('admin.users.index')
```

---

## 2. Generación de Rutas — `wayfinder:generate`

Cada vez que se registre o modifique una ruta en `web.php`, hay que regenerar los tipos de Wayfinder:

```bash
php artisan wayfinder:generate
```

Esto genera los bindings en:
- `resources/js/actions/` — Acciones por controlador
- `resources/js/routes/` — Definiciones de rutas tipadas

El script `dev` del proyecto ya lo ejecuta automáticamente:
```json
"dev": "php artisan wayfinder:generate && vite"
```

En produción/build también se generan automáticamente gracias al plugin de Vite.

---

## 3. Plugin de Vite — `@laravel/vite-plugin-wayfinder`

El plugin está registrado en `vite.config.ts` con soporte para form variants:

```ts
// vite.config.ts
import { wayfinder } from '@laravel/vite-plugin-wayfinder';

export default defineConfig({
    plugins: [
        laravel({ input: ['resources/css/app.css', 'resources/js/app.tsx'], refresh: true }),
        react(),
        tailwindcss(),
        wayfinder({ formVariants: true }),
    ],
    server: {
        host: 'localhost', // ⚠️ Debe ser 'localhost', NO 'true' — evita ERR_ADDRESS_INVALID
        watch: { ignored: ['**/storage/framework/views/**'] },
    },
});
```

> **⚠️ `host: 'localhost'`** es obligatorio. Usar `host: true` hace que Vite escuche en `[::]` (IPv6) y provoca errores `ERR_ADDRESS_INVALID` en navegadores.

---

## 4. Nomenclatura de Páginas Inertia — Formato `Modulo::Pagina`

Las páginas de Inertia usan el formato `Modulo::Pagina` para identificar la ubicación del componente dentro de la arquitectura modular.

| Notación Inertia | Archivo físico |
|---|---|
| `Public::Welcome` | `resources/js/Modules/Public/Pages/Welcome.tsx` |
| `Analytics::Dashboard` | `resources/js/Modules/Analytics/Pages/Dashboard.tsx` |
| `Admin::Users/Index` | `resources/js/Modules/Admin/Pages/Users/Index.tsx` |
| `Admin::Users/Form` | `resources/js/Modules/Admin/Pages/Users/Form.tsx` |
| `Properties::Index` | `resources/js/Modules/Properties/Pages/Index.tsx` |

### En el controlador (backend):
```php
// ✅ Usando el formato Modulo::Pagina
return inertia('Admin::Users/Index', ['users' => $users]);
```

### En rutas inline:
```php
Route::get('/usuarios/crear', function() {
    return inertia('Admin::Users/Form');
})->name('users.create');
```

---

## 5. Resolución de Páginas en Frontend

### `resources/js/app.tsx`
Resuelve el formato `Modulo::Pagina` mapeando al path físico correcto:

```ts
resolve: (name) => {
    let path = `./Pages/${name}.tsx`;
    if (name.includes('::')) {
        const [module, page] = name.split('::');
        path = `./Modules/${module}/Pages/${page}.tsx`;
    }
    return resolvePageComponent(path, import.meta.glob([
        './Pages/**/*.tsx',
        './Modules/**/Pages/**/*.tsx',
    ]));
},
```

### `resources/views/app.blade.php`
Vite necesita saber qué archivo de página cargar. Se calcula dinámicamente el path según el componente Inertia activo:

```blade
@php
    $component = $page['component'];
    $path = "resources/js/Pages/{$component}.tsx";
    if (str_contains($component, '::')) {
        [$module, $name] = explode('::', $component);
        $path = "resources/js/Modules/{$module}/Pages/{$name}.tsx";
    }
@endphp
@vite(['resources/js/app.tsx', $path])
```

---

## 6. Estructura de Rutas Web (`routes/web.php`)

Las rutas siguen la convención de controladores invokables con FQCN:

```php
// Rutas públicas
Route::get('/', \App\Modules\Public\Presentation\Controllers\HomeController::class)->name('home');

// Rutas protegidas
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/dashboard', \App\Modules\Analytics\Presentation\Controllers\DashboardController::class)
        ->name('dashboard');

    // Sub-grupo de módulo Admin
    Route::group(['prefix' => 'admin', 'as' => 'admin.'], function () {
        Route::get('/usuarios', \App\Modules\Admin\Presentation\Controllers\Users\IndexUserController::class)
            ->name('users.index');
        // ...
    });
});
```

---

## 7. Variables de Entorno Críticas (`.env`)

```env
APP_URL=http://localhost   # ⚠️ No usar subdirectorio. Los tests usan esta URL.
```

---

## 8. Checklist al Agregar una Nueva Ruta

1. ✅ Registrar la ruta en `routes/web.php` con un nombre (`->name(...)`)
2. ✅ Crear el controlador invokable en `app/Modules/{Modulo}/Presentation/Controllers/`
3. ✅ Usar `inertia('{Modulo}::{Pagina}')` en el controlador
4. ✅ Crear el componente en `resources/js/Modules/{Modulo}/Pages/{Pagina}.tsx`
5. ✅ Ejecutar `php artisan wayfinder:generate`
6. ✅ Usar el action de Wayfinder (no strings planos) en el frontend
