import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  regSuccess: boolean  = false;
  successmsg: string = '';
  validateForm!: FormGroup;
  isbtn: boolean = true;//允许被点击
  constructor(private fb: FormBuilder,private data: DataService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      password2: [null, [Validators.required]],
      email: [null, [Validators.email]],
      xgsid: [null],
    });
  }



  submitForm(): void {

    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }

      if (this.validateForm.controls[i].value && this.validateForm.controls[i].value.length < 4) {
        this.validateForm.controls[i].setErrors({
          notUnique: true
        })
        // console.log("error")
      }
    }
    if(this.validateForm.controls.password.value !== this.validateForm.controls.password2.value){
      this.validateForm.controls.password2.setErrors({
        notUnique: true
      })

      return;
    }


    if (this.validateForm.invalid) {
      console.log("不满足")
      this.data.showMessageError("请检查输入")
    } else {
      // console.log(this.validateForm.value)
      this.isbtn = false;
      this.data.register(this.validateForm.value).subscribe((res:any)=>{
        this.isbtn = true;
        if(res.status === 'ok'){
          this.regSuccess = true;
          this.successmsg = "帐号已注册成功："+res.data;
        }else{
          this.regSuccess = false;
        }
      },error=>{
        // console.log(error)
        this.isbtn = true;
        this.data.isLoading = false;
      })
    }


  }

}
