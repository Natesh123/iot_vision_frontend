import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/index';
import Swal from 'sweetalert2'


declare var $: any;

@Component({
  selector: 'ngx-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit {

  model: any = {};
  role:any;
  terms:any;
  loading = false;
  returnUrl: string;
  successmsg: string;
  categories: any;
  closeResult:string;
  doctor_type: string;
  type_list: any;
  response:any;
  year = (new Date()).getFullYear();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {

    
  }


  signup() {

    this.loading = true;
    
    this.type_list = {"name":this.model.name,"isactive":0,"email":this.model.email,
    "password": this.model.pass, "mobilenumber": this.model.mobilenumber};
    
    this.authenticationService.signup(this.type_list).then((result)=>{
      this.response = result;

      if(this.response.records == 'user_exist'){
          this.successmsg = "0";
          this.loading = false;

          Swal.fire('', 'Email ID Already Exists', 'warning');

      } else{
        this.successmsg = "1";
        this.loading = false;
        Swal.fire('', 'Please check your email to activate your account.', 'success')
       
        setTimeout(() => {
          this.router.navigate(['/authentication/signin']);
      }, 2000);  //5s
      } 
  });
  

}



}
