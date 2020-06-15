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
            <img src="../assets/images/search-icon.png"/>
          </span>
          <input type="text" class="form-control search-article" placeholder="Search Articles"
                 aria-describedby="basic-addon1">
        </div>
        <div class="row articles">
          <div class="col-md-8 col-sm-8 article filter-screen author">
            <div class="app-breadcrumb">
              <b-breadcrumb :items="breadcrumbItems"/>
            </div>
            <div class="article-wrapper">
              <div class="article-text">
                <div>
                  <h4>Car Sector Changes With Connectivity & Automation</h4>
                  <div class="info-text">
                    <i class="fa fa-user icon-style" aria-hidden="true"></i>
                    <span>Dmitry Popolous</span>
                    <i class="fa fa-calendar icon-style" aria-hidden="true"></i>
                    <span>April 24,2017</span>
                  </div>
                </div>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu placerat arcu. In hac habitasse platea dictumst
                    . Phasellus gravida dui mi, at elementum velit volutpat non. Aliquam quis tristique nisl. Etiam imperdiet nibh eget mi tincidunt commodo.
                    Vestibulum suscipit tempor nisl eget ornare. Morbi mollis imperdiet ipsum, sed aliquet neque. Nunc tincidunt convallis massa nec lobortis.
                    Nam porta lectus at risus aliquet, id lobortis elit lacinia. Ut nec libero hendrerit, tempor urna id, sodales erat.
                    In eleifend nulla lorem, et elementum metus consequat efficitur. Donec et ante euismod, porttitor dui id, luctus odio.
                    Aenean in eros quis nunc commodo pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.<br>
                    Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum.
                    Aliquam odio neque, eleifend id pulvinar at, vehicula sed nisl. Duis scelerisque ipsum ac venenatis faucibus.
                    Suspendisse accumsan mi sed diam aliquet dapibus. Nam orci erat, pellentesque vel dolor sit amet, hendrerit rutrum mauris.
                    Aliquam erat volutpat. Nullam luctus ipsum ullamcorper tellus porta viverra.
                  </p>
                  <div class="article-img">
                    <img src="../assets/images/tesla.png" alt="articleImg">
                  </div>
                  <p>
                    Building parnerships is all about Trust. But when you've never met your partner face to face and you
                    speak different languages, Trust is difficult to build.
                    We've put Trust front and center in our platform so you have the right foundation to build prosperous
                    partnerships across the globe.
                  </p>
                  <div class="topics-container">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu placerat arcu. In hac habitasse platea dictumst.
                      Phasellus gravida dui mi, at elementum velit volutpat non. Aliquam quis tristique nisl. Etiam imperdiet nibh eget mi tincidunt commodo.
                      Vestibulum suscipit tempor nisl eget ornare. Morbi mollis imperdiet ipsum, sed aliquet neque. Nunc tincidunt convallis massa nec lobortis.
                      Nam porta lectus at risus aliquet, id lobortis elit lacinia. Ut nec libero hendrerit, tempor urna id, sodales erat.
                      In eleifend nulla lorem, et elementum metus consequat efficitur. Donec et ante euismod, porttitor dui id, luctus odio.
                      Aenean in eros quis nunc commodo pretium. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                    </p>
                    <h4>Topics Title</h4>
                    <p>
                      1. Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum.
                      Aliquam odio neque, eleifend id pulvinar at, vehicula sed nisl. Duis scelerisque ipsum ac venenatis faucibus.
                    </p>
                    <p>
                      2. Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum. Aliquam odio neque, eleifend id.
                    </p>
                    <p>
                      3. Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum. Aliquam.
                    </p>
                    <p>
                      4. Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum.
                      Aliquam odio neque, eleifend id pulvinar at, vehicula sed nisl. Duis scelerisque ipsum ac venenatis faucibus.
                    </p>
                    <p>
                      5. Fusce lacinia sapien non enim semper, quis viverra lacus fermentum. Sed vehicula sodales lorem at rutrum. Aliquam odio neque, eleifend id pulvinar at, vehicula sed nisl.
                    </p>
                  </div>
                </div>
                <div class="article-tags-wrapper">
                  <p>Tags:</p>
                  <div class="article-tags-box">
                    <span>Budgeting</span>
                    <span>Lore Ipsum</span>
                  </div>
                </div>
              </div>
            </div>
            <!--<div class="col-xs-12 recommended">-->
              <!--<div class="row">-->
                <!--<div class="col-xs-12 other-articles">-->
                  <!--<h5>Other Recommended Articles</h5>-->
                <!--</div>-->
                <!--<div class="col-xs-6 col-sm-6 col-md-3">-->
                  <!--<img src="../assets/images/how-it-works-home.jpg" class="img-responsive">-->
                  <!--<h5>Article Title</h5>-->
                <!--</div>-->
                <!--<div class="col-xs-6 col-sm-6 col-md-3">-->
                  <!--<img src="../assets/images/how-it-works-home.jpg" class="img-responsive">-->
                  <!--<h5>Article Title</h5>-->
                <!--</div>-->
                <!--<div class="col-xs-6 col-sm-6 col-md-3 hidden-xs">-->
                  <!--<img src="../assets/images/how-it-works-home.jpg" class="img-responsive">-->
                  <!--<h5>Article Title</h5>-->
                <!--</div>-->
                <!--<div class="col-xs-6 col-sm-6 col-md-3 hidden-xs">-->
                  <!--<img src="../assets/images/how-it-works-home.jpg" class="img-responsive">-->
                  <!--<h5>Article Title</h5>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
          <div class="col-md-4 col-sm-4 article-categories articles">
            <div class="popular hidden-xs">
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
            <div class="popular hidden-xs">
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
            <div class="popular hidden-xs">
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
