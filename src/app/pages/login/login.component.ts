import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm!: FormGroup;
  successmsg = '';
  constructor(private fb: FormBuilder,private data: DataService,private router: Router) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
  }



  submitForm(): void {
    this.successmsg = '';
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    if (this.validateForm.invalid) {
      this.data.showMessageError("请检查输入")
      return;
    } else {
    
      this.data.login(this.validateForm.value).subscribe((res:any)=>{
      
        if(res.status === 'ok'){
          this.data.account = res.data.name;
          this.data.pwd = res.data.pwd;
          this.data.saveUserStatus();
          if(this.data.redirectUrl){
            this.router.navigate([this.data.redirectUrl])
          }else{
            this.router.navigate([""])
          }
          
        }else{
          //失败
          this.successmsg = res.error;
        }
      },error=>{
        // console.log(error)
        this.successmsg = "登录失败";
        this.data.sendLoadingMessage(false)
      })
    }
  }
}
