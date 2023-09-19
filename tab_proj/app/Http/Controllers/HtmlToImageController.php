<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\File;
use Symfony\Component\Process\Process;
use Dompdf\Dompdf;
use Spatie\PdfToImage\Pdf;
use Knp\Snappy\Image;
use Illuminate\Support\Facades\Response;

class HtmlToImageController extends Controller
{
    public function convertHtmlToImage()
    {
        $html = '
           <h1>Base64 Image</h1>
           <div>
              <h1>React Tutorial</h1>
             
           </div>
        ';

        $snappy = new Image('"C:/Program Files/wkhtmltopdf/bin/wkhtmltoimage"'); // Provide the path to wkhtmltoimage binary
        $snappy->setOption('format', 'png'); // Set the desired output format
        
        // Convert HTML to image
        $imageData = $snappy->getOutputFromHtml($html);
        
        // Save the image locally
        $imagePath = public_path('images/screenshot.png'); // Path to save the image
        file_put_contents($imagePath, $imageData);
        
        // Return the image URL as response
        $imageUrl = asset('images/screenshot.png'); // Generate a URL for the saved image
        return response()->json(['image_url' => $imageUrl]);
    }
}
