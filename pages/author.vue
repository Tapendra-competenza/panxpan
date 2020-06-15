<template>
  <div>
    <section>
      <div class="about homepage-about blog backgroundImg">
        <h1>Blog</h1>
        <div class="horizontal-line-border-bottom"></div>
      </div>
    </section>
    <section class="middle-section">
      <div class="container">
        <div class="input-group knowledge">
          <span class="input-group-addon search-input-prefix" id="basic-addon1">
            <img class="" src="../assets/images/search-icon.png"/>
          </span>
          <input type="text" class="form-control search-article" placeholder="Search Articles"
                 aria-describedby="basic-addon1">
        </div>
        <div class="row articles">
          <div class="col-md-8 col-sm-8">
            <div>
              <div class="app-breadcrumb">
                <b-breadcrumb :items="breadcrumbItems"/>
              </div>
              <div class="search-result-sort">
                <h4>Sort by</h4>
                <div>
                  <b-form-select v-model="sortBySelected" :options="sortByOptions" class="mb-3">
                  </b-form-select>
                </div>
              </div>
            </div>
            <div class="searched-author-overview">
              <div class="searched-author-pic">
                <img src="../assets/images/dmitry-popoulis.png">
              </div>
              <div class="searched-author-description">
                <div class="info-text">
                  <h4>Speciality:</h4>
                  <span class="operations">Industrial Operations</span>
                  <h4>Focus:</h4>
                  <span>Various</span>
                </div>
                <p>
                  Dmitry is an industrial engineer and an entrepreneur with experience in industrial project management,
                  financial services technical sales and solar energy installations.He has worked in the UK, Germany,
                  France and Greece while also having founded two companies. His interests include industrial
                  automation,
                  operational excellence and photography.
                </p>
              </div>
            </div>
            <div class="searched-article-overview">
              <div class="searched-article-overview-pic">
                <img src="../assets/images/car.png" alt="article-img">
              </div>
              <div class="searched-article-overview-description">
                <h4>Car Sector Changes With Connectivity & Automation</h4>
                <div class="info-text">
                  <i class="fa fa-user icon-style" aria-hidden="true"></i>
                  <span>Dmitry Popolous</span>
                  <i class="fa fa-calendar icon-style" aria-hidden="true"></i>
                  <span>April 24,2017</span>
                </div>
                <p>
                  Building parnerships is all about Trust. But when you've never met your partner face to face and you
                  speak different languages, Trust is difficult to build.
                  We've put Trust front and center in our platform so you have the right foundation to build prosperous
                  partnerships across the globe.
                </p>
              </div>
            </div>
            <div class="searched-article-overview">
              <div class="searched-article-overview-pic">
                <img src="../assets/images/car.png" alt="article-img">
              </div>
              <div class="searched-article-overview-description">
                <h4>Car Sector Changes With Connectivity & Automation</h4>
                <div class="info-text">
                  <i class="fa fa-user icon-style" aria-hidden="true"></i>
                  <span>Dmitry Popolous</span>
                  <i class="fa fa-calendar icon-style" aria-hidden="true"></i>
                  <span>April 24,2017</span>
                </div>
                <p>
                  Building parnerships is all about Trust. But when you've never met your partner face to face and you
                  speak different languages, Trust is difficult to build.
                  We've put Trust front and center in our platform so you have the right foundation to build prosperous
                  partnerships across the globe.
                </p>
              </div>
            </div>
            <div class="searched-article-overview">
              <div class="searched-article-overview-pic">
                <img src="../assets/images/car.png" alt="article-img">
              </div>
              <div class="searched-article-overview-description">
                <h4>Car Sector Changes With Connectivity & Automation</h4>
                <div class="info-text">
                  <i class="fa fa-user icon-style" aria-hidden="true"></i>
                  <span>Dmitry Popolous</span>
                  <i class="fa fa-calendar icon-style" aria-hidden="true"></i>
                  <span>April 24,2017</span>
                </div>
                <p>
                  Building parnerships is all about Trust. But when you've never met your partner face to face and you
                  speak different languages, Trust is difficult to build.
                  We've put Trust front and center in our platform so you have the right foundation to build prosperous
                  partnerships across the globe.
                </p>
              </div>
            </div>
          </div>
          <div class="col-md-4 col-sm-4 article-categories popular hidden-xs">
            <div class="hidden-xs">
              <h4>Popular Countries</h4>
              <a href="#">Egypt(127)</a>
              <a href="#">USA(42)</a>
              <a href="#">India(33)</a>
              <a href="#">Brazil(25)</a>
              <a href="#">UK(30)</a>
              <a href="#">France(23)</a>
              <a href="#">China(13)</a>
              <a href="#">Nigeria(6)</a>
              <a href="#">South Africa(13)</a>
              <a href="#">Australia(4)</a>
              <div class="view-all">
                <a href="#">View All Countries</a>
                <span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
              </div>
            </div>
            <div class="hidden-xs">
              <h4>Popular Topics</h4>
              <a href="#">Online Marketing(75)</a>
              <a href="#">Performance Metrics(48)</a>
              <a href="#">Product Demand(38)</a>
              <a href="#">Strategic Planning(51)</a>
              <a href="#">Lead Generation(57)</a>
              <a href="#">Social Media(56)</a>
              <a href="#">Sales Management(48)</a>
              <a href="#">Managing Staff(45)</a>
              <a href="#">Web Analytics(41)</a>
              <a href="#">Managing Manufacturing(38)</a>
              <div class="view-all">
                <a href="#">View All Topics</a>
                <span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
              </div>
            </div>
            <div>
              <h4>Most Popular</h4>
              <div class="most-popular">
                <img src="../assets/images/tesla.png" class="img-responsive">
                <p>Car Sector Changes With Connectivity & Automation</p>
              </div>
              <div class="most-popular">
                <img src="../assets/images/lab.png" class="img-responsive">
                <p>How LUSH Revamped Global Logistics to Cut Costs</p>
              </div>
              <div class="most-popular">
                <img src="../assets/images/outdoors.png" class="img-responsive">
                <p>Developing a Strong Customer Engagement Culture</p>
              </div>
              <div class="most-popular">
                <img src="../assets/images/tablet.png" class="img-responsive">
                <p>When to Discontinue a Product Line</p>
              </div>
              <div class="most-popular">
                <img src="../assets/images/dog.png" class="img-responsive">
                <p>5 Things Writers Consider in One-Page Optimizing</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import 'assets/vendor/font-awesome/css/font-awesome.css'
  export default{
    data () {
      return {
        breadcrumbItems: [{
          text: 'Home',
          href: '../knowledge-home'
        }, {
          text: 'Dmitry Popolous',
          active: true
        }],
        sortBySelected: '1',
        sortByOptions: [
          {value: '1', text: 'PopularityDate'},
          {value: '2', text: 'Something else'},
          {value: '3', text: 'some text'}
        ]
      }
    }
  }
</script>
