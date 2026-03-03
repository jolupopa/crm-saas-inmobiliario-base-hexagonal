<?php

namespace App\Modules\Profile\Application\Actions;

use App\Modules\Auth\Domain\Models\User;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class UpdateAvatarAction
{
    public function execute(User $user, UploadedFile $file): string
    {
        // Eliminar avatar anterior si existe
        if ($user->avatar_url && Storage::disk('public')->exists($user->avatar_url)) {
            Storage::disk('public')->delete($user->avatar_url);
        }

        $extension = $file->getClientOriginalExtension();
        $filename  = bin2hex(random_bytes(16)) . '.' . $extension;
        $path      = $file->storeAs('avatars', $filename, 'public');

        $user->update(['avatar_url' => $path]);

        return $path;
    }
}
