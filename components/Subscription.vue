<template>
  <section>
    <div class="notification">
      <h4>Get our Notifications</h4>
      <div class="notification-input">
        <p style="color:red">{{errors}}</p>
        <p>{{successMessage}}</p>
        <input type="text" v-model="dataEmail" class="" placeholder="Your Email Address" aria-describedby="basic-addon1">
          <button  @click="subscribe" :disabled="validated ? '' : disabled">
            <i  v-bind:class="{ 'fab fa-telegram-plane send-icon': !isMailSending, 'fab fa-telegram-plane fa-spin send-icon': isMailSending }"></i>
          </button>
        </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
  methods: {

  checkForm:function() {
  this.successMessage = null
   if(!this.validEmail(this.dataEmail)) {
  this.errors = "Incorrect email format.";
  }
  else
  {
  this.errors = null;
  console.log(this.errors);
  }
  if(!this.errors) return true;
  },


  validEmail:function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },


    subscribe () {
    this.successMessage = null
    this.errors = null;
    if(this.checkForm())
    {
    this.validated= true;
    this.isMailSending = true;
    var self = this
    axios.post('https://app.panxpan.com/api/marketing/notifications/register',
    {
    email: this.dataEmail
    }
    ).then(res => {
    this.validated= false;
    this.isMailSending = false;
    self.dataEmail = ''
    if(res.data.data.emailAlreadyExist == true)
    {
    this.errors = "You have a PanXpan account so you already get our notifications.";
    this.successMessage = null;
    }
    else if(res.data.success == true)
    {
    this.errors = null;
    this.successMessage = "Thanks!  You've been added to our mailing list.";
    }
    }).catch(e => {

    })
    }
    }
    },
    data: function () {
    return {
    dataEmail: '',
    errors:null,
    validated: false,
    successMessage : null,
    isMailSending : false
    }
    }
    }
  </script>
