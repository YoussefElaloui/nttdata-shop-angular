import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  form=new FormGroup({
    name:new FormControl('',[Validators.required]),
    email:new FormControl('',[Validators.email]),
    subject:new FormControl('',[Validators.required]),
    message:new FormControl('',[Validators.required]),
  })

  ngOnInit(): void {
  }

  submit():void{
    // use my email to send to my other email this client info
    if(this.form.status=='VALID')
      this.router.navigateByUrl('/home')


  }

}
