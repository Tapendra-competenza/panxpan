<template>
  <div>
    <section class="body">
      <div class="homepage-about backgroundImg">
        <h1>We are PanXpan</h1>
        <p>
          An online platform allowing manufacturers to find <br>and work with local partners all over the world</p>
        <button class="account-btn" v-on:click ="getUrl('signup')">Create an Account, it's Free!</button>
        <div class="vertical-line"></div>
      </div>
    </section>
    <section>
      <div class="container">
        <div class="row for">
          <div class="col-md-6 col-sm-6 manufacturers">
            <h4>For Manufacturers</h4>
            <img src="../assets/images/fabric_icon.png">
              <p>
                Find local partners to grow your business internationally at a fraction of the cost of establishing full
                fledged
                offices yourself.
              </p>
              <button type="button" class="btn" v-on:click ="getUrl('signup')">Post a Proposal</button>
            </div>
          <div>
            <div class="circle">
              <span>Or</span>
            </div>
            <div class="vertical-line"></div>
            <div class="horizontal-line"></div>
          </div>
          <div class="col-md-6 col-sm-6 partners">
            <h4>For Local Partners</h4>
            <img src="../assets/images/house_icon.png">
              <p>Use investment from manufacturers to grow your local business and sell world class products.</p>
              <button type="button" class="btn" onclick="window.location = '/find/search-products'">
                View Opportunities in {{countryValue.name}}
              </button>
            </div>
        </div>
      </div>
    </section>
    <section class="body">
      <div class="container">
        <div class="description img row">
          <div class="description-title">
            <h1>
              A Powerful Platform to<br> Expand Globally</h1>
            <p>
              Local market expertise is critical to growing business in any area. But finding local partners that you
              can trust
              is
              <br>
                difficult and expensive. That's where we come in. Launch proposals targeting different countries and
                defining<br> how much you want to invest. Get offers back immediately from local market experts from
              around the world.
            </p>
          </div>
          <div class="slider-container">
            <ol class="slider-indicators">
              <li @click="slide = 0" v-bind:class="{ 'selected-indicator-style': slide === 0 }">
                <img src="../assets/images/find_local_partners.png" class="carousel-image">
                  <span>Find Local Partners</span>
                  <div class="bottom-line"></div>
                </li>
              <li @click="slide = 1" v-bind:class="{ 'selected-indicator-style': slide === 1 }">
                <img src="../assets/images/negotiation.png" class="carousel-image">
                  <span>Negotiate Terms</span>
                  <div class="indicator-line"></div>
                </li>
              <li @click="slide = 2" v-bind:class="{ 'selected-indicator-style': slide === 2 }">
                <img src="../assets/images/hire.png" class="carousel-image">
                  <span>Hire & Manage</span>
                  <div class="bottom-line"></div>
                </li>
            </ol>
            <b-carousel id="carousel1"
                        :indicators="false"
                        :controls="true"
                        :interval="4000"
                        v-model="slide"
            >

              <!-- Text slides with image -->
              <b-carousel-slide class="active">
                <img slot="img" class="img-fluid w-100 d-block" src="../assets/images/slide1.png">
              </b-carousel-slide>

              <!-- Slides with custom text -->
              <b-carousel-slide>
                <img slot="img" class="img-fluid w-100 d-block" src="../assets/images/slide2.png">
              </b-carousel-slide>

              <!-- Slides with image only -->
              <b-carousel-slide>
                <img slot="img" class="img-fluid w-100 d-block" src="../assets/images/slide3.png">
              </b-carousel-slide>

            </b-carousel>
          </div>
          <div class="registration">
            <h4>PanXpan is free to try. Post a proposal now and start receiving applications from local partners from all over the world.</h4>
            <button type="button" class="btn create-account" v-on:click ="getUrl('signup')">
              Create an Account Now!
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
  mounted () {
  this.scrollMethod()
  },
  methods: {
  getUrl(method){
  console.log(process.env.appUrl);
  return window.location = process.env.appUrl+method;
  },
  scrollMethod () {
  window.addEventListener('scroll', () => {
  var top = window.pageYOffset || document.documentElement.scrollTop

  if (top > 1) {
  this.pageScroll = true
  } else {
  this.pageScroll = false
  }
  })
  },
  activeSlide () {
  setTimeout(function () { return this.slide === 0 }.bind(this), 3000)
  }
  },
  data: function () {
  return {
  slide: 0,
  countryValue: {},
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
  [2, 'Cura�ao', 'CUW', 'Latin America & Caribbean', null, null, null, null, null, null, 2015, 0.16, 'CW'],
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
  pageScroll: false
  }
  },
  created () {
  axios.get('https://api.ipify.org?format=json')
  .then(response => {
  axios.get('https://ipinfo.io/' + response.data.ip + '/geo')
  .then(data => {
  function findCountry (country) {
  return country.code2 === data.data.country
  }

  this.countryValue = this.rawCountryData.find(findCountry)
  })
  .catch(e => {

  })
  })
  .catch(e => {

  })
  },
  watch: {
  'countryValue': function () {
  this.$emit('input', this.countryValue)
  }
  },
  computed: {
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
      }
    }
  }
</script>
