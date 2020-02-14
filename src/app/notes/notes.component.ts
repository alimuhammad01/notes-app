import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  allNotes: Array<any> = [];
  key: string;
  title: string;
  itemIndex: number;
  description: string;
  searchNote: string;
  action: string;

  ngOnInit() {
    this.allNotes = [];
    this.initProps();
    this.getAllNotes();
  }

  initProps(): void {
    this.key = 'notes';
    this.itemIndex = 0;
    this.title = this.description = this.searchNote = '';
    this.action = 'save';
  }
  getAllNotes() {
    $('.noteSearch').fadeIn();
    $('#addNote-field').fadeOut();
    this.allNotes = JSON.parse(localStorage.getItem(this.key));
    console.log(this.allNotes);
    this.initProps();
  }

  onClickSubmit() {
    console.log('Item index', this.itemIndex);
    if (this.title && this.description) {
      const notesObj = {title: this.title, description: this.description};
      if (this.action === 'save') {
        this.allNotes.splice(0,  0, notesObj);
      } else {
        this.allNotes.splice(this.itemIndex, 1);
        console.log(this.allNotes);
        this.allNotes.splice(this.itemIndex, 0, notesObj);
      }
      localStorage.setItem(this.key, JSON.stringify(this.allNotes));
      $('#addNote-field').fadeToggle();
      $('.noteSearch').fadeIn();
      $('.closeNote').css('display', 'block');
      setTimeout(() => {
        this.getAllNotes();
      }, 400);
    }
  }

  searchNotes() {
    console.log(this.searchNote);
    console.log(this.allNotes);
    const searchedNote = this.allNotes.filter(note => note.title === this.searchNote);
    console.log(searchedNote.length);
    if (searchedNote && searchedNote.length > 0) {
      $('#addNote-field').fadeOut();
      this.allNotes = searchedNote;
      console.log(this.allNotes);
    }
  }

  onEditClick(index) {
    console.log(index);
    $('#actionsDropdown-' + index).fadeToggle();
  }

  editNote(note, index) {
    $('.closeNote').css('display', 'none');
    $('#actionsDropdown-' + index).fadeToggle();
    console.log(note);
    $('#addNote-field').fadeToggle();
    $('.savedNote').fadeOut();
    $('.noteSearch').toggle();
    this.itemIndex = index;
    this.title = note.title;
    this.description = note.description;
    this.searchNote = '';
    this.action = 'edit';
  }
  deleteNote(note, index) {
    if (window.confirm('Do you really want to delete?')) {
      $('#actionsDropdown-' + index).fadeToggle();
      this.allNotes.splice(index, 1);
      localStorage.setItem(this.key, JSON.stringify(this.allNotes));
    }
  }

  onSearch(event: any) {
    console.log('Search Text', event.target.value);
    console.log(this.allNotes);
    const searchedNote = [];
    for (let i = 0; i < this.allNotes.length; i++) {
      if ( this.allNotes[i].title.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0 ) {
        console.log('in if');
        console.log(this.allNotes[i]);
        searchedNote.push(this.allNotes[i]);
      } else {
        console.log('in else');
      }
    }
    this.allNotes = searchedNote;
  }

}
