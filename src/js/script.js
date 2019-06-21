const regexps = {
  name: '[a-zA-Z\\s]{1,500}',
  email: '[^@]+@[^.]+..+',
  phone_number: '^[\\d]{10,12}',
  address: '[\\W\\w\\d\\s]{1,500}',
  about_me: '[\\W\\w\\d\\s]{1,500}'
};
const lacation = {
  countries: '',
  states: '',
  cities: '',
  users: ''
};
const formData = {
  id: '',
  name: '',
  email: '',
  country_id: '',
  state_id: '',
  city_id: '',
  phone_number: '',
  address: null,
  about_me: null,
  createdAt: null
};
const forms = document.getElementById('form1');
const formsElement = document.getElementsByClassName('form-control');
const apiUrl = 'http://localhost:3000/';
const submit = document.getElementsByClassName('btn');

document.addEventListener(
  'blur',
  function(event) {
    setTimeout(() => {
      event.target.classList.remove('error');
    }, 1000);
  },
  true
);

function formChecker(elem) {
  for (let i = 0; i < elem.length - 1; i++) {
    let nameElem = elem[i].name;

    if (elem[i].tagName === 'INPUT' || elem[i].tagName === 'TEXTAREA') {
      let pattern = new RegExp(regexps[nameElem]);
      let isValid = elem[i].value.match(pattern);

      if (isValid !== null && isValid[0] == isValid.input) {
        formData[nameElem] = elem[i].value;
      } else {
        if (
          !(
            nameElem == 'address' ||
            (nameElem == 'about_me' && elem[i].value == '')
          )
        ) {
          elem[i].classList.add('error');
          elem[i].focus();
          return false;
        }
      }
    }
    if (elem[i].tagName === 'SELECT') {
      let selectValue = elem[i][elem[i].selectedIndex].text;

      if (elem[i][elem[i].selectedIndex].value > 0) {
        formData[nameElem] = selectValue;
      } else {
        elem[i].classList.add('error');
        elem[i].focus();
        return false;
      }
    }
  }
  formData.createdAt = new Date().getTime();
  formData.id = +lacation.users.length+1;
  return formData;
}

submit[0].addEventListener('click', function(evt) {
  evt.preventDefault();
  if (!!formChecker(formsElement)) {
    sendUsers(formChecker(formsElement), apiUrl + 'users');
  }
});

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
      if (tagName != 'users') {
        lacation[tagName].map(state => {
          renderElement(tagName, state.name, state.id);
        });
      }
    }
  }
}

function renderElement(tag, value, id) {
  const tagName = document.getElementById('' + tag);
  tagName.innerHTML += `<option value=${id}>${value}</option>`;
}

getStates('states');
getStates('countries');
getStates('cities');
getStates('users');

function sendUsers(user, url) {
  var json = JSON.stringify(user);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    if (xhr.readyState !== 4 && xhr.status !== '200') {
      alert(
        'Sorry 😔, we had difficulties with uploading data to the server, try again later ... 😉'
      );
    }
  };
  xhr.send(json);
  alert('Your data has been sent!');
}