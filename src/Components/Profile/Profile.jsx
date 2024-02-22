<html
  key="1"
  lang="en"
>
  <head>
    <meta charSet="UTF-8" />
    <meta
      content="width=device-width, initial-scale=1.0"
      name="viewport"
    />
    <title>
      User Profile
    </title>
    <link
      href="styles.css"
      rel="stylesheet"
    />
  </head>
  <body>
    <div className="container">
      <h1>
        User Profile
      </h1>
      <div className="profile-info">
        <h2>
          User Details
        </h2>
        <p>
          <strong>
            Full Name:
          </strong>
          {' '}John Doe
        </p>
        <p>
          <strong>
            Address:
          </strong>
          {' '}123 Main St, City, ST 12345
        </p>
      </div>
      <button onclick="updateMyInformation()">
        Update My Information
      </button>
      <div id="recentOrders">
        <h2>
          Fuel Quote History
        </h2>
      </div>
      <p
        id="noOrdersMessage"
        style={{
          display: 'none'
        }}
      >
        You have made no fuel requests. If you would like to request fuel, click the button below.
      </p>
      <button onclick="redirectToFuelQuoteForm()">
        Request Fuel
      </button>
    </div>
    <script src="script.js" />
  </body>
</html>