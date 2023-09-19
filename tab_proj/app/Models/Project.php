<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Anomalie;
use App\Models\Customer;

class Project extends Model
{
    use HasFactory;
    public $timestamps = false;
    protected  $table='projects';

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_project');
    }
    public function anomalies()
{
    return $this->hasMany(Anomalie::class);
}
public function customer()
{
    return $this->belongsTo(Customer::class);
}
}