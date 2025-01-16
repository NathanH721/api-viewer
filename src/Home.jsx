import { useState } from 'react'
import './Home.css'

function Home() {
  const [apiLink, setApiLink] = useState("https://financialmodelingprep.com/api/v3/income-statement/AAPL?period=annual&apikey=owU3SIezQcGMLE1FtTwxiYg2fMqGVTEY");
  const [data, setData] = useState();
  const [displayData, setDisplayData] = useState();
  const [apiErr, setApiErr] = useState("");
  const [sortBy, setSortBy] = useState([ "date" , "asc" ]); // [Sort by, asc or desc]
  const [filterBy, setFilterBy] = useState([ "None", "None", "None" ]); // [Filter by, low value, high value] If low or high value is "None", sort only by provided value
  const [modalOpen, setModalOpen] = useState(false);

  // === FETCH AND STORE API DATA === //
  const fetchData = () => {
    fetch(apiLink)
    .then(response => {
      return response.json();
    })
    .then(returned => {
      setData(returned);
      confirmData();
    })
  };

  const updateDisplayData = () => {
    const newArray = data.map( (item) => {
      return item;
    });
    setDisplayData(newArray);
    console.log("DisplayData:");
    console.log(displayData);
  };

  const confirmData = () => {
    console.log(data);
    if (!(data === undefined)) {
      if ("Error Message" in data) {
        setApiErr(data["Error Message"]);
        console.log(apiErr);
        alert(`API Error: ${data}`);
      }
    }
  };

  // === DATA DISPLAY OPTIONS === //
  const sortFilterDisplay = () => {
    if (sortBy[0] === "date") {
      
      // Sort by Date
      if (sortBy[1] === "asc") {
        console.log("Sorting by date, ascending");
      }
      else if (sortBy[1] === "desc") {
        console.log("Sorting by date, descending");
      }
      else {
        alert("Cannot sort by date, " + sortBy[1]);
      }
    }

    // Sort by Revenue
    else if (sortBy[0] === "revenue") {
      if (sortBy[1] === "asc") {
        console.log("Sorting by revenue, ascending");
      } 
      else if (sortBy[1] === "desc") {
        console.log("Sorting by revenue, descending");
      }
      else {
        alert("Cannot sort by Revenue, " + sortBy[1]);
      }
    }

    // Sort by net income
    else if (sortBy[0] === "netIncome") {
      if (sortBy[1] === "asc") {
        console.log("Sorting by net income, ascending");
        sortDisplayData()
      }
      else if (sortBy[1] === "desc") {
        console.log("Sorting by net income, descending");
      }
      else {
        alert("Cannot sort by net income, " + sortBy[1]);
      }
    }

    // If invalid sort, alert and quit
    else {
      alert("Cannot sort by " + sortBy[0]);
      return;
    }

    // If no filter, no change
    if (filterBy[0] === "None") {
      console.log("No filter applied");
      return;
    }

    // Filter by date
    else if (filterBy[0] === "date") {
      return;
    }

    // Filter by revenue
    else if (filterBy[0] === "revenue") {
      console.log("Sorting by revenue, lower bound: " + filterBy[1] + " Upper bound: " + filterBy[2]);
      filterDisplayData();
    }

    // Filter by net income
    else if (filterBy[0] === "income") {
      return;
    }

    //If invalid filter, alert and quit
    else {
      alert("Cannot filter by" + filterBy[0]);
      return;
    }
  };

  const sortDisplayData = () => {
    return;
  }

  const filterDisplayData = () => {
    let newDisplay;

    // TODO: Filter by date
    if (filterBy[0] === "date") {
      if (filterBy[1] === "None") {
        newDisplay = displayData.filter(entry => entry.date <= filterBy[2]).map( (item) => { return item;} );
      }
      else if (filterBy[2] === "None") {
        newDisplay = displayData.filter(entry => entry.date >= filterBy[1]).map( (item) => { return item;} );
      }
      else {
        newDisplay = displayData.filter(
          entry => entry.date >= filterBy[1] && entry.date <= filterBy[2]
        ).map( (item) => { return item;} );
      }
    }

    // Filter by revenue
    else if (filterBy[0] === "revenue") {
      if (filterBy[1] === "None") {
        newDisplay = displayData.filter(entry => entry.revenue <= filterBy[2]).map( (item) => { return item;} );
      }
      else if (filterBy[2] === "None") {
        newDisplay = displayData.filter(entry => entry.revenue >= filterBy[1]).map( (item) => { return item;} );
      }
      else {
        newDisplay = displayData.filter(
          entry => entry.revenue >= filterBy[1] && entry.revenue <= filterBy[2]
        ).map( (item) => { return item;} );
      }
    }

    // Filter by net income
    else if (filterBy[0] === "netIncome") {
      if (filterBy[1] === "None") {
        newDisplay = displayData.filter(entry => entry.netIncome <= filterBy[2]).map( (item) => { return item;} );
      }
      else if (filterBy[2] === "None") {
        newDisplay = displayData.filter(entry => entry.netIncome >= filterBy[1]).map( (item) => { return item;} );
      }
      else {
        newDisplay = displayData.filter(
          entry => entry.netIncome >= filterBy[1] && entry.netIncome <= filterBy[2]
        ).map( (item) => { return item;} );
      }
    }
    console.log("New display data:");
    console.log(newDisplay);
    setDisplayData(newDisplay);
  }

  // === MODAL CONTROLS === //
  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  // === UPDATE TEXT BOX INFORMATION === //

  const handleTextChange = event => {
    const newLink = event.target.value;
    console.log(newLink);
  };

  // === ADD COMMAS TO LARGE NUMBERS === //

  function addCommas (num) {
    return num.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  }

  // === RENDER SCREEN === //

  return (
    <>
      <h1 className = "Header">Financial Modeling Prep Stock Viewer</h1>
      <input className = "LinkBox" onChange = { handleTextChange }/>
      <button onClick = { () => fetchData() }>Get Data</button>
      <button onClick = { () => confirmData() }>Log Data</button>
      <button onClick = { () => updateDisplayData() }>Show Data</button>
      <button onClick = { () => sortFilterDisplay() }>Sort and Filter</button>
      <div className = "displayBoard">
        {displayData != undefined  && (displayData.length > 0 && (
          <table>

            <thead>
              <tr className = "boardHeader">
                <th>Date</th>
                <th>Revenue</th>
                <th>Net Income</th>
                <th>Gross Profit</th>
                <th>EPS</th>
                <th>Operating Income</th>
              </tr>
            </thead>
          
            <tbody>
              {displayData.map((entry, index) => (
                <tr className = "boardRow" key = {index}>
                  <td>{entry.date}</td>
                  <td>{addCommas(entry.revenue)}</td>
                  <td>{addCommas(entry.netIncome)}</td>
                  <td>{addCommas(entry.grossProfit)}</td>
                  <td>{addCommas(entry.eps)}</td>
                  <td>{addCommas(entry.operatingIncome)}</td>
                </tr>
              ))}
            </tbody>

          </table>
        ))}
      </div>
    </>
  )
}

export default Home
