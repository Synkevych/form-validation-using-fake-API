
// JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}');

// using for parce data from JSON to object
const form = document.getElementById('form1');
const input  = document.getElementsByClassName('form-control');
const country = document.getElementById('country');

function renderElement(tag, value, optionId){
    const tagName = document.getElementById(''+tag);
    tagName.innerHTML += `<option name=${optionId}>${value}</option>`;
}


function getStates(tagName){
    const oReq = new XMLHttpRequest();
    const states = {};
    oReq.addEventListener("load", reqListener);
    oReq.open("GET", "http://localhost:3000/" + tagName);
    oReq.send();

    function reqListener () {
        console.log("result:", JSON.parse(this.responseText)); // responseText -- текст ответа.
        if (oReq.status !== 200) {
            // обработать ошибку
            console.log( "Error ",oReq.status + ': ' + oReq.statusText ); // пример вывода: 404: Not Found
          } else {
            // вывести результат
            this.states = JSON.parse(this.responseText);
            this.states.map(state => {
                renderElement(tagName, state.name, state.id);
                console.log(state.name);
            })
           // console.log('Response Text', oReq.responseText ); // responseText -- текст ответа.
           // console.log('States', this,states); // responseText -- текст ответа.
        }
      }
}

getStates('states');
getStates('countries');
getStates('cities');


class FormChecker{
    constructor(sSelector){
 /// знайти и прописати в форму sSelector
      this.sSelector = sSelector;
      this.textFields = document.getElementsByClassName(".form-control"); // массив текстових полей
      this.errorMesage = document.getElementsByClassName(".b-form__message_error"); // див с сообщением об ошибке
      //метод проверки всех полей
      // this.elem.submit(this.checkTextFields.bind(this));
      //на текстовие поля на событе потеря фокуса назначаем метод проверки одного поля
      //this.textFields.blur(this.checkTextField.bind(this));
    }
    getname(){
        console.log(this.sSelector);
    }
    checkTextFields(event){
        event.preventDefault();
        let formError = false,
            f = this;
        this.textFields.each(function(){
          console.log("this ", this, );
           let currentTextfield = $(this)
           ,textfieldError = f.checkTextField(currentTextfield)
           ;
            if(textfieldError){
                formError = true;
            };
        });
        let effect = formError ? "slideDown" : "slideUp";
        f.errorMesage[effect]();
    }

    //метод проверки одного поля
    checkTextField(textField){
        /* 
        this поле которое потеряло фокус (метод  f.checkTextField был вызван в момент, когда пользователь перешел на следующее поле)
        textField - поле из масива полей которое нужно проверить при нажатия пользователем кнопки формы (метод f.checkTextField был вызван из цикла для перебора всех полей формы метода f.checkTextFields)
    */
        let currentTextField = textField.length ? textField : $(event.target),
       // console.log('currentTextField = '+currentTextField);

        currentTextFieldContent = currentTextField.val(),
     //   // console.log('currentTextFieldContent : '+currentTextFieldContent);
        settings = {
           regexps : {
               "name": "^[a-zA-Zа-яА-Я\\-]{2,20}$" // буквы разн регистр, пробел, -
           ,   "brand": "^[a-zA-Z]{2,20}$" // лат буквы 2,20
           ,   "price": "^[0-9]{1,5}(\\.[0-9]{1,2})?$" // цена
           ,   "description": "^.+$" // любые символы (без пер строки) от 1 и более
       }
     },
       currentRegExp = new  RegExp(settings["regexps"][currentTextField.attr("name")]),

        textfieldError =! currentTextFieldContent.match(currentRegExp);

        currentTextField.toggleClass("b-textfield_error", textfieldError);

        console.log( $(event.target).attr("class"));
       return textfieldError;
    }
}
let f = new FormChecker("#form1");
console.log(f.sSelector);

// class getFormValue{
//     constructor(){

//     }
// }

// class FackeAPI {
//     constructor(reqAnswer,name,email,phone_number,address,about_me,country_id,state_id,city_id,){
//         this.reqAnswer = reqAnswer;
//         this.name = name;
//         this.email = email;
//         this.phone_number = phone_number;
//         this.address = address;
//         this.about_me = about_me;
//         this.country_id = country_id;
//         this.state_id = state_id;
//         this.city_id = city_id; 
//     }
//     getUser(){
//         const oReq = new XMLHttpRequest();
//         oReq.addEventListener("load", reqListener);
//         oReq.open("GET", "http://localhost:3000/users");
//         oReq.send();

//         function reqListener () {
//             console.log("result:", JSON.parse(this.responseText)); // responseText -- текст ответа.
//             if (oReq.status !== 200) {
//                 // обработать ошибку
//                 console.log( "Error ",oReq.status + ': ' + oReq.statusText ); // пример вывода: 404: Not Found
//               } else {
//                 // вывести результат
//                 this.reqAnswer = this.responseText;
//                 console.log('Response Text', oReq.responseText ); // responseText -- текст ответа.
//             }
//           }
//     }
// }
// let newUser = new FackeAPI();
// newUser.getUser();
// console.log(newUser.reqAnswer);
