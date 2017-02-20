declare var grecaptcha: any;

class CfHandler {
  private cf: HTMLElement;
  private gValEl: Element;
  private loadingEl: Element;
  private sendButton: Element;

  private messages: Object;
  private nameInput: Element;
  private emailInput: Element;
  private titleInput: Element;
  private messageInput: Element;


  constructor() {
    this.findElements();
    this.addListeners();

    // "Map" of Input status messages
    this.messages = {
      '-1': '',
      '0': '\u2714&nbsp;This field is valid.',
      '101': 'So, you don\'t have a name?',
      '102': 'Your name contains ilegal characters.',
      '201': 'Your email should not be empty.',
      '202': 'Your email should contain \'@\' and end with a domain name. (max@somesite.ext)',
      '301': 'The title should not be empty.',
      '302': 'This title contains ilegal characters.',
      '401': 'Your message should not be empty.',
      '402': 'Your message contains invalid characters.',
      '500': 'There was an error sending your message, try again later.',
      '600': 'Invalid recaptcha.'
    }
  }

  private findElements(): void {
     // Find elements
    this.cf = document.getElementById("neth-cf");
    this.gValEl = document.getElementById('cf-recpt');
    this.nameInput = document.querySelector("[data-type='name']");
    this.emailInput = document.querySelector("[data-type='email']");
    this.titleInput = document.querySelector("[data-type='title']");
    this.sendButton = document.getElementById("cf-send-button");
    this.messageInput = document.querySelector("[data-type='message']");
    this.loadingEl = document.getElementById("loading-el");
  }

  private addListeners():void {
    // Add event listeners
    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.titleInput.addEventListener('input', this.validateTitle.bind(this));
    this.messageInput.addEventListener('input', this.validateMessage.bind(this));
    this.messageInput.addEventListener('input', this.resize.bind(this));
    this.sendButton.addEventListener('click', this.sendEmail.bind(this));
  }

  private manageLabelActiveState(input: Element, state: boolean): void {
    let labelEl = input.nextElementSibling;
    if(state) {
      labelEl.classList.add('has-content');
    } else if(!state) {
      labelEl.classList.remove('has-content');
    }
  }

  private resize(e):void {
     e.target.style.height = e.target.scrollHeight + "px";
     /* TODO adapt height in both directions (it currently expands but does not go back to normal if content is deleted) */
  }

  private manageError(input: Element, error: number): void {
    let validationTextContainer = input.nextElementSibling.nextElementSibling.nextElementSibling;
    if(!error) {
      input.classList.remove('error');
      input.classList.add('valid');
      validationTextContainer.classList.remove('error')
      validationTextContainer.classList.add('valid')
    } else if(error === -1){
      input.classList.remove('error');
      validationTextContainer.classList.remove('error')
      input.classList.remove('valid');
      validationTextContainer.classList.remove('valid')
    } else {
      input.classList.remove('valid');
      input.classList.add('error');
      validationTextContainer.classList.remove('valid')
      validationTextContainer.classList.add('error');
    }
    
    validationTextContainer.innerHTML = this.messages[error];
  }

  private validateName(): number {
    var that = <any>this;
    let inputContent = that.nameInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.nameInput, 101);
      this.manageLabelActiveState(that.nameInput, false);
      return 101;
    } else if(!inputContent.match(/^[a-zA-Z'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.nameInput, 102);
      this.manageLabelActiveState(that.nameInput, true);
      return 102;
    } else {
      this.manageError(that.nameInput, 0);
      this.manageLabelActiveState(that.nameInput, true);
      return 0;
    }
  }

  private validateEmail(): number {
    var that = <any>this;
    let inputContent = that.emailInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.emailInput, 201);
      this.manageLabelActiveState(that.emailInput, false);
      return 201;
    } else if(!inputContent.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      this.manageError(that.emailInput, 202);
      this.manageLabelActiveState(that.emailInput, true);
      return 202;
    } else {
      this.manageError(that.emailInput, 0);
      this.manageLabelActiveState(that.emailInput, true);
      return 0;
    }
  }

  private validateTitle(): number {
    var that = <any>this;
    let inputContent = that.titleInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.titleInput, 301);
      this.manageLabelActiveState(that.titleInput, false);
      return 301;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.messageInput, 401);
      this.manageLabelActiveState(that.titleInput, true);
      return 302;
    } else {
      this.manageError(that.titleInput, 0);
      this.manageLabelActiveState(that.titleInput, true);
      return 0;
    }
  }

  private validateMessage(): number {
    var that = <any>this;
    let inputContent = that.messageInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.messageInput, 401);
      this.manageLabelActiveState(that.messageInput, false);
      return 401;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.messageInput, 402);
      this.manageLabelActiveState(that.messageInput, true);
      return 402;
    } else {
      this.manageError(that.messageInput, 0);
      this.manageLabelActiveState(that.messageInput, true);
      return 0;
    }
  }

  private checkCaptcha(): number {
    var response = grecaptcha.getResponse();
    var fValidationEl = document.getElementById('final-validation');
    if (response === "" || !response || response === undefined) {
      fValidationEl.innerHTML = this.messages['600'];
      fValidationEl.style.color = 'red';
      return 600;
    } else {
      fValidationEl.innerHTML = '';
      return 0;
    }
  }

  private resetFormStatus(input: HTMLFormElement):void {
    var inputs = document.querySelectorAll("[data-type]");
    for(let i = inputs.length - 1; i>=0; i--) {
      this.manageLabelActiveState(inputs[i], false);
      this.manageError(input[i], -1);
    }
    input.reset();
    grecaptcha.reset();
  }

  sendEmail(e: Event): void {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    var that = <any>this;
    if(!(this.validateName() || this.validateEmail() || this.validateTitle() || this.validateMessage() || this.checkCaptcha())) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        that.loadingEl.style.display = 'block';
        switch(this.responseText) {
          case '0':
            that.loadingEl.innerHTML = 'Email sent succesfully!';
            // TODO make loader reusable with form reset
            setTimeout(that.resetFormStatus(that.cf), 2000);
          case '101':
          case '102':
            that.manageError(that.nameInput, eval(this.responseText));
            break;
          case '201':
          case '202':
            that.manageError(that.emailInput, eval(this.responseText));
            break;
          case '301':
          case '302':
            that.manageError(that.titleInput, eval(this.responseText));
            break;
          case '401':
          case '402':
            that.manageError(that.titleInput, eval(this.responseText));
            break;
          case '500':
            that.manageError(that.gValEl, eval(this.responseText));
            break;
          case '600':
            that.manageError(that.gValEl, eval(this.responseText));
            break;
        } 
      };
      var data = 'n=' + that.nameInput.value + '&e=' + that.emailInput.value + '&t=' + that.titleInput.value + '&m=' + that.messageInput.value + '&g=' + grecaptcha.getResponse();
      xmlhttp.open("POST", "http://localhost:8081/mailer/sendmail.php", true);
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlhttp.send(encodeURI(data));
    } else {
      return;
    }
  }
}

export default CfHandler;
