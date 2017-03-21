import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Response, Http, Headers, RequestOptions} from "@angular/http";

@Component({
  selector: 'form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.scss']
})
export class FormComponentComponent implements OnInit {

  private myGreatForm: FormGroup;
  private formIsActive: boolean = true;
  private list: boolean = false;
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

  constructor(private fb: FormBuilder, private http: Http) {
  }

  ngOnInit() {
    this.myGreatForm = this.fb.group({
      type: [''],
      query: ['', Validators.required]
    });
  }

  sendToServer(formData) {

    this.get(`//localhost:3000/lentech/${formData.query}`).then(res => {
      this.serverResponse = res.json();
      console.log(this.serverResponse);
      this.selectList = this.serverResponse.choose;
      this.formIsActive = false;
      this.list = true;
    }).catch(err => {
      console.log(err);
    });
  }

  getDirections(event) {
    setTimeout(() => {

      this.list = false;
      this.map = true;
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
}
