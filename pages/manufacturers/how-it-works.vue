<template>
  <div>
    <section class="body">
      <div class="about homepage-about how-it-works how-it-works-M-cover">
        <div class="title-line"></div>
        <h4>Expand your Business Globally</h4>
        <div class="title-line"></div>
      </div>
    </section>
    <section>
      <div class="container introduction">
        <div class="row ">
          <div class="col-sm-6 col-xs-12 left-step">
            <h4>Create an Account</h4>
            <img class="left-step-background" src="../../assets/images/1.png"/>
            <p>Enter information about you and your company, add your products and set local pricing.</p>
          </div>
          <div class="col-sm-6 col-xs-12">
            <img src="../../assets/images/m1.png" class="img-responsive"/>
          </div>
        </div>
        <div class="row ">
          <div class="col-sm-6 col-xs-12">
            <img src="../../assets/images/m2.png" class="img-responsive"/>
          </div>
          <div class="col-sm-6 col-xs-12 right-steps">
            <h4>Launch Proposals</h4>
            <img class="right-steps-background" src="../../assets/images/2.png"/>
            <p>Decide on a set of countries to target and set of products you want to find local partners for.</p>
            <p>
              Also define what functions of your partnership local partners will be responsible for and how much you want to invest to subsidize local market development activities.
            </p>
          </div>
        </div>
        <div class="row ">
          <div class="col-sm-6 col-xs-12 left-step">
            <h4>Get Offers</h4>
            <img class="left-step-background" src="../../assets/images/3.png"/>
            <p>Local Partners from your target countries will send you offers that contain monthly sales forecasts and investment.</p>
            <p>Decide on what local partners you want to work with and make counter offers if needed.</p>
          </div>
          <div class="col-sm-6 col-xs-12">
            <img src="../../assets/images/m3.png" class="img-responsive">
          </div>
        </div>
        <div class="row ">
          <div class="col-sm-6 col-xs-12">
            <img src="../../assets/images/m4.png" class="img-responsive">
          </div>
          <div class="col-sm-6 col-xs-12 right-steps">
            <h4>Manage Sales & Investment</h4>
            <img class="right-steps-background" src="../../assets/images/4.png"/>
            <p>Each local partner will order goods through PanXpan's online platform. Approve their invoices and we'll make sure they've paid before you need to ship the products.</p>
            <p>Approve investment amounts each month and only pay once local partners submit receipts.</p>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 col-xs-12 left-step">
            <h4>Consolidate Global Expansion</h4>
            <img class="left-step-background" src="../../assets/images/5.png"/>
            <p>
              Consolidate all your international vendors into one platform so you can easly manage monthly investment
              and monthly sales from a central location.
            </p>
            <p>
              Identify new target countries for your products and quickly find new partners to grow your business in those target locations.
            </p>
          </div>
          <div class="col-sm-6 col-xs-12">
            <img src="../../assets/images/m5.png" class="img-responsive">
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="introduction-footer">
        <div>
          <img src="../../assets/images/logo_small.png">
            <div class="introduction-footer-text">
              <p>
                Our platform is free to use! Sign up, add your products, and post unlimited proposals.
              </p>
              <p>
                Only when you find local partners and they purchase goods from you, will we take 10% of product revenue.
                The 10% service fee we charge covers money transfer, support and platform running costs.
              </p>
            </div>
          </div>
        <div>
          <button type="button" class="btn create-account" v-on:click ="getUrl('signup')">Create an Account Now!</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  export default {
  methods: {
  getUrl(method){
  console.log(process.env.appUrl);
  return window.location = process.env.appUrl+method;
  }},
  created() {
  document.title = "How it Works for Manufacturers - PanXpan";
  }
  }
</script>
