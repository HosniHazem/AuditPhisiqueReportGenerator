<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Anomalie;
use Illuminate\Support\Facades\Validator;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\Project;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;

class AnomalieController extends Controller
{
     use LogsActivity;

    public function show($id)
    {

        $item =Anomalie::find($id);
        if($item){

        return response()->json(['Anomalie'=>$item,'status' => 200]);
        }
    else
    {
    return response()->json(['message'=>'not found','status' => 404]);
    }
    }

    public function index()
    {

        $item =Anomalie::all();
       
         
    
        return response()->json(['Anomalie'=>$item,'status' => 200]);
    }

    public function store(Request $req)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'element_imp' => 'required',
            'description' => 'required',
            'risque' => 'required',
            'score_cvss' => 'required',
        ]);
      
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->getMessageBag(),
            ]);
        } else {
        $item =new Anomalie();
        $item->name=$req->name;
        $item->description=$req->description;
        $item->element_imp=$req->element_imp;
        $item->risque=$req->risque;
        $item->score_cvss=$req->score_cvss;
        $item->score=$req->score;
        $item->AV=$req->AV;
        $item->AC=$req->AC;
        $item->UI=$req->UI;
        $item->PR=$req->PR;
        $item->S=$req->S;
        $item->C=$req->C;
        $item->I=$req->I;
        $item->A=$req->A;
        $item->ref=$req->ref;
        $item->preuve=$req->preuve;
        $item->image=$req->image;
        $item->recommendation=$req->recommendation;
        $item->project_id=$req->project_id;
        $item->compl=$req->compl;
        $item->user_name=$req->user_name;
        $item->save();
        return response()->json(['message'=>'done','status' => 200]);
        $item2 =Project::find($req->project_id);
        $activ="Create";
        $name=$req->user_name;
        $project= $item2->Nom;

$email = env('APP_EMAIl');
        Mail::send('email.email_act',['name'=>$name,'activ'=>$activ,'project'=>$project],function(message $message) use ($email){
            $message->subject('This is log reporter');
            $message->to($email);
         } );

        activity("Create")
        ->log('Create a new anomalie ' . $req->name . ' for the project "' . $item2->Nom . ' By ' . $req->user_name );
    }
    
    }
    public function validat(Request $req,$id)
    {

        $item =Anomalie::find($id);

        if($item){
          
            $item->validation="Yes";
        $item->update();
        return response()->json(['message'=>'done','status' => 200]);
                }


                else
                {
                return response()->json(['message'=>'not done','status' => 404]);
                }
            }
    public function devalidat(Request $req,$id)
    {

        $item =Anomalie::find($id);

        if($item){
          
            $item->validation="No";
        $item->update();
        return response()->json(['message'=>'done','status' => 200]);
                }


                else
                {
                return response()->json(['message'=>'not done','status' => 404]);
                }
            }
    
    public function update(Request $req,$id)
    {
        $validator = Validator::make($req->all(), [
            'name' => 'required',
            'element_imp' => 'required',
            'description' => 'required',
            'risque' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'validate_err' => $validator->getMessageBag(),
            ]);
        } else {

        $item =Anomalie::find($id);

        if($item){
            $item->name=$req->name;
            $item->description=$req->description;
            $item->element_imp=$req->element_imp;
            $item->risque=$req->risque;
            $item->score_cvss=$req->score_cvss;
            $item->score=$req->score;
            $item->AV=$req->AV;
            $item->AC=$req->AC;
            $item->UI=$req->UI;
            $item->PR=$req->PR;
            $item->S=$req->S;
            $item->C=$req->C;
            $item->I=$req->I;
            $item->A=$req->A;
            $item->ref=$req->ref;
            $item->preuve=$req->preuve;
            $item->image=$req->image;
            $item->recommendation=$req->recommendation;
            $item->compl=$req->compl;
            $item->project_id=$req->project_id;
            $item->user_name=$req->user_name;
        $item->update();
        $item2 =Project::find($req->project_id);
        $activ="Update";
        $name=$req->user_name;
        $project= $item2->Nom;

$email = env('APP_EMAIl');
        Mail::send('email.email_act',['name'=>$name,'activ'=>$activ,'project'=>$project],function(message $message) use ($email){
            $message->subject('This is log reporter');
            $message->to($email);
         } );
        activity("Update")
        ->log('Update the anomalie ' . $req->name . ' for the project "' . $item2->Nom . ' By ' . $req->user_name );
        return response()->json(['message'=>'done','status' => 200]);

                }


                else
                {
                return response()->json(['message'=>'not done','status' => 404]);
                }
            }
    }
    public function destroy($id)
    {

        $item =Anomalie::find($id);
        if($item){
        $item->delete();
        return response()->json(['message'=>'deleted'], 200);
                }
                else
                {
                return response()->json(['message'=>'not deleted'], 404);
                }
    }
}

