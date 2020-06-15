<template>
  <div
    align="center"
    style="color:#898989;padding:100px 0px; font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;"
  >
    <div class="loading-spinner" v-if="loadingData"></div>
    <div class="subscription-header">
      <h6 class="text-align-left">Subscription Preferences</h6>
      <br>
      <p
        class="text-align-left"
      >You're currently subscribed to following emails. Please deselect any emails you would no longer like to be subscribed to.</p>
      <br>
      <div class="notification-container">
        <div v-if="!isClient && isApiCalled">
          <div class="select-container">
            <h6>Marketing</h6>
            <label class="switch">
              <input type="checkbox" v-model="isPartnerMarketingNewOpportunities">
              <span class="slider round"></span>.
            </label>
            <label>New Opportunities</label>
          </div>
          <div class="select-container">
            <h6>Application Management</h6>
            <label class="switch">
              <input type="checkbox" v-model="isPartnerApplicationManagementApplicationSent">
              <span class="slider round"></span>.
            </label>
            <label>Application Sent</label>
          </div>
        </div>
        <div v-if="isClient && isApiCalled">
          <div class="select-container">
            <h6>Marketing</h6>
            <label class="switch">
              <input type="checkbox" v-model="isClientMarketingNewLocalPartners">
              <span class="slider round"></span>.
            </label>
            <label>New Local Partners</label>
          </div>
          <div class="select-container">
            <h6>Application Management</h6>
            <label class="switch">
              <input type="checkbox" v-model="isClientAppManagementProposalUpdates">
              <span class="slider round"></span>.
            </label>
            <label>Proposal Updates</label>
            <br>
            <label class="switch">
              <input type="checkbox" v-model="isClientAppManagementOfferUpdates">
              <span class="slider round"></span>.
            </label>
            <label>Offer Updates</label>
          </div>
        </div>
      </div>
      <div class="notifications">
        <button
          v-if="isApiCalled"
          type="button"
          :disabled="isLoading"
          class="btn"
          v-on:click="updateNotification()"
        >Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import CxltToastr from "cxlt-vue2-toastr";
import "cxlt-vue2-toastr/dist/css/cxlt-vue2-toastr.css";

var toastrConfigs = {
  position: "bottom center",
  showDuration: 0,
  timeOut: 500000
};

Vue.use(CxltToastr, toastrConfigs);

export default {
  created() {
    document.title = "Unsubscribe – PanXpan";
    let uri = window.location.search.substring(1);
    let params = new URLSearchParams(uri);
    this.email = params.get("email");
    this.token = params.get("token");
    if (this.email && this.token) {
      this.getSeedData();
      this.getEmailsToDisplay(this.email, this.token);
    } else {
      this.$toast.error({ message: "Invalid Email / Token" });
    }
    this.$root.$emit("myEvent", true);
  },
  methods: {
    getSeedData() {
      this.isPartnerMarketingNewOpportunities = true;
      this.isPartnerApplicationManagementApplicationSent = true;
      this.isClientMarketingNewLocalPartners = true;
      this.isClientAppManagementProposalUpdates = true;
      this.isClientAppManagementOfferUpdates = true;
    },
    setDataBasedOnUserData(data) {
      data.forEach(element => {
        switch (element.unSubscribedEmailGroup) {
          case "NewOpportunities":
            this.isPartnerMarketingNewOpportunities = false;
            break;
          case "ApplicationSent":
            this.isPartnerApplicationManagementApplicationSent = false;
            break;
          case "NewLocalPartners":
            this.isClientMarketingNewLocalPartners = false;
            break;
          case "ProposalUpdates":
            this.isClientAppManagementProposalUpdates = false;
            break;
          case "OfferUpdates":
            this.isClientAppManagementOfferUpdates = false;
            break;
        }
      });
    },
    getEmailsToDisplay(email, token) {
      this.originalUserSettings = [];
      this.loadingData = true;
      axios
        .get(
          process.env.baseUrl +
            "/api/notificationsetting/getunsubscribedemailsbytoken?email=" +
            email +
            "&token=" +
            token
        )
        .then(result => {
          if (result && result.data && result.data.data) {
            let data = result.data.data;
            if (
              data.notificationSettings != null &&
              data.notificationSettings.length > 0
            ) {
              this.originalUserSettings = data.notificationSettings;
              this.setDataBasedOnUserData(this.originalUserSettings);
            } else {
              this.originalUserSettings = [];
              this.getSeedData();
            }
            this.isClient = data.isClient ? true : false;
            this.loadingData = false;
            this.isApiCalled = true;
            this.$forceUpdate();
          }
        })
        .catch(e => {
          this.originalUserSettings = [];
          this.loadingData = false;
          this.$toast.error({ message: "Error while getting the data" });
        });
    },
    updateNotification() {
      this.updatedUserSettings = [];
      this.originalUserSettings.forEach(element => {
        switch (element.unSubscribedEmailGroup) {
          case "NewOpportunities":
            if (this.isPartnerMarketingNewOpportunities) {
              element.isDeleted = true;
              this.updatedUserSettings.push(element);
            }
            break;
          case "ApplicationSent":
            if (this.isPartnerApplicationManagementApplicationSent) {
              element.isDeleted = true;
              this.updatedUserSettings.push(element);
            }
            break;
          case "NewLocalPartners":
            if (this.isClientMarketingNewLocalPartners) {
              element.isDeleted = true;
              this.updatedUserSettings.push(element);
            }
            break;
          case "ProposalUpdates":
            if (this.isClientAppManagementProposalUpdates) {
              element.isDeleted = true;
              this.updatedUserSettings.push(element);
            }
            break;
          case "OfferUpdates":
            if (this.isClientAppManagementOfferUpdates) {
              element.isDeleted = true;
              this.updatedUserSettings.push(element);
            }
            break;
        }
      });

      if (!this.isClient) {
        if (!this.isPartnerMarketingNewOpportunities) {
          this.updatedUserSettings.push({
            id: "00000000-0000-0000-0000-000000000000",
            userEmail: "",
            unSubscribedEmailGroup: "NewOpportunities",
            category: "Marketing",
            emails: "M-4",
            isDeleted: false
          });
        }
        if (!this.isPartnerApplicationManagementApplicationSent) {
          this.updatedUserSettings.push({
            id: "00000000-0000-0000-0000-000000000000",
            userEmail: "",
            unSubscribedEmailGroup: "ApplicationSent",
            category: "Application Management",
            emails: "L-2b",
            isDeleted: false
          });
        }
      } else {
        if (!this.isClientMarketingNewLocalPartners) {
          this.updatedUserSettings.push({
            id: "00000000-0000-0000-0000-000000000000",
            userEmail: "",
            unSubscribedEmailGroup: "NewLocalPartners",
            category: "Marketing",
            emails: "M-3",
            isDeleted: false
          });
        }

        if (!this.isClientAppManagementProposalUpdates) {
          this.updatedUserSettings.push({
            id: "00000000-0000-0000-0000-000000000000",
            userEmail: "",
            unSubscribedEmailGroup: "ProposalUpdates",
            category: "Application Management",
            emails: "M-3",
            isDeleted: false
          });
        }
        if (!this.isClientAppManagementOfferUpdates) {
          this.updatedUserSettings.push({
            id: "00000000-0000-0000-0000-000000000000",
            userEmail: "",
            unSubscribedEmailGroup: "OfferUpdates",
            category: "Application Management",
            emails: "M-3",
            isDeleted: false
          });
        }
      }
      if (this.updatedUserSettings.length > 0) {
        axios({
          url:
            process.env.baseUrl +
            "/api/notificationsetting/updatenotificationsbyemailtoken?email=" +
            this.email +
            "&token=" +
            this.token,
          method: "post",
          data: this.updatedUserSettings
        })
          .then(function(response) {
            this.$toast.success({
              title: "",
              message: "Notification preferences updated"
            });
          })
          .catch(function(error) {
            this.$toast.error({
              message: "There was an error updating the Notification Prefernce"
            });
          });
      }
    },
    data() {
      return {
        isPartnerMarketingNewOpportunities: true,
        isPartnerApplicationManagementApplicationSent: true,
        isClientMarketingNewLocalPartners: true,
        isClientAppManagementProposalUpdates: true,
        isClientAppManagementOfferUpdates: true,
        isClient: false,
        originalUserSettings: [],
        updatedUserSettings: [],
        loadingData: false,
        isApiCalled: false,
        email: "",
        token: ""
      };
    }
  }
};
</script>

<style>
.select-container {
  border-bottom: 1px solid grey;
  margin-bottom: 10px;
}
.check-slider {
  display: flex;
  align-items: center;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.notifications {
  padding-top: 50px;
  text-align: left;
  margin-bottom: 400px;
}

.notifications .btn {
  background: #0098f3;
  color: #ffffff;
}

.notifications .btn:hover {
  background: #0078bf;
  color: #ffffff;
}

.subscription-header {
  width: 750px;
  padding-top: 20px;
  text-justify: auto;
}

.text-align-left {
  text-align: left;
}

.notification-container {
  text-align: left;
  padding-left: 20px;
}
</style>