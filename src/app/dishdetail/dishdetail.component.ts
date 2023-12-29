import { Component,OnInit, ViewChild} from '@angular/core';
import {Params,ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { switchMap } from 'rxjs';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent {

dish!:Dish;
dishIds!:string[];
prev!:string;
next!:string;

commentForm!:FormGroup;
comment!:Comment;
ac!:string;
cc!:string;
rc:number=5;

@ViewChild('fform') commentFormDirective:any;

formErrors={
  'author':'',
  'comment':''
}
validationMessages={
  'author':{
    'required':      'Author name is required.',
    'minlength':     'Author name must be at least 2 characters long.',
    'maxlength':     'Author Name cannot be more than 25 characters long.'
  },
  'comment':{
    'required':      'Comment is required.',
  }
}


  constructor(private dishService:DishService,
    private route:ActivatedRoute,
    private location:Location,private fb:FormBuilder){
      this.createForm();
    }

  ngOnInit(){
    this.dishService.getDishIds().subscribe((dishids)=>this.dishIds=dishids);
    this.route.params
    .pipe(switchMap((params:Params)=>this.dishService.getDish(params['id'])))
    .subscribe((d)=>{this.dish=d; this.setPrevNext(d.id)});
  }


  createForm(){
    this.commentForm=this.fb.group(
      {
        rating:5,
        comment:['',Validators.required],
        author:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]]
      }
    )
    this.commentForm.valueChanges.subscribe((data)=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?:any){
    if (!this.commentForm){return ;}
    const form = this.commentForm;
    for (const fieldName in this.formErrors) {
      if (this.formErrors.hasOwnProperty(fieldName)) {
          // assert fieldName is a valid key for formErrors and validationMessages
          const typedFieldName = fieldName as keyof typeof this.formErrors;

          this.formErrors[typedFieldName] = ''; // Direct property access
          const control = form.get(fieldName);
          if (control && control.dirty && !control.valid) {
              const messages = this.validationMessages[typedFieldName];
              for (const key in control.errors) {
                  if (control.errors.hasOwnProperty(key)) {
                      this.formErrors[typedFieldName] += messages[key as keyof typeof messages] + '';
                  }
              }
          }
      }
  }
  }

  onSubmit(){
    this.comment=this.commentForm.value;
    console.log(this.comment);
    this.dish.comments.push({rating:this.rc,author:this.ac,comment:this.cc,date:new Date().toISOString()});
    this.commentForm.reset({
      rating:5,
      comment:'',
      author:''
    });
    this.commentFormDirective.resetForm();
  }
  setPrevNext(dishId:string){
    const index=this.dishIds.indexOf(dishId);
    this.prev=this.dishIds[(this.dishIds.length+ index-1)%this.dishIds.length];
    this.next=this.dishIds[(this.dishIds.length+ index+1)%this.dishIds.length];
  }

  goBack():void{
    this.location.back();
  }
}
