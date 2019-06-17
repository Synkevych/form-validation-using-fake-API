// JSON.parse('{"1": 1, "2": 2, "3": {"4": 4, "5": {"6": 6}}}');
// using for parce data from JSON to object 
class FackeAPI {
    constructor(reqAnswer,name,email,phone_number,address,about_me,country_id,state_id,city_id,){
        this.reqAnswer = reqAnswer;
        this.name = name;
        this.email = email;
        this.phone_number = phone_number;
        this.address = address;
        this.about_me = about_me;
        this.country_id = country_id;
        this.state_id = state_id;
        this.city_id = city_id;
    }

    getUser(){
        const oReq = new XMLHttpRequest();
        oReq.addEventListener("load", reqListener);
        oReq.open("GET", "http://localhost:3000/users");
        oReq.send();

        function reqListener () {
            console.log("result:", JSON.parse(this.responseText)); // responseText -- текст ответа.
            if (oReq.status !== 200) {
                // обработать ошибку
                console.log( "Error ",oReq.status + ': ' + oReq.statusText ); // пример вывода: 404: Not Found
              } else {
                // вывести результат
                this.reqAnswer = this.responseText;
                console.log('Response Text', oReq.responseText ); // responseText -- текст ответа.
            }
          }
    }
}
let newUser = new FackeAPI();
newUser.getUser();
console.log(newUser.reqAnswer);
