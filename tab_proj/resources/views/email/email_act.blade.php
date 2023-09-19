<!DOCTYPE html>
<html>

<head>
    <title>Activity Log Report</title>

    <style>
        /* Reset some default styles */
        body {
            margin: 0;
            padding: 0;
            background-color: #f5f5f5;
            font-family: Arial, sans-serif;
        }

        /* Container */
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }

        /* Header */
        .header {
            text-align: center;
        }

        .header h1 {
            font-size: 24px;
            color: #333;
            margin: 0;
        }

        /* Content */
        .content {
            margin-top: 20px;
        }

        .content h2 {
            font-size: 20px;
            color: #333;
            margin: 0;
        }

        /* Footer */
        .footer {
            text-align: center;
            margin-top: 20px;
        }

        /* Additional Styling */
        p {
            font-size: 16px;
            line-height: 1.5;
            color: #555;
        }
    </style>

</head>

<body>

    <div class="container">

        <div class="header">
            <h1>Activity Log Report</h1>
        </div>

        <div class="content">
            <h2>User {{ $name }} has just performed a {{ $activ }} on {{ $project }}.</h2>
        </div>

        <div class="footer">
            <p>If you have any questions, please contact us at support@example.com.</p>
        </div>

    </div>

</body>

</html>