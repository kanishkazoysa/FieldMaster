// FenceDetailsTemplate.js

export const getFenceDetailsHtml = (fenceType, numberOfSticks, postSpace, PostSpaceUnit, data1) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>App Details</title>
      <style>
          body {
              margin: 0;
              padding: 0;
          }
          .container {
              max-width: 800px;
              margin: 10px auto;
              padding: 20px;
              border: 5px solid #ccc;
          }
          .logo-container {
              display: flex;
              align-items: center;
              background-color: #fff;
          }
          .App-logo {
              margin-left: 5px;
          }
          .logo-text {
              margin-left: 70px;
              margin-top: 40px;
              color: #007BFF;
              font-size: 40px;
              font-family: sans-serif;
          }
          .Description-text1 {
              margin-top: 50px;
          }
          .Description-text {
              width: 100%;
              border-radius: 12px;
          }
          .logo {
              max-width: 150px;
              margin-bottom: 20px;
          }
          h1, p {
              margin: 10px 0;
          }
      </style>
  </head>
  <body>
      <div class="container">
          <div class="logo-container">
              <img class="App-logo" src="https://s3-alpha-sig.figma.com/img/0402/a49c/79d6086f4997c8eeba9d160fa7b869ed?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bT1vIy5S2dJUVkDABMFzScUJX5Iws21riRotOmacpZl1bhA8yPqJLJNeF5-wc8kBpk4jyD81fp-8bBYVTVwO6cplKgVuos2HMwvvf3vA5yh0td6H5z5AqoKTIcV8sy6pPF9DsiJmzHLRn5QjfYk~o8ow0bxsqErV5jJfH1S4~4yDdn6O54pXqPBjgydtWdDEhlCUXmzQo1ZozcGTapshAhnzm3YNdYd5leb1AwnPhuURNJ7YO80jOE3QN3pqNxv2XESHYnKDOilaPqvuVKVTyG3AV2mxdnyg-U8iEkRBgQJNDH0YjrWMKTRb3GatXSa5KVA9zQDL5JLoTn9DOvqa-Q__" alt="Your App Logo" class="logo" width="130">
              <h1 class="logo-text">Field Master</h1>
          </div>
          <h2 class="Description-text1">Description</h2>
          <div class="Description-text">
              <p>Welcome to FieldMaster, your ultimate solution for accurately measuring, mapping, and managing land plots for various agricultural purposes. Our application is designed to assist plantation owners, farmers, and land surveyors in optimizing land utilization and planning agricultural activities with precision and ease.</p>
          </div>
          <h2>Map Information</h2>
          <ul>
              <li>Perimeter = 1.5 km</li>
              <li>Area = 100 accres</li>
          </ul>

          <h2>Fence Details</h2>

          <ul>
          <li>Fence Typpe = ${fenceType}</li>
          
          <li> Total Stick Amount = ${numberOfSticks}</li>
          <li> Post Space = ${postSpace} ${PostSpaceUnit}</li>
          <li> Gate values  <ul>
          ${data1.map((value) => `<li>${value}</li>`).join("")}
          </ul></li>
          
          </ul>

      </div>
  </body>
  </html>
`;
