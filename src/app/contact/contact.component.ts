import { Component, ViewChild } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Feedback,ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  feedbackForm!:FormGroup;
  feedback!:Feedback;
  contactType=ContactType;

  @ViewChild('fform') feedbackFormDirective: any;

  formErrors={
    'firstname':'',
    'lastname':'',
    'telnum':'',
    'email':''
  };

  validationMessages={
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'telnum': {
      'required':      'Tel. number is required.',
      'pattern':       'Tel. number must contain only numbers.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email not in valid format.'
    },
  }
  
  constructor(private fb:FormBuilder){
    this.createForm();
  }
  ngOnInit(){
  
  }
  createForm(){
    this.feedbackForm=this.fb.group({
      firstname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      lastname:['',[Validators.required,Validators.minLength(2),Validators.maxLength(25)]],
      telnum:[0,[Validators.required,Validators.pattern]],
      email:['',[Validators.required,Validators.email]],
      agree:false,
      contacttype:'None',
      message:''
    });
    this.feedbackForm.valueChanges.subscribe(data=>this.onValueChanged(data));
    this.onValueChanged();
  }
  onValueChanged(data?: any) {
    if (!this.feedbackForm) return;
    const form = this.feedbackForm;

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
    this.feedback=this.feedbackForm.value;
    console.log(this.feedback);
    this.feedbackForm.reset({
      firstname:'',
      lastname:'',
      telnum:0,
      email:'',
      agree:false,
      contacttype:'None',
      message:''

    });

    
    this.feedbackFormDirective.resetForm();
  }

}
