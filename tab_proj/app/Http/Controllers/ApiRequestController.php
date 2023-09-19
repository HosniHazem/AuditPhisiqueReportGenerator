<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Anomalie;
use Illuminate\Support\Facades\Log;

class ApiRequestController extends Controller
{
    public function index(Request $request)
{

        // Get the query parameter from the request
        $query = $request->q;

        // Make the first API request using the dynamic query parameter
        $response = Http::withOptions([
            'verify' => false, // Disable SSL verification
        ])->withHeaders([
            'X-Auth' => '1986ad8c0a5b3df4d7028d5f3c06e936c557ea7d08cb1462e93f789fa305af2e0',
        ])->get("https://accu.smartskills.local:3443/api/v1/targets?q={$query}");

        // Decode the JSON response data
        $responseData = json_decode($response->body(), true); // true to convert it to an associative array

        // Check if the 'targets' key exists in the response
        if (isset($responseData['targets'][0])) {
            $A = $responseData['targets'][0]['last_scan_id'];
            $B = $responseData['targets'][0]['last_scan_session_id'];

            // Make the second API request for vulnerabilities
            $response2 = Http::withOptions([
                'verify' => false, // Disable SSL verification
            ])->withHeaders([
                'X-Auth' => '1986ad8c0a5b3df4d7028d5f3c06e936c557ea7d08cb1462e93f789fa305af2e0',
            ])->get("https://accu.smartskills.local:3443/api/v1/scans/{$A}/results/{$B}/vulnerabilities");

            // Decode the JSON response data for the second request
            $responseData2 = json_decode($response2->body(), true); // true to convert it to an associative array




            $responseData3 = [];
            if(isset($responseData2['vulnerabilities'])){
             foreach ($responseData2['vulnerabilities'] as $item) {

                 // Make the second API request for vulnerabilities
            $response3 = Http::withOptions([
                'verify' => false, // Disable SSL verification
            ])->withHeaders([
                'X-Auth' => '1986ad8c0a5b3df4d7028d5f3c06e936c557ea7d08cb1462e93f789fa305af2e0',
            ])->get("https://accu.smartskills.local:3443/api/v1/scans/{$A}/results/{$B}/vulnerabilities/{$item['vuln_id']}");

            $responseData3[] = json_decode($response3->body(), true); // true to convert it to an associative array


             }

            foreach ( $responseData3 as $item) {
                $it =new Anomalie();
                $it->name=$item['vt_name'];
                $it->description=htmlspecialchars($item['description']);
                $it->element_imp=htmlspecialchars($item['affects_url']);

                 $it->risque=htmlspecialchars($item['impact']);
                $it->score_cvss=$item['cvss3'];
                $it->score=$item['cvss_score'];
                $cvssInput = $item['cvss3'];

                $cvssItem = [];

                // Regular expressions and mappings
                $regexMappings = [
                    '/AV:([NALP])/' => ['AV', ['N' => 'Réseau', 'A' => 'Adjacent', 'L' => 'Locale', 'P' => 'Physique']],
                    '/AC:([LH])/' => ['AC', ['L' => 'Faible', 'H' => 'Haut']],
                    '/PR:([LHN])/' => ['PR', ['N' => 'Aucun', 'L' => 'Faible', 'H' => 'Haut']],
                    '/UI:([NR])/' => ['UI', ['N' => 'Aucun', 'R' => 'Exigée']],
                    '/S:([UC])/' => ['S', ['U' => 'Inchangé', 'C' => 'Changé']],
                    '/C:([NLH])/' => ['C', ['N' => 'Aucun', 'L' => 'Faible', 'H' => 'Haut']],
                    '/I:([NLH])/' => ['I', ['N' => 'Aucun', 'L' => 'Faible', 'H' => 'Haut']],
                    '/A:([NLH])/' => ['A', ['N' => 'Aucun', 'L' => 'Faible', 'H' => 'Haut']],
                ];

                // Loop through regular expressions and update $cvssItem
                foreach ($regexMappings as $regex => [$field, $mapping]) {
                    if (preg_match($regex, $cvssInput, $matches)) {
                        $value = $matches[1];
                        $cvssItem[$field] = $mapping[$value];
                    }
                }
                if($cvssItem){
              $it->AV= $cvssItem["AV"];
                $it->AC= $cvssItem["AC"];
                $it->UI= $cvssItem["UI"];
                $it->PR= $cvssItem["PR"];
                $it->S= $cvssItem["S"];
                $it->C= $cvssItem["C"];
                $it->I= $cvssItem["I"];
                $it->A= $cvssItem["A"];
            }
                 $it->ref=htmlspecialchars(json_encode($item['references']));

                $it->preuve=htmlspecialchars($item['request']);

                $cvssScore = $item['cvss_score'];
                $riskLevel = "";

                if ($cvssScore >= 0.1 && $cvssScore <= 3.9) {
                    $riskLevel = "Faible";
                } elseif ($cvssScore >= 4 && $cvssScore <= 6.9) {
                    $riskLevel = "Moyen";
                } elseif ($cvssScore >= 7 && $cvssScore <= 8.9) {
                    $riskLevel = "Élevé";
                } elseif ($cvssScore >= 9) {
                    $riskLevel = "Critique";
                }
                $it->image=$riskLevel;  //High,Medium,Low..
                $it->recommendation=htmlspecialchars($item['recommendation']);
                $it->project_id=$request->project_id;
                $it->compl="Medium";
                $it->user_name=$request->user;
                $it->save();




             }





    }
}
return response()->json(['message' => 'done', 'status' => 200]);
    }}
