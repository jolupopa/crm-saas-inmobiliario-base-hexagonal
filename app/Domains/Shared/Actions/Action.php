<?php

namespace App\Domains\Shared\Actions;

abstract class Action
{
    // Obligamos a que cada acción sea una unidad de ejecución única
    abstract public function execute(...$args);
}