<?php

namespace App\Http\Controllers;
use Illuminate\Support\HtmlString;
use Illuminate\Http\Request;
use PhpOffice\PhpWord\Element\Image as PhpWordImage; // Alias for PhpWord Image class
use PhpOffice\PhpWord\TemplateProcessor;
use App\Models\Anomalie; // Replace with your actual model
use App\Models\Project; // Replace with your actual model
use App\Models\Customer; // Replace with your actual model
use Knp\Snappy\Image as SnappyImage; // Alias for Knp\Snappy Image class
use Illuminate\Support\Facades\File;

class WordDocumentController extends Controller
{
    public function generateWordDocument(Request $request)
    {
        $docxDirectory = public_path('storage');
$docxs = glob($docxDirectory . '/*.docx'); // Get a list of all PNG files in the directory

foreach ($docxs as $docx) {
    File::delete($docx); // Delete each docx file
}

        $project_id = $request->project_id; // Get the 'id' from the POST request
    // Fetch data from the database based on the received 'project_id'
    $project =Project::find($project_id);
    $customer =Customer::find($project->customer_id);

    $data = Anomalie::where('project_id', $project_id)
    ->where('validation', 'Yes')
    ->get(); // Replace with your actual model and data retrieval logic

    $dataLength = count($data);

    // Check if the provided 'project_id' matches the 'project_id' associated with the anomalies
    $userCanAccessData = $data->isEmpty() ? false : true;

    if (!$userCanAccessData) {
        return response()->json(['message' => 'Unauthorized access.']);
    }

        // Load the Word template
       // $templatePath = public_path('WebReportTMPLATE.docx');
       $templatePath1 = public_path('test.docx');
       $templateProcessor1 = new TemplateProcessor($templatePath1);
       $dataLength = $data->count();
       $templateProcessor1->cloneBlock('block_name', $dataLength, true, true);
       $outputPath1 = public_path('storage/test1.docx');
       $templateProcessor1->saveAs($outputPath1);






        $templatePath = public_path('storage/test1.docx');
        $templateProcessor = new TemplateProcessor($templatePath);



        // Iterate through the data and replace placeholders in the template
        $values = [];
        $trieCounter = 1;
        // Sort the data by score in descending order
        $data = $data->sortByDesc('score');



        foreach ($data as $item) {
            $imagePath = public_path('images/'.$item->id.'.png'); // Path to save the image
            if (!File::exists($imagePath)) {
            $snappy = new SnappyImage('"C:/Program Files/wkhtmltopdf/bin/wkhtmltoimage"'); // Provide the path to wkhtmltoimage binary
            $snappy->setOption('format', 'png'); // Set the desired output format

            // Convert HTML to image
            $imageData = $snappy->getOutputFromHtml($item->preuve);

            // Save the image locally
            $imagePath = public_path('images/'.$item->id.'.png'); // Path to save the image
            file_put_contents($imagePath, $imageData);

            // Return the image URL as response
            $imageUrl = asset('images/'.$item->id.'.png'); // Generate a URL for the saved image
            }


        }


        $me=0;
        $l=0;
        $m=1;
        $h=0;
        $c=0;
        $n=0;
        foreach ($data as $item) {
            $trieValue = str_pad($trieCounter, 3, '0', STR_PAD_LEFT);

            $trieCounter++;
            $n++;
            $values[] = [
                'id' => $n,
                'name' => $item->name,
                'element_imp' => $item->element_imp,
                'description' => self::cleanHtmlTag($item->description),
                'risque' => $item->risque,
                'score_cvss' => $item->score_cvss,
                'score' => $item->score,
                'AV' => $item->AV,
                'AC' => $item->AC,
                'UI' => $item->UI,
                'PR' => $item->PR,
                'S' => $item->S,
                'C' => $item->C,
                'I' => $item->I,
                'A' => $item->A,
                'ref' => $item->ref,
                'preuve' => $item->preuve,
                'recommendation' => $item->recommendation,
                'image' => $item->image,
                'trie' => $trieValue,
                'compl'=>$item->compl,
            ];






            $templateProcessor->setValue('id' .'#'. $m, $item->id);
            $templateProcessor->setValue('name' .'#'. $m, $item->name);
            $templateProcessor->setValue('element_imp' .'#'. $m, $item->element_imp);
            $templateProcessor->setValue('description' .'#'. $m, self::cleanHtmlTag($item->description));
           // echo $item->description;
            echo ">>>>>>\n";
       //     echo self::cleanHtmlTag($item->description)));

            echo "||||||\n";
            $templateProcessor->setValue('risque' .'#'. $m, self::cleanHtmlTag($item->risque));
            $templateProcessor->setValue('score_cvss' .'#'. $m, $item->score_cvss);
            $templateProcessor->setValue('score' .'#'. $m, $item->score);
            $templateProcessor->setValue('AV' .'#'. $m, $item->AV);
            $templateProcessor->setValue('AC' .'#'. $m, $item->AC);
            $templateProcessor->setValue('UI' .'#'. $m, $item->UI);
            $templateProcessor->setValue('PR' .'#'. $m, $item->PR);
            $templateProcessor->setValue('S' .'#'. $m, $item->S);
            $templateProcessor->setValue('C' .'#'. $m, $item->C);
            $templateProcessor->setValue('I' .'#'. $m, $item->I);
            $templateProcessor->setValue('A' .'#'. $m, $item->A);
            if($item->ref===null){
                $templateProcessor->setValue('ref' .'#'. $m, "");
            }else {
                $templateProcessor->setValue('ref' .'#'. $m,self::cleanHtmlTag( $item->ref));
            }

            $templateProcessor->setValue('image' .'#'. $m, $item->image);
            $templateProcessor->setValue('recommendation' .'#'. $m,  self::cleanHtmlTag($item->recommendation));
            $templateProcessor->setValue('trieValue' .'#'. $m, $trieValue);


             // Assuming $item->preuve contains the image file name
        $imageFileName = $item->id;
        $imagePath = public_path('images/' . $imageFileName . '.png'); // Construct the image path

        $templateProcessor->setImageValue('preuve' .'#'. $m, $imagePath);


            $m++;




if($item->image==='Low' || $item->image==='Faible'){
    $l++;
}else if($item->image==='Medium' || $item->image==='Moyen'){
    $me++;
}else if($item->image==='High' || $item->image==='Élevé' ){
    $h++;
}else if($item->image==='Critical' || $item->image==='Critique'){
    $c++;
}else if($item->image==='None' || $item->image==='' ){
    $l++;

            }
        }
$templateProcessor->setValue('critique', $c);
$templateProcessor->setValue('majeur', $h);
$templateProcessor->setValue('important', $me);
$templateProcessor->setValue('mineur', $l);
$templateProcessor->setValue('all',  $dataLength);
$templateProcessor->setValue('SN',  $customer->SN);
$templateProcessor->setValue('LN',  $customer->LN);
$imageData = file_get_contents($customer->Logo);
$localImagePath = public_path('images/logo.png'); // Specify the local path to save the image
file_put_contents($localImagePath, $imageData);
$templateProcessor->setImageValue('icon', $localImagePath);



$templateProcessor->setValue('PRJ',  $project->Nom);
$templateProcessor->setValue('Y',  $project->year);
$templateProcessor->setValue('URL',  $project->URL);
$templateProcessor->setValue('DESC',  $project->Description);

$level = 'Insatisfaisant'; // If Critical or High vulnerabilities are present
if ($c===0 && $h===0 ) {
    $level = 'satisfaisant';
}

$templateProcessor->setValue('level', $level);
$todayDate = date('d/m/Y'); // Format: Day/Month/Year (e.g., 16/08/2023)

$templateProcessor->setValue('date', $todayDate);
       $templateProcessor->cloneRowAndSetValues('id', $values);

   // Generate a unique filename for the output document
   $outputFileName = $customer->SN . "_" . $project->Nom. $project->year . '_WebAppPentestReport.docx';


   /* $userDownloadsDirectory = public_path('files/'); */





// Delete all image files in the public/images directory
$imageDirectory = public_path('images');
$images = glob($imageDirectory . '/*.png'); // Get a list of all PNG files in the directory

foreach ($images as $image) {
    File::delete($image); // Delete each image file
}


$outputPath = public_path('storage/' . $outputFileName);
$templateProcessor->saveAs($outputPath);

// Return the download link or file path in the API response
return response()->json(['download_link' => asset('storage/' . $outputFileName)]);
        }


        public static function cleanHtmlTag ($string)
        {
            return self::cleanNewLineProblem( strip_tags( str_replace("<br/>","\n",htmlspecialchars_decode(html_entity_decode($string)))));

        }

   public static function cleanNewLineProblem ($string)
   {
       $pattern1 = "/([[:punct:]]+ *)(\n)+/";
//		$pattern11 = "/([[:punct:]]+ *)(\{\{1\}\})+/";

       $pattern2 = "/(\n)+( *-)/";
//		$pattern21 = "/(\{\{1\}\})+( *-)/";

       $pattern3 = "/(\n)+/";
//		$pattern31 = "/(\{\{1\}\})+/";

       $replacement = "</w:t></w:r><w:r><w:br/><w:t>";
       $string = htmlspecialchars($string);
       $string = preg_replace($pattern1, '${1}'.$replacement, $string);
      // $string = preg_replace($pattern11, '${1}'.$replacement, $string);
       $string = preg_replace($pattern2, $replacement.'${2}', $string);
    //   $string = preg_replace($pattern21, $replacement.'${2}', $string);


     //  $string = preg_replace( $pattern31 , " ", $string);


       $string = preg_replace('/[\x00-\x1F\x7F]/u', '', $string);
       return $string;
   }
}
