<template>
  <div>
    <country-select :country-selected-data="$route.query.countryCode" v-model="countryValue"></country-select>
    <div style="width:100%" fxLayoutAlign="center center">
    <div class="col-md-11"  fxLayout="row" style="margin-left: 50px;">
    <div style="min-height: 80vh; padding-top: 50px;" v-if='!proposalDetails.client'>
      <div class='loading-spinner mt-4 mb-5' v-if='!proposalDetails.client'></div>
    </div>
    <div class="page-container" v-if='proposalDetails.client' style="padding:68px 0px 50px 0px !important">
      <div class="breadcrumb-container clearfix">
        <div class="page-adress">
          <p>
            <router-link :to="{ path: '/find/search-products'}">
              All Opportunities
            </router-link>
            > {{proposalDetails.name}}
          </p>
        </div>
        <div class="main-buttons">
          <div class="input-group">
          <router-link :to="{ path: '/find/search-products'}">
            <button class="grey pxp-btn" >Go Back</button>
          </router-link>
          </div>
          <div class="input-group" v-if="(user!= null && (isSignupBtnHover || !isSignupBtnHover ) )||(user == null && !isSignupBtnHover)" v-on:mouseover="isSignupBtnHover = true">
          <button style="width:150px;" class="pxp-btn" v-on:click ="redirectUrl()" >
            <i class="fa fa-envelope-open-o" aria-hidden="true"></i> Apply
          </button>
          </div>
          <div class="input-group" style="position: relative; border:1px solid #16aaf2;border-radius:5px; height: 35px;" v-if="user== null  &&  isSignupBtnHover" v-on:mouseleave="isSignupBtnHover = false">
            <input class="form-control"
                   type="text"
                   name="email"
                   placeholder="Enter Email.. "
                   v-model="dataEmail"
                   required="" style="float: left;border: none; background:none; width:110px;">
              <span class="input-group-btn">
                <button style="width:50px;background: none; margin-right: 0px !important;" class="pxp-btn" v-on:click="redirectLoginUrl(proposalDetails.id)" >
            <i class="fab fa-telegram-plane send-icon" aria-hidden="true" style="color:#16aaf2; font-size: 20px;"></i>
          </button>
              </span>
            </div>
        </div>
      </div>
      <div class="partner-information-container proposal-containers">
        <div class="row">
          <div class="col-lg-7">
            <div class="company-name-wrapper row  clearfix">
              <div class="company-name col-md-6">
                <div>
                  <img v-bind:src="getCompImage(proposalDetails.client.logo)"/>
                  <h3 v-if="proposalDetails.client && proposalDetails.client.name.length <=25" style="color:#757C82;font-family: Lato;">{{proposalDetails.client.name}}
                  </h3>
                  <h3 v-if="proposalDetails.client && proposalDetails.client.name.length>25" style="color:#757C82;font-family: Lato;" v-b-tooltip.html.top=""
                          v-bind:title="proposalDetails.client.name" >{{proposalDetails.client.name| truncate(25)}}</h3>
                </div>
                <div>
                  <p v-if="proposalDetails.client && proposalDetails.client.description.length <= 30" style="color:#90989F;font-family: Lato;" >{{proposalDetails.client.description}}</p>
                  <p v-if="proposalDetails.client && proposalDetails.client.description.length> 30" style="color:#90989F;font-family: Lato;" v-b-tooltip.html.top=""
                          v-bind:title="proposalDetails.client.description">{{proposalDetails.client.description}}</p>
                </div>
              </div>
              <div class="company-country col-md-6 pull-right">
                <span v-if="proposalDetails.client" class="pull-right">
                  Country: <img v-bind:src="getPic(proposalDetails.client.country)" height="12" width="12"  style="border-radius:12px;" class="imagelogo"/>
                  {{countryFullName}}
                </span>
                </br>
                <span  v-if="proposalDetails.client" class="pull-right">Member Since: {{proposalDetails.client.createDate | formatDate }}</span>
              </div>
            </div>
            <div class="partner-information-row">
              <div>
                <div class="star-rating">
                  <star-rating
                    v-if="proposalDetails.client"
                    v-bind:rating="proposalDetails.client.rating"
                    v-bind:increment="0.5"
                    v-bind:max-rating="5"
                    inactive-color="#D9D9D9"
                    active-color="#16AAF2"
                    v-bind:star-size="18"
                    v-bind:read-only="true"
                    text-class="app-rating-text"
                  >
                  </star-rating>
                </div>
                <span v-if="proposalDetails.client.rating !== 0"
                      class="information-text-style">
                  {{proposalDetails.client.rating}}/5 stars
                </span>
                <span v-if="proposalDetails.client.rating === 0" class="information-text-style">N/A</span>
              </div>
            </div>
            <div class="partner-information-row">
              <div>
                <img src="../assets/images/building.png" height="16" width="13"/>
                <span class="information-text-style"
                      v-if="proposalDetails.client">
                  {{proposalDetails.client.ventures}} Ventures
                </span>
              </div>
              <div>
                <img src="../assets/images/earth.png"/>
                <span class="information-text-style"
                      v-if="proposalDetails.client">
                  {{proposalDetails.client.countries}} Countries
                </span>
              </div>
            </div>
            <div class="product-quality partner-information-row">
              <img src="../assets/images/box_grey.png" width="14px" height="15px"/>
              <span class="information-text-style">Product Quality:</span>
              <div>
                <div class="star-rating">
                  <star-rating
                    v-if="proposalDetails.client"
                    v-bind:rating="proposalDetails.client.productRating"
                    v-bind:increment="0.5"
                    v-bind:max-rating="5"
                    inactive-color="#D9D9D9"
                    active-color="#EBD916"
                    v-bind:star-size="18"
                    v-bind:read-only="true"
                    text-class="app-rating-text"
                  >
                  </star-rating>
                </div>
                <span v-if="proposalDetails.client.productRating !== 0"
                      class="information-text-style">
                  {{proposalDetails.client.rating}}/5 stars
                </span>
                <span v-if="proposalDetails.client.productRating === 0" class="information-text-style">N/A</span>
              </div>
            </div>
          </div>
          <div class="col-lg-5 feedback-container">
            <div class="container-title">
              <h4 style="font-size: 16px;">Feedback:</h4>
              <span class="feedback-number-circle"
                    v-if="proposalDetails.feedbacks && proposalDetails.feedbacks.length>0">{{proposalDetails.feedbacks.length}}</span>
            </div>
            <p class="no-result-text" v-if="proposalDetails.feedbacks.length === 0">
              <span>
                <img style="height: 18px;" class="box_img" src="../assets/images/no_tasks_Icon.png" />&nbsp;<span style="font-size:20px;">No Feedback</span>
              </span>
            </p>
            <div v-if="proposalDetails.feedbacks.length > 0">
              <b-carousel id="carousel1"
                          :controls="true"
                          :indicators="false"
                          background="transparent"
                          :interval="0"
              >
                <b-carousel-slide v-for="feedback in proposalDetails.feedbacks">
                  <div class="feedback-slider">
                    <div class="partner-about">
                      <div>
                        <div class="partner-pic">
                          <img v-bind:src="getCompImage(feedback.logoOriginal)"/>
                        </div>
                        <div>
                          <div class="partner-rating">
                            <p style="word-wrap: break-word;">{{feedback.name}}</p>
                            <div>
                              <star-rating v-if="proposalDetails.client"
                                           v-bind:rating="feedback.rating"
                                           v-bind:increment="0.5"
                                           v-bind:max-rating="5"
                                           inactive-color="#D9D9D9"
                                           active-color="#EBD916"
                                           v-bind:star-size="10"
                                           v-bind:read-only="true"
                                           text-class="app-rating-text">
                              </star-rating>
                              <span v-if="feedback.rating !== 0" style="padding-bottom:0px;margin-bottom:0px;">{{feedback.rating}}/5 stars</span>
                              <span v-if="feedback.rating === 0">N/A</span>
                            </div>
                          </div>
                          <div class="partner-about-row">
                            <img v-bind:src="getPic(feedback.country)"  height="14" width="14" style="border-radius:14px;" />
                            <span class="partner-about-text">{{getCountryFullName(feedback.country)}}</span>
                          </div>
                          <div class="partner-about-row">
                            <div>
                              <img src="../assets/images/box_blue.png" height="11" width="11"/>
                              <span class="partner-about-text">{{feedback.products}}</span>
                            </div>
                            <div>
                              <img src="../assets/images/clock_blue.png"/>
                              <span class="partner-about-text">1 Year</span>
                            </div>
                          </div>
                          <div class="partner-about-row" v-if="!feedback.individual">
                            <img src="../assets/images/building_blue.png" height="13" width="12"/>
                            <span class="partner-about-text">Business</span>
                          </div>
                          <div class="partner-about-row" v-if="feedback.individual">
                            <img src="../assets/images/bag_blue.png">
                              <span class="partner-about-text">Individual</span>
                            </div>
                        </div>
                      </div>

                      <div class="partner-overview">
                        <p>
                          {{feedback.text}}
                        </p>
                      </div>
                    </div>
                  </div>
                </b-carousel-slide>

              </b-carousel>
            </div>
          </div>
        </div>
      </div>
      <div class="page-content row">
        <div class="content-left col-md-7">
          <form class="product-description-container proposal-containers">
            <div class="product-description">
              <div class="proposal-info">
                <div class="company-info">
                  <h4>{{proposalDetails.name}}</h4>
                  <p>
                    {{proposalDetails.description}}
                  </p>
                </div>
                <div class="contract-length">
                  <img src="../assets/images/clock.png" height="15" width="15"/>
                  <h4>Contract Term Length:</h4>
                  <span>{{proposalDetails.years}} year</span>
                </div>
                <div class="start-date">
                  <img src="../assets/images/calendar.png" height="15" width="15"/>
                  <h4>Start Date:</h4>
                  <span>{{proposalDetails.startDate | formatStartDate}}</span>
                </div>
              </div>
            </div>
          </form>
          <form class="proposal-containers">
            <div class="select-products">
              <div>
                <img src="../assets/images/box_grey.png" height="15" width="15"/>
                <h4>Products:</h4>
              </div>
              <div class="chip-container"
                   data-toggle="modal"
                   @click="openModal()"
                   data-target="#myModal"
                   v-bind:class="{ active: $route.query.productId === product.id}"
                   v-for="product in proposalDetails.products"
                   v-b-modal.myModal="">
                <img v-bind:src="product.miniThumbnail" v-if="product.miniThumbnail" height="15" width="15" style="border-radius:20px"/>
                <span>{{product.name}} </span>
                <i class="fa fa-angle-right arrow-right" aria-hidden="true"></i>
              </div>
            </div>
          </form>
          <div class="proposal-containers" v-if="proposalDetails.questions.length>0">
            <div class="questions">
              <div>
                <h4>Questions</h4>
                <ul>
                  <li class="questions-list" v-for="(question, index) in proposalDetails.questions">
                    <span v-if="index < 9">0</span>{{index + 1}}. {{question["question"]}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right col-md-5">
          <div class="proposal-containers">
            <div>
              <!--<div>
    <div>
      <img src="../assets/images/green_box_15.png" style="height: 15px; width: 15px;" />
      <h4 style="font-size: 14px;font-weight: 500; color:#757C82">Avg. Annual Sales Target: </h4>
    </div>
    <p style="font-size: 13px;color:#757C82">{{currecyCode}}{{proposalDetails.annualTarget}}</p>
  </div>-->
              <div>
                <div>
                  <img src="../assets/images/investment.png" style="height: 15px; width: 15px;" />
                  <h4 style="font-size: 14px;font-weight: 500; color:#757C82">Investment Available: </h4>
                </div>
                <p style="font-size: 13px;color:#757C82">
                  {{currecyCode}}{{fundSizes[this.proposalDetails.fundSize-1].from}}<span v-if="fundSizes[this.proposalDetails.fundSize - 1].to == null">+</span>
                  <span v-if="fundSizes[this.proposalDetails.fundSize - 1].to !== null"> - {{currecyCode}}{{ fundSizes[this.proposalDetails.fundSize-1].to }}</span>
                  per year
                </p>
              </div>
              <!--<div>
    <div>
      <img src="../assets/images/investment.png" style="height: 15px; width: 15px;" />
      <h4 style="font-size: 14px;font-weight: 500; color:#757C82">Preferred Investment Split with Local Partner:</h4>
    </div>
    <p style="font-size: 13px;color:#757C82">{{ investmentSplit }}</p>
  </div>-->
            </div>
          </div>
          <form class="proposal-containers">
            <div class="responsibility-container row">
              <div class="partner-respons-column col-md-6">
                <div class="title">
                  <h4>Local Partner Responsibility</h4>
                </div>
                <div class="responsibility-list">
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.sales === '' || proposalDetails.partnerResp.sales)">
                    <img src="../assets/images/sales_grey.png"/>
                    <p>Sales</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.returns === '' || proposalDetails.partnerResp.returns)">
                    <img src="../assets/images/returns_grey.png"/>
                    <p>Returns</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.marketing === '' || proposalDetails.partnerResp.marketing)">
                    <img src="../assets/images/marketing_grey.png"/>
                    <p>Marketing</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.manufacturing === '' || proposalDetails.partnerResp.manufacturing)">
                    <img src="../assets/images/manufacturing_grey.png"/>
                    <p>Manufacturing</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.customerSupport === '' || proposalDetails.partnerResp.customerSupport)">
                    <img src="../assets/images/customer_support_grey.png"/>
                    <p>Customer Support</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.warehouseLogistics === '' || proposalDetails.partnerResp.warehouseLogistics)">
                    <img src="../assets/images/warehouse_grey.png"/>
                    <p> Warehouse & Logistics</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.paymentsProcessing === '' || proposalDetails.partnerResp.paymentsProcessing)">
                    <img src="../assets/images/payment_grey.png"/>
                    <p>Payments & Processing</p>
                  </div>
                </div>
              </div>
              <div class="manufacturer-respons-column col-md-6">
                <div class="title">
                  <h4>Manufacturer Responsibility</h4>
                </div>
                <div class="responsibility-list">
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.sales !== '' && !proposalDetails.partnerResp.sales)">
                    <img src="../assets/images/sales_grey.png"/>
                    <p>Sales</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.returns !== '' && !proposalDetails.partnerResp.returns)">
                    <img src="../assets/images/returns_grey.png"/>
                    <p>Returns</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.marketing !== '' && !proposalDetails.partnerResp.marketing)">
                    <img src="../assets/images/marketing_grey.png"/>
                    <p>Marketing</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.manufacturing !== '' && !proposalDetails.partnerResp.manufacturing)">
                    <img src="../assets/images/manufacturing_grey.png"/>
                    <p>Manufacturing</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.customerSupport !== '' && !proposalDetails.partnerResp.customerSupport)">
                    <img src="../assets/images/customer_support_grey.png"/>
                    <p>Customer Support</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.warehouseLogistics !== '' && !proposalDetails.partnerResp.warehouseLogistics)">
                    <img src="../assets/images/warehouse_grey.png"/>
                    <p>Warehouse & Logistics</p>
                  </div>
                  <div v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.paymentsProcessing !== '' && !proposalDetails.partnerResp.paymentsProcessing)">
                    <img src="../assets/images/payment_grey.png"/>
                    <p>Payments & Processing</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="responsibility-edit">
              <div class="responsibility-edit-title">
                <p>You will be responsible for the following functions:</p>
              </div>
              <p style="text-align: center" v-if="!proposalDetails.partnerResp">You don't have any responsibilities</p>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.sales === '' || proposalDetails.partnerResp.sales)">
                <div class="function-list-name">
                  <img src="../assets/images/sales_grey.png"/>
                  <p>Sales</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.sales}}</p>
                </div>
              </div>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.returns === '' || proposalDetails.partnerResp.returns)">
                <div class="function-list-name">
                  <img src="../assets/images/returns_grey.png"/>
                  <p>Returns</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.returns}}</p>
                </div>
              </div>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.marketing === '' || proposalDetails.partnerResp.marketing)">
                <div class="function-list-name">
                  <img src="../assets/images/marketing_grey.png"/>
                  <p>Marketing</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.marketing}}</p>
                </div>
              </div>
              <div class="function-list"
                   v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.manufacturing === '' || proposalDetails.partnerResp.manufacturing)">
                <div class="function-list-name">
                  <img src="../assets/images/manufacturing_grey.png"/>
                  <p>Manufacturing</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.manufacturing}}</p>
                </div>
              </div>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.customerSupport === '' || proposalDetails.partnerResp.customerSupport)">
                <div class="function-list-name">
                  <img src="../assets/images/customer_support_grey.png"/>
                  <p>Customer Support</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.customerSupport}}</p>
                </div>
              </div>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.warehouseLogistics === '' || proposalDetails.partnerResp.warehouseLogistics)">
                <div class="function-list-name">
                  <img src="../assets/images/warehouse_grey.png"/>
                  <p>Warehouse & Logistics</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.warehouseLogistics}}</p>
                </div>
              </div>
              <div class="function-list" v-if="proposalDetails.partnerResp &&
                  (proposalDetails.partnerResp.paymentsProcessing === '' || proposalDetails.partnerResp.paymentsProcessing)">
                <div class="function-list-name">
                  <img src="../assets/images/payment_grey.png"/>
                  <p>Payments & Processing</p>
                </div>
                <div class="function-list-description">
                  <p>{{proposalDetails.partnerResp.paymentsProcessing}}</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <b-modal id="myModal"
             class="modal-xl"
             :hide-footer="true"
             title="View Products">
      <div class="pricing-group-container" v-for="(products, idx) in groupedProducts" v-if="products && products.length !== 0">
        <div class="pricing-group-title">
          <h4>Pricing Group {{idx}}</h4>
          <img src="../assets/images/info_icon.png" height="24" width="24"   v-b-tooltip.html.top="" title="Add similar products that can be bought interchangeably.
    Total units purchased (for all products within this pricing group) will be used when calculating unit pricing for each product.
    Unit pricing is based on sales within a rolling 12 month period."/>
        </div>
        <carousel
          v-if="isModalOpened"
          :paginationEnabled="false"
          :navigationEnabled="!isMobile"
          :navigationClickTargetSize="20"
          :perPageCustom="[[1400, 5], [1200, 4], [900, 3], [660, 2], [200, 1]]">
          <slide v-for="(product, index) in products" :key="index">
            <div class='app-box' style="width:200px;">
              <div class='item-img'>
                <img v-if="product.img" v-bind:src="product.img" height="124" style="max-width:170px" />
                <img  v-if="!product.img" src='../assets/images/no-product-image.png' height='124' width='105'/>
              </div>
              <div class='item-content'>
                <div class='item-title'>
                  <h4  v-if="product.name.length<=25">{{product.name}}</h4>
                  <h4  v-if="product.name.length>25" v-b-tooltip.html.top="" v-bind:title="product.name" >{{product.name|  truncate(25)}}</h4>
                </div>
                <div class='item-description'>
                  <p v-bind:class="{ noUrl: product.url === null }">
                    {{product.description | truncate(100)}}
                    <span v-b-tooltip.html.top=""
                          v-bind:title="product.description"
                          v-if="(product.url !== null && product.description.length > 100) || (product.url === null && product.description.length > 100)">
                      Read more
                    </span>
                  </p>

                </div>
                <div v-if="product.url !== null">
                  <a class="client-url"  v-if="product.url.length <=30" >{{product.url}}</a>
                  <a class="client-url" v-b-tooltip.html.top="" v-if="product.url.length>30" v-bind:title="product.url">{{product.url| truncate(30)}}</a>
                </div>
                <div class="app-tiers-dropdown-wrapper">
                  <p>
                    Pricing: <span>{{currecyCode}}{{product.cheapestPrice|currency}}/piece</span>
                  </p>
                  <div class="app-tiers-dropdown">
                    <ul>
                      <li>
                        <div>
                          <span>Suggested Retail Price:</span>
                        </div>
                        <div>
                          <span>{{currencySymble }} {{product.sugPrice|currency}}</span>
                        </div>
                      </li>
                      <li>
                        <div v-if="product.minPrice>0">
                          <span>Minimum Retail Price:</span>
                        </div>
                        <div v-if="product.minPrice>0">
                          <span>{{currencySymble }} {{product.minPrice|currency}}</span>
                        </div>
                      </li>
                    </ul>
                    <ul>
                      <li></li>
                      <li v-for="tier in product.tiers">
                        <div>{{tier.from}}<span v-if="!tier.to">+</span><span v-if="tier.to"> -</span> {{tier.to}} units</div>
                        <div>{{currecyCode}}{{tier.price|currency}}</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class='app-buttons' v-if="(user!= null && (isSignupBtnHover || !isSignupBtnHover ) )||(user == null && product.id != selectedProductId)" v-on:mouseover="mouseover(product)">
                <button class='send-app-btn'>Send Application</button>
              </div>
              <div class="app-buttons" v-if="user== null  &&  isSignupBtnHover && product.id == selectedProductId" v-on:mouseleave="mouseleave()">
                <div class="input-group" style="position: relative; border:1px solid #16aaf2;border-radius:10px; height:33px;margin:10px 0">
                  <input class="form-control"
                         type="text"
                         v-bind:name="product.id"
                         placeholder="Enter Email.. "
                         v-model="dataEmail"
                         v-bind:id ="product.id"
                         required="" style="float: left;border: none; background:none; width:122px; border-radius:10px">
                    <span class="input-group-btn">
                      <button class="input-btn" type="submit" v-on:click="redirectLoginUrl(product.proposalId)" style="width: 50px;float: left;margin: 0px;border: none;background: none;height:33px">
                        <i class="fab fa-telegram-plane send-icon" style="color:#16aaf2; font-size: 20px;"></i>
                      </button>
                    </span>
                  </div>
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </b-modal>
    </div>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'
  import moment from 'moment'
  import StarRating from 'vue-star-rating'
  import Vue from 'vue'
  import CountrySelect from '~/components/CountrySelect.vue'
  import CxltToastr from 'cxlt-vue2-toastr'
  import 'cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css'
  var toastrConfigs = {
  position: 'bottom center',
  showDuration:0,
  timeOut:500000
  }
  Vue.use(CxltToastr, toastrConfigs)

  export default {
  components: {
  StarRating,
  Multiselect,
  CountrySelect
  },
  filters: {
  truncate: function (string, value) {
  if (string.length > value) {
  return string.substring(0, value) + '...'
  } else {
  return string
  }
  },
  formatDate: function (value) {
  if (value) {
  return moment(String(value)).format('YYYY')
  }
  },
  formatStartDate: function (value) {
  if (value) {
  return moment(String(value)).format('MM/DD/YYYY')
  }
  },
  currency(amount) {
  const amt = Number(amount)
  return amt && amt.toLocaleString(undefined, {maximumFractionDigits:2}) || '0'
  }
  },
  props: {
  proposal: {},
  },
  watch: {
  'countryValue': function () {
  if (this.countryValue.code2 !== this.$route.query.countryCode) {
  this.$router.replace({path: '/find/search-products'})
  }
  }
  },
  data () {
  return {
  countryFullName:'',
  isMobile: false,
  investmentSplits: {
  0: '10-20% You / 80-90% Local Partner',
  1: '20-40% You / 60-80% Local Partner',
  2: '40-60% You / 40-60% Local Partner',
  3: '60-80% You / 20-40% Local Partner',
  4: '80-100% You / 0-20% Local Partner'
  },
  countryCode: '',
  user:null,
  investmentSplit: null,
  isModalOpened: false,
  isSignupBtnHover:false,
  fundSizes: [],
  fundSize: null,
  proposalDetails: {
  questions: [],
  products: []
  },
  groupedProducts: [],
  errors: [],
  selectedProductId:'',
  countryOptions: [
  'China',
  'Chipre',
  'Denmark',
  'El Salvador',
  'France',
  'Finland'
  ],
  countryData: [
  [1, 'Liechtenstein', 'LIE', 'Europe & Central Asia', 2014, 6.66, 0, -0.01, 2014, 178713, 2015, 0.04, 'LI'],
  [1, 'Monaco', 'MCO', 'Europe & Central Asia', 2011, 6.07, 2008, 0.1, 2011, 163352, 2015, 0.04, 'MC'],
  [1, 'Luxembourg', 'LUX', 'Europe & Central Asia', 2015, 57.79, 2015, 0.05, 2015, 101450, 2015, 0.57, 'LU'],
  [1, 'Bermuda', 'BMU', 'North America', 2013, 5.57, 2013, -0.03, 2013, 85748, 2015, 0.07, 'BM'],
  [1, 'Isle of Man', 'IMN', 'Europe & Central Asia', 2014, 7.43, 2014, 0.05, 2014, 85258, 2015, 0.09, 'IM'],
  [1, 'Switzerland', 'CHE', 'Europe & Central Asia', 2015, 670.79, 2015, 0.01, 2015, 80945, 2015, 8.29, 'CH'],
  [1, 'Macao', 'MAC', 'East Asia & Pacific', 2015, 46.18, 2015, -0.2, 2015, 78586, 2015, 0.59, 'MO'],
  [1, 'Norway', 'NOR', 'Europe & Central Asia', 2015, 386.58, 2015, 0.02, 2015, 74400, 2015, 5.2, 'NO'],
  [1, 'Qatar', 'QAT', 'Middle East & North Africa', 2015, 164.64, 2015, 0.04, 2015, 73653, 2015, 2.24, 'QA'],
  [1, 'San Marino', 'SMR', 'Europe & Central Asia', 2008, 1.9, 2008, 0.02, 2008, 62993, 2015, 0.03, 'SM'],
  [1, 'Ireland', 'IRL', 'Europe & Central Asia', 2015, 283.7, 2015, 0.26, 2015, 61134, 2015, 4.64, 'IE'],
  [1, 'Jersey', 'JEY', 'Europe & Central Asia', null, null, null, null, null, null, null, null, 'JE'],
  [1, 'Australia', 'AUS', 'East Asia & Pacific', 2015, 1339.14, 2015, 0.02, 2015, 56311, 2015, 23.78, 'AU'],
  [1, 'United States', 'USA', 'North America', 2015, 18036.65, 2015, 0.03, 2015, 56116, 2015, 321.42, 'US'],
  [1, 'Faroe Islands', 'FRO', 'Europe & Central Asia', 2013, 2.61, 0, 0, 2013, 54118, 2015, 0.05, 'FO'],
  [1, 'Singapore', 'SGP', 'East Asia & Pacific', 2015, 292.74, 2015, 0.02, 2015, 52889, 2015, 5.54, 'SG'],
  [1, 'Denmark', 'DNK', 'Europe & Central Asia', 2015, 295.09, 2015, 0.01, 2015, 51989, 2015, 5.68, 'DK'],
  [1, 'Sweden', 'SWE', 'Europe & Central Asia', 2015, 495.62, 2015, 0.04, 2015, 50580, 2015, 9.8, 'SE'],
  [1, 'Iceland', 'ISL', 'Europe & Central Asia', 2015, 16.6, 2015, 0.04, 2015, 50173, 2015, 0.33, 'IS'],
  [1, 'United States Minor Outlying Islands', 'UMI', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'UM'],
  [1, 'Aland Islands', 'ALA', 'Europe & Central Asia', null, null, null, null, null, null, null, null, 'AX'],
  [1, 'Guernsey', 'GGY', 'Europe & Central Asia', null, null, null, null, null, null, null, null, 'GG'],
  [1, 'Netherlands', 'NLD', 'Europe & Central Asia', 2015, 750.28, 2015, 0.02, 2015, 44300, 2015, 16.94, 'NL'],
  [1, 'United Kingdom', 'GBR', 'Europe & Central Asia', 2015, 2858, 2015, 0.02, 2015, 43876, 2015, 65.14, 'GB'],
  [1, 'Austria', 'AUT', 'Europe & Central Asia', 2015, 376.95, 2015, 0.01, 2015, 43775, 2015, 8.61, 'AT'],
  [1, 'Greenland', 'GRL', 'Europe & Central Asia', 2014, 2.44, 0, -0.05, 2014, 43365, 2015, 0.06, 'GL'],
  [1, 'Canada', 'CAN', 'North America', 2015, 1550.54, 2015, 0.01, 2015, 43249, 2015, 35.85, 'CA'],
  [1, 'Andorra', 'AND', 'Europe & Central Asia', 2013, 3.25, 2013, 0, 2013, 42804, 2015, 0.07, 'AD'],
  [1, 'Hong Kong', 'HKG', 'East Asia & Pacific', 2015, 309.23, 2015, 0.02, 2015, 42328, 2015, 7.31, 'HK'],
  [1, 'Finland', 'FIN', 'Europe & Central Asia', 2015, 231.95, 2015, 0, 2015, 42311, 2015, 5.48, 'FI'],
  [1, 'Germany', 'DEU', 'Europe & Central Asia', 2015, 3363.45, 2015, 0.02, 2015, 41313, 2015, 81.41, 'DE'],
  [1, 'United Arab Emirates', 'ARE', 'Middle East & North Africa', 2015, 370.3, 2015, 0.04, 2015, 40439, 2015, 9.16, 'AE'],
  [1, 'Belgium', 'BEL', 'Europe & Central Asia', 2015, 455.09, 2015, 0.02, 2015, 40324, 2015, 11.29, 'BE'],
  [2, 'British Virgin Islands', 'VGB', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.03, 'VG'],
  [2, 'Gibraltar', 'GIB', 'Europe & Central Asia', null, null, null, null, null, null, 2015, 0.03, 'GI'],
  [2, 'New Zealand', 'NZL', 'East Asia & Pacific', 2015, 173.75, 2015, 0.03, 2015, 37808, 2015, 4.6, 'NZ'],
  [2, 'France', 'FRA', 'Europe & Central Asia', 2015, 2418.84, 2015, 0.01, 2015, 36206, 2015, 66.81, 'FR'],
  [2, 'Israel', 'ISR', 'Middle East & North Africa', 2015, 299.42, 2015, 0.03, 2015, 35728, 2015, 8.38, 'IL'],
  [2, 'Falkland Islands', 'FLK', 'Latin America & Caribbean', null, null, null, null, null, null, null, null, 'FK'],
  [2, 'Japan', 'JPN', 'East Asia & Pacific', 2015, 4383.08, 2015, 0.01, 2015, 34524, 2015, 126.96, 'JP'],
  [2, 'Taiwan', 'TWN', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'TW'],
  [2, 'Brunei Darussalam', 'BRN', 'East Asia & Pacific', 2015, 12.93, 2015, -0.01, 2015, 30555, 2015, 0.42, 'BN'],
  [2, 'Cayman Islands', 'CYM', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.06, 'KY'],
  [2, 'Italy', 'ITA', 'Europe & Central Asia', 2015, 1821.5, 2015, 0.01, 2015, 29958, 2015, 60.8, 'IT'],
  [2, 'Kuwait', 'KWT', 'Middle East & North Africa', 2015, 114.04, 2015, 0.02, 2015, 29301, 2015, 3.89, 'KW'],
  [2, 'Puerto Rico', 'PRI', 'Latin America & Caribbean', 2013, 103.13, 2013, -0.01, 2013, 28704, 2015, 3.47, 'PR'],
  [2, 'Republic of Korea', 'KOR', 'East Asia & Pacific', 2015, 1377.87, 2015, 0.03, 2015, 27222, 2015, 50.62, 'KR'],
  [2, 'Saint Barthelemy', 'BLM', 'Latin America & Caribbean', null, null, null, null, null, null, null, null, 'BL'],
  [2, 'Spain', 'ESP', 'Europe & Central Asia', 2015, 1199.06, 2015, 0.03, 2015, 25832, 2015, 46.42, 'ES'],
  [2, 'Aruba', 'ABW', 'Latin America & Caribbean', 2011, 2.58, 0, -0.06, 2011, 25354, 2015, 0.1, 'AW'],
  [2, 'Democratic People`s Republic of Korea', 'PRK', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 25.16, 'KP'],
  [2, 'Cyprus', 'CYP', 'Europe & Central Asia', 2015, 19.56, 2015, 0.02, 2015, 23243, 2015, 1.17, 'CY'],
  [2, 'Bahamas', 'BHS', 'Latin America & Caribbean', 2015, 8.85, 2015, -0.02, 2015, 22817, 2015, 0.39, 'BS'],
  [2, 'Bahrain', 'BHR', 'Middle East & North Africa', 2015, 31.13, 2015, 0.03, 2015, 22600, 2015, 1.38, 'BH'],
  [2, 'Malta', 'MLT', 'Middle East & North Africa', 2015, 9.75, 2015, 0.06, 2015, 22596, 2015, 0.43, 'MT'],
  [2, 'Curaçao', 'CUW', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.16, 'CW'],
  [2, 'Norfolk Island', 'NFK', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'NF'],
  [2, 'Slovenia', 'SVN', 'Europe & Central Asia', 2015, 42.77, 2015, 0.02, 2015, 20727, 2015, 2.06, 'SI'],
  [2, 'Saudi Arabia', 'SAU', 'Middle East & North Africa', 2015, 646, 2015, 0.03, 2015, 20482, 2015, 31.54, 'SA'],
  [2, 'French Southern Territories', 'ATF', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'TF'],
  [2, 'British Indian Ocean Territory', 'IOT', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'IO'],
  [2, 'South Georgia and South Sandwich Islands', 'SGS', 'Antarctica', null, null, null, null, null, null, null, null, 'GS'],
  [2, 'Portugal', 'PRT', 'Europe & Central Asia', 2015, 198.92, 2015, 0.01, 2015, 19222, 2015, 10.35, 'PT'],
  [2, 'United States Virgin Islands', 'VIR', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.1, 'VI'],
  [2, 'Greece', 'GRC', 'Europe & Central Asia', 2015, 194.85, 2015, 0, 2015, 18002, 2015, 10.82, 'GR'],
  [2, 'Czech Republic', 'CZE', 'Europe & Central Asia', 2015, 185.16, 2015, 0.05, 2015, 17548, 2015, 10.55, 'CZ'],
  [2, 'Trinidad and Tobago', 'TTO', 'Latin America & Caribbean', 2015, 23.56, 2015, -0.01, 2015, 17322, 2015, 1.36, 'TT'],
  [2, 'Estonia', 'EST', 'Europe & Central Asia', 2015, 22.46, 2015, 0.01, 2015, 17119, 2015, 1.31, 'EE'],
  [2, 'Slovakia', 'SVK', 'Europe & Central Asia', 2015, 87.26, 2015, 0.04, 2015, 16088, 2015, 5.42, 'SK'],
  [3, 'Saint Kitts and Nevis', 'KNA', 'Latin America & Caribbean', 2015, 0.88, 2015, 0.04, 2015, 15772, 2015, 0.06, 'KN'],
  [3, 'Uruguay', 'URY', 'Latin America & Caribbean', 2015, 53.44, 2015, 0.01, 2015, 15574, 2015, 3.43, 'UY'],
  [3, 'Oman', 'OMN', 'Middle East & North Africa', 2015, 69.83, 2015, 0.06, 2015, 15551, 2015, 4.49, 'OM'],
  [3, 'Seychelles', 'SYC', 'Sub-Saharan Africa', 2015, 1.44, 2015, 0.03, 2015, 15476, 2015, 0.09, 'SC'],
  [3, 'Barbados', 'BRB', 'Latin America & Caribbean', 2015, 4.39, 2015, 0.01, 2015, 15429, 2015, 0.28, 'BB'],
  [3, 'Saint Martin', 'MAF', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.03, 'MF'],
  [3, 'Sint Maarten', 'SXM', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.04, 'SX'],
  [3, 'Northern Cyprus', '', 'Europe & Central Asia', null, null, null, null, null, null, null, null, 'XC'],
  [3, 'Guam', 'GUM', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 0.17, 'GU'],
  [3, 'French Polynesia', 'PYF', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 0.28, 'PF'],
  [3, 'Equatorial Guinea', 'GNQ', 'Sub-Saharan Africa', 2015, 12.2, 2015, -0.08, 2015, 14440, 2015, 0.85, 'GQ'],
  [3, 'Lithuania', 'LTU', 'Europe & Central Asia', 2015, 41.17, 2015, 0.02, 2015, 14147, 2015, 2.91, 'LT'],
  [3, 'Antigua and Barbuda', 'ATG', 'Latin America & Caribbean', 2015, 1.26, 2015, 0.04, 2015, 13715, 2015, 0.09, 'AG'],
  [3, 'Latvia', 'LVA', 'Europe & Central Asia', 2015, 27, 2015, 0.03, 2015, 13649, 2015, 1.98, 'LV'],
  [3, 'Palau', 'PLW', 'East Asia & Pacific', 2015, 0.29, 2015, 0.09, 2015, 13499, 2015, 0.02, 'PW'],
  [3, 'Argentina', 'ARG', 'Latin America & Caribbean', 2015, 583.17, 2015, 0.02, 2015, 13432, 2015, 43.42, 'AR'],
  [3, 'Chile', 'CHL', 'Latin America & Caribbean', 2015, 240.8, 2015, 0.02, 2015, 13416, 2015, 17.95, 'CL'],
  [3, 'Panama', 'PAN', 'Latin America & Caribbean', 2015, 52.13, 2015, 0.06, 2015, 13268, 2015, 3.93, 'PA'],
  [3, 'New Caledonia', 'NCL', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 0.27, 'NC'],
  [3, 'Poland', 'POL', 'Europe & Central Asia', 2015, 477.07, 2015, 0.04, 2015, 12555, 2015, 38, 'PL'],
  [3, 'Northern Mariana Islands', 'MNP', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 0.06, 'MP'],
  [3, 'Hungary', 'HUN', 'Europe & Central Asia', 2015, 121.72, 2015, 0.03, 2015, 12364, 2015, 9.84, 'HU'],
  [3, 'Venezuela', 'VEN', 'Latin America & Caribbean', 2013, 371.34, 2014, -0.04, 2013, 12265, 2015, 31.11, 'VE'],
  [3, 'Croatia', 'HRV', 'Europe & Central Asia', 2015, 48.73, 2015, 0.02, 2015, 11536, 2015, 4.22, 'HR'],
  [3, 'Turks and Caicos Islands', 'TCA', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.03, 'TC'],
  [3, 'Costa Rica', 'CRI', 'Latin America & Caribbean', 2015, 54.14, 2015, 0.04, 2015, 11260, 2015, 4.81, 'CR'],
  [3, 'Kazakhstan', 'KAZ', 'Europe & Central Asia', 2015, 184.39, 2015, 0.01, 2015, 10510, 2015, 17.54, 'KZ'],
  [3, 'Nauru', 'NRU', 'East Asia & Pacific', 2015, 0.1, 2015, 0.03, 2015, 9828, 2015, 0.01, 'NR'],
  [3, 'Malaysia', 'MYS', 'East Asia & Pacific', 2015, 296.28, 2015, 0.05, 2015, 9768, 2015, 30.33, 'MY'],
  [3, 'Suriname', 'SUR', 'Latin America & Caribbean', 2015, 5.15, 2015, 0, 2015, 9485, 2015, 0.54, 'SR'],
  [3, 'Mauritius', 'MUS', 'Sub-Saharan Africa', 2015, 11.68, 2015, 0.03, 2015, 9252, 2015, 1.26, 'MU'],
  [3, 'Grenada', 'GRD', 'Latin America & Caribbean', 2015, 0.98, 2015, 0.06, 2015, 9212, 2015, 0.11, 'GD'],
  [3, 'Turkey', 'TUR', 'Europe & Central Asia', 2015, 717.88, 2015, 0.04, 2015, 9126, 2015, 78.67, 'TR'],
  [3, 'Cook Islands', 'COK', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'CK'],
  [3, 'Russia', 'RUS', 'Europe & Central Asia', 2015, 1331.21, 2015, -0.04, 2015, 9093, 2015, 144.1, 'RU'],
  [3, 'Mexico', 'MEX', 'Latin America & Caribbean', 2015, 1143.79, 2015, 0.02, 2015, 9005, 2015, 127.02, 'MX'],
  [4, 'Romania', 'ROU', 'Europe & Central Asia', 2015, 177.95, 2015, 0.04, 2015, 8973, 2015, 19.83, 'RO'],
  [4, 'Anguilla', 'AIA', 'Latin America & Caribbean', null, null, null, null, null, null, null, null, 'AI'],
  [4, 'Brazil', 'BRA', 'Latin America & Caribbean', 2015, 1774.72, 2015, -0.04, 2015, 8539, 2015, 207.85, 'BR'],
  [4, 'Maldives', 'MDV', 'South Asia', 2015, 3.44, 2015, 0.03, 2015, 8396, 2015, 0.41, 'MV'],
  [4, 'Gabon', 'GAB', 'Sub-Saharan Africa', 2015, 14.26, 2015, 0.04, 2015, 8266, 2015, 1.73, 'GA'],
  [4, 'Lebanon', 'LBN', 'Middle East & North Africa', 2015, 47.08, 2015, 0.01, 2015, 8048, 2015, 5.85, 'LB'],
  [4, 'China', 'CHN', 'East Asia & Pacific', 2015, 11007.72, 2015, 0.07, 2015, 8028, 2015, 1371.22, 'CN'],
  [4, 'American Samoa', 'ASM', 'East Asia & Pacific', null, null, null, null, null, null, 2015, 0.06, 'AS'],
  [4, 'Saint Lucia', 'LCA', 'Latin America & Caribbean', 2015, 1.43, 2015, 0.02, 2015, 7736, 2015, 0.18, 'LC'],
  [4, 'Dominica', 'DMA', 'Latin America & Caribbean', 2015, 0.52, 2015, -0.02, 2015, 7116, 2015, 0.07, 'DM'],
  [4, 'Saint Pierre and Miquelon', 'SPM', 'North America', null, null, null, null, null, null, null, null, 'PM'],
  [4, 'Bulgaria', 'BGR', 'Europe & Central Asia', 2015, 50.2, 2015, 0.04, 2015, 6993, 2015, 7.18, 'BG'],
  [4, 'Cuba', 'CUB', 'Latin America & Caribbean', 2013, 77.15, 2013, 0.03, 2013, 6790, 2015, 11.39, 'CU'],
  [4, 'Saint Vincent and the Grenadines', 'VCT', 'Latin America & Caribbean', 2015, 0.74, 2015, 0.02, 2015, 6739, 2015, 0.11, 'VC'],
  [4, 'Turkmenistan', 'TKM', 'Europe & Central Asia', 2015, 35.85, 2015, 0.06, 2015, 6672, 2015, 5.37, 'TM'],
  [4, 'Dominican Republic', 'DOM', 'Latin America & Caribbean', 2015, 68.1, 2015, 0.07, 2015, 6468, 2015, 10.53, 'DO'],
  [4, 'Montenegro', 'MNE', 'Europe & Central Asia', 2015, 3.99, 2015, 0.03, 2015, 6406, 2015, 0.62, 'ME'],
  [4, 'Botswana', 'BWA', 'Sub-Saharan Africa', 2015, 14.39, 2015, 0, 2015, 6360, 2015, 2.26, 'BW'],
  [4, 'Ecuador', 'ECU', 'Latin America & Caribbean', 2015, 100.18, 2015, 0, 2015, 6205, 2015, 16.14, 'EC'],
  [4, 'Colombia', 'COL', 'Latin America & Caribbean', 2015, 292.08, 2015, 0.03, 2015, 6056, 2015, 48.23, 'CO'],
  [4, 'Peru', 'PER', 'Latin America & Caribbean', 2015, 189.11, 2015, 0.03, 2015, 6027, 2015, 31.38, 'PE'],
  [4, 'Thailand', 'THA', 'East Asia & Pacific', 2015, 395.17, 2015, 0.03, 2015, 5815, 2015, 67.96, 'TH'],
  [4, 'Niue', 'NIU', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'NU'],
  [4, 'Belarus', 'BLR', 'Europe & Central Asia', 2015, 54.61, 2015, -0.04, 2015, 5740, 2015, 9.51, 'BY'],
  [4, 'South Africa', 'ZAF', 'Sub-Saharan Africa', 2015, 314.57, 2015, 0.01, 2015, 5724, 2015, 54.96, 'ZA'],
  [4, 'Libya', 'LBY', 'Middle East & North Africa', 2011, 34.7, 2011, -0.62, 2011, 5518, 2015, 6.28, 'LY'],
  [4, 'Azerbaijan', 'AZE', 'Europe & Central Asia', 2015, 53.05, 2015, 0.01, 2015, 5496, 2015, 9.65, 'AZ'],
  [4, 'Iran', 'IRN', 'Middle East & North Africa', 2014, 425.33, 2014, 0.04, 2014, 5443, 2015, 79.11, 'IR'],
  [4, 'Serbia', 'SRB', 'Europe & Central Asia', 2015, 37.16, 2015, 0.01, 2015, 5235, 2015, 7.1, 'RS'],
  [4, 'Jamaica', 'JAM', 'Latin America & Caribbean', 2015, 14.26, 2015, 0.01, 2015, 5232, 2015, 2.73, 'JM'],
  [4, 'Fiji', 'FJI', 'East Asia & Pacific', 2015, 4.43, 2015, 0.06, 2015, 4961, 2015, 0.89, 'FJ'],
  [4, 'Iraq', 'IRQ', 'Middle East & North Africa', 2015, 180.07, 2015, 0.03, 2015, 4944, 2015, 36.42, 'IQ'],
  [4, 'Jordan', 'JOR', 'Middle East & North Africa', 2015, 37.52, 2015, 0.02, 2015, 4940, 2015, 7.59, 'JO'],
  [4, 'Belize', 'BLZ', 'Latin America & Caribbean', 2015, 1.75, 2015, 0.01, 2015, 4879, 2015, 0.36, 'BZ'],
  [4, 'Macedonia', 'MKD', 'Europe & Central Asia', 2015, 10.09, 2015, 0.04, 2015, 4853, 2015, 2.08, 'MK'],
  [4, 'Namibia', 'NAM', 'Sub-Saharan Africa', 2015, 11.49, 2015, 0.05, 2015, 4674, 2015, 2.46, 'NA'],
  [4, 'Pitcairn Islands', 'PCN', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'PN'],
  [4, 'Bosnia and Herzegovina', 'BIH', 'Europe & Central Asia', 2015, 16.19, 2015, 0.03, 2015, 4249, 2015, 3.81, 'BA'],
  [4, 'El Salvador', 'SLV', 'Latin America & Caribbean', 2015, 25.85, 2015, 0.02, 2015, 4219, 2015, 6.13, 'SV'],
  [4, 'Algeria', 'DZA', 'Middle East & North Africa', 2015, 166.84, 2015, 0.04, 2015, 4206, 2015, 39.67, 'DZ'],
  [4, 'Guyana', 'GUY', 'Latin America & Caribbean', 2015, 3.17, 2015, 0.03, 2015, 4127, 2015, 0.77, 'GY'],
  [4, 'Angola', 'AGO', 'Sub-Saharan Africa', 2015, 102.63, 2015, 0.03, 2015, 4101, 2015, 25.02, 'AO'],
  [4, 'Tonga', 'TON', 'East Asia & Pacific', 2015, 0.44, 2015, 0.04, 2015, 4099, 2015, 0.11, 'TO'],
  [4, 'Paraguay', 'PRY', 'Latin America & Caribbean', 2015, 27.09, 2015, 0.03, 2015, 4081, 2015, 6.64, 'PY'],
  [5, 'Mongolia', 'MNG', 'East Asia & Pacific', 2015, 11.74, 2015, 0.02, 2015, 3968, 2015, 2.96, 'MN'],
  [5, 'Albania', 'ALB', 'Europe & Central Asia', 2015, 11.4, 2015, 0.03, 2015, 3945, 2015, 2.89, 'AL'],
  [5, 'Samoa', 'WSM', 'East Asia & Pacific', 2015, 0.76, 2015, 0.02, 2015, 3939, 2015, 0.19, 'WS'],
  [5, 'Sri Lanka', 'LKA', 'South Asia', 2015, 82.32, 2015, 0.05, 2015, 3926, 2015, 20.97, 'LK'],
  [5, 'Guatemala', 'GTM', 'Latin America & Caribbean', 2015, 63.79, 2015, 0.04, 2015, 3903, 2015, 16.34, 'GT'],
  [5, 'Tunisia', 'TUN', 'Middle East & North Africa', 2015, 43.02, 2015, 0.01, 2015, 3873, 2015, 11.11, 'TN'],
  [5, 'Wallis and Futuna Islands', 'WLF', 'East Asia & Pacific', null, null, null, null, null, null, null, null, 'WF'],
  [5, 'Georgia', 'GEO', 'Europe & Central Asia', 2015, 13.97, 2015, 0.03, 2015, 3796, 2015, 3.68, 'GE'],
  [5, 'Egypt', 'EGY', 'Middle East & North Africa', 2015, 330.78, 2015, 0.04, 2015, 3615, 2015, 91.51, 'EG'],
  [5, 'Kosovo', 'XKX', 'Europe & Central Asia', 2015, 6.4, 2015, 0.04, 2015, 3562, 2015, 1.8, 'XK'],
  [5, 'Armenia', 'ARM', 'Europe & Central Asia', 2015, 10.53, 2015, 0.03, 2015, 3489, 2015, 3.02, 'AM'],
  [5, 'Montserrat', 'MSR', 'Latin America & Caribbean', null, null, null, null, null, null, null, null, 'MS'],
  [5, 'Marshall Islands', 'MHL', 'East Asia & Pacific', 2015, 0.18, 2015, 0.01, 2015, 3386, 2015, 0.05, 'MH'],
  [5, 'Indonesia', 'IDN', 'East Asia & Pacific', 2015, 861.93, 2015, 0.05, 2015, 3346, 2015, 257.56, 'ID'],
  [5, 'Tuvalu', 'TUV', 'East Asia & Pacific', 2015, 0.03, 2015, 0.03, 2015, 3295, 2015, 0.01, 'TV'],
  [5, 'Swaziland', 'SWZ', 'Sub-Saharan Africa', 2015, 4.12, 2015, 0.02, 2015, 3200, 2015, 1.29, 'SZ'],
  [5, 'Cape Verde', 'CPV', 'Sub-Saharan Africa', 2015, 1.6, 2015, 0.01, 2015, 3080, 2015, 0.52, 'CV'],
  [5, 'Bolivia', 'BOL', 'Latin America & Caribbean', 2015, 33, 2015, 0.05, 2015, 3077, 2015, 10.72, 'BO'],
  [5, 'Federated States of Micronesia', 'FSM', 'East Asia & Pacific', 2015, 0.31, 2015, 0.04, 2015, 3015, 2015, 0.1, 'FM'],
  [5, 'Philippines', 'PHL', 'East Asia & Pacific', 2015, 292.45, 2015, 0.06, 2015, 2904, 2015, 100.7, 'PH'],
  [5, 'Morocco', 'MAR', 'Middle East & North Africa', 2015, 100.59, 2015, 0.05, 2015, 2878, 2015, 34.38, 'MA'],
  [5, 'Palestine', 'PSE', 'Middle East & North Africa', 2015, 12.68, 2015, 0.12, 2015, 2867, 2015, 4.42, 'PS'],
  [5, 'Vanuatu', 'VUT', 'East Asia & Pacific', 2015, 0.74, 2015, -0.01, 2015, 2805, 2015, 0.26, 'VU'],
  [5, 'Bhutan', 'BTN', 'South Asia', 2015, 2.06, 2015, 0.06, 2015, 2656, 2015, 0.77, 'BT'],
  [5, 'Nigeria', 'NGA', 'Sub-Saharan Africa', 2015, 481.07, 2015, 0.03, 2015, 2640, 2015, 182.2, 'NG'],
  [5, 'Honduras', 'HND', 'Latin America & Caribbean', 2015, 20.42, 2015, 0.04, 2015, 2529, 2015, 8.08, 'HN'],
  [5, 'Saint Helena', 'SHN', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'SH'],
  [5, 'Western Sahara', 'ESH', 'Middle East & North Africa', null, null, null, null, null, null, null, null, 'EH'],
  [5, 'Sudan', 'SDN', 'Sub-Saharan Africa', 2015, 97.16, 2015, 0.05, 2015, 2415, 2015, 40.23, 'SD'],
  [5, 'Papua New Guinea', 'PNG', 'East Asia & Pacific', 2014, 16.93, 2014, 0.09, 2014, 2268, 2015, 7.62, 'PG'],
  [5, 'Uzbekistan', 'UZB', 'Europe & Central Asia', 2015, 66.73, 2015, 0.08, 2015, 2132, 2015, 31.3, 'UZ'],
  [5, 'Ukraine', 'UKR', 'Europe & Central Asia', 2015, 90.62, 2015, -0.1, 2015, 2115, 2015, 45.2, 'UA'],
  [5, 'Vietnam', 'VNM', 'East Asia & Pacific', 2015, 193.6, 2015, 0.07, 2015, 2111, 2015, 91.7, 'VN'],
  [5, 'Nicaragua', 'NIC', 'Latin America & Caribbean', 2015, 12.69, 2015, 0.05, 2015, 2087, 2015, 6.08, 'NI'],
  [5, 'Syria', 'SYR', 'Middle East & North Africa', 2007, 40.41, 2007, 0.06, 2007, 2080, 2015, 18.5, 'SY'],
  [6, 'Djibouti', 'DJI', 'Middle East & North Africa', 2015, 1.73, 2015, 0.07, 2015, 1945, 2015, 0.89, 'DJ'],
  [6, 'Solomon Islands', 'SLB', 'East Asia & Pacific', 2015, 1.13, 2015, 0.04, 2015, 1935, 2015, 0.58, 'SB'],
  [6, 'Republic of Congo', 'COG', 'Sub-Saharan Africa', 2015, 8.55, 2015, 0.03, 2015, 1851, 2015, 4.62, 'CG'],
  [6, 'Moldova', 'MDA', 'Europe & Central Asia', 2015, 6.57, 2015, -0.01, 2015, 1848, 2015, 3.55, 'MD'],
  [6, 'Laos', 'LAO', 'East Asia & Pacific', 2015, 12.37, 2015, 0.07, 2015, 1818, 2015, 6.8, 'LA'],
  [6, 'Sao Tome and Principe', 'STP', 'Sub-Saharan Africa', 2015, 0.32, 2015, 0.04, 2015, 1669, 2015, 0.19, 'ST'],
  [6, 'India', 'IND', 'South Asia', 2015, 2095.4, 2015, 0.08, 2015, 1598, 2015, 1311.05, 'IN'],
  [6, 'Pakistan', 'PAK', 'South Asia', 2015, 271.05, 2015, 0.05, 2015, 1435, 2015, 188.92, 'PK'],
  [6, 'Kiribati', 'KIR', 'East Asia & Pacific', 2015, 0.16, 2015, 0.03, 2015, 1424, 2015, 0.11, 'KI'],
  [6, 'Yemen', 'YEM', 'Middle East & North Africa', 2015, 37.73, 2015, -0.28, 2015, 1406, 2015, 26.83, 'YE'],
  [6, 'Cote d`Ivoire', 'CIV', 'Sub-Saharan Africa', 2015, 31.76, 2015, 0.09, 2015, 1399, 2015, 22.7, 'CI'],
  [6, 'Kenya', 'KEN', 'Sub-Saharan Africa', 2015, 63.4, 2015, 0.06, 2015, 1377, 2015, 46.05, 'KE'],
  [6, 'Mauritania', 'MRT', 'Sub-Saharan Africa', 2014, 5.44, 2014, 0.04, 2014, 1371, 2015, 4.07, 'MR'],
  [6, 'Ghana', 'GHA', 'Sub-Saharan Africa', 2015, 37.54, 2015, 0.04, 2015, 1370, 2015, 27.41, 'GH'],
  [6, 'Zambia', 'ZMB', 'Sub-Saharan Africa', 2015, 21.15, 2015, 0.03, 2015, 1305, 2015, 16.21, 'ZM'],
  [6, 'Cameroon', 'CMR', 'Sub-Saharan Africa', 2015, 28.42, 2015, 0.06, 2015, 1217, 2015, 23.34, 'CM'],
  [6, 'Bangladesh', 'BGD', 'South Asia', 2015, 195.08, 2015, 0.07, 2015, 1212, 2015, 161, 'BD'],
  [6, 'Myanmar', 'MMR', 'East Asia & Pacific', 2015, 62.6, 2015, 0.07, 2015, 1161, 2015, 53.9, 'MM'],
  [6, 'Cambodia', 'KHM', 'East Asia & Pacific', 2015, 18.05, 2015, 0.07, 2015, 1159, 2015, 15.58, 'KH'],
  [6, 'Timor-Leste', 'TLS', 'East Asia & Pacific', 2015, 1.44, 2015, 0.04, 2015, 1158, 2015, 1.25, 'TL'],
  [6, 'Kyrgyzstan', 'KGZ', 'Europe & Central Asia', 2015, 6.57, 2015, 0.03, 2015, 1103, 2015, 5.96, 'KG'],
  [6, 'Lesotho', 'LSO', 'Sub-Saharan Africa', 2015, 2.28, 2015, 0.02, 2015, 1067, 2015, 2.14, 'LS'],
  [6, 'Tajikistan', 'TJK', 'Europe & Central Asia', 2015, 7.85, 2015, 0.06, 2015, 926, 2015, 8.48, 'TJ'],
  [6, 'Zimbabwe', 'ZWE', 'Sub-Saharan Africa', 2015, 14.42, 2015, 0, 2015, 924, 2015, 15.6, 'ZW'],
  [6, 'Senegal', 'SEN', 'Sub-Saharan Africa', 2015, 13.61, 2015, 0.06, 2015, 900, 2015, 15.13, 'SN'],
  [6, 'Tanzania', 'TZA', 'Sub-Saharan Africa', 2015, 45.63, 2015, 0.07, 2015, 879, 2015, 53.47, 'TZ'],
  [6, 'Haiti', 'HTI', 'Latin America & Caribbean', 2015, 8.77, 2015, 0.01, 2015, 818, 2015, 10.71, 'HT'],
  [6, 'Chad', 'TCD', 'Sub-Saharan Africa', 2015, 10.89, 2015, 0.02, 2015, 776, 2015, 14.04, 'TD'],
  [6, 'Benin', 'BEN', 'Sub-Saharan Africa', 2015, 8.29, 2015, 0.02, 2015, 762, 2015, 10.88, 'BJ'],
  [6, 'Nepal', 'NPL', 'South Asia', 2015, 21.19, 2015, 0.03, 2015, 743, 2015, 28.51, 'NP'],
  [6, 'South Sudan', 'SSD', 'Sub-Saharan Africa', 2015, 9.02, 2015, -0.06, 2015, 731, 2015, 12.34, 'SS'],
  [6, 'Mali', 'MLI', 'Sub-Saharan Africa', 2015, 12.75, 2015, 0.06, 2015, 724, 2015, 17.6, 'ML'],
  [6, 'Comoros', 'COM', 'Sub-Saharan Africa', 2015, 0.57, 2015, 0.01, 2015, 717, 2015, 0.79, 'KM'],
  [6, 'Uganda', 'UGA', 'Sub-Saharan Africa', 2015, 27.53, 2015, 0.05, 2015, 705, 2015, 39.03, 'UG'],
  [6, 'Rwanda', 'RWA', 'Sub-Saharan Africa', 2015, 8.1, 2015, 0.07, 2015, 697, 2015, 11.61, 'RW'],
  [6, 'Sierra Leone', 'SLE', 'Sub-Saharan Africa', 2015, 4.21, 2015, -0.21, 2015, 653, 2015, 6.45, 'SL'],
  [6, 'Ethiopia', 'ETH', 'Sub-Saharan Africa', 2015, 61.54, 2015, 0.1, 2015, 619, 2015, 99.39, 'ET'],
  [7, 'Afghanistan', 'AFG', 'South Asia', 2015, 19.33, 2015, 0.01, 2015, 594, 2015, 32.53, 'AF'],
  [7, 'Burkina Faso', 'BFA', 'Sub-Saharan Africa', 2015, 10.68, 2015, 0.04, 2015, 590, 2015, 18.11, 'BF'],
  [7, 'Guinea-Bissau', 'GNB', 'Sub-Saharan Africa', 2015, 1.06, 2015, 0.05, 2015, 573, 2015, 1.84, 'GW'],
  [7, 'Togo', 'TGO', 'Sub-Saharan Africa', 2015, 4.09, 2015, 0.05, 2015, 560, 2015, 7.3, 'TG'],
  [7, 'Somalia', 'SOM', 'Sub-Saharan Africa', 2015, 5.93, 0, 0, 2015, 549, 2015, 10.79, 'SO'],
  [7, 'Eritrea', 'ERI', 'Sub-Saharan Africa', 2011, 2.61, 2011, 0.09, 2011, 544, 2011, 4.79, 'ER'],
  [7, 'Guinea', 'GIN', 'Sub-Saharan Africa', 2015, 6.7, 2015, 0, 2015, 531, 2015, 12.61, 'GN'],
  [7, 'Mozambique', 'MOZ', 'Sub-Saharan Africa', 2015, 14.81, 2015, 0.07, 2015, 529, 2015, 27.98, 'MZ'],
  [7, 'The Gambia', 'GMB', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'GM'],
  [7, 'Democratic Republic of the Congo', 'COD', 'Sub-Saharan Africa', 2015, 35.24, 2015, 0.07, 2015, 456, 2015, 77.27, 'CD'],
  [7, 'Liberia', 'LBR', 'Sub-Saharan Africa', 2015, 2.05, 2015, 0, 2015, 456, 2015, 4.5, 'LR'],
  [7, 'Madagascar', 'MDG', 'Sub-Saharan Africa', 2015, 9.74, 2015, 0.03, 2015, 402, 2015, 24.24, 'MG'],
  [7, 'Malawi', 'MWI', 'Sub-Saharan Africa', 2015, 6.4, 2015, 0.03, 2015, 372, 2015, 17.22, 'MW'],
  [7, 'Niger', 'NER', 'Sub-Saharan Africa', 2015, 7.14, 2015, 0.04, 2015, 359, 2015, 19.9, 'NE'],
  [7, 'Somaliland', '', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'XS'],
  [7, 'Central African Republic', 'CAF', 'Sub-Saharan Africa', 2015, 1.58, 2015, 0.05, 2015, 323, 2015, 4.9, 'CF'],
  [7, 'Burundi', 'BDI', 'Sub-Saharan Africa', 2015, 3.1, 2015, -0.04, 2015, 277, 2015, 11.18, 'BI'],
  [7, 'Antarctica', 'ATA', 'Antarctica', null, null, null, null, null, null, null, null, 'AQ'],
  [7, 'Heard Island and McDonald Islands', 'HMD', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'HM']],
  countryValue: CountrySelect.data().countryValue
  }
  },
  created () {
  this.getFundSize();
  this.checkWindowSize()
  var groupBy = function (xs, key) {
  return xs.reduce(function (rv, x) {
  (rv[x[key]] = rv[x[key]] || []).push(x)
  return rv
  }, [])
  }
  this.countryCode = this.$route.query.countryCode;
  axios.get('https://restcountries.eu/rest/v2/alpha/' + this.$route.query.countryCode).then(res => {
  if (res.data.currencies[0].symbol) {
  this.currecyCode = res.data.currencies[0].symbol
  } else {
  this.currecyCode = res.data.currencies[0].code
  }
  })
  axios.get(process.env.baseUrl + '/api/proposals/' + this.$route.query.proposalId+'/'+this.$route.query.countryCode)
  .then(response => {
  // JSON responses are automatically parsed.
  this.proposalDetails = response.data.data;
  this.getCountryName(this.proposalDetails.client.country);
  this.groupedProducts = groupBy(this.proposalDetails.products, 'pricingGroupIndex')
  this.investmentSplit = this.investmentSplits[this.proposalDetails.investmentSplit-1]
  this.fundSize = this.fundSizes[this.proposalDetails.fundSize-1]
  })
  .catch(e => {
  this.$router.push({path: '/find/search-products'})
  })
  },
  methods: {
  mouseover(product)
  {
  this.isSignupBtnHover = true;
  this.selectedProductId = product.id;
  },
  mouseleave()
  {
  this.isSignupBtnHover = false;
  this.selectedProductId = '';
  },
  getFundSize(){
  this.fundSizes = [
  { value: 1, text: '$1,000 - $20,000', from: 1000, to: 20000 },
  { value: 2, text: '$20,000 - $50,000', from: 20000, to: 50000 },
  { value: 3, text: '$50,000 - $100,000', from: 50000, to: 100000 },
  { value: 4, text: '$100,000 - $500,000', from: 100000, to: 500000 },
  { value: 5, text: '$500,000+', from: 500000, to: null }
  ]
  axios.get('https://restcountries.eu/rest/v2/alpha/' + this.$route.query.countryCode).then(res => {
  var currecyCode   = res.data.currencies[0].code;
  if (res.data.currencies[0].symbol) {
  this.currecyCode = res.data.currencies[0].symbol
  } else {
  this.currecyCode = res.data.currencies[0].code
  }
  axios.get(process.env.baseUrl+'/api/proposals/getcurrentrate?currency=' + currecyCode).then(rate => {
  var currentRate = rate.data.data;
  this.fundSizes = [
  { value: 1, text: this.currecyCode + (1000 * currentRate).toFixed() + ' - '+ this.currecyCode+ (20000 *currentRate).toFixed() , from: (currentRate * 1000).toFixed(), to: (currentRate * 20000).toFixed() },
  { value: 2, text: this.currecyCode +(20000 * currentRate).toFixed() +' - ' +this.currecyCode + (50000 * currentRate).toFixed() , from: (currentRate * 20000).toFixed(), to: (currentRate * 50000).toFixed() },
  { value: 3, text: this.currecyCode +(50000* currentRate).toFixed()  +' - '+ this.currecyCode +(100000 * currentRate).toFixed() , from: (currentRate * 50000).toFixed(), to: (currentRate * 100000).toFixed() },
  { value: 4, text: this.currecyCode+(100000 * currentRate).toFixed() +' - '+ this.currecyCode + (500000 * currentRate).toFixed() , from: (currentRate * 100000).toFixed(), to: (currentRate * 500000).toFixed() },
  { value: 5, text: this.currecyCode+ (500000 * currentRate).toFixed() +'+', from: (currentRate * 500000).toFixed() , to: null }
  ]
  })
  })
  this.fundSize = this.fundSizes[this.proposalDetails.fundSize-1];
  },
  getUser () {
  var self = this
  window.addEventListener('message', function (e) {
  this.token = JSON.parse(e.data)
  if (this.token.data.access_token) {
  axios.get(process.env.baseUrl+'/api/user',
  {
  headers: {
  'Authorization': 'Bearer ' + this.token.data.access_token
  }
  }
  ).then(userData => {
  self.user = userData.data.data
  }).catch(e => {
  })
  }
  })

  const ifrm = document.createElement('iframe')
  ifrm.setAttribute('src', '//localhost:4200/frame.html')
  ifrm.style.width = '1px'
  ifrm.style.height = '1px'
  ifrm.style.position = 'absolute'
  ifrm.style.top = '-9999px'
  ifrm.style.left = '-9999px'
  document.body.appendChild(ifrm)
  },
  validEmail:function(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
    },
  redirectUrl() {
  if(this.user != null)
  {
  if(this.checkCountryExist(this.proposalDetails.countries,this.user.partnerCountries) && this.user.roles.includes('Partner'))
  {
  window.location =  process.env.appUrl+'/localpartners/apply-proposal/'+this.proposalDetails.id+'/'+this.proposalDetails.client.country;
  }
  if(!this.checkCountryExist(this.proposalDetails.countries,this.user.partnerCountries)  && this.user.roles.includes('Partner'))
    {
    this.$toast.error({message:'Please add '+this.getCountryFullName(this.countryCode) +' to your countries to apply to this proposal.'})
    }
    if(this.user.roles.includes('Client'))
    {
    this.$toast.error({message:'Only Local Partners can apply to proposals.  Please logout and create a new Local Partner account to apply'})
    }
    }
    },
    redirectLoginUrl(proposalId)
    {
    if(this.dataEmail)
    {
    if(this.validEmail(this.dataEmail))
    {
    axios.get(process.env.baseUrl + '/api/email/used/GetUser?email='+ this.dataEmail).then(res => {
    if(res.data.data)
    {
    if(res.data.data.roles.includes('Client'))
    {
    this.$toast.error({message:'Only Local Partners can apply to proposals. Please create a new Local Partner account with a different email address to apply'})
    }
    if(this.checkCountryExist(this.proposalDetails.countries, res.data.data.partnerCountries) && res.data.data.roles.includes('Partner'))
    {
    window.location =  process.env.appUrl+'/localpartners/apply-proposal/'+this.proposalDetails.id+'/'+this.proposalDetails.client.country+'/'+this.dataEmail;
    }
    if(!this.checkCountryExist(this.proposalDetails.countries,res.data.data.partnerCountries) && res.data.data.roles.includes('Partner'))
    {
    this.$toast.error({message:'Please add '+this.getCountryFullName(this.countryCode) +' to your countries to apply to this proposal.'})
    }
    }
    else
    {
    window.location =  process.env.appUrl+'/account/partner/signup/information/'+this.dataEmail+'/Apply/'+proposalId+'/'+this.countryCode;
    }
    });
    }
    else
    {
    this.$toast.error({message:'Please enter valid email'});
    }
    }
    else
    {
    this.$toast.error({message:'Please enter email'});
    }
    },
    checkCountryExist(haystack, arr) {
    for(let i=0;i < arr.length;i++)
    {
      if(haystack.includes(arr[i]))
      {
      return true;
      }
    }
},
  getCompImage(image)
  {
  return image== null?'/_nuxt/img/profilePhoto.809d09f.png':image;
  },
  getCountryName(countryCode)
  {
  var item = this.rawCountryData.find(item => item.code2=== countryCode);
  this.countryFullName = item.name;
  },
  getCountryFullName(countryCode)
  {
  var item = this.rawCountryData.find(item => item.code2=== countryCode);
  return item.name;
  },
  getPic(country) {
  return 'https://pxpgp.blob.core.windows.net/marketing-site/countries-flag/' + country.toLowerCase() + '.svg';
  },
  openModal: function () {
    setTimeout(function () {
  this.isModalOpened = true
  }.bind(this), 200)
  },
  checkWindowSize: function () {
  if (window.innerWidth < 600) {
          this.isMobile = true
        } else {
          this.isMobile = false
        }
      },
      getCountryFlag: function (code2) {
        if (code2) {
          return `flags/${code2.toLowerCase()}.svg`
        }
      }
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.checkWindowSize)
    },
    mounted () {
      window.addEventListener('resize', this.checkWindowSize)
       this.getUser();
    },
    computed: {
      rawCountryData: function () {
        return this.countryData.sort().map(([group, name, code, region, gdpYear, gdp, gdpGrowthYear, gdpGrowth, gdpCapitaYear, gdpCapita, populationYear, population, code2]) => {
          return {
            'group': group,
            'name': name,
            'code': code,
            'code2': code2,
            'region': region,
            'gdpYear': gdpYear,
            'gdp': gdp, // Billion
            'gdpGrowthYear': gdpGrowthYear,
            'gdpGrowth': gdpGrowth, // annual %
            'gdpCapitaYear': gdpCapitaYear,
            'gdpCapita': gdpCapita,
            'populationYear': populationYear,
            'population': population // Millions
          }
        })
      }
    }
  }
</script>

<style>
  @import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
  /*.chip-container.active {*/
  /*background-color: #16aaf2;*/
  /*border: 1px solid #16aaf2;*/
  /*}*/

  /*.chip-container.active span {*/
  /*color: #fff;*/
  /*}*/

  .toast-container.toast-bottom-center>div, .toast-container.toast-top-center>div
  {
  width: auto;
  max-width: 600px;
  }
  .cxlt-toastr-container.toast-bottom-center>div
  {
  width: auto !important;
  max-width: 600px !important;
  }
  .toast-icon{
  top:25% !important;
  }

  .VueCarousel-inner{
  visibility: visible !important;
  }
</style>
