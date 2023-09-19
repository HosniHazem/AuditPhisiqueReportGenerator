<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Project;
class Anomalie extends Model
{
    use HasFactory;
    protected  $table='anomalie';

    protected $fillable = [
        'name',
        'element_imp',
        'description',
        'risque',
        'score_cvss',
        'score',
        'AV',
        'AC',
        'PR',
        'UI',
        'S',
        'C',
        'I',
        'A',
        'ref',
        'preuve',
        'image',
        'recommendation',
        'project_id',
        'compl',
        'user_name'
    ];

    public function projects()
    {
        return $this->belongsTo(Project::class);
    }


}