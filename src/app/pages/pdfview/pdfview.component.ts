import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/index';

@Component({
  selector: 'ngx-pdfview',
  templateUrl: './pdfview.component.html',
  styleUrls: ['./pdfview.component.scss']
})
export class PdfviewComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    var data = localStorage.getItem("pdfdata");
    console.log(data);
    var json ={
      "filename":data
    }
    this.authenticationService.pdfview(json).then((result)=>{
      console.log(result);
    })
  }

}
