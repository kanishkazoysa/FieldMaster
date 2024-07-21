export const effortOutputPrint = (
  Perimeter,
  Area,
  laborCount,
  workHours,
  effortOutput,
  weedEffort,
  plantEffort,
  stoneEffort,
  workDays
) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>App Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 800px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .logo-container {
            display: flex;
            align-items: center;
            background-color: #007BFF;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }

        .App-logo {
            max-width: 100px;
            margin-right: 20px;
        }

        .logo-text {
            color: #fff;
            font-size: 36px;
            font-family: 'Product Sans', sans-serif; 
        }

        Description-text1 {
          margin-top: 20px;
          color: #333;
          font-size: 24px;
          border-bottom: 2px solid #007BFF;
          padding-bottom: 10px;
          padding:10px;
          margin: 5px 0;
        }

        .Description-text {
            background: #f1f1f1;
              margin: 5px 0;
              padding: 10px;
              border-radius: 4px;
        }
        h1,h2, p {
            margin: 10px 0;
      
        }
        ul {
             list-style-type: none;
             padding: 0;
        }
        ul li {
              background: #f1f1f1;
              margin: 5px 0;
              padding: 10px;
              border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo-container">
            <h1 class="logo-text">Field Master</h1>
        </div>
        <h2 class="Description-text1">Description</h2>
        <div class="Description-text">
            <p>Welcome to FieldMaster, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
        </div>
        <h2>Map Information</h2>
        <ul>
            <li>Perimeter = ${Perimeter}</li>
            <li>Area = ${Area}</li>
        </ul>

        <h2>Clear land Details</h2>

        <ul>
        <li> Weed Effort Count = ${parseFloat(weedEffort).toFixed(2)}</li>
        <li> Tree Effort Count = ${parseFloat(plantEffort).toFixed(2)}</li>
        <li> Stone Effort Count = ${parseFloat(stoneEffort).toFixed(2)}</li>
        <li> Total Effort Count = ${effortOutput} hrs</li>
        <li> Total number of days = ${workDays}</li>
        
        <li> Number of labours = ${laborCount} </li>
        <li> Work hours per day = ${workHours} </li>
        
        </ul>

    </div>
</body>
</html>

`;
