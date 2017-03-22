import {Component, Input} from "@angular/core";

@Component({
  selector: 'spinner-button',
  template: `
        <button md-raised-button color="accent" [disabled]="working">
            {{text}}
            <md-progress-spinner *ngIf="working" mode="indeterminate" color="accent"></md-progress-spinner>
        </button>
    `,
  styleUrls: ['spinner-button.component.scss']
})
export class SpinnerButtonComponent {
  private _working: boolean;

  @Input() set working(value: boolean) {
    this._working = value;
  }

  @Input() text;

  get working() {
    return this._working;
  }
}
