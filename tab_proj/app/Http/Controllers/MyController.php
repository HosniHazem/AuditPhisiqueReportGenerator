<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Project;
use App\Models\User;

class MyController extends Controller
{

   

    public function index($id)
    {

        $user = User::find($id);
        $projects = $user->projects;
        if($projects){

            return response()->json(['Project'=>$projects,'status' => 200]);
            }
        else
        {
        return response()->json(['message'=>'not found','status' => 404]);
        }
    }
    public function index2($id)
    {

        $project = Project::find($id);
        $anomalie = $project->anomalies;
        if($anomalie){

            return response()->json(['Anomalies'=>$anomalie,'status' => 200]);
            }
        else
        {
        return response()->json(['message'=>'not found','status' => 404]);
        }
    }

   
}

