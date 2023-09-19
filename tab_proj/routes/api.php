<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AnomalieController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\WordDocumentController;
use App\Http\Controllers\HtmlToImageController;
use App\Http\Controllers\Sanctum\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\JWTController;
use App\Http\Controllers\ApiRequestController;
use App\Http\Controllers\MyController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


    Route::get('Anomalie/{id}/show', [AnomalieController::class,'show']);

    Route::get('Anomalie', [AnomalieController::class,'index']);
    Route::delete('Anomalie/{id}/delete', [AnomalieController::class,'destroy']);
    Route::put('Anomalie/{id}/update', [AnomalieController::class,'update']);
    Route::put('Anomalie/{id}/validate', [AnomalieController::class,'validat']);
    Route::put('Anomalie/{id}/devalidate', [AnomalieController::class,'devalidat']);
    Route::post('Anomalie/create',[AnomalieController::class,'store']);
    Route::get('Project/{id}/show', [ProjectController::class,'show']);

    Route::get('Project', [ProjectController::class,'index']);
    Route::get('LastOne', [ProjectController::class,'default']);
    Route::delete('Project/{id}/delete', [ProjectController::class,'destroy']);
    Route::put('Project/{id}/update', [ProjectController::class,'update']);
    Route::post('Project/create',[ProjectController::class,'store']);

        // routes/web.php
        Route::get('/generate-image', [HtmlToImageController::class,'convertHtmlToImage']);



        Route::post('/apicall', [ApiRequestController::class,'index']);



        Route::post('/my-projects/{id}', [MyController::class,'index']);
        Route::post('/my-anomalies/{id}', [MyController::class,'index2']);


    Route::post('/generate-word-document', [WordDocumentController::class,'generateWordDocument']);
   
    
    ///// JWT auth
Route::post('login', [JWTController::class,'login']);
Route::post('register', [JWTController::class,'register']);
Route::post('refresh', [JWTController::class,'refresh']);
Route::post('logout', [JWTController::class,'logout']);
Route::post('me', [JWTController::class,'me']);

