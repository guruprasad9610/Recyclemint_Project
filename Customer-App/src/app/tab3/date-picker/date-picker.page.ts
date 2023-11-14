import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.page.html',
  styleUrls: ['./date-picker.page.scss'],
})
export class DatePickerPage implements OnInit {
  Calender:boolean = false;
  selectedDate: any
  slots:any =[5,10,15,20,25,30]
  elementRef: any;
  constructor(private router:Router) { }

  ngOnInit() {
  }

  showCalender(){
    this.Calender = true;
  }

  updateDayValues(e:any){
    this.Calender = false
    const selectedDate = new Date(e.detail.value);
    const selectedMonth = selectedDate.getMonth() + 1;  // January is 0
    console.log('Selected month:', selectedMonth);
  }

  // @HostListener('document:click', ['$event'])
  // handleClick(event: Event) {
  //   if (!this.elementRef?.nativeElement.contains(event.target) && this.Calender) {
  //     this.Calender = false;
  //   }
  // }

  goToadress(){
    this.router.navigate(['/tabs/tab3/adress-picker'])
  }

}
