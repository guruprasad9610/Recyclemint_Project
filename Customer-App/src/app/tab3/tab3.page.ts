import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  @ViewChild('modal') modal: HTMLIonModalElement;
  isview:boolean = true;
  products:any = [];

  constructor(private router: Router , private modalController: ModalController,) {
    this.modal = {} as HTMLIonModalElement;
  }



  ngOnInit(){
    this.products = []
    console.log("1");

  }

  ionViewWillEnter(){
    this.products = []
    console.log("2");

  }



  onNotice()
  {
    this.router.navigate(['/notifications']);
  }

  onSubmit()
  {
    this.router.navigate(['/tabs/tab3/date-picker']);
  }

  viewAll()
  {
    this.isview = false;
  }

  closeView()
  {
    this.isview = true
  }

  public data = [
    'Aluminium cans',
    'Plastic bottles',
    'Newspaper',
    'Cardboard',
  ];
  public results = [...this.data];

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data.filter((d) => d.toLowerCase().indexOf(query) > -1);
  }

   popup() {
     console.log("mamali");

  }

  addProduct(){
    this.products.push({item: "iron" , weight:"12kg"})

    console.log(this.products);

  }





}
