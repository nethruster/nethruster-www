declare var grecaptcha: any;

class CfHandler {
  private cf: HTMLFormElement;
  private gValEl: HTMLInputElement;
  private loadingEl: HTMLElement;
  private sendButton: Element;

  private messages: Object;
  private nameInput: HTMLInputElement;
  private emailInput: HTMLInputElement;
  private titleInput: HTMLInputElement;
  private messageInput: HTMLInputElement;


  constructor(messages: Object) {
    this.findElements();
    this.addListeners();
    this.messages = messages;
  }

  private findElements(): void {
     // Find elements
    this.cf           = document.getElementById("neth-cf") as HTMLFormElement; // Contact form element
    this.gValEl       = document.getElementById('cf-recpt') as HTMLInputElement; // GRecaptcha element
    this.sendButton   = document.getElementById("cf-send-button"); // Send button
    this.loadingEl    = document.getElementById("loading-el"); // Loading element
    this.nameInput    = document.querySelector("[data-type='name']") as HTMLInputElement; // Name input
    this.emailInput   = document.querySelector("[data-type='email']") as HTMLInputElement; // Email input
    this.titleInput   = document.querySelector("[data-type='title']") as HTMLInputElement; // Title input
    this.messageInput = document.querySelector("[data-type='message']") as HTMLInputElement; // Message input
  }

  private addListeners():void {
    // Add event listeners
    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.titleInput.addEventListener('input', this.validateTitle.bind(this));
    this.messageInput.addEventListener('input', this.validateMessage.bind(this));
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

  private manageError(input: HTMLInputElement, error: number): void {
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
      input.focus();
      input.classList.remove('valid');
      input.classList.add('error');
      validationTextContainer.classList.remove('valid')
      validationTextContainer.classList.add('error');
    }
    
    validationTextContainer.innerHTML = this.messages[error];
  }

  private validateName(): number {
    let inputContent = this.nameInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(this.nameInput, 101);
      this.manageLabelActiveState(this.nameInput, false);
      return 101;
    } else if(!inputContent.match(/^[a-zA-Z'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(this.nameInput, 102);
      this.manageLabelActiveState(this.nameInput, true);
      return 102;
    } else {
      this.manageError(this.nameInput, 0);
      this.manageLabelActiveState(this.nameInput, true);
      return 0;
    }
  }

  private validateEmail(): number {
    let inputContent = this.emailInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(this.emailInput, 201);
      this.manageLabelActiveState(this.emailInput, false);
      return 201;
    } else if(!inputContent.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      this.manageError(this.emailInput, 202);
      this.manageLabelActiveState(this.emailInput, true);
      return 202;
    } else {
      this.manageError(this.emailInput, 0);
      this.manageLabelActiveState(this.emailInput, true);
      return 0;
    }
  }

  private validateTitle(): number {
    let inputContent = this.titleInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(this.titleInput, 301);
      this.manageLabelActiveState(this.titleInput, false);
      return 301;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(this.messageInput, 401);
      this.manageLabelActiveState(this.titleInput, true);
      return 302;
    } else {
      this.manageError(this.titleInput, 0);
      this.manageLabelActiveState(this.titleInput, true);
      return 0;
    }
  }

  private validateMessage(): number {
    let inputContent = this.messageInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(this.messageInput, 401);
      this.manageLabelActiveState(this.messageInput, false);
      return 401;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(this.messageInput, 402);
      this.manageLabelActiveState(this.messageInput, true);
      return 402;
    } else {
      this.manageError(this.messageInput, 0);
      this.manageLabelActiveState(this.messageInput, true);
      return 0;
    }
  }

  private checkCaptcha(): number {
    var response = grecaptcha.getResponse();
    var fValidationEl = document.getElementById('final-validation');
    if (response === "" || !response || response === undefined) {
      fValidationEl.innerHTML   = this.messages['600'];
      fValidationEl.style.color = 'red';
      return 600;
    } else {
      fValidationEl.innerHTML = "";
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
    var classScope = this;
    if(!(this.validateName() || this.validateEmail() || this.validateTitle() || this.validateMessage() || this.checkCaptcha())) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        // Reset loader
        classScope.loadingEl.innerHTML = `<div class="loader"><svg class="circular" viewBox="25 25 50 50"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>`
        classScope.loadingEl.style.display = 'block';
        switch(this.responseText) {
          case '0':
            classScope.loadingEl.innerHTML = 'Email sent succesfully!';
            setTimeout(classScope.resetFormStatus(classScope.cf), 2000);
            break;
          case '101':
          case '102':
            classScope.manageError(classScope.nameInput, eval(this.responseText));
            break;
          case '201':
          case '202':
            classScope.manageError(classScope.emailInput, eval(this.responseText));
            break;
          case '301':
          case '302':
            classScope.manageError(classScope.titleInput, eval(this.responseText));
            break;
          case '401':
          case '402':
            classScope.manageError(classScope.titleInput, eval(this.responseText));
            break;
          case '500':
            classScope.manageError(classScope.gValEl, eval(this.responseText));
            break;
          case '600':
            classScope.manageError(classScope.gValEl, eval(this.responseText));
            break;
        } 
      };
      var data = 'n=' + this.nameInput.value + '&e=' + this.emailInput.value + '&t=' + this.titleInput.value + '&m=' + this.messageInput.value + '&g=' + grecaptcha.getResponse();
      xmlhttp.open("POST", "https://www.nethruster.com/mailer/sendmail.php", true);
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlhttp.send(encodeURI(data));
    } else {
      return;
    }
  }
}

export default CfHandler;
