import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class NoteEditorComponent implements OnInit {
  
  mdData: string = '';
  constructor(private data: DataService) { }

  ngOnInit() {
    
  }


}
