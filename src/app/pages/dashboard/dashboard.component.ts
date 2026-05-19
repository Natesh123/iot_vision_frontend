import {Component,OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild,ViewEncapsulation} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {Router} from '@angular/router';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { NbDialogService, NbDialogRef } from '@nebular/theme';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}


declare const $: any;

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnDestroy,AfterViewInit {

  private alive = true;
  model: any = {};
  @ViewChild('dialog',{static: true}) dialog: TemplateRef<any>;
  names: string[] = [];
  solarValue: number;
  
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: [
      {
        ...this.lightCard,
        type: 'warning',
      },
      {
        ...this.rollerShadesCard,
        type: 'primary',
      },
      {
        ...this.wirelessAudioCard,
        type: 'danger',
      },
      {
        ...this.coffeeMakerCard,
        type: 'info',
      },
    ],
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService,
              private solarService: SolarData,
              private router: Router,
              private dialogService: NbDialogService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
    });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });

  }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log('hi');
    var test = "dialog";
    var tmp = 1;
    if(tmp == 0){
      this.openWithoutBackdrop();
    }
  }
 
  openWithoutBackdrop() {
    this.dialogService.open(
      this.dialog,
      {
        context: '',
        closeOnEsc: false,
      });
  }
  
  ngOnDestroy() {
    this.alive = false;
  }

  activateAccount(){
    console.log(this.model.activationcode);
    console.log('hi');
    
  }

  navigation(tile){

    if(tile == 1){
      this.router.navigate(['/pages/customers'])
    } else if(tile == 2){
      this.router.navigate(['/pages/assets'])
    } else{
      this.router.navigate(['/pages/devices'])
    }
  }

  

}
