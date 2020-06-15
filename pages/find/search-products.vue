<template>
  <div>
    <country-select :country-selected-data='$route.query.countryCode' v-model='countryValue'></country-select>
    <div class='loading-spinner' v-if='!isLoaded' style="height:200px; padding-top:30px;"></div>
    <div v-if="isLoaded">
      <section>
        <div class='container' style="max-width: 1483px !important;">
          <div class='content-container row'>
            <div class='top-btns col-12'>
              <div class='btn-group' role='group' aria-label='...'>
                <button type='button'
                       class='btn btn-default'
                       @click='ShowProducts'
                       v-bind:class='{ activeBtnToggle: isShowProducts }'>
                  Products
                </button>
                <button type='button'
                        class='btn btn-default'
                        @click='ShowManufacturers'
                        v-bind:class='{ activeBtnToggle: isShowManufacturers }'>
                  Manufacturers
                </button>
              </div>
            </div>
            <form class='row form-container col-12'>
              <!--<div class='col-xs-12 col-sm-3' v-if="fundSizes.length > 0" :class="{'selectedBorder' :selectedFundSize.length > 0}">
                <p>Annual Sales Target</p>
                <multiselect v-model='selectedFundSize'
                             :options='fundSizes'
                             :searchable="true"
                             track-by="show"
                             label="show"
                             :clear-on-select="false"
                             :multiple="true"
                             :preserve-search="true"
                             :close-on-select="false"
                             :show-labels="false"
                             @input="onSalesTargetChange"
                             placeholder='Select target'>
                  <template slot="tag" scope="props">
                    <span class="custom__tag">
                      <span class="txtColor">
                        <strong>{{ selectedFundSize.length }} Selected</strong>
                      </span>
                      <span class="custom__remove"></span>
                    </span>
                  </template>
                </multiselect>
              </div>-->
              <div class='col-xs-12 col-sm-3' :class="{'selectedBorderCountry' :selectedCountry}" >
                <p>Country of Origin</p>
                <multiselect v-model="selectedCountry"
                             :options="groupedCountryData"
                             :searchable="true"
                             track-by="name"
                             label="name"
                             :multiple="true"
                             group-values="libs"
                             group-label="region"
                             :hide-selected="false"
                             :preserve-search="true"
                             :close-on-select="false"
                             :show-labels="false"
                             @input="onOriginCountryChange"
                             placeholder="Select countries">
                  <template slot="tag" scope="props">
                    <span class="custom__tag">
                      <span class="txtColor">
                        <strong>{{ selectedCountry.length }} Selected</strong>
                      </span>
                      <span class="custom__remove"></span>
                    </span>
                  </template>
                </multiselect>
              </div>
              <div class='col-xs-12 col-sm-3'>
                <p>Search</p>
                <input type='text' class='form-control'
                       v-model="searchTerm"
                       @input="onSearchChange"
                       placeholder='Search anything..'>
                </div>
            </form>
            <div class='row main-content'>
              <div class='col-md-3 category-container'>
                <p>Subcategory</p>
                <div class='catList'>
                  <ul>
                    <li v-bind:class="{ active: selectedCategory === 'All' }">
                      <span  v-on:click="selectCategory('All')">All Subcategories</span>
                    </li>
                    <li v-bind:class="{ active: selectedCategory === category.name }" v-for="category in categories">
                      <span v-on:click="selectCategory(category)" class='col-xs-4'>{{category.name}}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class='col-md-9'>
                <div class='row'>
                  <div class='col-12' v-if='isShowManufacturers'>
                    <div class='loading-spinner' v-if='loadingData'></div>
                    <h4 class='text-center no-result-text'
                        v-if='noProposalsToShow && countryValue && !loadingData && bySubcategory'>
                      No opportunities in {{countryValue.name}}
                    </h4>
                    <h4 class='text-center no-result-text'
                      v-if='noProposalsToShow && countryValue && !loadingData && !bySubcategory'>
                      No opportunities in this subcategory
                    </h4>
                    <div class='row' style='width:90%;margin:auto'>
                      <app-proposal-box v-if='proposals.length > 0' v-for='(proposal, index) in proposals' :key="index" :proposal='proposal'
                                      :country-code='countryValue.code2' :user='userDetails'>
                      </app-proposal-box>
                    </div>
                  </div>
                  <div class='col-12' v-if='isShowProducts'>
                    <div class='loading-spinner' v-if='loadingData'></div>
                    <h4 class='text-center no-result-text'
                        v-if='noProductsToShow && countryValue && !loadingData && bySubcategory'>
                      No products in {{countryValue.name}}
                    </h4>
                    <div class='row'>
                      <application-box v-if='products.length > 0' v-for='(product, index) in products' :key="index"
                                     :product='product' :country-code='countryValue.code2'  :user='userDetails'></application-box>
                    </div>
                  </div>
                  <div class="page-number row" fxLayout="row" fxLayoutAlign="space-between center" style="margin-left:18px;" v-if='(proposals.length > 0 || products.length > 0)'>
                    <button md-button=''
                            class="border-right"
                            :disabled="pageNumber === 0"
                            v-on:click="prevPage()"
                            fxLayoutAlign="center center"
                      style="float: left;">
                      <i class="fas fa-angle-left"></i>
                    </button>
                    <p fxLayoutAlign="center center" style="float: left; text-align: center; width: 58%;">{{1+pageNumber}} of {{totalPages}}</p>
                    <button md-button=""
                            class="border-left"
                            :disabled="hasMore === false"
                            v-on:click="nextPage()"
                            fxLayoutAlign="center center">
                      <i class="fas fa-angle-right" style="padding:none"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import axios from 'axios'
  import ApplicationBox from '~/components/ApplicationBox.vue'
  import AppProposalBox from '~/components/AppProposalBox.vue'
  import CountrySelect from '~/components/CountrySelect.vue'
  import InfiniteScroll from 'v-infinite-scroll'
  import Vue from 'vue'
  // You need a specific loader for CSS files like https://github.com/webpack/css-loader
  import 'v-infinite-scroll/dist/v-infinite-scroll.css'
  Vue.use(InfiniteScroll)
  export default {
  mounted () {
  this.getUser()
  },
  methods: {
  scrollToTop() {
  window.scrollTo(0,0);
  },
  prevPage () {
  if (this.pageNumber == 0) return
  --this.pageNumber
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  this.scrollToTop();
  },
  nextPage () {
  ++this.pageNumber;
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  this.scrollToTop();
  },
  onLoaded(){
  this.isLoaded = true;
  },
  getUser () {
  var self = this
  window.addEventListener('message', function (e) {
  this.token = JSON.parse(e.data)

  if (this.token != null && this.token.data) {
  axios.get(process.env.baseUrl+'/api/user',
  {
  headers: {
  'Authorization': 'Bearer ' + this.token.data.access_token
  }
  }
  ).then(userData => {
  self.userDetails = userData.data.data
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
  onSalesTargetChange (val) {
  this.pageNumber = 0;
  this.proposals=[];
  this.fundSizeOptions = ''
  val.forEach(item => {
  var option = '&annualSalesTarget[]=' + item.code
  this.fundSizeOptions = this.fundSizeOptions + option
  })
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  },
  onSearchChange (val) {
  this.proposals=[];
  this.pageNumber = 0;
  this.searchOption = '&search=' + this.searchTerm
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  },
  onOriginCountryChange (val) {
  this.pageNumber=0;
  this.proposals=[];
  this.countryOptions = ''
  val.forEach(item => {
  var option = '&countries[]=' + item.code2
  this.countryOptions = this.countryOptions + option
  })
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  },
  onProductTypeChange (val) {
  this.pageNumber=0;
  this.proposals=[];
  this.productTypeOptions = ''
  val.forEach(item => {
  var option = '&productTypes[]=' + item.i
  this.productTypeOptions = this.productTypeOptions + option
  })
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  },
  selectCategory (cateory) {
  this.proposals=[];
  if (cateory === 'All') {
  this.pageNumber = 0;
  this.bySubcategory = true;
  this.productTypes = this.allProductTypes
  this.selectedCategory = cateory
  this.categoryOptions = ''
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  } else {
  this.pageNumber = 0;
  this.bySubcategory = false;
  this.productTypes = []
  this.productTypes.push(cateory)
  this.selectedCategory = cateory.name
  this.categoryOptions = '&category=' + cateory.i
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  }
  },
  getCurrencyCode (alpha2) {
  axios.get('https://restcountries.eu/rest/v2/alpha/' + alpha2).then(res => {
  var currecyCode   = res.data.currencies[0].code;
  if (res.data.currencies[0].symbol) {
  this.currecyCode = res.data.currencies[0].symbol
  } else {
  this.currecyCode = res.data.currencies[0].code
  }
  axios.get(process.env.baseUrl+'/api/proposals/getcurrecyratefordropdown?currency=' + currecyCode).then(rate => {
  var currentRate = rate.data.data;
  this.fundSizes = [
  {
  show: this.currecyCode + (1000 * currentRate).toFixed()  +' - ' + this.currecyCode + (20000* currentRate).toFixed(),
  code: '1000-20000'
  },
  {
  show: this.currecyCode + (20000*currentRate).toFixed()  +' - ' + this.currecyCode + (50000*currentRate).toFixed() ,
  code: '20000-50000'
  },
  {
  show: this.currecyCode + (50000 *currentRate).toFixed() +' - ' + this.currecyCode + (100000*currentRate).toFixed(),
  code: '50000-100000'
  },
  {
  show: this.currecyCode + (100000 *currentRate).toFixed() +' - ' + this.currecyCode + (500000*currentRate).toFixed(),
  code: '100000-500000'
  },
  {
  show: this.currecyCode + (500000*currentRate).toFixed() +'+',
  code: '500000'
  }
  ]
  })
  this.selectedFundSize = []
  })
  },
  getProposals (countryValue) {
  this.loadingData = true
  this.noProposalsToShow = false
  this.proposals=[];
  axios.get(process.env.baseUrl+'/api/proposals/search/manufacturers/' + countryValue + '/usd?pageNumber='+this.pageNumber+'&pageSize=15' +
  this.categoryOptions + this.productTypeOptions + this.countryOptions + this.fundSizeOptions + this.searchOption)
  .then(response => {
  // JSON responses are automatically parsed.
  this.proposals = response.data.data.result;
  var pageCount= Math.ceil(response.data.data.totalRecords/15);
  this.totalPages = pageCount;
  if(this.pageNumber+1 == this.totalPages)
  {
  this.hasMore = false;
  }
  else
  {
  this.hasMore = true;
  }
  if (this.proposals.length === 0) {
  this.noProposalsToShow = true
  }
  this.loadingData = false
  })
  .catch(e => {

  })
  },
  getProducts (countryValue) {
  this.loadingData = true
  this.noProductsToShow = false
  this.products = []
  axios.get(process.env.baseUrl+'/api/proposals/search/products/' + countryValue + '/usd?pageNumber='+this.pageNumber+'&pageSize=24' +
  this.categoryOptions + this.productTypeOptions + this.countryOptions + this.fundSizeOptions + this.searchOption)
  .then(response => {
  // JSON responses are automatically parsed.
  this.products = response.data.data.result;
  var pageCount= Math.ceil(response.data.data.totalRecords/24);
  this.totalPages = pageCount;
  if(this.pageNumber+1 == this.totalPages)
  {
  this.hasMore = false;
  }
  else
  {
  this.hasMore = true;
  }
    if (this.products.length === 0) {
  this.noProductsToShow = true
  }
  this.loadingData = false
  })
  .catch(e => {

  })
  },
  ShowManufacturers () {
  this.pageNumber = 0;
  this.isShowManufacturers = true
  this.isShowProducts = false
  this.products = []
  this.getProposals(this.countryValue.code2)

  },
  ShowProducts () {
  this.pageNumber = 0;
  this.isShowManufacturers = false
  this.isShowProducts = true
  this.proposals=[];
  this.getProducts(this.countryValue.code2)
  },
  onCountryChange () {
  this.page = 0;
  this.loadingData = true
  this.proposals = []
  this.products = []
  if(this.isShowProducts)
  {
  this.getProducts(this.countryValue.code2)
  }
  else
  {
  this.getProposals(this.countryValue.code2)
  }
  this.getCurrencyCode(this.countryValue.code2)
  }
  },
  watch: {
  'countryValue': function () {
  this.onCountryChange()
  }
  },
  components: {
  AppProposalBox,
  ApplicationBox,
  Multiselect,
  CountrySelect
  },
  data () {
  return {
  page:0,
  hasMore:true,
  pageNumber:0,
  totalPages:0,
  isLoaded:false,
  isShowProducts: true,
  isShowManufacturers: false,
  errors: [],
  products: [],
  proposals: [],
  value: null,
  bySubcategory:true,
  categoryOptions: '',
  fundSizeOptions: '',
  countryOptions: '',
  searchTerm: '',
  searchOption: '',
  productTypeOptions: '',
  loadingData: false,
  noProposalsToShow: false,
  noProductsToShow: false,
  selectedCategory: 'All',
  selectedFundSize: [],
  selectedProductType: [],
  userDetails:null,
  selectedCountry: this.countryValue,
  options: [
  'value1',
  'value2',
  'value3'
  ],
  fundSizes: [],
  categories: [
  { 'i': 6, 'name': 'Food & Beverage', 'items': [{ 'i': 600, 'n': 'Beverages' }, { 'i': 601, 'n': 'Breads, Cakes & Cookies' }, { 'i': 602, 'n': 'Chocolate Products' }, { 'i': 603, 'n': 'Dairy' }, { 'i': 604, 'n': 'Frozen Prepared Foods' }, { 'i': 605, 'n': 'Fruits, Vegetables & Nuts' }, { 'i': 606, 'n': 'Other Food Products' }, { 'i': 607, 'n': 'Processed Foods and Soups' }, { 'i': 608, 'n': 'Raw Ingredients, Oils & Spices' }, { 'i': 609, 'n': 'Rice, Flour, Cereal & Pastas' }] },
  { 'i': 5, 'name': 'Consumer Electronics', 'items': [{ 'i': 500, 'n': 'A/V Accessories' }, { 'i': 501, 'n': 'Communication, Networking & Telecom' }, { 'i': 502, 'n': 'Computers, Cameras, Laptops & Related' }, { 'i': 503, 'n': 'Home & Pro Audio' }, { 'i': 504, 'n': 'Mobile Phones & Related' }, { 'i': 505, 'n': 'Office, Financial & Digital Signage' }, { 'i': 506, 'n': 'Other Consumer Electronics' }, { 'i': 507, 'n': 'Outdoor Electronics' }, { 'i': 508, 'n': 'Robotics & Drones' }, { 'i': 509, 'n': 'TVs & Video' }, { 'i': 510, 'n': 'VR, Gaming & Wearable Electronics' }] },
  { 'i': 10, 'name': 'Home Goods', 'items': [{ 'i': 1000, 'n': 'Bikes, Camping, Leisure & Sporting Goods' }, { 'i': 1001, 'n': 'Disposable Ware & Drinkware' }, { 'i': 1002, 'n': 'Fitness Equipment & Accessories' }, { 'i': 1003, 'n': 'Household & Kitchen Appliances' }, { 'i': 1004, 'n': 'Household & Pet Supplies' }, { 'i': 1005, 'n': 'Household Storage & Organizers' }, { 'i': 1006, 'n': 'Kitchenware & Tableware' }, { 'i': 1007, 'n': 'Other Home Related' }, { 'i': 1008, 'n': 'Safety, Security & Emergency Systems' }, { 'i': 1009, 'n': 'Water Sports Equipment' }] },
  { 'i': 7, 'name': 'Furniture & Home Décor', 'items': [{ 'i': 700, 'n': 'Baby & Children`s Bedding & Furniture' }, { 'i': 701, 'n': 'Candles & Scent Accessories' }, { 'i': 702, 'n': 'Decorative Accents' }, { 'i': 703, 'n': 'Fireplaces & Accessories' }, { 'i': 704, 'n': 'Home & Garden Furniture' }, { 'i': 705, 'n': 'Home Textiles & Beddings' }, { 'i': 706, 'n': 'Office & Commercial Furniture' }, { 'i': 707, 'n': 'Other Furniture & Décor' }] },
  { 'i': 8, 'name': 'Gift & Premium Products', 'items': [{ 'i': 800, 'n': 'Art & Craft Supplies' }, { 'i': 801, 'n': 'Baby Activity & Gear' }, { 'i': 802, 'n': 'Games & Hobbies' }, { 'i': 803, 'n': 'Gifts & Novelties' }, { 'i': 804, 'n': 'Holiday Decorations & Party Supplies' }, { 'i': 805, 'n': 'Other Gift & Premium' }, { 'i': 806, 'n': 'Promotional Electronic & IT Products' }, { 'i': 807, 'n': 'Promotional Merchandise & Keychains' }, { 'i': 808, 'n': 'Stationery Supplies' }, { 'i': 809, 'n': 'Toys' }] },
  { 'i': 1, 'name': 'Apparel & Footwear', 'items': [{ 'i': 100, 'n': 'Apparel Display & Packaging Supplies' }, { 'i': 101, 'n': 'Baby & Children`s Apparel & Footwear' }, { 'i': 102, 'n': 'Bags & Luggage' }, { 'i': 103, 'n': 'Corporate & Industrial Wear' }, { 'i': 104, 'n': 'Fabric, Fiber, Yarn & Other Materials' }, { 'i': 105, 'n': 'Jewelry & Watches' }, { 'i': 106, 'n': 'Men`s Apparel & Footwear' }, { 'i': 107, 'n': 'Other Apparel & Footwear' }, { 'i': 108, 'n': 'Sporting & Exercise Wear' }, { 'i': 109, 'n': 'Women`s Apparel & Footwear' }] },
  { 'i': 9, 'name': 'Health & Personal Care', 'items': [{ 'i': 900, 'n': 'Baby Care Products' }, { 'i': 901, 'n': 'Burial, Cremation & Ash Storage' }, { 'i': 902, 'n': 'Dentistry Equipment & Supplies' }, { 'i': 903, 'n': 'Eyewear & Glasses' }, { 'i': 904, 'n': 'Health & Wellness' }, { 'i': 905, 'n': 'Hospital & Ward Supplies' }, { 'i': 906, 'n': 'Makeup & Cosmetics' }, { 'i': 907, 'n': 'Medical & Homeopathic Supplies' }, { 'i': 908, 'n': 'Other Health & Personal Care' }, { 'i': 909, 'n': 'Personal Hygiene & Grooming' }] },
  { 'i': 4, 'name': 'Construction & Hardware', 'items': [{ 'i': 400, 'n': 'Building Mechanical & Electrical Equipment' }, { 'i': 401, 'n': 'Building Supplies' }, { 'i': 402, 'n': 'General Hardware' }, { 'i': 403, 'n': 'Lawn & Garden' }, { 'i': 404, 'n': 'Lighting & Electricals' }, { 'i': 405, 'n': 'Material Handling & Construction Machinery' }, { 'i': 406, 'n': 'Other Construction & Hardware' }, { 'i': 407, 'n': 'Sanitary Ware & Plumbing' }, { 'i': 408, 'n': 'Tools & Accessories' }] },
  { 'i': 3, 'name': 'Commercial & Machinery', 'items': [{ 'i': 300, 'n': 'Batteries & Power Supplies' }, { 'i': 301, 'n': 'Electromechanical Components' }, { 'i': 302, 'n': 'ERP & Commercial Software' }, { 'i': 303, 'n': 'Industrial Measuring, Testing & Inspection Equipment' }, { 'i': 304, 'n': 'Industrial Supplies' }, { 'i': 305, 'n': 'Manufacturing, Printing & Packaging Equipment' }, { 'i': 306, 'n': 'Other Commercial & Machinery' }, { 'i': 307, 'n': 'Power Generation' }, { 'i': 308, 'n': 'Security & Lighting' }, { 'i': 309, 'n': 'Vending & Entertainment Machines' }] },
  { 'i': 2, 'name': 'Auto & Transportation', 'items': [{ 'i': 200, 'n': 'Aerospace' }, { 'i': 201, 'n': 'Auto Safety & Security' }, { 'i': 202, 'n': 'Automotive Equipment' }, { 'i': 203, 'n': 'Other Transportation' }, { 'i': 204, 'n': 'Transportation Electronics' }, { 'i': 205, 'n': 'Vehicle Accessories' }, { 'i': 206, 'n': 'Vehicle Parts' }, { 'i': 207, 'n': 'Vehicles' }] }
  ],
  countryValue: CountrySelect.data().countryValue,
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
  [7, 'Heard Island and McDonald Islands', 'HMD', 'Sub-Saharan Africa', null, null, null, null, null, null, null, null, 'HM']],
  productTypes: [],
  currencyCode: ''
  }
  },
  created () {
  this.getUser();
  document.title = "Search Business Opportunities – PanXpan";
  this.productTypes = this.allProductTypes.sort(function (a, b) {
  if (a.n < b.n) return -1
        if (a.n > b.n) return 1
        return 0
      })
    },
    computed: {
      allProductTypes: function () {
        var productTypes = []
        this.categories.forEach((category) => {
          category.items.forEach((item) => {
            productTypes.push(item)
          })
        })
        return this.categories
      },
      rawCountryData: function () {
        return this.countryData.sort(function (a, b) {
          if (a[1] < b[1]) return -1
          if (a[1] > b[1]) return 1
          return 0
        }).map(([group, name, code, region, gdpYear, gdp, gdpGrowthYear, gdpGrowth, gdpCapitaYear, gdpCapita, populationYear, population, code2]) => {
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
      },
      groupedCountryData: function () {
        var regionsCreated = {}
        var final = []
        this.rawCountryData.forEach(r => {
          if (!regionsCreated[r.region]) {
            final.push({
              region: r.region,
              libs: []
            })
            regionsCreated[r.region] = final.length
          }
          var regionIndex = regionsCreated[r.region] - 1
          final[regionIndex].libs.push(r)
        })
        return final.sort(function (a, b) {
          if (a['region'] < b['region']) return -1
          if (a['region'] > b['region']) return 1
          return 0
        })
      }
    }
  }
</script>

<style>
  @import '../../node_modules/vue-multiselect/dist/vue-multiselect.min.css';

  .loading-spinner {
  min-height: 40px;
  animation: rotation 1s infinite linear;
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAAsSAAALEgHS3X78AAAAB3RJTUUH4QYBDA4t9HZ43QAABFtJREFUWMPF2FuIVVUcx/HP3mcG0TEjbdTGTNMuXsI0g8yKwrCyooupPfhQFpHki2SUBEGCUVlRERJEmpB0M4sio+hidEFLSoumLGYoU4wcTG10TMcz08M6k7t99sycM3O0L+yH/V+3315r7f/6r39UX1+vB1yLizEB42qr88PnNQyN1+2pMbg631HnILbjW3yDj/FVuQNVlVG3BvMxE1NLqN8XZxWe2diHr/EsXi910LjEerMKs/B4ieKyOBHT8Arex+RKCByI57CmMBOVIIcr8BkWd1e5qyUeg5cwqYs6DdiERuxEc+GjB2IYzsBFqM1o2xcPF/qfh5ZyBE7CO6jrpHwtVgk/wPZuJmGssC3m4/yM8jk4ydF9+h+ylng03uhE3AbMwM2FD+hOHPyIFZiOO7Ajo850rMyasLTAnLDnRmZ08iQux3vIK5+9eB6XCS4nzUw80p3Ah4Q/Lc1C3C34tt7SiKuE/Z01ztWdCZyCezMaLcbTFRCWpBVzFfvDHJ7ByVkClyBKNViFRyssLsnt+C5lG4Vb0wIvFXxTkt+U4Kd6yV/C1mlL2RcIrupfgbMyGi/BH8dYIHyEl1O2kcI+FWNIhsDvhSPpePEE9qdst6AmxkQMTRW+phPPfozYrDjSuQDjYuHvTdKCD4+juA7Wpd4HYEosxHRJtmPL/yDwE7Qn3iOcE+P0VMVtKuOQy6URu1O20TFOSRl3lNbfUZpac5UQeFjx2V4bo3/K2NyT3peNaOqtwLziP7lfrPjgLzXKLqJ+4q+9ERhljN0WC1FGkkG9GWX9+FIisEyqFE6PBM2x4j03ojcCeyGyBqelbDtj/JIynipEuL0WWabQ8QWRSRpj4SqYpE7Pb26ZQlvbo24fIapOksfmWAjjk1TjmkoJLJFcXDzm79gQ1dfX1+ALnJso3I3zhJCrYsz+qbM7mJt+ONhnzYBcPspFxNrlIitwZxUOCLe0pMBBwi3s/koKXHP2zkz7C7sGLOwbt0d/HslpaYu0tEX2H4lX11bn81EhNzNG2Iv9Eu0OCPmXLZUUmcFdVZHl7dh2qMrWlj62Ha7a2PB39TQc7HCMW4XwPkmNcF3sX/pYZTMBS/PttLczqk+r6wc1W1S3Z5lCPBAlslu1Qlw2LNXJm8I9uLXC4s7Eu0L2Ick6XKdwDUgeLU24J6OjG7EaJ1RQ3ES8lSGuSeqOkj77XsFTGR3OETJSWamLcunoa2xG2SL8nDRkBQaL8XaG/UJ8jseE5SmXS4SVeBWDM8rvw4tpY9RJhrWPMJs3dDLYDmH/fID1igPNDkbgSiGfM6PQbxYPYGlWQdRFCrhKWO4FXcxKviB2lxBs7hVWpRbDhQxBXRftDwnLuryzClEJOerb8GBhwEqySVjW9V1VKiU4XSk47BV6GG2naBBOqKndiaO0GUwyWTjU5yo/Jfyp4FPXKi2v2COBHQwRjscpQlAxSrj81wg+bJ+QEm7ERnwpuI8D5Q70D2rZFu6XPM1gAAAAAElFTkSuQmCC') no-repeat center center;
  }

  @-webkit-keyframes rotation {
  from {
  -webkit-transform: rotate(0deg);
  }
  to {
  -webkit-transform: rotate(359deg);
  }
  }
  .multiselect__option--selected
  {
  color:#16aaf2 !important;
  }
  .txtColor
  {
  color:#16aaf2 !important;
  }

  .selectedBorder
  {

  }
  .selectedBorder .multiselect__tags
  {
  border-color:#16aaf2 !important;
  }

  .selectedBorderCountry
  {

  }

  .selectedBorderCountry .multiselect__tags
  {
  border-color:#16aaf2 !important;
  }

  .container {
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  }
  .container::-webkit-scrollbar {
  display: none;
  }

  .page-number {
  border: 1px solid #D4DADE;
  border-radius: 6px;
  overflow: hidden;
  background: #ffffff;
  height: 40px;
  width: 150px;
  }

  .page-number button {
  background-color: #FCFCFC;
  vertical-align: middle;
  padding: 0 5px;
  height: 40px;
  width:31px;
  }

  .page-number button .arrow-icon {
  vertical-align: middle;
  color: #848D93;
  }

  :host .mat-button {
  min-width: 30px;
  }

  .page-number p {
  line-height: 35px;
  vertical-align: middle;
  color: #757C82;
  font-size: 13px;
  }

  .border-right {
  border-right: 1px solid #D4DADE;
  }

  .border-left {
  border-left: 1px solid #D4DADE;
  }

  @media only screen and (max-width: 768px) and (min-width: 375px)  {
  .catList ul li {
  width: 100px;
  margin-top: 10px;
  float: left;
  font-size: 10px;
  line-height: 12px;
  }
  }
</style>
