declare var grecaptcha: any;
class CfHandler {
  private nameInput: Element;
  private emailInput: Element;
  private titleInput: Element;
  private messageInput: Element;
  private sendButton: Element;
  private cf: Element;
  private gValEl: Element;
  private messages: Object;

  constructor() {
    // Find elements
    this.nameInput = document.querySelector("[data-type='name']");
    this.emailInput = document.querySelector("[data-type='email']");
    this.titleInput = document.querySelector("[data-type='title']");
    this.messageInput = document.querySelector("[data-type='message']");
    this.sendButton = document.getElementById("cf-send-button");
    this.gValEl = document.getElementById('cf-recpt');
    this.cf = document.getElementById("neth-cf");

    // Add event listeners
    this.nameInput.addEventListener('input', this.validateName.bind(this));
    this.emailInput.addEventListener('input', this.validateEmail.bind(this));
    this.titleInput.addEventListener('input', this.validateTitle.bind(this));
    this.messageInput.addEventListener('input', this.validateMessage.bind(this));
    this.sendButton.addEventListener('click', this.sendEmail.bind(this));

    // "Map" of Input status messages
    this.messages = {
      '0': '',
      '101': 'So, you don\'t have a name?',
      '102': 'Your name contains ilegal characters.',
      '201': 'Your email should not be empty.',
      '202': 'Your email should contain \'@\' and end with a domain name. (max@somesite.something)',
      '301': 'The title should not be empty.',
      '302': 'This title contains ilegal characters.',
      '401': 'Your message should not be empty.',
      '402': 'Your message contains invalid characters.',
      '500': 'There was an error sending your message, try again later.',
      '600': 'Invalid recaptcha',
    }
  }

  private manageError(input: Element, error: number): void {
    if(!error) {
      input.classList.remove('error');
      input.classList.add('valid');
    } else {
      input.classList.remove('valid');
      input.classList.add('error');
    }
    
    input.nextElementSibling.innerHTML = this.messages[error];
  }

  private validateName(): number {
    var that = <any>this;
    let inputContent = that.nameInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.nameInput, 101);
      return 101;
    } else if(!inputContent.match(/^[a-zA-Z'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.nameInput, 102);
      return 102;
    } else {
      this.manageError(that.nameInput, 0);
      return 0;
    }
  }

  private validateEmail(): number {
    var that = <any>this;
    let inputContent = that.emailInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.emailInput, 201);
      return 201;
    } else if(!inputContent.match(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
      this.manageError(that.emailInput, 202);
      return 202;
    } else {
      this.manageError(that.emailInput, 0);
      return 0;
    }
  }

  private validateTitle(): number {
    var that = <any>this;
    let inputContent = that.titleInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.titleInput, 301);
      return 301;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.messageInput, 401);
      return 302;
    } else {
      this.manageError(that.titleInput, 0);
      return 0;
    }
  }

  private validateMessage(): number {
    var that = <any>this;
    let inputContent = that.messageInput.value;
    if(inputContent == "" || inputContent == null || inputContent == undefined || !inputContent || !inputContent.match(/\w+/g)) {
      this.manageError(that.messageInput, 401);
      return 401;
    } else if(!inputContent.match(/^[!-~ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏàáâãäåæçèéêëìíîïÐÑÒÓÔÕÖØÙÚÛÜÝÞßðñòóôõöøùúûüýþÿ\s]*$/)) {
      this.manageError(that.messageInput, 402);
      return 402;
    } else {
      this.manageError(that.messageInput, 0);
      return 0;
    }
    
  }

  private checkCaptcha(): number {
    var that = <any>this;
    var response = grecaptcha.getResponse();
    if (response === "" || !response || response === undefined) {
      that.manageError(that.gValEl, 600);
      return 600;
    } else {
      that.manageError(that.gValEl, 0);
      return 0;
    }
  }

  sendEmail(e: Event): void {
    e.stopPropagation();
    e.stopImmediatePropagation();
    e.preventDefault();
    var that = <any>this;

    if(!(this.validateName() || this.validateEmail() || this.validateTitle() || this.validateMessage() || this.checkCaptcha())) {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            switch(this.responseText) {
              case '0':
                that.cf.reset();
                that.grecaptcha.reset();
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
