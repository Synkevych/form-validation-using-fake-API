const root = document.getElementById('users');
const apiUrl = 'http://localhost:3000/';
const lacation = {
    users: ''
  };

function getStates(tagName) {
    const oReq = new XMLHttpRequest();
    oReq.addEventListener('load', reqListener);
    oReq.open('GET', apiUrl + tagName);
    oReq.send();
  
    function reqListener() {  
      if (oReq.status !== 200) {
        alert(
          'Sorry 😔, we had difficulties with downloading data from server, try again later 😉.'
        );
      } else {
          lacation[tagName] = JSON.parse(this.responseText);
          console.log(lacation[tagName]);
          lacation[tagName].map(user => {
            renderElement(tagName, user);
          });
      }
    }
  }
  
  function renderElement(tag, user) {
      console.log("user",user);
//      console.log("root",root);
      root.innerHTML +=
      `<div class="${user}">
        <p>Name: ${user.name}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone_number}</p>
        <p>Country: ${user.country_id}</p>
        <p>State: ${user.state_id}</p>
        <p>City: ${user.city_id}</p>
        <p>Addres: ${user.address}</p>
        <p>About: ${user.about_me}</p>
        <hr>
      </div>`;

  }
  
  getStates('users');