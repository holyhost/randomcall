import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-note-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class NoteEditorComponent implements OnInit {
  
  nTitle: string = '';
  mdData: string = '1234';
  contentCount: number = 0;
  tags = ['Tag 3'];
  isTag = false;
  inputValue = '';
  @ViewChild('inputTag', { static: false }) inputTag?: ElementRef;

  constructor(private data: DataService) { }

  ngOnInit() {
    
  }

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.isTag = true;
    setTimeout(() => {
      this.inputTag?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.isTag = false;
  }


}
