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


  constructor(messages: Object) {
    this.findElements();
    this.addListeners();
    this.messages = messages;
  }

  private findElements(): void {
     // Find elements
    this.cf           = document.getElementById("neth-cf"); // Contact form element
    this.gValEl       = document.getElementById('cf-recpt'); // GRecaptcha element
    this.sendButton   = document.getElementById("cf-send-button"); // Send button
    this.loadingEl    = document.getElementById("loading-el"); // Loading element
    this.nameInput    = document.querySelector("[data-type='name']"); // Name input
    this.emailInput   = document.querySelector("[data-type='email']"); // Email input
    this.titleInput   = document.querySelector("[data-type='title']"); // Title input
    this.messageInput = document.querySelector("[data-type='message']"); // Message input
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

  private resize(e: any):void {
     e.target.style.height = `${e.target.scrollHeight}px`;
     /* TODO adapt height in both directions (it currently expands but does not go back to normal if content is deleted) */
  }

  private manageError(input: HTMLInputElement, error: number): void {
    let validationTextContainer = input.nextElementSibling.nextElementSibling.nextElementSibling;
    input.focus();
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
    var self = <any>this;
    let inputContent = self.nameInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(self.nameInput, 101);
      this.manageLabelActiveState(self.nameInput, false);
      return 101;
    } else if(!inputContent.match(/^[a-zA-Z'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(self.nameInput, 102);
      this.manageLabelActiveState(self.nameInput, true);
      return 102;
    } else {
      this.manageError(self.nameInput, 0);
      this.manageLabelActiveState(self.nameInput, true);
      return 0;
    }
  }

  private validateEmail(): number {
    var self = <any>this;
    let inputContent = self.emailInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(self.emailInput, 201);
      this.manageLabelActiveState(self.emailInput, false);
      return 201;
    } else if(!inputContent.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      this.manageError(self.emailInput, 202);
      this.manageLabelActiveState(self.emailInput, true);
      return 202;
    } else {
      this.manageError(self.emailInput, 0);
      this.manageLabelActiveState(self.emailInput, true);
      return 0;
    }
  }

  private validateTitle(): number {
    var self = <any>this;
    let inputContent = self.titleInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(self.titleInput, 301);
      this.manageLabelActiveState(self.titleInput, false);
      return 301;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(self.messageInput, 401);
      this.manageLabelActiveState(self.titleInput, true);
      return 302;
    } else {
      this.manageError(self.titleInput, 0);
      this.manageLabelActiveState(self.titleInput, true);
      return 0;
    }
  }

  private validateMessage(): number {
    var self = <any>this;
    let inputContent = self.messageInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(self.messageInput, 401);
      this.manageLabelActiveState(self.messageInput, false);
      return 401;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(self.messageInput, 402);
      this.manageLabelActiveState(self.messageInput, true);
      return 402;
    } else {
      this.manageError(self.messageInput, 0);
      this.manageLabelActiveState(self.messageInput, true);
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
      fValidationEl.innerHTML = ``;
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
    var self = <any>this;
    if(!(this.validateName() || this.validateEmail() || this.validateTitle() || this.validateMessage() || this.checkCaptcha())) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
        // Reset loader
        self.loadingEl.innerHTML = `<div class="loader">
                                        <svg class="circular" viewBox="25 25 50 50">
                                            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
                                        </svg>
                                    </div>`;
        self.loadingEl.style.display = 'block';
        switch(this.responseText) {
          case '0':
            self.loadingEl.removeAttribute('style');
            self.loadingEl.innerHTML = 'Email sent succesfully!';
            setTimeout(self.resetFormStatus(self.cf), 2000);
          case '101':
          case '102':
            self.manageError(self.nameInput, eval(this.responseText));
            break;
          case '201':
          case '202':
            self.manageError(self.emailInput, eval(this.responseText));
            break;
          case '301':
          case '302':
            self.manageError(self.titleInput, eval(this.responseText));
            break;
          case '401':
          case '402':
            self.manageError(self.titleInput, eval(this.responseText));
            break;
          case '500':
            self.manageError(self.gValEl, eval(this.responseText));
            break;
          case '600':
            self.manageError(self.gValEl, eval(this.responseText));
            break;
          default:
            self.loadingEl.style.color = 'red';
            self.loadingEl.innerHTML = 'We couldn\'t send your message, sorry :(.';
        } 
      };
      var data = 'n=' + self.nameInput.value + '&e=' + self.emailInput.value + '&t=' + self.titleInput.value + '&m=' + self.messageInput.value + '&g=' + grecaptcha.getResponse();
      xmlhttp.open("POST", "https://www.nethruster.com/mailer/sendmail.php", true);
      xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xmlhttp.send(encodeURI(data));
    } else {
      return;
    }
  }
}

export default CfHandler;
