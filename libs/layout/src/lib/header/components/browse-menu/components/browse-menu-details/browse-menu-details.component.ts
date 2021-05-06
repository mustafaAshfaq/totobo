import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-categories-details',
  templateUrl: './browse-menu-details.component.html',
  styleUrls: ['./browse-menu-details.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('popOverState', [
      state(
        'show',
        style({
          left: -50 + '%'
        })
      ),
      state(
        'hide',
        style({
          left: 0
        })
      ),
      transition('show => hide', animate('100ms ease-out')),
      transition('hide => show', animate('200ms ease-in'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BrowseMenuDetailsComponent implements OnInit {
  @Input() taxons;
  @Input() taxonName;
  @Input() screenwidth;
  @Input() taxonImageLink;
  @Output() onSubCatClicked: EventEmitter<boolean> = new EventEmitter<
    boolean
  >();

  menuTaxons: any;
  show = false;
  get stateName() {
    return this.show ? 'show' : 'hide';
  }

  constructor() {}

  showCategoryonclick(taxon) {
    this.show = !this.show;
    this.menuTaxons = taxon.taxons;
    this.onSubCatClicked.emit(true);
  }

  backtolist() {
    this.show = !this.show;
    this.onSubCatClicked.emit(false);
  }

  ngOnInit() {}

 
}