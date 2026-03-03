<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

abstract class TestCase extends BaseTestCase
{
    /**
     * Disable Vite manifest resolution in all tests.
     * Tests should not require compiled assets.
     */
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
    }
}
