<template>
  <div>
    <section>
      <div class="about homepage-about blog backgroundImg">
        <h1>Blog</h1>
        <div class="horizontal-line-border-bottom"></div>
      </div>
    </section>
    <section class="middle-section all-countries-section">
      <div class="container">
        <div class="input-group knowledge">
          <span class="input-group-addon search-input-prefix" id="basic-addon1">
            <img class="" src="../assets/images/search-icon.png"/>
          </span>
          <input type="text" class="form-control search-article" placeholder="Search Articles"
                 aria-describedby="basic-addon1">
        </div>
        <div class="blog-nav-tab">
          <b-card no-body>
            <b-tabs card>
              <b-tab title="All Countries" active>
                <div class="row">
                  <div class="col-xs-12 col-sm-2">
                    <h4>Europe</h4>
                    <ul>

                      <li><a href="#">UK(127)</a></li>
                      <li><a href="#">France(33)</a></li>
                      <li><a href="#">Italy(30)</a></li>
                      <li><a href="#">Spain(25)</a></li>
                      <li><a href="#">Germany(43)</a></li>
                    </ul>
                    <button class="view-more-btn">View More</button>
                  </div>
                  <div class="col-xs-12 col-sm-2 countries">
                    <h4>Africa</h4>
                    <ul>
                      <li><a href="#">South Africa(26)</a></li>
                      <li><a href="#">Egypt(27)</a></li>
                      <li><a href="#">Nigeria(13)</a></li>
                      <li><a href="#">Kenya(13)</a></li>
                      <li><a href="#">Botswana(2)</a></li>
                    </ul>
                    <button class="view-more-btn">View More</button>
                  </div>
                  <div class="col-xs-12 col-sm-2 countries">
                    <h4>North America</h4>
                    <ul>
                      <li><a href="#">USA(82)</a></li>
                      <li><a href="#">Canada(42)</a></li>
                      <li><a href="#">Mexico(6)</a></li>
                    </ul>
                    <button class="view-more-btn">View More</button>
                  </div>
                  <div class="col-xs-12 col-sm-2 countries">
                    <h4>South America</h4>
                    <ul>
                      <li><a href="#">Brazil(63)</a></li>
                      <li><a href="#">Argentina(9)</a></li>
                      <li><a href="#">Peru(4)</a></li>
                      <li><a href="#">Chile(12)</a></li>
                      <li><a href="#">Columbia(23)</a></li>
                    </ul>
                    <button class="view-more-btn">View More</button>
                  </div>
                  <div class="col-xs-12 col-sm-2 countries">
                    <h4>Asia</h4>
                    <ul>
                      <li><a href="#">China(127)</a></li>
                      <li><a href="#">India(133)</a></li>
                      <li><a href="#">Japan(30)</a></li>
                      <li><a href="#">Pakistan(22)</a></li>
                    </ul>
                    <button class="view-more-btn">View More</button>
                  </div>
                  <div class="col-xs-12 col-sm-2 countries">
                    <h4>Australia</h4>
                  </div>
                </div>
              </b-tab>
              <b-tab title="All Topics">
                <div class="col-sm-12 all-topics">
                  <div class="row">
                    <div class="col-sm-3 topic-box">
                      <h4>External Facing</h4>
                      <ul>
                        <li><a href="#">Advertising(42)</a></li>
                        <li><a href="#">Branding(34)</a></li>
                        <li><a href="#">Sales Management(48)</a></li>
                        <li><a href="#">Lead Generation(57)</a></li>
                        <li><a href="#">Online Marketing(75)</a></li>
                        <li><a href="#">Distribution(11)</a></li>
                        <li><a href="#">Social Media(56)</a></li>
                        <li><a href="#">Email Marketing(12)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>Business Functions</h4>
                      <ul>
                        <li><a href="#">Labor Performance(39)</a></li>
                        <li><a href="#">Portfolio Management(10)</a></li>
                        <li><a href="#">Accounting(16)</a></li>
                        <li><a href="#">Business Ethics(6)</a></li>
                        <li><a href="#">Strategic Planning(51)</a></li>
                        <li><a href="#">Budgeting(14)</a></li>
                        <li><a href="#">Innovation(17)</a></li>
                        <li><a href="#">Project Planning(13)</a></li>
                        <li><a href="#">Financing(15)</a></li>
                        <li><a href="#">Managing Staff(45)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>Production Related</h4>
                      <ul>
                        <li><a href="#">Product Management(14)</a></li>
                        <li><a href="#">Product Development(19)</a></li>
                        <li><a href="#">Maintenance(12)</a></li>
                        <li><a href="#">Production Methodologies(20)</a></li>
                        <li><a href="#">Supply Chain Management(29)</a></li>
                        <li><a href="#">Managing Manufacturing(38)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>Product Attributes</h4>
                      <ul>
                        <li><a href="#">Product Returns(17)</a></li>
                        <li><a href="#">Pricing(22)</a></li>
                        <li><a href="#">Product Demand(38)</a></li>
                        <li><a href="#">Guarantees(9)</a></li>
                        <li><a href="#">Materials & Packaging(4)</a></li>
                        <li><a href="#">Quality(18)</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-sm-3 topic-box">
                      <h4>Analytics</h4>
                      <ul>
                        <li><a href="#">MS Excel(2)</a></li>
                        <li><a href="#">Big Data(23)</a></li>
                        <li><a href="#">Forecasting(25)</a></li>
                        <li><a href="#">Web Analytics(41)</a></li>
                        <li><a href="#">Collaboration(16)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>Software Platforms</h4>
                      <ul>
                        <li><a href="#">CRM(16)</a></li>
                        <li><a href="#">Help Desk Software(1)</a></li>
                        <li><a href="#">EPR Systems(12)</a></li>
                        <li><a href="#">Starting with Analytics(41)</a></li>
                        <li><a href="#">CAD or CAN(16)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>External Analysis</h4>
                      <ul>
                        <li><a href="#">Lore Ipsum(16)</a></li>
                        <li><a href="#">Lore Ipsum Software(1)</a></li>
                        <li><a href="#">Lore Systems(12)</a></li>
                        <li><a href="#">Starting with Lorena(41)</a></li>
                      </ul>
                    </div>
                    <div class="col-sm-3 topic-box">
                      <h4>Industry Specific</h4>
                      <ul>
                        <li><a href="#">Lorena Ipsum(16)</a></li>
                        <li><a href="#">Help Lorem(1)</a></li>
                        <li><a href="#">ERP Ipsum(1)</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </b-tab>
            </b-tabs>
          </b-card>
          <!--<div>-->
            <!--<ul class="nav nav-tabs">-->
              <!--<li class="active all-countries"><a data-toggle="tab" href="#home"></a></li>-->
              <!--<li><a data-toggle="tab" href="#menu1"> </a></li>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<div class="tab-content container">-->
            <!--<div id="home" class="tab-pane fade in active popular">-->
              <!--<div class="row customized-with-paddings">-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>Europe</h4>-->
                  <!--<ul>-->
                    <!--<li><a href="#">UK(127)</a></li>-->
                    <!--<li><a href="#">France(33)</a></li>-->
                    <!--<li><a href="#">Italy(30)</a></li>-->
                    <!--<li><a href="#">Spain(25)</a></li>-->
                    <!--<li><a href="#">Germany(43)</a></li>-->
                  <!--</ul>-->
                  <!--<button class="view-more-btn">View More</button>-->
                <!--</div>-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>Africa</h4>-->
                  <!--<ul>-->
                    <!--<li><a href="#">South Africa(26)</a></li>-->
                    <!--<li><a href="#">Egypt(27)</a></li>-->
                    <!--<li><a href="#">Nigeria(13)</a></li>-->
                    <!--<li><a href="#">Kenya(13)</a></li>-->
                    <!--<li><a href="#">Botswana(2)</a></li>-->
                  <!--</ul>-->
                  <!--<button class="view-more-btn">View More</button>-->
                <!--</div>-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>North America</h4>-->
                  <!--<ul>-->
                    <!--<li><a href="#">USA(82)</a></li>-->
                    <!--<li><a href="#">Canada(42)</a></li>-->
                    <!--<li><a href="#">Mexico(6)</a></li>-->
                  <!--</ul>-->
                  <!--<button class="view-more-btn">View More</button>-->
                <!--</div>-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>South America</h4>-->
                  <!--<ul>-->
                    <!--<li><a href="#">Brazil(63)</a></li>-->
                    <!--<li><a href="#">Argentina(9)</a></li>-->
                    <!--<li><a href="#">Peru(4)</a></li>-->
                    <!--<li><a href="#">Chile(12)</a></li>-->
                    <!--<li><a href="#">Columbia(23)</a></li>-->
                  <!--</ul>-->
                  <!--<button class="view-more-btn">View More</button>-->
                <!--</div>-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>Asia</h4>-->
                  <!--<ul>-->
                    <!--<li><a href="#">China(127)</a></li>-->
                    <!--<li><a href="#">India(133)</a></li>-->
                    <!--<li><a href="#">Japan(30)</a></li>-->
                    <!--<li><a href="#">Pakistan(22)</a></li>-->
                  <!--</ul>-->
                  <!--<button class="view-more-btn">View More</button>-->
                <!--</div>-->
                <!--<div class="col-xs-12 col-sm-2 countries">-->
                  <!--<h4>Australia</h4>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
            <!--<div id="menu1" class="tab-pane fade popular">-->
              <!--<div class="row">-->
                <!--<div class="col-sm-12">-->
                  <!--<div class="row">-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>External Facing</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Advertising(42)</a></li>-->
                        <!--<li><a href="#">Branding(34)</a></li>-->
                        <!--<li><a href="#">Sales Management(48)</a></li>-->
                        <!--<li><a href="#">Lead Generation(57)</a></li>-->
                        <!--<li><a href="#">Online Marketing(75)</a></li>-->
                        <!--<li><a href="#">Distribution(11)</a></li>-->
                        <!--<li><a href="#">Social Media(56)</a></li>-->
                        <!--<li><a href="#">Email Marketing(12)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Business Functions</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Labor Performance(39)</a></li>-->
                        <!--<li><a href="#">Portfolio Management(10)</a></li>-->
                        <!--<li><a href="#">Accounting(16)</a></li>-->
                        <!--<li><a href="#">Business Ethics(6)</a></li>-->
                        <!--<li><a href="#">Strategic Planning(51)</a></li>-->
                        <!--<li><a href="#">Budgeting(14)</a></li>-->
                        <!--<li><a href="#">Innovation(17)</a></li>-->
                        <!--<li><a href="#">Project Planning(13)</a></li>-->
                        <!--<li><a href="#">Financing(15)</a></li>-->
                        <!--<li><a href="#">Managing Staff(45)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Production Related</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Product Management(14)</a></li>-->
                        <!--<li><a href="#">Product Development(19)</a></li>-->
                        <!--<li><a href="#">Maintenance(12)</a></li>-->
                        <!--<li><a href="#">Production Methodologies(20)</a></li>-->
                        <!--<li><a href="#">Supply Chain Management(29)</a></li>-->
                        <!--<li><a href="#">Managing Manufacturing(38)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Product Attributes</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Product Returns(17)</a></li>-->
                        <!--<li><a href="#">Pricing(22)</a></li>-->
                        <!--<li><a href="#">Product Demand(38)</a></li>-->
                        <!--<li><a href="#">Guarantees(9)</a></li>-->
                        <!--<li><a href="#">Materials & Packaging(4)</a></li>-->
                        <!--<li><a href="#">Quality(18)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                  <!--</div>-->
                  <!--<div class="row">-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Analytics</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">MS Excel(2)</a></li>-->
                        <!--<li><a href="#">Big Data(23)</a></li>-->
                        <!--<li><a href="#">Forecasting(25)</a></li>-->
                        <!--<li><a href="#">Web Analytics(41)</a></li>-->
                        <!--<li><a href="#">Collaboration(16)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Software Platforms</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">CRM(16)</a></li>-->
                        <!--<li><a href="#">Help Desk Software(1)</a></li>-->
                        <!--<li><a href="#">EPR Systems(12)</a></li>-->
                        <!--<li><a href="#">Starting with Analytics(41)</a></li>-->
                        <!--<li><a href="#">CAD or CAN(16)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>External Analysis</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Lore Ipsum(16)</a></li>-->
                        <!--<li><a href="#">Lore Ipsum Software(1)</a></li>-->
                        <!--<li><a href="#">Lore Systems(12)</a></li>-->
                        <!--<li><a href="#">Starting with Lorena(41)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                    <!--<div class="col-sm-3 topic-box">-->
                      <!--<h4>Industry Specific</h4>-->
                      <!--<ul>-->
                        <!--<li><a href="#">Lorena Ipsum(16)</a></li>-->
                        <!--<li><a href="#">Help Lorem(1)</a></li>-->
                        <!--<li><a href="#">ERP Ipsum(1)</a></li>-->
                      <!--</ul>-->
                    <!--</div>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        </div>
      </div>
    </section>
  </div>
</template>
