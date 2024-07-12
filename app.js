const form=document.getElementById('Search-form');
const result = document.querySelector('#table-result .table-group-divider');
const successAlert = document.getElementById('success');
const failureAlert = document.getElementById('failure');

success.style.display='none';
failure.style.display='none';
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'X-API-KEY': '5e1jpgs4XpHMtmSWTrsitFMh8c8dUvT/qBbLlaj9vKk='
    }
  };
  
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const ctype=form.elements.coinType.value;
    console.log(ctype);


    fetchprice(ctype);
});
async function fetchprice(ctype) {
    try {
        const response = await fetch(`https://openapiv1.coinstats.app/coins/${ctype}?currency=inr`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        displayData(data);
        showAlert(successAlert);
    } catch (error) {
        console.error('Fetch error:', error);
        showAlert(failureAlert);
    }
}

function displayData(data) {
    result.innerHTML = `
               <tr>
            <th scope="row">1</th>
            <td>Price</td>
            <td>${data.price}</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>Volume</td>
            <td>${data.volume}</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>Change (1h)</td>
            <td>${data.priceChange1h}%</td>
        </tr>
        <tr>
            <th scope="row">4</th>
            <td>Change (1d)</td>
            <td>${data.priceChange1d}%</td>
        </tr>
        <tr>
            <th scope="row">5</th>
            <td>Change (1w)</td>
            <td>${data.priceChange1w}%</td>
        </tr>
        <tr>
            <th scope="row">6</th>
            <td>Market Cap</td>
            <td>${data.marketCap}</td>
        </tr>
        <tr>
            <th scope="row">7</th>
            <td>Available Supply</td>
            <td>${data.availableSupply}</td>
        </tr>
        <tr>
            <th scope="row">8</th>
            <td>Total Supply</td>
            <td>${data.totalSupply}</td>
        </tr>
        <tr>
            <th scope="row">9</th>
            <td>Reddit URL</td>
            <td><a href="${data.redditUrl}" target="_blank">${data.redditUrl}</a></td>
        </tr>
        <tr>
            <th scope="row">10</th>
            <td>Website URL</td>
            <td><a href="${data.websiteUrl}" target="_blank">${data.websiteUrl}</a></td>
        </tr>
        <tr>
            <th scope="row">11</th>
            <td>Twitter URL</td>
            <td><a href="${data.twitterUrl}" target="_blank">${data.twitterUrl}</a></td>
        </tr>
        <tr>
            <th scope="row">12</th>
            <td>Contract Address</td>
            <td>${data.contractAddress}</td>
        </tr>
    `;
}

function showAlert(alertElement) {
    alertElement.classList.remove('d-none');
    setTimeout(() => {
        alertElement.classList.add('d-none');
    }, 3000);
}