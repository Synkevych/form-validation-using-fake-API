const regexps = {
  name: '[a-zA-Z\\s]{2,500}',
  email: '[\\da-zA-Z\\@\\.]{5,500}',
  phone_number: '^[\\d]{10,12}',
  address: '[\\W\\w\\d\\s]{0,500}',
  about_me: '[\\W\\w\\d\\s]{0,500}'
};
const forms = document.getElementById('form1');
const formsElement = document.getElementsByClassName('form-control');
const apiUrl = 'http://localhost:3000/';
const submit = document.getElementsByClassName('btn');
const lacation = {
  countries: '',
  states: '',
  cities: '',
  users: ''
};
let formData = {
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

for (let i = 0; i < forms.length; i++) {
  forms[i].setAttribute('novalidate', true);
}

// Listen to all blur events
document.addEventListener(
  'blur',
  function(event) {
    console.log(event);
    event.target.classList.remove('error');
  },
  true
);

function formChecker(elem) {
  for (let i = 0; i < elem.length - 1; i++) {
   // elem[i].classList.remove('error');
    let nameElem = elem[i].name;
    if (elem[i].tagName === 'INPUT' || elem[i].tagName === 'TEXTAREA') {
      let pattern = new RegExp(regexps[nameElem]);
      let isValid = elem[i].value.match(pattern);

      if (isValid !== null && isValid[0] == isValid.input) {
        console.log('valid', pattern, nameElem, isValid);
        formData[nameElem] = elem[i].value;
      } else {
        console.log('not valid', nameElem, isValid);
        elem[i].classList.add('error');
        elem[i].focus();
        return false;
      }
    }
    if (elem[i].tagName === 'SELECT') {
      let selectValue = elem[i][elem[i].selectedIndex].text;
      console.log(elem[i][elem[i].selectedIndex].text);

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
  formData.id = +lacation.users.length;
  return formData;
}

submit[0].addEventListener('click', function(evt) {
  evt.preventDefault();
  if (!!formChecker(formsElement)){
  //  sendUsers(formChecker(formsElement), apiUrl + 'users');
  }
  console.log(formData);
});

function renderElement(tag, value, id) {
  const tagName = document.getElementById('' + tag);
  tagName.innerHTML += `<option value=${id}>${value}</option>`;
}

function renderResult(value,message){
    const tagName = document.getElementById('container');
    tagName.innerHTML += `<div class="result-message">${value}
    ${message}
    </div>`;
}

function getStates(tagName) {
  const oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', apiUrl + tagName);
  oReq.send();

  function reqListener() {
    if (oReq.status !== 200) {
      console.log('Error ', oReq.status + ': ' + oReq.statusText);
      renderResult("Error");
    } else {
      // вывести результат
      lacation[tagName] = JSON.parse(this.responseText);
      if (tagName != 'users') {
        lacation[tagName].map(state => {
          renderElement(tagName, state.name, state.id);
        });
      }
    }
  }
}

getStates('states');
getStates('countries');
getStates('cities');
getStates('users');
console.log(lacation);

function sendUsers(user, url) {
  console.log(user, url);
  var json = JSON.stringify(user);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
  xhr.onload = function() {
    var users = JSON.parse(xhr.responseText);
    if (xhr.readyState == 4 && xhr.status == '200') {
      console.table(users);
    } else {
      console.error(users);
    }
  };
  xhr.send(json);
  getStates('users'+user.id);
}
