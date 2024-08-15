<?php

namespace App\Traits;

trait Searchable
{
    public function scopeSearch($query, array $filters)
    {
        foreach ($filters as $filter => $value) {
            if (method_exists($this, $method = 'filter' . ucfirst($filter))) {
                $this->$method($query, $value);
            } else {
                $query->where($filter, 'like', '%' . $value . '%');
            }
        }

        return $query;
    }

    // Usage 

    // add `use Searchable` on a model

    // $filters = [
    //     'name' => 'John',
    //     'email' => 'example@example.com',
    //     'role' => 'admin'
    // ];
    
    // $users = User::search($filters)->get();
}