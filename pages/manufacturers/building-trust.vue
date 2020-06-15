<template>
  <div class="buildingTrust">
    <div class="page-title building-trust-background">
      <p>
        Building <strong>Trust</strong>
      </p>
    </div>
    <div class="page-content">
      <div class="building-trust-description">
        <img src="../../assets/images/security-icon.png">
          <p>
            Building parnerships is all about trust. But when you've never met your partner face to face and you speak
            different languages, trust is difficult to build. We've put trust front and center in our platform so you have
            the right foundation to build prosperous partnerships across the globe.
          </p>
        </div>
      <div class="row row-over">
        <div class="col-md-6 col-12 content-img"></div>
        <div class="mobile-img">
          <img src="../../assets/images/BT1_mobile.jpg">
        </div>
        <div class="col-md-6 col-12 greyBackground info-box custom-align">
          <div class="info-wrapper text-align-left">
            <img src="../../assets/images/stars.png">
              <h3 class="info-title-style text-align-left">More Than Ratings</h3>
              <p class="info-text-style">
                Start with reviewing local partners based on ratings. See how previous manufacturers have rated local partners,
                read comments, view how much they have bought via past partnerships, and understand their percent of budget
                achieved on previous sales forecasts. Use these in combination with profile information and their bids to
                identify the most appropriate local partners.
              </p>
            </div>
        </div>
      </div>
      <div class="row row-over">
        <div class="col-md-6 col-12 info-box border-right">
          <div class="info-wrapper right-allined">
            <img src="../../assets/images/layer-icon.png">
              <h3 class="info-title-style">Always Aligned</h3>
              <p class="info-text-style">
                Generating sales is one part of the equation, the other is investing in your local partners so that they are
                able to develop their local market as a suitable base for your products. Stay aligned on both sales forecasts
                and investment requirements via our platform. Agree on exact investment & sales budgets and then rest assured
                that perfomance will be precisely tracked and success will become part of the local partner's long term public profile.
              </p>
            </div>
        </div>
        <div class="col-md-6 col-12 info-box">
          <div class="info-wrapper">
            <img src="../../assets/images/repeat-icon.png">
              <h3 class="info-title-style">100% Receipt Based Reimbursement</h3>
              <p class="info-text-style">
                Managing investments in local partners is a key part of our platform. But you only want to pay for what
                you're sure the local partners have spent. Investment is capped each month based on your pre-defined limits
                and split, and is only reimbursed when receipts are uploaded by the local partner. You can also file a
                dispute and hold back investment if you don't feel funds are being legitimately spent.
              </p>
            </div>
        </div>
      </div>
      <div class="row row-over">
        <div class="col-md-6 col-12 row-img"></div>
        <div class="mobile-img">
          <img src="../../assets/images/BT2_mobile.jpg">
        </div>
        <div class="col-md-6 col-12 greyBackground info-box custom-align">
          <div class="info-wrapper text-align-left">
            <img src="../../assets/images/person-icon.png">
              <h3 class="info-title-style text-align-left">Sales Escrow</h3>
              <p class="info-text-style">
                Generate invoices for product requests and have invoices funded before you dispatch any goods. We'll hold
                their funds in escrow until you ship the goods, and then release the funds to your account.
              </p>
            </div>
        </div>
      </div>
      <div class="row row-over">
        <div class="col-12 info-box centered">
          <div>
            <img src="../../assets/images/message-icon.png">
              <h3 class="info-title-style">Paper Trail & Neutral Referee</h3>
              <p class="info-text-style">
                Each venture has its own detailed event and message history log where we automatically track changes.
                Investment and sales forecasts also have version tracking so you can track changes over time.
              </p>
              <p class="info-text-style margin-top-20">Automatic change tracking and history helps resolve disputes and can be used if disputes need to be escalated to PanXpan for arbitration.</p>
            </div>
        </div>
      </div>
      <section>
        <div class="introduction-footer">
          <div>
            <img src="../../assets/images/logo_small.png">
              <div class="introduction-footer-text">
                <p>Our platform is free to use! Sign up, add your products, and post unlimited proposals.</p>
                <p>
                  Only when you find local partners and they purchase goods from you, will we take 10% of product revenue.
                  The 10% service fee we charge covers money transfers, support and platform running costs.
                </p>
              </div>
            </div>
          <div>
            <button type="button" v-on:click ="getUrl('signup')" class="btn create-account">Create an Account Now!</button>
          </div>
        </div>
      </section>
    </div>
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
  document.title = "Building Trust for Manufacturers - PanXpan";
  }
  }
</script>
