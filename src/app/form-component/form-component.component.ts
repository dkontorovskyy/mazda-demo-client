import {Component, OnInit, AfterViewInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response, Http, Headers, RequestOptions} from "@angular/http";
import {MdSnackBar} from "@angular/material";
import {SpeechRecognitionService} from "../speech-service/speach-recognition.service";

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit, AfterViewInit {

  private speechForm: FormGroup;
  private speechData: string = '';
  private showSearchButton: boolean = true;
  private myGreatForm: FormGroup;
  private play: boolean = false;
  private formIsActive: boolean = true;
  private list: boolean = false;
  private firstButton: boolean = false;
  private secondButton: boolean = false;
  private map: boolean = false;
  private types: any[] = [
    {type: 'food', name: 'Food'},
    {type: 'museum', name: 'Museum'},
    {type: 'sport', name: 'Sport'},
    {type: 'outdoor', name: 'Outdoor'},
  ];

  private selectList: any[];
  private serverResponse: any;
  private disctance = {first: {time: 5, distance: 0.8}, second: {time: 12, distance: 4}};

  constructor(private fb: FormBuilder, private http: Http, private snackbar: MdSnackBar, private speechRecognitionService: SpeechRecognitionService) {
  }

  ngOnInit() {
    this.speechForm = this.fb.group({
      speechData: ''
    });
    this.myGreatForm = this.fb.group({
      type: [''],
      query: ['', Validators.required]
    });


  }

  ngAfterViewInit(): void {
    setTimeout(this.activateSpeechSearchMovie(), 30000);
  }

  sendToServer(formData) {

    this.firstButton = true;
    this.get(`//localhost:3000/lentech/${formData.query}`).then(res => {
      this.serverResponse = res.json();
      console.log(this.serverResponse);
      this.selectList = this.serverResponse.choose;
      this.formIsActive = false;
      this.list = true;

      setTimeout(this.activateSpeechSearchMovie2(), 20000);

    }).catch(err => {
      console.log(err);
    });
  }

  getDirections(event) {
    this.secondButton = true;
    setTimeout(() => {

      this.list = false;
      this.map = true;

      setTimeout(this.activateSpeechSearchMovie3(), 20000);
    }, 1500)
  }

  get(url: string): Promise<Response> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    let promise: Promise<Response> = this.http.get(url, options).toPromise();
    return new Promise((resolve, reject) => {
      promise.then(success => {
        resolve(success);
      }, error => {
        reject(error);
      });
    });
  }

  public popSnackbar() {
    setTimeout(() => {
      let simpleSnackBarRef = this.snackbar.open(`You've successfully shared your route with community`, 'Success');
      setTimeout(simpleSnackBarRef.dismiss.bind(simpleSnackBarRef), 3000);
    }, 1000);
  }

  playSong() {
    this.play = true;
  }


  activateSpeechSearchMovie(): void {
    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          let arr = value.split(' ');

          for (let word of arr) {
            if (word.toLowerCase() == 'mazda') {
              this.activateSpeechSearchMovie1();
            }
          }

          console.log(value);
        },
        //error
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie();
          }
        },
        //completion
        () => {
          // this.activateSpeechSearchMovie1();
        });
  }

  activateSpeechSearchMovie1(): void {
    console.log('TAAAAAAAAAAAAAAALLLLLLLLLLLLLLKKKKKKKKKKKK!!!!!!!');
    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          let arr = value.split(' ');

          for (let word of arr) {
            if (word == 'eat') {
              this.myGreatForm.get('type').setValue('food');
            }
            if (word == 'sushi') {
              this.myGreatForm.get('query').setValue('sushi');
            }
          }

          if (this.myGreatForm.get('query').value == 'sushi') {
            this.sendToServer(this.myGreatForm.value);
          }


          console.log(value);
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie1();
          }
        }, ()=> {console.log('stop!');})
  }

  activateSpeechSearchMovie2(): void {
    console.log('ZZZZZZZZZZZZZZZZZZZZZZZz');
    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          let arr = value.split(' ');

          for (let word of arr) {
            if (word.toLowerCase() == 'three' || word.toLowerCase() == '3') {
              this.getDirections(null);
            }

          }

          console.log(value);

        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie2();
          }
        }, ()=> {console.log('OK!!');})
  }

  activateSpeechSearchMovie3(): void {
    console.log('QQQQQQQQQQQQ');
    this.speechRecognitionService.record()
      .subscribe(
        //listener
        (value) => {
          this.speechData = value;
          let arr = value.split(' ');
          console.log(arr);
          if (arr.indexOf('share') != -1) {
            console.log('TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT');
            this.popSnackbar();
          }

          console.log(value);

          this.speechRecognitionService.DestroySpeechObject();
        },
        //errror
        (err) => {
          console.log(err);
          if (err.error == "no-speech") {
            console.log("--restatring service--");
            this.activateSpeechSearchMovie3();
          }
        }, ()=> {console.log('OK!!');})
  }

}
