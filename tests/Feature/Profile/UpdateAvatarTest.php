<?php

use App\Modules\Auth\Domain\Models\User;
use App\Modules\Company\Domain\Models\Company;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

beforeEach(function () {
    Storage::fake('public');
});

test('authenticated user can upload an avatar', function () {
    $user = User::factory()->create();
    $file = UploadedFile::fake()->image('avatar.jpg', 200, 200);

    $response = $this->actingAs($user)
        ->post(route('profile.avatar'), ['avatar' => $file]);

    $response->assertRedirect();
    $updatedUser = $user->fresh();
    $this->assertNotNull($updatedUser->avatar_url);
    Storage::disk('public')->assertExists($updatedUser->avatar_url);
});

test('unauthenticated user cannot upload avatar', function () {
    $file = UploadedFile::fake()->image('avatar.jpg');

    $response = $this->post(route('profile.avatar'), ['avatar' => $file]);

    $response->assertRedirect(route('login'));
});

test('avatar upload rejects non-image files', function () {
    $user = User::factory()->create();
    $file = UploadedFile::fake()->create('doc.pdf', 100, 'application/pdf');

    $response = $this->actingAs($user)
        ->post(route('profile.avatar'), ['avatar' => $file]);

    $response->assertSessionHasErrors('avatar');
});

test('uploading new avatar deletes the old one', function () {
    Storage::disk('public')->put('avatars/old-avatar.jpg', 'fake-content');
    $user = User::factory()->create(['avatar_url' => 'avatars/old-avatar.jpg']);

    $newFile = UploadedFile::fake()->image('new.jpg', 200, 200);

    $this->actingAs($user)
        ->post(route('profile.avatar'), ['avatar' => $newFile]);

    Storage::disk('public')->assertMissing('avatars/old-avatar.jpg');
});
