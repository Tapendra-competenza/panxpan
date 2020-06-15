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
        <div class="row margin-bottom-40">
          <div class="col-xs-12 col-sm-8 blog-nav-tab write-for-us-wrapper">
            <div class="write-for-us-container">
              <b-card no-body>
                <b-tabs card>
                  <b-tab title="Write for Us" active>
                    <div class="row">
                      <div class="col-sm-12 write-for-us">
                        <p>
                          If you enjoy reading news on the latest data analysis trends and techniques, why not
                          contribute and write some articles as well.
                          We are always looking for professionals with strong data analysis expertise and/or strong
                          functional or industry knowledge.
                        </p>
                        <p>
                          Use the form below to get in touch with us and we'll set you up with an account so you can
                          easily start publishing unique content to inform the masses.
                        </p>
                        <div class="input-group">
                          <input type="text" class="form-control name" placeholder="Name*"
                                 aria-describedby="sizing-addon1">
                          <input type="text" class="form-control email" placeholder="Email*"
                                 aria-describedby="sizing-addon1">
                          <textarea rows="3"
                                    placeholder="Message* (mention the type pf content you hope to write about)"></textarea>
                        </div>
                        <div class="required">
                          <span class="col-xs-6">*Required</span>
                          <button type="button" class="blue btn btn-info col-xs-6">Submit</button>
                        </div>
                      </div>
                    </div>
                  </b-tab>
                  <b-tab title="Disclaimer">
                    <div class="row">
                      <div class="col-sm-12 disclaimer">
                        <p>
                          PanXpan is not liable for any of the content or media (text, images, video, etc) written by
                          contributors on this website.
                          Contributors have added the content on their own free will and own all respective content
                          published.
                          The content published is a reflection of the contributor's own opinion and doesn't necessarily
                          reflect the opinion of PanXpan.
                        </p>
                        <p>
                          PanXpan can't be held liable for copyrighted material published on this website.
                          If you feel your content or rights are being infringed, please contact us and we will have the
                          questionable content promptly removed if warranted.
                        </p>
                        <p>
                          We take care to screen all content being published for fairness and accuracy but can't
                          guarantee accuracy or completeness of any content published by individual contributors.
                          PanXpan accepts no responsability for damages caused by inaccuracy or incompleteness of any
                          published content.
                        </p>
                      </div>
                    </div>
                  </b-tab>
                </b-tabs>
              </b-card>
            </div>
          </div>
          <div class="col-xs-12 col-sm-4">
            <div class="custom-dropdown-wrapper">
              <button @click="isCountriesShow = !isCountriesShow">
                <span>Popular Countries</span>
                <i class="fa fa-angle-down arrow-icon" aria-hidden="true"></i>
              </button>
              <div v-if="isCountriesShow" class="custom-dropdown">
                <ul>
                  <li>something 1</li>
                  <li>something 2</li>
                  <li>something 3</li>
                </ul>
              </div>
            </div>
            <div class="custom-dropdown-wrapper">
              <button @click="isTopicsShow = !isTopicsShow">
                <span>Popular Topics</span>
                <i class="fa fa-angle-down arrow-icon" aria-hidden="true"></i>
              </button>
              <div v-if="isTopicsShow" class="custom-dropdown">
                <ul>
                  <li>something 1</li>
                  <li>something 2</li>
                  <li>something 3</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        isCountriesShow: false,
        isTopicsShow: false
      }
    }
  }
</script>
