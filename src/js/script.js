const regexps = {
  name: '^[a-zA-Z]{2,500}',
  email: '^[a-zA-Z\\@]{5,500}',
  phone_number: '^[\\d]{10,12}',
  address: '',
  about_me: '[\\W\\w\\d\\s]{0,500}'
};
const forms = document.getElementById('form1');
const formsElement = document.getElementsByClassName('form-control');
const usersURL = 'http://localhost:3000/users';
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
    // formChecker(formsElement);
  },
  true
);

function formChecker(elem) {
  for (let i = 0; i < elem.length - 1; i++) {
    let nameElem = elem[i].name;
    if (elem[i].tagName === 'INPUT' || elem[i].tagName === 'TEXTAREA') {
      let pattern = new RegExp(regexps[nameElem]);
      let isValid = elem[i].value.match(pattern);

      if (isValid !== null) {
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
      let selectValue = elem[i][elem[i].selectedIndex].value;

      if (selectValue > 0) {
        formData[nameElem] = selectValue;
      } else {
        elem[i].classList.add('error');
        elem[i].focus();
        return false;
      }
    }
  }
  formData.createdAt = new Date().getTime();
  formData.id = + lacation.users.length;
}

submit[0].addEventListener('click', function(evt) {
  evt.preventDefault();
  formChecker(formsElement);
  console.log(formData);
});

function renderElement(tag, value, id) {
  const tagName = document.getElementById('' + tag);
  tagName.innerHTML += `<option name=${value} value=${id}>${value}</option>`;
}

function getStates(tagName) {
  const oReq = new XMLHttpRequest();
  const responseData = {};
  oReq.addEventListener('load', reqListener);
  oReq.open('GET', 'http://localhost:3000/' + tagName);
  oReq.send();

  function reqListener() {
    if (oReq.status !== 200) {
      console.log('Error ', oReq.status + ': ' + oReq.statusText);
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

function postUsers(user, url) {
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
}
