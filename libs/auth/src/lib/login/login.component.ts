import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute,Router} from '@angular/router';
import {AuthFacade} from '../store/auth.facade';

@Component({
  selector: 'totobo-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authHelper:AuthFacade
    ,private builder:FormBuilder
    ,private route:ActivatedRoute,private router:Router) { }
    signInForm:FormGroup;
    loginError$;
    returnUrl;
  ngOnInit(): void {
    this.signInForm= this.builder.group({
        username:['',Validators.required],
        password:['',Validators.required]
      
    });
    this.returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
    this.loginError$=this.authHelper.errors$;
    this.authHelper.authenticated$.subscribe(a=>{
      if(a)
      this.router.navigate([this.returnUrl]);
    })
  }
  onSubmit(){
    let values=this.signInForm.value;
    let keys=Object.keys(values);
    if(this.signInForm.valid)
    {
       console.log('login initiated');
      this.authHelper.init(values);
    }
    else
    {
      keys.forEach(k=>{
        let control=this.signInForm.controls[k];
        if(control && !control.valid){
          control.setErrors({msg:null});
          control.markAsTouched();
        }
      })
    }
  }

}
